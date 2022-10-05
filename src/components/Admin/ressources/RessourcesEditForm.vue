<template>
	<div class="overlay">
		<div class='overlay-head'>
			<h3>Ajouter une ressource pour que les factories puissent y accéder</h3>
		</div>
		<form class='overlay-form'>
			<div class="overlay-form-input">
				<input
					id="name"
					label="name of ressources"
					placeholder="name of ressources"
					fill="grow"
					type="text"
					v-model="form.name"
					required="true"
				/>
			</div>
			<div class="overlay-form-input">
				<input
					id="picture"
					label="picture of the ressource"
					placeholder="picture of the ressource"
					fill="grow"
					type="text"
					v-model="form.image_url"
				/>
			</div>
			<div class="overlay-form-input">
				<input
					id="base_value"
					type="number" 
					name="base_value"
					label="base_value of ressources"
					placeholder="base_value of ressources"
					fill="grow"
					v-model="form.base_value"
				/>
			</div>
			<div class='overlay-form-box'>
				<div class='overlay-form-box-btns'>

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
		const form = reactive({
			name: '',
            image_url: "",
            base_value: 0,
		})
		

		const closeModal = () => {
			emit('update:active', false);
		}

		const submitHandler = () => {
			if (form.name === "" || form.image_url === "" || form.base_value === 0) {
				//TODO: put alert in form
				return
			} else {
				adminStore.createRessource(form);
				document.body.style.removeProperty("overflow");
				emit('update:active', false);
			}
		}

		return {
			submitHandler,
			closeModal,
			form
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

	&-form {
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
