<template>
	<div class="user-resource">
		<div v-if="one === 1 || !isFetching">
			<div class="user-resource-cell">
				<div v-for="(resources, key) in displayRss.found" :key="key" class="box_rss">
					<span>{{ resources.name }}</span>
					<span>{{ resources.quantity }}</span>
				</div>
				<div v-for="(resources, key) in displayRss.unfound" :key="key" class="box_rss">
					<span>{{ resources.name }}</span>
					<span>{{ resources.quantity }}</span>
				</div>
			</div>
		</div>
		<div v-else>
			<div class="user-resource-cell">
				<p>No resources yet</p>
			</div>
		</div>
	</div>
</template>

<script>
import { defineComponent, computed } from "vue";
import { useResourceStore } from '@/stores/resource.store'
import { useUserStore } from '@/stores/user.store'

export default defineComponent({
	setup() {
		const resourceStore = useResourceStore();
		resourceStore.getAllResources()
		const userStore = useUserStore();
		const displayRss = computed(() => resourceStore.displayUserRss);
		const allResources = computed(() => resourceStore.resources);
		const inventory = computed(() => userStore.inventory)
		const isFetching = computed(() => userStore.isFetching)
		setInterval(userStore.getMyInventory(), 30000);
		const one = computed(() => userStore.isFetchingOne)

		return {
			displayRss,
			allResources,
			inventory,
			isFetching,
			one
		}
	}

})
</script>

<style lang="scss">
.box_rss {
	display: flex;
	justify-content: space-between;
}

.user-resource {
	width: 100%;
	display: flex;
	flex-direction: column;
	gap: 1rem;
	padding-bottom: 10px;
	max-height: 15vh;
	overflow-y: scroll;

	&-cell {
		display: flex;
		justify-content: space-between;
		flex-direction: column;

		span {
			font-size: 13px;
		}
	}
}
</style>