import { defineStore } from 'pinia';
import { useUserStore } from '@/stores/user.store';
import { pick } from '@/scripts/helpers/pick.js';

import {
	tryLogin,
	trySignUp,
	getUserInfo,
	setAuthorizationBearer,
} from "@/API/auth.req.js";

const authStoreDefaultState = () => {
	return {
		username: "",
		isAuth: false,
	}
}

export const useAuthStore = defineStore('auth', {
	state: () => authStoreDefaultState(),
	actions: {
		async login(username, password) {
			const res = await tryLogin(username, password).catch(err => err);
			if(res?.response !== undefined) return;

			const token = res?.data?.access_token;
			if(!token) return;

			localStorage.token = token;
		},
		async signup(username, password) {
			const res = await trySignUp(username, password).catch(err => err);
			if(res?.response !== undefined) return false;
			return true;
		},
		async fetchUserInfo() {
			setAuthorizationBearer(localStorage.token);
			
			const res = await getUserInfo();
			if(res?.response !== undefined) return;

			const userStore = useUserStore();
			userStore.setUser(res.data);
			this.isAuth = true;
		},
		reset(keys) {
			Object.assign(this, keys?.length
				? pick(authStoreDefaultState(), keys)
				: authStoreDefaultState() // if no keys provided, reset all
			);
		}
	}
})