import { defineStore } from 'pinia';
import { pick } from '@/scripts/helpers/pick.js';
import { createOneFactory, deleteOneFactory, getAllFactories, getOneFactory, levelUpOneFactory, getAllModels } from '@/API/factory.req';

const gameStoreDefaultState = () => {
	return {
		factories: [],
		models: [],
		actualFactory:[]
	}
}

export const useGameStore = defineStore('game', {
	state: () => gameStoreDefaultState(),
	actions: {
		async createFactory(factoryModelId) {
			const res = await createOneFactory(factoryModelId);
			if(res?.response !== undefined) return;

			const factory = res.data;
			if(!factory) return;

			this.factories.push(factory);
			// Perhaps update the user factory at the same time, or dynamically.
		},
		async getFactoriesModels() {
			const res = await getAllModels();
			if(res?.response !== undefined) return;

			const modelList = res.data;
			if (!modelList) return;
			this.models.push(modelList);
			// Perhaps update the user factory at the same time, or dynamically.
		},
		async getAllUserFactories() {
			console.log("Yo")

			const res = await getAllFactories();
			if(res?.response !== undefined) return;
			const factories = res.data || [];
			if(factories.length < 1) return;

			this.factories = factories;
			console.log(this.factories)

		},
		async getSingleFactory(factoryId) {
			const res = await getOneFactory(factoryId);
			if(res?.response !== undefined) return {};

			const factory = res.data;
			if(!factory) return {};

			return factory;
		},
		async deleteFactory(factoryId) {
			const res = await deleteOneFactory(factoryId);
			if(res?.response !== undefined) return;

			let factoryIndex = -1;
			for(let n = 0; n < this.factories.length ; n++) {
				const factory = this.factories[n];
				if(factory.id === factoryId) {
					factoryIndex = n;
				}
			}

			if(factoryIndex === - 1) return;
			this.factories.splice(factoryIndex, 1);
		},
		async factoryLevelUp(factoryId) {
			const res = await levelUpOneFactory(factoryId);
			if(res?.response !== undefined) return;

			const factory = res.data;
			if(!factory) return;

			let factoryIndex = -1;
			for(let n = 0; n < this.factories.length ; n++) {
				const factory = this.factories[n];
				if(factory.id === factoryId) {
					factoryIndex = n;
				}
			}

			if(factoryIndex === - 1) return;
			this.factories[factoryIndex] = factory;
			// Perhaps update the user factory at the same time, or dynamically.
		},
		async getFactoryModal(factoryId){
			this.actualFactory = await this.getSingleFactory(factoryId)
		},
		reset(keys) {
			Object.assign(this, keys?.length
				? pick(gameStoreDefaultState(), keys)
				: gameStoreDefaultState() // if no keys provided, reset all
			);
		}
	}
})