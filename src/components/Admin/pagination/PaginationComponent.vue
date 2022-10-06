<template>
	<div>
		<button @click="$emit('changePage', page)">{{ page }}</button>
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