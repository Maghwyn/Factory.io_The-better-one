import { defineStore } from 'pinia';
import { pick } from '@/scripts/helpers/pick.js';
import { createOneFactory, deleteOneFactory, getAllFactories, getOneFactory, levelUpOneFactory } from '@/API/factory.req';

const gameStoreDefaultState = () => {
	return {
		
	}
}

export const useGameStore = defineStore('game', {
	state: () => gameStoreDefaultState(),
	actions: {
		async createFactory() {
			// TODO
			await createOneFactory(null);
		},
		async getAllFactories() {
			// TODO
			await getAllFactories();
		},
		async getSingleFactory() {
			// TODO
			await getOneFactory(null);
		},
		async deleteFactory() {
			// TODO
			await deleteOneFactory(null);
		},
		async factoryLevelUp() {
			// TODO
			await levelUpOneFactory(null);
		},
		reset(keys) {
			Object.assign(this, keys?.length
				? pick(gameStoreDefaultState(), keys)
				: gameStoreDefaultState() // if no keys provided, reset all
			);
		}
	}
})