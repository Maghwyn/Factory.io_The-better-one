<template>
	<router-view></router-view>
</template>

<script>
import { defineComponent, computed, watch } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from './stores/auth.store';
import { useUserStore } from './stores/user.store';

export default defineComponent({
	setup() {
		const authStore = useAuthStore();
		const router = useRouter();
		const isAuth = computed(() => authStore.isAuth);
		const userStore = useUserStore();
		setInterval(userStore.getMyInventory, 1000)

		watch(isAuth, auth => {
			console.log("IS AUTH ::", auth);
			if (auth) router.push('/app/game');
			else router.push('/login');
		})
	}
})
</script>

<style>
#app {
	font-family: Avenir, Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	color: #2c3e50;
}
</style>
