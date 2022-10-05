<template>
	<div>
		<UserCard :user="user" />
	</div>
</template>

<script>
import { useUserStore } from "@/stores/user.store";
import { defineComponent, computed } from "vue";
import UserCard from "@/components/cards/UserCard.vue";

export default defineComponent({
	setup() {
		const userStore = useUserStore();
		const user = computed(() => userStore.user);

		return {
			user,
		}
	},
	components: {
		UserCard,
	}
})
</script>

<style>
	
</style>