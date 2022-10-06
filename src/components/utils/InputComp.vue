<template>
	<div :class="`form-field ${fill}`">
		<div v-if="label" class="form-field-label">
			<label :for="id">{{ label }}</label>
		</div>
		<div class="form-field-input">
			<input
				v-model="value"
				:id="id"
				:name="id"
				:type="passwordVisibility ? 'text' : type"
				:placeholder="placeholder"
				autocomplete="off"
				@beforeinput="$emit('beforeinput', $event, value)"
				@input="(e) => {
					if(mode === 'aggresive')
						return onAggressiveMode(value as string)
					if(mode === 'none')
						return $emit('input', e, value, id)
					
					return {};
				}"
			/>
		</div>
		<div v-if="errorMessage && showFieldError" class="form-field-error">
			<span>{{ errorMessage }}</span>
		</div>
	</div>
</template>

<script lang="ts">
// @ts-ignore // TODO
import { useField } from 'vee-validate';
import { defineComponent, computed, ref } from 'vue';

export default defineComponent({
	props: {
		mode:        { type: String, required: false, default: 'none' },
		id:          { type: String, required: true  },
		label:       { type: String, required: false },
		type:        { type: String, required: true },
		input:       { type: [String,Date], required: false },
		placeholder: { type: String, required: false },
		showFieldError: { type: Boolean, required: false, default: true },
		fill: {
			type: String,
			required: true,
			validator(value: string) {
				return ['single','double','double-no-gap','grow','fit'].includes(value);
			}
		},
		passwordVisibility: { type: Boolean, required: false, default: false },
		toggleVisibility: { type: Function, required: false, default: () => {} },
	},
	setup(props) {
		const { input, id } = props;
		
		const mode = computed(() => props.mode);
		const fieldData = ref(input);

		const { errorMessage, value, handleChange } = useField<string>(id, null, {
			validateOnValueUpdate: mode.value === "passive" ? false : true,
		});

		const onAggressiveMode = (value: string) => {
			if(value === "") value = undefined;
			handleChange(value, true);
		}

		if(fieldData.value !== undefined) {
			handleChange(fieldData.value, false)
		}

		return {
			onAggressiveMode,
			errorMessage,
			value,
		}
	}
})
</script>

<style lang="scss" scoped>
.form-field {
	display: flex;
	justify-content: center;
	flex-direction: column;

	&.single { width: 100%;}
	&.double {
		min-width: 50%;
		flex-grow: 1;
	}
	&.double-no-gap { width: 48%; }
	&.grow { flex-grow: 1;}
	&.fit { width: fit-content; }

	&-label label {
		font-size: 12px;
		font-weight: 600;
	}

	&-input {
		width: 100%;
		display: flex;
		position: relative;
		justify-content: center;
		flex-direction: column;

		input {
			width: 100%;
			height: 2.5rem;
			outline: none;
			border-radius: 6px;
			border: 1px solid rgb(201, 206, 214);
			transition: all 0.4s ease-in-out 0s;
			font-weight: 600;
			font-size: 14px;
			color: black;

			&::placeholder { color: rgb(167, 170, 176); }
			&:focus { border: 1px solid #626262; }

			&.pn { padding: 0 .75rem 0 .75rem; }
		}
	}

	&-error span {
		font-size: 12px;
		font-weight: 600;
		color: #ff584a;
	}
}
</style>
