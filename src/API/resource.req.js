import { http } from "./axios.config";

export const createOneResource = async (resourceName, imageUrl, baseValue) => {
	return await http.post('/resources', {
		name: resourceName,
		image_url: imageUrl,
		base_value: baseValue,
	});
};

export const getAllResources = async () => {
	return await http.get('/resources');
};

export const getOneResource = async (resourceId) => {
	return await http.get(`/resources/${resourceId}`);
};

export const getOneInventory = async () => {
	return await http.get('/inventory/my');
}