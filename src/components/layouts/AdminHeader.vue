<template>
	<header>
		<div class="header-logo">
			LOGO
		</div>
	</header>
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
header {
	width: 100%;
	height: 70px;
	display: flex;
	justify-content: space-between;
	padding: 0 50px;
	background-color: #282c34;

	.header-logo {
		width: 200px;
		display: flex;
		align-items: center;
		color: white;
	}
}
</style>