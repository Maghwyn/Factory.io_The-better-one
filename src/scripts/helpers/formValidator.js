import { useForm } from 'vee-validate';
import { object, number } from 'yup';

export const createOfferValidator = () => {
	const validations = object().shape({
		resourceId: number()
			.required("Resource id is necessary"),
		quantity: number()
			.required("You need to specify a quantity"),
		unitPrice: number()
			.required("You need to specify the unit price")
	}).required();


	return useForm({
		validationSchema: validations,
	});
}