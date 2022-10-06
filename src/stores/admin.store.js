import { 
	tryGetAllFactories, 
	tryGetAllUsers, 
	tryCreateRessource, 
	tryGetAllRessources, 
	tryGetAllModels,
	tryCreateModel,
	tryRemoveModel,
	tryUpdateModel,
} from '@/API/admin.req'
import { pick } from '@/scripts/helpers/pick.js';
import { defineStore } from 'pinia'

const userStoreDefaultState = () => {
	return {
		users: [],
		allRessources: [],
		factories: [],
		modelsFactories: []
	}
}

export const useAdminStore = defineStore('admin', {
	state: () => userStoreDefaultState(),
	getters: {
	},
	actions: {
		getAllUsers() {
			tryGetAllUsers().then(res => {
				this.users = res.data
			})
		},
		createRessource(ressource) {
			tryCreateRessource(ressource).then(res => {
				this.allRessources.push(res.data)
			})
		},
		getAllRessources() {
			tryGetAllRessources().then(res => {
				this.allRessources = res.data
			})
		},
		getAllModels() {
			tryGetAllModels().then(res => {
				this.modelsFactories = res.data
			})
		},
		removeModel(id) {
			tryRemoveModel(id).then(res => {
				console.log(res.data);
				this.modelsFactories.splice(id-1, 1)
			})
		},
		createModel(model) {
			tryCreateModel(model).then(res => {
				if (res.data) {
					tryGetAllModels().then(response => {
						this.modelsFactories = response.data
					})
				}
			})
		},
		updateModel(model) {
			let pass = false;
			if (pass === true) {
				tryUpdateModel(model).then(res => {
					console.log(res.data);
				})
			}
		},
		getAllFactories() {
			tryGetAllFactories().then(res => {
				this.factories = res.data
			})
		},
		reset(keys) {
			Object.assign(this, keys?.length
				? pick(userStoreDefaultState(), keys)
				: userStoreDefaultState() // if no keys provided, reset all
			);
		}
	}
});