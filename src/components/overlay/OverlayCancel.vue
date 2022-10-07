<template>
	<div class="cancel-card">
		<div class="cancel-card-title">
			<h2>Do you wish to proceed ?</h2>
		</div>
		<div class="cancel-card-choice">
			<div class="cancel-submit">
				<button class="cancel" @click="close">Cancel</button>
			</div>
			<div class="cancel-submit">
				<button class="delete" @click="cancelOffer">Yes</button>
			</div>
		</div>
	</div>
</template>

<script>
import { useMarketStore } from "@/stores/market.store";
import { defineComponent, ref } from "vue";
import Swal from "sweetalert2";

export default defineComponent({
	emits: ["update:active"],
	props: {
		active: { type: Boolean, required: true },
		tradeId: { type: String, required: false },
	},
	setup(props, { emit }) {
		const tradeId = ref(props.tradeId);
		const marketStore = useMarketStore();
		
		const cancelOffer = async () => {
			try {
				await marketStore.deleteUserTrade(tradeId.value);
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
			cancelOffer,
			close,
		}
	}
})
</script>

<style lang="scss">
.cancel-card {
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

		.cancel-submit {
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

			.delete {
				padding: 7.5px 10px;
				// max-width: 200px !important;
				flex: 1 0;
				border-radius: 8px;
				width: 100%;
				background-color: #f03d3d;
				color: white;
				font-size: 14px;

			}
		}
	}
}

</style>