<template>
	<header>
		<div class="header-logo">
			LOGO
		</div>
		<nav>
			<div class="header-nav" v-if="isAdmin">
				<router-link to="/admin">
					Dashboard
				</router-link>
			</div>
			<div class="header-nav">
				<router-link to="/app/game">
					Game
				</router-link>
			</div>
			<div class="header-nav">
				<router-link to="/app/market">
					Market
				</router-link>
			</div>
			<div class="header-nav">
				<router-link to="/" @click="logout">
					Logout
				</router-link>
			</div>
		</nav>
	</header>
</template>

<script>
import { useAuthStore } from '@/stores/auth.store';
import { defineComponent, computed } from "vue";
import { clearSession } from "@/scripts/helpers/clearSession"

export default defineComponent({
	setup() {
		const authStore = useAuthStore();
		const isAdmin = computed(() => authStore.isAdmin)
		const logout = () => {
			clearSession();
		}

		return {
			isAdmin,
			logout
		}
	}
})
</script>

<style lang="scss">
header {
	width: 100%;
	height: 70px;
	min-height: 70px;
	display: flex;
	justify-content: space-between;
	padding: 0 50px;
	background-color: #282c34;

	.header-logo {
		width: 200px;
		display: flex;
		align-items: center;
		color: white;
	}

	nav {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 2rem;

		.header-nav a {
			color: white;
			font-size: 14px;
			font-weight: 500;
			padding: 5px 10px;
			border-radius: 5px;

			&.router-link-active {
				box-shadow: 0px 0px 0px 2px #165ed2;
			}

			&:not(&.router-link-active) {
				background-color: #165ed2;
			}
		}
	}
}
</style>