<template>
	<div class="market">
		<div class="market-settings">
			<UserCard :user="user" :inventory="inventory" />
			<MarketFilter></MarketFilter>
		</div>
		<div class="market-dashboard">
			<DashboardMarket></DashboardMarket>
		</div>
	</div>
</template>

<script>
import UserCard from "@/components/cards/UserCard.vue";
import MarketFilter from "@/components/filter/MarketFilter.vue";
import DashboardMarket from "@/components/dashboard/DashboardMarket.vue";
import { defineComponent, computed } from "vue";
import { useMarketStore } from "@/stores/market.store";
import { useUserStore } from "@/stores/user.store";
import { useResourceStore } from '@/stores/resource.store';

export default defineComponent({

	components: {
		UserCard,
		MarketFilter,
		DashboardMarket,
	},
	setup() {
		const userStore = useUserStore();
		userStore.getMyInventory();
		const user = computed(() => userStore.user);
		const inventory = computed(() => userStore.inventory);
		const marketStore = useMarketStore();
		marketStore.getAllTrades();
		const resourceStore = useResourceStore();
		resourceStore.getAllResources()

		return {
			user,
			inventory
		}
	}
})
</script>

<style lang="scss">
.market {
	width: 100%;
	height: 100%;
	padding: 15px;
	display: flex;
	align-items: flex-start;
	justify-content: flex-start;
	flex-flow: row-reverse;
	gap: 1rem;
	background-color: #353941;

	&-settings {
		max-width: 330px;
		min-width: 330px;
		display: flex;
		flex-direction: column;
		height: 100%;
		gap: 1rem;
	}

	&-dashboard {
		max-height: 100%;
		display: flex;
		flex-direction: column;
		flex: 1 0;
		border-radius: 15px;
		gap: 1rem;
	}
}
</style>
