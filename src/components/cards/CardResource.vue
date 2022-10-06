<template>
	<div class="user-resource">
		<div 
			class="user-resource-cell"
			v-for="(data, key) in fakeData"
			:key="key"
		>
			<span>{{ data.name }}</span>
			<span>{{ data.amount }}</span>
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
	setup() {
		const fakeData = [
			{
				name: "Bois",
				amount: "90",
			},
			{
				name: "Fer",
				amount: "20",
			},
			{
				name: "Plastic",
				amount: "40",
			},
		]

		return {
			fakeData,
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
	}
}
</style>