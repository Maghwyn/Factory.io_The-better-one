<template>
	<div>
		<button class="number" @click="$emit('changePage', page)">{{ page }}</button>
	</div>
</template>

<script>

	export default {
		props: {
			page: { type: Number} 
		},
		emit: ["changePage"],
	}
</script>

<style lang="scss" scoped>
	.number {
		font-weight: bold;
	}
</style>