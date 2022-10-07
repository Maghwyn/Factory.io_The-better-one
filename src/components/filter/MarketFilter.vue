<template>
	<div class="market-filter">
		<div v-for="(ressource, key) in resources" :key="key">
			<button @click="filterByResource(ressource)">{{ ressource.name }}</button>
		</div>
	</div>
</template>

<script>
import { useResourceStore } from "@/stores/resource.store";
import { useMarketStore } from '@/stores/market.store';
import { defineComponent, computed } from "vue";

export default defineComponent({
	setup() {
		const resourceStore = useResourceStore();
		const marketStore = useMarketStore();
		resourceStore.getAllResources();

		const resources = computed(() => resourceStore.resources);

		const filterByResource = (resource) => {
			marketStore.setTradeFilter(resource);
		}

		return {
			filterByResource,
			resources,
		}
	}
})
</script>

<style lang="scss">
.market-filter {
	width: 100%;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	align-content: baseline;
	flex-flow: wrap row;
	flex: 1 0;
	background-color: white;

	border-radius: 15px;
	box-shadow: 0px 0px 5px black;
	padding: 20px 20px;
	overflow: hidden;
	gap: .75rem;

	div {
		width: 135px;
		height: 40px;
		display: flex;
		align-items: center;
		justify-content: center;
		background-color: #fcbb6b;
		border-radius: 8px;

		&:hover {
			background-color: #fec47d;
		}

		button {
			width: 100%;
			height: 100%;
			color: black;
			font-size: 14px;
			font-weight: 600;
		}
	}
}
</style>