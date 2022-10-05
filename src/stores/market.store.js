import { defineStore } from 'pinia';
import { pick } from '@/scripts/helpers/pick.js';
import { createOneTrade, getMyTrade, getOneTrade, getAllTrades, buyFactoryLimit, deleteOneTrade } from '@/API/trade.req';

const marketStoreDefaultState = () => {
	return {
		
	}
}

export const useMarketStore = defineStore('market', {
	state: () => marketStoreDefaultState(),
	actions: {
		async createTrade() {
			// TODO
			await createOneTrade(null);
		},
		async getUserTrades() {
			// TODO
			await getMyTrade();
		},
		async getSingleTrade() {
			// TODO
			await getOneTrade(null);
		},
		async getAllTrades() {
			// TODO
			await getAllTrades();
		},
		async deleteTrade() {
			// TODO
			await deleteOneTrade(null);
		},
		async buyFactoryLimit() {
			// TODO
			await buyFactoryLimit();
		},
		reset(keys) {
			Object.assign(this, keys?.length
				? pick(marketStoreDefaultState(), keys)
				: marketStoreDefaultState() // if no keys provided, reset all
			);
		}
	}
})