<template>
	<div>
		<div>
			<!-- v-for above -->
			<span>
				{{ rss}}
			</span>
		</div>
	</div>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
	setup() {
		return {

		}
	},
	props: {
		rss: { type: Array, required: true }
	}
})
</script>

<style lang="scss">

</style>