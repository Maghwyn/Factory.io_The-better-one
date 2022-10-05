import { http } from "./axios.config";

export const createOneFactory = async (factoryData) => {
	console.log(factoryData);
	return await http.post('/factories', {

	})
};

export const getAllFactories = async () => {
	return await http.get('/factories');
};

export const getOneFactory = async (id) => {
	console.log(id);
	return await http.get(`/factories/${id}`);
};

export const deleteOneFactory = async (id) => {
	console.log(id);
	return await http.delete(`/factories/${id}`);
};

export const levelUpOneFactory = async (id) => {
	console.log(id);
	return await http.post(`/factories/${id}/levelup`);
};