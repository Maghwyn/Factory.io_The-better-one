import { defineStore } from 'pinia';
import { pick } from '@/scripts/helpers/pick.js';

const authStoreDefaultState = () => {
	return {
		username: "",
		isAuth: false,
	}
}

export const useAuthStore = defineStore('auth', {
	state: () => authStoreDefaultState(),
	actions: {
		setAuth(status) {
			this.isAuth = status;
		},
		async login(username, password) {
			await tryLogin(username, password).then((res) => {
				if(res?.data) {
					localStorage.token = res.data?.access_token;
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
		},
		reset(keys) {
			Object.assign(this, keys?.length
				? pick(authStoreDefaultState(), keys)
				: authStoreDefaultState() // if no keys provided, reset all
			);
		}
	}
})