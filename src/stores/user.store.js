import { defineStore } from 'pinia';
import { pick } from '@/scripts/helpers/pick.js';
import { getOneInventory } from '@/API/resource.req';

const userStoreDefaultState = () => {
	return {
		user: {
			id: null,
			username: null,
			role: null,
			income: null,
			factories: null,
		}
	}
}

export const useUserStore = defineStore('user', {
	state: () => userStoreDefaultState(),
	actions: {
		setUser(user) {
			this.user = { ...user };
			console.log("User ::", this.user)
		},
		async getMyInventory() {
			// TODO
			await getOneInventory();
		},
		reset(keys) {
			Object.assign(this, keys?.length
				? pick(userStoreDefaultState(), keys)
				: userStoreDefaultState() // if no keys provided, reset all
			);
		}
	}
})