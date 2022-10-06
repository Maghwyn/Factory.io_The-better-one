<template>
	<div class="view">
		<MainHeader></MainHeader>

		<router-view></router-view>

		<MainFooter></MainFooter>
	</div>
</template>

<script>
import { defineComponent } from "vue";
import MainHeader from "@/components/layouts/MainHeader.vue";
import MainFooter from "@/components/layouts/MainFooter.vue";

export default defineComponent({
	components: {
		MainHeader,
		MainFooter
	}
})
</script>