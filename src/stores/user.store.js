import { defineStore } from 'pinia';
import { pick } from '@/scripts/helpers/pick.js';
import { getOneInventory } from '@/API/resource.req';
import { buyFactoryLimit, checkPriceFactoryLimit } from '@/API/user.req';

const userStoreDefaultState = () => {
	return {
		user: {
			id: null,
			username: null,
			role: null,
			income: null,
			factories: null,
		},
		inventory: {},
		nextFactoryPrice : "",
		isFetching: false,
	}
}

export const useUserStore = defineStore('user', {
	state: () => userStoreDefaultState(),
	actions: {
		setUser(user) {
			this.user = { ...user };
		},
		async getMyInventory() {
			this.isFetching = true;
			const res = await getOneInventory();
			if(res?.response !== undefined) return;

			const userInventory = res.data;
			if(!userInventory) return;
			this.inventory = userInventory;
			this.isFetching = false;
		},
		async buyFactoryLimit() {
			const res = await buyFactoryLimit();
			if (res?.response !== undefined) return;
			this.inventory = res.data;
			
			// This will probably be added to user.
			// Todo
		},
		async checkPriceFactoryLimit() {
			const res = await checkPriceFactoryLimit();
			if(res?.response !== undefined) return;
			this.nextFactoryPrice = res.data
		},
		reset(keys) {
			Object.assign(this, keys?.length
				? pick(userStoreDefaultState(), keys)
				: userStoreDefaultState() // if no keys provided, reset all
			);
		}
	}
})