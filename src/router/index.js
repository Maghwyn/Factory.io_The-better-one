import routes from '@/router/router'
import { createRouter, createWebHistory } from "vue-router";
import { useAuthStore } from "@/stores/auth.store";
import { computed } from 'vue';

export default function route() {
	const Router = createRouter({
		history: createWebHistory(),
		routes,
	});

	Router.beforeEach((to, _from, next) => {
		const authStore = useAuthStore();
		const isAuth = computed(() => authStore.isAuth);
		const isAdmin = computed(() => authStore.isAdmin);

		if(to.matched.some((rec) => rec.meta.requiresAdmin)) {
			if(isAdmin.value) {
				return to.path.includes('/admin')
					? next()
					: next('/admin');
			} else if(isAuth.value) {
				return next('/app/game');
			} else {
				return next('/login');
			}
		}

		if(to.matched.some((rec) => rec.meta.requiresAuth)) {
			if(isAuth.value) {
				return to.path.includes('/app')
					? next()
					: next('/app/game')
			} else {
				return next('/login');
			}
		}

		if(!isAuth.value) {
			return ['/', '/login', '/signup'].includes(to.path)
				? next()
				: next('/login')
		} else if(isAdmin.value) {
			return next('/admin');
		} else {
			return next('/app/game')
		}
	})

	return Router
}