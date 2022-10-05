import { http } from "./axios.config";

export const createOneResource = async (resourceData) => {
	console.log(resourceData);
	return await http.post('/resources', {

	});
};

export const getAllResources = async () => {
	return await http.get('/resources');
};

export const getOneResource = async (id) => {
	console.log(id);
	return await http.get(`/resources/${id}`);
};

export const getOneInventory = async () => {
	return await http.get('/inventory/my');
}