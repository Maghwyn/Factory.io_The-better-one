import { http } from "./axios.config";

export const createOneTrade = async (resourceId, quantity, unitPrice) => {
	return await http.post('/trades', { 
		resource_id: resourceId,
		quantity,
		unitPrice,
	});
};

export const getMyTrade = async () => {
	return await http.get('/trades/my');
};

export const getOneTrade = async (tradeId) => {
	return await http.get(`/trades/${tradeId}`);
};

export const getAllTrades = async () => {
	return await http.get('/trades/all');
};

export const deleteOneTrade = async (tradeId) => {
	return await http.delete(`/trades/${tradeId}`);
};
