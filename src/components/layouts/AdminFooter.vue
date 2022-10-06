<template>
	<footer>
		<span>
			All rights reserved - Factory.io - 2022
		</span>
	</footer>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
	setup() {
		return {

		}
	}
})
</script>

<style lang="scss">
footer {
	width: 100%;
	height: 40px;
	display: flex;
	align-items: center;
	justify-content: center;
	padding: 0 50px;
	background-color: #282c34;

	span {
		color: white;
		font-size: 13px;
	}
}
</style>