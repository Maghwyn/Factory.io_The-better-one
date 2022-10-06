<template>
	<div class="div-game">
		<FactoryList></FactoryList>
		<div class="user_card">
			<UserCard class="user_card_width" :user="user" :rss="rss" />
			<LevelUpCard :v-if="isLvlUp" />
		</div>

	</div>
</template>

<style>
.div-game {
	display: flex;
}


.user_card {
	margin-left: 5%;
	width: 25%;
}

.user_card_width {
	width: 100%;
}
</style>

<script>
import { useUserStore } from "@/stores/user.store";
import { defineComponent, computed, watch, ref } from "vue";
import UserCard from "@/components/cards/UserCard.vue";
import FactoryList from '../../components/FactoryList.vue'
import { useGameStore } from "@/stores/game.store";
import LevelUpCard from "@/components/cards/LevelUpCard.vue";

export default defineComponent({
	setup() {

		const userStore = useUserStore();
		const gameStore = useGameStore();
		const factory = computed(() => gameStore.actualFactory);
		userStore.getMyInventory();
		const user = computed(() => userStore.user);
		const rss = computed(() => userStore.inventory.resources);
		const isLvlUp = ref(false);

		watch(factory, val => {
			console.log(val[0])
			if (val[0] !== undefined) {
				isLvlUp.value = true
				console.log(isLvlUp.value);
			}
		}, { deep: true })
		const getFactoryModal = (event) => {
			console.log(event.target.id)
		}
		return {
			user,
			rss,
			getFactoryModal,
			isLvlUp
		}
	},
	components: {
		UserCard,
		FactoryList,
		LevelUpCard
	}
})
</script>