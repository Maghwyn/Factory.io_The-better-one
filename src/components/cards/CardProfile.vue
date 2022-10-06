<template>
	<div class="user-profile">
		<div class="user-profile-img">
			<img src="https://d.wattpad.com/story_parts/737845095/images/15a2c96351dcd0a5170250432904.jpg"
				alt="user_img" />
		</div>
		<div class="user-profile-info">
			<div>
				<span class="username">
					{{ user.username }}
				</span>
			</div>
			<div>
				<span class="coin">Income : {{ user.income }}</span>
				<span class="coin">money : {{ inventory.money }}</span>
				<span class="factory">Factories : {{ user.factories.length }}</span>
			</div>
		</div>
	</div>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
	props: {
		user: {
			type: Object,
			required: false,
			default: () => { },
		},
		inventory: {
			type: Object,
			required: false,
			default: () => { },
		}
	}
})
</script>

<style lang="scss" scoped>
.user-profile {
	width: 100%;
	height: 100px;
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