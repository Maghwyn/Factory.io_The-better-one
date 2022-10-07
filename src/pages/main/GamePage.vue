<template>
	<div class="div-game">
		<FactoryList></FactoryList>
		<div class="user_card">
			<UserCard class="user_card_width" :user="user" />
			<LevelUpCard v-if="isLvlUp" />
		</div>

	</div>
</template>

<style>
.div-game {
	display: flex;
	background-color: #353941;
	width: 100%;
	height: 100%;
	padding: 15px;
}

.user_card {
	margin-left: 5%;
	width: 25%;
	display: flex;
	flex-direction: column;
}

.user_card_width {
	width: 100%;

}
</style>

<script>
import { defineComponent, computed, watch, ref } from "vue";
import UserCard from "@/components/cards/UserCard.vue";
import FactoryList from '../../components/FactoryList.vue'
import { useGameStore } from "@/stores/game.store";
import { useUserStore } from "@/stores/user.store";
import LevelUpCard from "@/components/cards/LevelUpCard.vue";

export default defineComponent({
	setup() {

		const gameStore = useGameStore();
		const factory = computed(() => gameStore.actualFactory);
		const userStore = useUserStore();
		userStore.getMyInventory();
		const user = computed(() => userStore.user);
		const isLvlUp = ref(false);


		watch(factory, val => {
			if (val[0] !== undefined) {
				isLvlUp.value = true
			}
		}, { deep: true })

		return {
			getFactoryModal,
			user,
			isLvlUp,

		}

	},
	components: {
		UserCard,
		FactoryList,
		LevelUpCard
	}
})
</script>