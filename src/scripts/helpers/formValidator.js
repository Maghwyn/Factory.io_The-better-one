import { useForm } from 'vee-validate';
import { object, number, string } from 'yup';

export const createOfferValidator = () => {
	const validations = object().shape({
		resourceId: string()
			.required("Resource name is necessary"),
		quantity: number()
			.required("You need to specify a quantity"),
		unitPrice: number()
			.required("You need to specify the unit price")
	}).required();


	return useForm({
		validationSchema: validations,
	});
}

export const buyOfferValidator = () => {
	const validations = object().shape({
		quantity: number()
			.required("You need to specify a quantity"),
	}).required();


	return useForm({
		validationSchema: validations,
	});
}