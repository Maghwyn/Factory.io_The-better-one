<template>
	<div class="user-resource">
		<div v-if="rss.value != null">
			<div class="user-resource-cell" v-for="(resources, key) in rss" :key="key">
				<span>{{ resources }}</span>
				<span>{{ resources }}</span>
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
import { defineComponent } from "vue";

export default defineComponent({
	props: {
		rss: {
			type: Array,
			required: false,
			default: () => [],
		}
	},

})
</script>

<style lang="scss">
.user-resource {
	width: 100%;
	display: flex;
	flex-direction: column;
	gap: 1rem;
	padding-bottom: 10px;

	&-cell {
		display: flex;
		justify-content: space-between;
		gap: 2rem;

		span {
			font-size: 13px;
		}
	}
}
</style>