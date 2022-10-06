<template>
	<div>
		<div>
			<img src="" alt="" />
		</div>
		<div>
			<div>
				<span>
					{{ user }}
				</span>
			</div>
			<div>
				<span></span>
				<span></span>
			</div>
		</div>
	</div>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
	setup() {

	},
	props: {
		user: { type: Object, required: true }
	}
})
</script>

<style lang="scss">

</style>