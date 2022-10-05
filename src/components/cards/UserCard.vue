<template>
	<div>{{ userData }}</div>
</template>

<script>
import { defineComponent, computed } from "vue";

export default defineComponent({
	props: {
		user: { 
			type: Object,
			required: false,
			default: () => {},
		}
	},
	setup(props) {
		const userData = computed(() => props.user);

		return {
			userData,
		}
	}
})
</script>

<style>

</style>