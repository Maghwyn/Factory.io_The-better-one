import { tryGetAllFactories, tryGetAllUsers, tryCreateRessource, tryGetAllRessources } from '@/API/admin.req'
import { defineStore } from 'pinia'


export const useAdminStore = defineStore('admin', {
	state() {
		return {
			isAuth: false,
			users: [],
			allRessources: [],
			factories: []
		}
	},
	getters: {
	},
	actions: {
		getAllFactories() {
			tryGetAllFactories().then(res => {
				console.log(res.data);
				
			})
		},
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
		}
	}
});