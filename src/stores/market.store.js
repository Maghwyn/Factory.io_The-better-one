import { defineStore } from 'pinia';
import { pick } from '@/scripts/helpers/pick.js';
// import { toRaw } from 'vue';

import { 
	createOneTrade,
	getMyTrade,
	getOneTrade,
	getAllTrades,
	deleteOneTrade,
	buyOneTrade,
} from '@/API/trade.req';
import { useUserStore } from './user.store';
import { computed } from 'vue';

const sortQuantity = (a, b) => {
	return a.quantity - b.quantity;
}

const sortUnit = (a, b) => {
	return a.unitPrice - b.unitPrice;
}

const marketStoreDefaultState = () => {
	return {
		marketTrades: [],
		userTrades: [],
		filterById: -1,
		paginationPage: 1,
		paginationPerPage: 8,
		sortBy: '',
	}
}

export const useMarketStore = defineStore('market', {
	state: () => marketStoreDefaultState(),
	getters: {
		filteredTrades: state => {
			const tradeFilterId = state.filterById;
			const marketTrades = state.marketTrades;
			const sortBy = state.sortBy === "Quantity" 
				? sortQuantity 
				: state.sortBy === "Unit Price" 
					? sortUnit
					: undefined;

			const filteredTrades = [];

			for(let n = 0; n < marketTrades.length; n++) {
				const trade = marketTrades[n];

				if(tradeFilterId !== -1) {
					if(trade.resource.id === tradeFilterId) {
						filteredTrades.push(trade);
					}
				} else { filteredTrades.push(trade) }
			}

			const sortedTrades = sortBy !== undefined
				? filteredTrades.sort((a, b) => sortBy(a, b))
				: filteredTrades;
			
			return sortedTrades;
		},
		paginationTrades: state => {
			const perPage = state.paginationPerPage;
			const currentPage = state.paginationPage;
			const trades = state.filteredTrades;

			return trades.slice((currentPage - 1) * perPage, currentPage * perPage);
		},
		getFilterById: state => {
			return state.filterById;
		},
		getCalculatedUserTrades: state => {
			const userStore = useUserStore();
			const userId = computed(() => userStore.user.id);
			const marketTrades = state.marketTrades;
			const myTrades = [];

			for(let n = 0; n < marketTrades.length; n++) {
				const trade = marketTrades[n];
				
				if(trade.owner.id === userId.value) {
					myTrades.push(trade);
				}
			}

			return myTrades;
		},
	},
	actions: {
		async createTrade(resourceId, quantity, unitPrice) {
			const res = await createOneTrade(resourceId, quantity, unitPrice);
			if(res?.response !== undefined) return;

			const trade = res.data;
			if(!trade) return;

			this.marketTrades.push(trade);
		},
		async getUserTrades() {
			const res = await getMyTrade();
			if(res?.response !== undefined) return;

			const userTrades = res.data || [];
			console.log("USER TRADES", userTrades)
			if(userTrades.length < 1) return;
			
			this.userTrades = userTrades;
			console.log("USER TRADES", this.userTrades)
		},
		async getSingleTrade(tradeId) {
			const res = await getOneTrade(tradeId);
			if(res?.response !== undefined) return {};

			const trade = res.data;
			if(!trade) return {};
			
			return trade;
		},
		async getAllTrades() {
			const res = await getAllTrades();
			if(res?.response !== undefined) return;

			const trades = res.data || [];
			if(trades.length < 1) return;

			this.marketTrades = trades;
		},
		async deleteUserTrade(tradeId) {
			const res = await deleteOneTrade(tradeId);
			if(res?.response !== undefined) return;

			for(let n = 0; n < this.userTrades.length ; n++) {
				const trade = this.userTrades[n];
				if(trade.id === tradeId) {
					this.userTrades.splice(n, 1);
				}
			}

			for(let x = 0; x < this.marketTrades.length; x++) {
				const trade = this.marketTrades[x];
				if(trade.id === tradeId) {
					this.marketTrades.splice(x, 1);
				}
			}
		},
		async buyOfferTrade(tradeId, quantity) {
			const res = await buyOneTrade(tradeId, quantity);
			if(res?.response !== undefined) return;

			for(let n = 0; n < this.marketTrades.length; n++) {
				const trade = this.marketTrades[n];
				if(trade.id === tradeId) {
					const newQtt = trade.quantity - quantity;

					if(newQtt < 1) this.marketTrades.splice(n, 1);
					else this.marketTrades[n].quantity =  newQtt;

					break;
				}
			}
		},
		setPagePagination(n_page) {
			this.paginationPage = n_page;
		},
		setTradeFilter(id) {
			this.filterById = id;
		},
		setSortMethod(sortName) {
			this.sortBy = sortName;
		},
		reset(keys) {
			Object.assign(this, keys?.length
				? pick(marketStoreDefaultState(), keys)
				: marketStoreDefaultState() // if no keys provided, reset all
			);
		}
	}
})