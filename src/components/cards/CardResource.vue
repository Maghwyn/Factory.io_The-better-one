<template>
	<div class="user-resource">
		<div v-if="allResources[0] !== undefined">
			<div class="user-resource-cell">
				<div v-for="(resources, key) in rss" :key="key" class="box_rss">
					<span>{{ key }}</span>
					<span>{{ resources }}</span>
				</div>
				<div v-for="(resources, key) in rssShowed" :key="key" class="box_rss">
					<span>{{ resources.name }}</span>
					<span v-if="resources.name "> 0 </span>
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
import { defineComponent, computed, watch } from "vue";
import { useUserStore } from '@/stores/user.store'
import { useResourceStore } from '@/stores/resource.store'

export default defineComponent({
	setup() {
		const resourceStore = useResourceStore();
		resourceStore.getAllResources()
		const allResources = computed(() => resourceStore.resources)
		var rssShowed = []
		const userStore = useUserStore();
		const inventory = computed(() => userStore.inventory);
		const rss = {}

		watch(allResources, val => {
			console.log("st");
			console.log(val)
			console.log(allResources.value)
			console.log("ed");
			for (let y = 0; y < val.length; y++) {
				for (let i = 0; i < inventory.value.inventory_resources.length; i++) {
					if (val[y].id == inventory.value.inventory_resources[i].resource.id) {
						rss[val[y].name] = inventory.value.inventory_resources[i].quantity
					}
					else {
						if (val[y].name in rss) {
							console.log("")
						}
						else if (rssShowed.indexOf(val[y]) === -1) {
							rssShowed.push(val[y])
						}
					}
				}
			}
		}, { deep: true })

		return {
			inventory,
			allResources,
			rss,
			rssShowed
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