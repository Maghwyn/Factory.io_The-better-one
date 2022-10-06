<template>
	<div class="confirm-card">
		<div class="confirm-card-title">
			<h2>Do you wish to buy this product ?</h2>
		</div>
		<div class="confirm-card-choice">
			<div class="confirm-submit">
				<button class="cancel" @click="close">Cancel</button>
			</div>
			<div class="confirm-submit">
				<button class="buy" @click="buyOffer">Buy</button>
			</div>
		</div>
	</div>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
	emits: ["update:active"],
	props: {
		active: { type: Boolean, required: true }
	},
	setup(_props, { emit }) {
		
		const buyOffer = () => {
			emit("update:active", false);
		}

		const close = () => {
			emit("update:active", false);
		}

		return {
			buyOffer,
			close,
		}
	}
})
</script>

<style lang="scss">
.confirm-card {
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;
	gap: 3rem;
	width: 300px;

	&-title {
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: center;

		h2 {
			font-size: 18px;
		}
	}

	&-choice {
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 1rem;

		.confirm-submit {
			display: flex;
			align-items: center;
			justify-content: center;
			max-width: 300px;
			width: 100%;

			.cancel {
				padding: 7.5px 10px;
				// max-width: 300px !important;
				flex: 1 0;
				border-radius: 8px;
				width: 100%;
				background-color: white;
				border: .5px solid rgba(0, 0, 0, 0.3);
				color: black;
				font-size: 14px;
			}

			.buy {
				padding: 7.5px 10px;
				// max-width: 200px !important;
				flex: 1 0;
				border-radius: 8px;
				width: 100%;
				background-color: #165ed2;
				color: white;
				font-size: 14px;

			}
		}
	}
}
</style>