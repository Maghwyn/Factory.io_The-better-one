import { defineStore } from 'pinia';
import { pick } from '@/scripts/helpers/pick.js';

import { 
	createOneTrade,
	getMyTrade,
	getOneTrade,
	getAllTrades,
	deleteOneTrade,
	buyOneTrade,
} from '@/API/trade.req';

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
			console.log("STORE ::", tradeFilterId)
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
		}
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
			if(userTrades.length < 1) return;
			
			this.userTrades = userTrades;
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

			let tradeIndex = -1;
			for(let n = 0; n < this.userTrades.length ; n++) {
				const trade = this.userTrades[n];
				if(trade.id === tradeId) {
					tradeIndex = n;
				}
			}

			if(tradeIndex === - 1) return;
			this.userTrades.splice(tradeIndex, 1);
		},
		async buyOfferTrade(tradeId, quantity) {
			const res = await buyOneTrade(tradeId, quantity);
			if(res?.response !== undefined) return;

			console.log(res);
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