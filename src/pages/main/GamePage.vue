<template>
	<div>
		<UserCard :user="user" :rss="rss" />
	</div>
</template>

<script>
import { useUserStore } from "@/stores/user.store";
import { defineComponent, computed } from "vue";
import UserCard from "@/components/cards/UserCard.vue";

export default defineComponent({
	setup() {
		const userStore = useUserStore();
		userStore.getMyInventory()
		const user = computed(() => userStore.user);
		const rss = computed(() => userStore.inventory);
		console.log(rss)
		return {
			user,
			rss
		}
	},
	components: {
		UserCard,
	}
})
</script>

<style>

</style>