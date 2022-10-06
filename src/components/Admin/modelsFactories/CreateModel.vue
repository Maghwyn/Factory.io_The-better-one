<template>
	<div class="overlay">
		<div class='overlay-head'>
			<h3>Ajouter une ressource pour que les factories puissent y accéder</h3>
		</div>
		<form class='overlay-formModel'> 
			<div class="overlay-formModel-input">
				<label>resource_id: </label>
				<input
					id="resource_id"
					label="resource_id"
					placeholder="resource_id"
					fill="grow"
					type="number"
					v-model="formModel.resource_id"
					required="true"
				/>
			</div>
			<div class="overlay-formModel-input">
				<label>upgrade_base_value: </label>
				<input
					id="upgrade_base_value"
					label="upgrade_base_value"
					placeholder="upgrade_base_value"
					fill="grow"
					type="number"
					v-model="formModel.upgrade_base_value"
				/>
			</div>
			<div class="overlay-formModel-input">
				<label>upgrade_coef: </label>
				<input
					id="upgrade_coef"
					type="number" 
					name="upgrade_coef"
					label="upgrade_coef"
					placeholder="upgrade_coef"
					fill="grow"
					v-model="formModel.upgrade_coef"
				/>
			</div>
			<div class="overlay-formModel-input">
				<label>upgrade_resource_id: </label>
				<input
					id="upgrade_resource_id"
					type="number" 
					name="upgrade_resource_id"
					label="upgrade_resource_id"
					placeholder="upgrade_resource_id"
					fill="grow"
					v-model="formModel.upgrade_resource_id"
				/>
			</div>
			<div class="overlay-formModel-input">
				<label>generate_per_minute: </label>
				<input
					id="generate_per_minute"
					type="number" 
					name="generate_per_minute"
					label="generate_per_minute"
					placeholder="generate_per_minute"
					fill="grow"
					v-model="formModel.generate_per_minute"
				/>
			</div>
			<div class='overlay-formModel-box'>
				<div class='overlay-formModel-box-btns'>

					<button @click.prevent="submitHandler">Confirmer</button>
				</div>
			</div>
		</form>
	</div>
</template>

<script>
import { useAdminStore } from '@/stores/admin.store';
import { defineComponent, reactive } from 'vue';

export default defineComponent({
	emits: ['update:active'],
	setup(props, { emit }) {
		const adminStore = useAdminStore();
		const formModel = reactive({
			resource_id: 0,
            upgrade_base_value: 0,
            upgrade_coef: 0,
			upgrade_resource_id: 0,
			generate_per_minute: 0
		})
		

		const closeModal = () => {
			emit('update:active', false);
		}

		const submitHandler = () => {
			if (formModel.resource_id === 0 || formModel.upgrade_base_value === 0 || formModel.upgrade_coef === 0 || formModel.upgrade_resource_id === 0 || formModel.generate_per_minute === 0) {
				//TODO: put alert in formModel
				return
			} else {
				adminStore.createModel(formModel);
				document.body.style.removeProperty("overflow");
				emit('update:active', false);
			}
		}

		return {
			submitHandler,
			closeModal,
			formModel
		}
	}
})
</script>

<style lang='scss' scoped>
.overlay {
	display: flex;
	flex-direction: column;
	gap: 1rem;

	&-head {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;

		h3 {
			font-size: 1.5rem;
			color: rgb(0, 0, 0);
		}

		span {
			color: rgb(78, 93, 120);
			font-size: 0.875rem;
		}
	}

	&-formModel {
		display: flex;
		flex-direction: column;
		gap: 3rem;
		width: 100%;
		display: flex;
		position: relative;
		justify-content: center;
		flex-direction: column;

		&-input {
			display: flex;
			justify-content: center;
		}

		&-box {
			display: flex;
			flex-direction: column;

			&-btns {
				display: flex;
				flex-direction: row;
				justify-content: center;

				.btn-container {
					width: 45%;
				}
			}
		}
	}
}
</style>
