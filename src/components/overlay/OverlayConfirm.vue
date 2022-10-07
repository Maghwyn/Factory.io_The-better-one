<template>
	<div class="confirm-card">
		<div class="confirm-card-title">
			<h2>Do you wish to buy this product ?</h2>
		</div>
		<div class="confirm-card-qtt">
			<InputComp
				:mode="mode"
				id="quantity"
				fill="single"
				type="text"
				label="Quantity"
				placeholder="Specify the quantity"
				:showFieldError="true"
			>
			</InputComp>
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
import { useMarketStore } from "@/stores/market.store";
import InputComp from "../utils/InputComp.vue";
import { defineComponent, ref } from "vue";
import { buyOfferValidator } from "@/scripts/helpers/formValidator.js";
import Swal from "sweetalert2";

export default defineComponent({
	emits: ["update:active"],
	components: {
		InputComp,
	},
	props: {
		active: { type: Boolean, required: true },
		tradeId: { type: String, required: false },
	},
	setup(props, { emit }) {
		const tradeId = ref(props.tradeId);
		const marketStore = useMarketStore();
		const mode = ref("passive");

		const form = buyOfferValidator();
		
		const buyOffer = async () => {
			const res = await form.validate();
			if(!res.valid) return mode.value = "aggresive";
			const { quantity } = form.values;

			try {
				await marketStore.buyOfferTrade(tradeId.value, quantity)
			} catch(e) {
				Swal.fire({
					icon: 'error',
					title: e.response.data.message,
				})
			}
			emit("update:active", false);
		}

		const close = () => {
			emit("update:active", false);
		}

		return {
			buyOffer,
			close,
			mode,
			form,
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
	gap: 2rem;
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

	&-qtt {
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
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