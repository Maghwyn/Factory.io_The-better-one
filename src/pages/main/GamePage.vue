<template>
	<div class="div-game">
		<FactoryList class="facto_list"></FactoryList>
		<UserCard class="user_card" :user="user" :rss="rss" />
	</div>
</template>

<style>
.div-game {
	display: flex;
}

.facto_list {}

.user_card {
	margin-left: 5%;
}
</style>

<script>
import { useUserStore } from "@/stores/user.store";
import { defineComponent, computed } from "vue";
import UserCard from "@/components/cards/UserCard.vue";
import FactoryList from '../../components/FactoryList.vue'

export default defineComponent({
	setup() {
		const userStore = useUserStore();
		userStore.getMyInventory()
		const user = computed(() => userStore.user);
		const rss = computed(() => userStore.inventory.resources).value;
		return {
			user,
			rss
		}
	},
	components: {
		UserCard,
		FactoryList,
	}
})
</script>