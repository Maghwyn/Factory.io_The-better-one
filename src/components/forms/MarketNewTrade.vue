<template>
	<div class="create-trade">
		<form @submit.prevent="createTrade">
			<div class="create-trade-fields">

				<DropdownFilter id="resourceId" row="single" mode="single" :options="resName"
					:placeholder="`Resources`" verbose="no-verbose" tag_color="blue" caret_size="22px" :caret_up="false"
					dropdown_gap="medium" class="max-width" :style="'width: 100% !important'"/>

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
import { defineComponent, ref, computed } from "vue";
import { createOfferValidator } from "@/scripts/helpers/formValidator.js";
import { useMarketStore } from "@/stores/market.store";
import InputComp from "../utils/InputComp.vue";
import Swal from "sweetalert2";
import DropdownFilter from "../filter/DropdownFilter.vue";
import { useResourceStore } from "@/stores/resource.store";

export default defineComponent({
	emits: ["update:active"],
	components: {
		InputComp,
		DropdownFilter,
	},
	setup(_props, { emit }) {
		const marketStore = useMarketStore();
		const resourceStore = useResourceStore();
		const form = createOfferValidator();
		const mode = ref('passive');

		const resources = computed(() => resourceStore.displayUserRss.found);
		const resName = computed(() => resources.value.map((res) => res.name));

		const createTrade = async () => {
			const res = await form.validate();
			if(!res.valid) return mode.value = 'aggresive';
			const dto = form.values;

			const resource = resources.value.find(res => res.name === dto.resourceId);

			try {
				await marketStore.createTrade(resource.id, dto.quantity, dto.unitPrice);
			} catch(e) {
				console.log(e);
				Swal.fire({
					icon: 'error',
					title: e.response.data.message,
				})
			}
			emit("update:active", false);
		}

		return {
			createTrade,
			disabled: !form.meta.value.valid,
			mode,
			resName,
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
		max-width: 200px !important;
		width: 100%;
		flex: 1 0;

		button {
			width: 100%;
			height: 100%;
			padding: 7.5px 10px;
			border-radius: 8px;
			background-color: #165ed2;
			color: white;
			font-size: 14px;
		}
	}
}
</style>