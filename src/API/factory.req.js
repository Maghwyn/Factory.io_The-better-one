import { http } from "./axios.config";

export const createOneFactory = async (factoryModelId) => {
	return await http.post('/factories', {
		factory_model: factoryModelId,
	})
};

export const getAllFactories = async () => {
	return await http.get('/factories');
};

export const getOneFactory = async (factoryId) => {
	return await http.get(`/factories/${factoryId}`);
};

export const deleteOneFactory = async (factoryId) => {
	return await http.delete(`/factories/${factoryId}`);
};

export const levelUpOneFactory = async (factoryId) => {
	return await http.post(`/factories/${factoryId}/levelup`);
};

export const getAllModels = async () => {
	return await http.get('/factories/models');
};