<template>
	<div class="div-game">
		<div class="div-game-settings">
			<UserCard class="user_card_width" :user="user" />
			<LevelUpCard v-if="isLvlUp" />
		</div>
		<div class="div-game-dashboard">
			<FactoryList></FactoryList>
		</div>
	</div>
</template>

<style lang="scss">
.div-game {
	width: 100%;
	height: 100%;
	padding: 15px;
	display: flex;
	align-items: flex-start;
	justify-content: flex-start;
	flex-flow: row-reverse;
	gap: 1rem;
	background-color: #353941;

	&-settings {
		max-width: 330px;
		min-width: 330px;
		display: flex;
		flex-direction: column;
		height: 100%;
		gap: 1rem;
	}

	&-dashboard {
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		flex: 1 0;
		border-radius: 15px;
		gap: 1rem;

	}
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