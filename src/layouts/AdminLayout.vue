<template>
	<div class="view">
		<MainHeader></MainHeader>

		<router-view></router-view>

		<AdminFooter></AdminFooter>
	</div>
</template>

<script>
import { defineComponent } from "vue";
import AdminFooter from "@/components/layouts/AdminFooter.vue";
import MainHeader from '@/components/layouts/MainHeader.vue';

export default defineComponent({
	components: {
    AdminFooter,
    MainHeader
}
})
</script>
