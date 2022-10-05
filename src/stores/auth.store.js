import { defineStore } from 'pinia';
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

export const authStore = defineStore('auth', {
	state: () => authStoreDefaultState(),
	actions: {
		async login(username, password) {
			await tryLogin(username, password).then((res) => {
				const data = res?.data;

				if(data) {
          localStorage.token = data?.access_token;
				}
			})
		},
		async signup(username, password) {
			await trySignUp(username, password)
				.catch(err => console.log(err.response.data))
		},
		async fetchUserInfo() {
			const res = await getUserInfo();
			if(res?.status !== 201) return;

			const userStore = useUserStore();
			userStore.setUser(res.data);
      setAuthorizationBearer(localStorage.token);
      this.isAuth = true;

			const user = res.data;
		},
		reset(keys) {
			Object.assign(this, keys?.length
				? pick(authStoreDefaultState(), keys)
				: authStoreDefaultState() // if no keys provided, reset all
			);
		}
	}
})