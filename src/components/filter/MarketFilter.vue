<template>
	<div class="market-filter">
		<div 
			v-for="(ressource, key) in fakeData"
			:key="key"
		>
			<button @click="filterByResource(ressource, key)">{{ ressource }}</button>
		</div>
	</div>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
	setup() {
		const fakeData = [
			"Bois", "Fer", "Plastic"
		]

		const filterByResource = (resource, key) => {
			console.log(key, resource)
		}

		return {
			filterByResource,
			fakeData,
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

	border-radius: 15px;
	box-shadow: 0px 0px 5px black;
	padding: 15px 20px;
	overflow: hidden;
	gap: 1.5rem;

	div {
		width: 125px;
		height: 40px;
		display: flex;
		align-items: center;
		justify-content: center;
		background-color: gray;
		border-radius: 8px;

		&:hover {
			background-color: lightgray;
		}

		button {
			width: 100%;
			height: 100%;
			color: white;
			font-size: 14px;
			font-weight: 600;
		}
	}
}
</style>