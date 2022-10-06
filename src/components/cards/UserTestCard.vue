<template>
	<div class="user-card">
		<CardProfile></CardProfile>
		<div class="user-card-separator"></div>/
		<CardResource></CardResource>
	</div>
</template>

<script>
import CardProfile from "@/components/cards/CardProfile.vue"
import CardResource from "@/components/cards/CardResource.vue"
import { defineComponent } from "vue";

export default defineComponent({
	components: {
		CardProfile,
		CardResource,
	}
})
</script>

<style lang="scss">
.user-card {

	&-separator {
		
	}
}
</style>