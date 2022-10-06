import { defineStore } from 'pinia';
import { pick } from '@/scripts/helpers/pick.js';
import { createOneTrade, getMyTrade, getOneTrade, getAllTrades, buyFactoryLimit, deleteOneTrade } from '@/API/trade.req';

const marketStoreDefaultState = () => {
	return {
		marketTrades: [],
		userTrades: [],
		filterBy: {},
	}
}

export const useMarketStore = defineStore('market', {
	state: () => marketStoreDefaultState(),
	getters: {
		filteredTrades: state => {
			const tradeFilter = state.filterBy;
			const marketTrades = state.marketTrades;
			const filteredTrades = [];

			for(let n = 0; n < marketTrades.length; n++) {
				const trade = marketTrades[n];

				if(trade.resource.id === tradeFilter.id) {
					filteredTrades.push(trade);
				}
			}
			
			return filteredTrades;
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
		reset(keys) {
			Object.assign(this, keys?.length
				? pick(marketStoreDefaultState(), keys)
				: marketStoreDefaultState() // if no keys provided, reset all
			);
		}
	}
})