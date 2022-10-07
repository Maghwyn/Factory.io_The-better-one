<template>
	<div class="user-profile">
		<div class="user-profile-img">
			<img src="@/assets/factory.webp" alt="user_img" />
		</div>
		<div class="user-profile-info">
			<div>
				<span class="username">
					{{ user.username }}
				</span>
			</div>
			<div>
				<span class="coin">Income : {{ user.income }}</span>
				<span class="coin">Money : {{ inventory.money }}</span>
				<span class="factory">Factories : {{ user.factories.length }}</span>
				<span class="factory">Factory limit : {{ priceFactoryLimit.factory_limit }}</span>
			</div>
		</div>
	</div>
</template>

<script>
import { defineComponent, computed, watch } from "vue";
import { useUserStore } from "@/stores/user.store";

export default defineComponent({
	setup() {
		const userStore = useUserStore();
		const inventory = computed(() => userStore.inventory);
		const user = computed(() => userStore.user);
		const priceFactoryLimit = computed(() => userStore.nextFactoryPrice);

		watch(priceFactoryLimit, val => {
			console.log(val)
		})

		return {
			priceFactoryLimit,
			inventory,
			user,
		}
	}
})
</script>

<style lang="scss" scoped>
.user-profile {
	width: 100%;
	height: 110px;
	display: flex;
	gap: 2rem;

	&-img {
		// width: 150px;
		display: flex;
		align-items: center;
		justify-content: center;

		img {
			width: 75px;
			height: 75px;
			border-radius: 50%;
			background-color: gray;
		}
	}

	&-info {
		width: fit-content;
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: flex-start;
		flex-direction: column;
		gap: .5rem;

		div {
			width: 100%;
			display: flex;
			flex-direction: column;
			align-items: flex-start;

			span {
				color: black;

				&.username {
					font-size: 16px;
					font-weight: 600;
				}

				&.coin {
					font-size: 14px;
					font-weight: 400;
					margin-left: 20px;
				}

				&.factory {
					font-size: 14px;
					font-weight: 400;
					margin-left: 20px;
				}
			}
		}
	}
}
</style>