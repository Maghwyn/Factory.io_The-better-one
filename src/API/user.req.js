import { http } from "./axios.config";

export const buyFactoryLimit = async () => {
	return await http.post('/users/buy-factory-limit', {});
};


export const checkPriceFactoryLimit = async () => {
	return await http.get('/users/factory-limit', {});
};

