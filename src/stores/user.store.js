import { defineStore } from 'pinia';
import { pick } from '@/scripts/helpers/pick.js';

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

export const authStore = defineStore('auth', {
	state: () => userStoreDefaultState(),
	actions: {
		setUser(user) {
			this.user = { ...user };
		},
		reset(keys) {
			Object.assign(this, keys?.length
				? pick(userStoreDefaultState(), keys)
				: userStoreDefaultState() // if no keys provided, reset all
			);
		}
	}
})