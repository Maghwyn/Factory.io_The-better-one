<template>
	<div class="market-filter">
		<div v-for="(resource, key) in resources" :key="key" :class="resource.id === active ? 'active' : ''">
			<button @click="filterByResource(resource)">{{ resource.name }}</button>
		</div>
	</div>
</template>

<script>
import { useResourceStore } from "@/stores/resource.store";
import { useMarketStore } from '@/stores/market.store';
import { defineComponent, computed, ref } from "vue";

export default defineComponent({
	setup() {
		const resourceStore = useResourceStore();
		const marketStore = useMarketStore();
		resourceStore.getAllResources();
		const active = ref(-1);

		const resources = computed(() => resourceStore.resources);
		const tradeFilterId = computed(() => marketStore.filterById);

		const filterByResource = (resource) => {
			marketStore.setPagePagination(1);
			if(tradeFilterId.value === resource.id) {
				marketStore.setTradeFilter(-1);
				active.value = -1;
			}
			else {
				marketStore.setTradeFilter(resource.id);
				active.value = resource.id;
			}
		}

		return {
			filterByResource,
			resources,
			active,
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

		&.active {
			background-color: #fc6b6b;


			&:hover {
				background-color: #ffa9a9;
			}
		}

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