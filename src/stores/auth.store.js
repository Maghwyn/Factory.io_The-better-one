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
		isAuth: false,
		isAdmin: false,
	}
}

export const useAuthStore = defineStore('auth', {
	state: () => authStoreDefaultState(),
	actions: {
		async login(username, password) {
			const res = await tryLogin(username, password).catch(err => err);
			if(res?.response !== undefined) return false;

			const token = res?.data?.access_token;
			if(!token) return false;

			localStorage.token = token;
			return true;
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
			this.isAdmin = res.data.role === 1 ? true : false;
		},
		async tryAutoLogin() {
			if(localStorage.token !== undefined) {
				await this.fetchUserInfo();
			}
		},
		reset(keys) {
			Object.assign(this, keys?.length
				? pick(authStoreDefaultState(), keys)
				: authStoreDefaultState() // if no keys provided, reset all
			);
		}
	}
})
