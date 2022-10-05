import { defineStore } from 'pinia';
import { pick } from '@/scripts/helpers/pick.js';

import {
	tryLogin,
	trySignUp,
} from "@/API/auth.req.js";

const authStoreDefaultState = () => {
	return {
		username: "",
		isAuth: false,
	}
}

export const authStore = defineStore('auth', {
	state: () => authStoreDefaultState(),
	actions: {
		async login(username, password) {
			await tryLogin(username, password).then((res) => {
				if(res?.response) return;
				this.isAuth = true;
			})
		},
		async signup(username, password) {
			await trySignUp(username, password).then((res) => {
				if(res?.response) return;
				this.isAuth = true;
			})
		},
		reset(keys) {
			Object.assign(this, keys?.length
				? pick(authStoreDefaultState(), keys)
				: authStoreDefaultState() // if no keys provided, reset all
			);
		}
	}
})