<template>
	<div class="view">
		<AdminHeader></AdminHeader>

		<router-view></router-view>

		<AdminFooter></AdminFooter>
	</div>
</template>

<script>
import { defineComponent } from "vue";
import AdminHeader from "@/components/layouts/AdminHeader.vue";
import AdminFooter from "@/components/layouts/AdminFooter.vue";

export default defineComponent({
	components: {
		AdminHeader,
		AdminFooter,
	}
})
</script>
