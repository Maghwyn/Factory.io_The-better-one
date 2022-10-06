<template>
	<div class="user-card">
		<CardProfile></CardProfile>
		<div class="user-card-separator">
			<span>Ressources</span>
		</div>
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
	width: fit-content;
	display: flex;
	flex-direction: column;
	align-items: center;
	border-radius: 15px;
	box-shadow: 0px 0px 5px black;
	padding: 15px 40px;
	overflow: hidden;
	gap: 1.5rem;

	&-separator {
		height: 1px;
		width: 100%;
		border: .5px solid black;
		position: relative;
		display: flex;
		align-items: center;
		justify-content: center;

		span {
			position: absolute;
			background-color: white;
			padding: 10px;
		}
	}
}
</style>