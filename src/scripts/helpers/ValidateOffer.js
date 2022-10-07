import { useForm } from 'vee-validate';
import { object, string } from 'yup';

export const createFactoriesSelector = () => {
    const validations = object().shape({
        factories: string()
    }).required();

    return useForm({
        validationSchema: validations,
    });
}