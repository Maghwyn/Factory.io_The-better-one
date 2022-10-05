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
		async createFactory(factoryModelId) {
			const res = await createOneFactory(factoryModelId);
			if(res?.response !== undefined) return;

			const factory = res.data;
			// Todo
		},
		async getAllUserFactories() {
			const res = await getAllFactories();
			if(res?.response !== undefined) return;

			const factories = res.data;
			// Todo
		},
		async getSingleFactory(factoryId) {
			const res = await getOneFactory(factoryId);
			if(res?.response !== undefined) return;

			const factory = res.data;
			// Todo
		},
		async deleteFactory(factoryId) {
			const res = await deleteOneFactory(factoryId);
			if(res?.response !== undefined) return;

			let factoryIndex = -1;
			for(let n = 0; n < 0 /* Factories Length */; n++) {
				const factory = {} /* Factories index */;
				if(factory.id === factoryId) {
					factoryIndex = n;
				}
			}

			// Todo
			// this.factories.splice(factoryIndex, 1);
		},
		async factoryLevelUp(factoryId) {
			const res = await levelUpOneFactory(factoryId);
			if(res?.response !== undefined) return;

			const factory = res.data;
			// Todo
		},
		reset(keys) {
			Object.assign(this, keys?.length
				? pick(gameStoreDefaultState(), keys)
				: gameStoreDefaultState() // if no keys provided, reset all
			);
		}
	}
})