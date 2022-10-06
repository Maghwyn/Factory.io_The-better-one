<template>
	<div class="market">
		<div class="market-settings">
			<UserTestCard></UserTestCard>
			<MarketFilter></MarketFilter>
		</div>
		<div class="market-dashboard">
			<DashboardMarket></DashboardMarket>
		</div>
	</div>
</template>

<script>
import UserTestCard from "@/components/cards/UserTestCard.vue";
import MarketFilter from "@/components/filter/MarketFilter.vue";
import DashboardMarket from "@/components/dashboard/DashboardMarket.vue";
import { defineComponent } from "vue";
import { useMarketStore } from "@/stores/market.store";

export default defineComponent({
	components: {
		UserTestCard,
		MarketFilter,
		DashboardMarket,
	},
	setup() {
		const marketStore = useMarketStore();
		marketStore.getAllTrades();
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
		height: 100%;
		display: flex;
		flex-direction: column;
		flex: 1 0;
		border-radius: 15px;
		gap: 1rem;
	}
}
</style>
