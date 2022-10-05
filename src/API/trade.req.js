import { http } from "./axios.config";

export const createOneTrade = async (tradeData) => {
	console.log(tradeData);
	return await http.post('/trades', { 

	});
};

export const getMyTrade = async () => {
	return await http.get('/trades/my');
};

export const getOneTrade = async (id) => {
	console.log(id);
	return await http.get(`/trades/${id}`);
};

export const getAllTrades = async () => {
	return await http.get('/trades/all');
};

export const deleteOneTrade = async (id) => {
	console.log(id);
	return await http.delete(`/trades/${id}`);
};

export const buyFactoryLimit = async () => {
	return await http.post('/users/buy-factory-limit', {

	});
};