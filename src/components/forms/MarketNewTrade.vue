<template>
	<div class="create-trade">
		<form @submit.prevent="createTrade">
			<div class="create-trade-fields">
				<InputComp 
					:mode="mode"
					id="resourceId"
					fill="single"
					type="text"
					label="Resource id"
					placeholder="Specify the resource id"
					:showFieldError="true"
				></InputComp>
				<InputComp 
					:mode="mode"
					id="quantity"
					fill="single"
					type="text"
					label="Quantity"
					placeholder="Specify the quantity"
					:showFieldError="true"
				></InputComp>
				<InputComp 
					:mode="mode"
					id="unitPrice"
					fill="single"
					type="text"
					label="Unit price"
					placeholder="Specify the unit price"
					:showFieldError="true"
				></InputComp>
			</div>
			<div class="create-trade-submit">
				<button>Confirmer</button>
			</div>
		</form>
	</div>
</template>

<script>
import { defineComponent, ref } from "vue";
import { createOfferValidator } from "@/scripts/helpers/formValidator.js";
import InputComp from "../utils/InputComp.vue";

export default defineComponent({
	emits: ["update:active"],
	components: {
		InputComp,
	},
	setup(_props, { emit }) {
		const form = createOfferValidator();
		const mode = ref('passive');

		const createTrade = async () => {
			const res = await form.validate();
			if(!res.valid) return mode.value = 'aggresive';

			emit("update:active", false);
		}

		return {
			createTrade,
			disabled: !form.meta.value.valid,
			mode,
		}
	}
})
</script>

<style lang="scss" scoped>
.create-trade {
	width: 400px;
	display: flex;
	align-items: center;
	justify-content: center;
	flex: 1 0 auto;

	form {
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
		gap: 2rem;
	}

	&-fields {
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
		gap: 1rem;
	}

	&-submit {
		padding: 7.5px 10px;
		max-width: 200px !important;
		flex: 1 0;
		border-radius: 8px;
		width: 100%;
		background-color: #165ed2;
		color: white;
		font-size: 14px;
	}
}
</style>