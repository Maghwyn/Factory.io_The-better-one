import { http } from "./axios.config";

export const createOneTrade = async (resourceId, quantity, unitPrice) => {
	return await http.post('/trades', { 
		resourceId: resourceId,
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

export const buyFactoryLimit = async (tradeId, quantity) => {
	return await http.post('/users/buy-factory-limit', {
		id: tradeId,
		quantity,
	});
};

export const buyOneTrade = async (tradeId, quantity) => {
	return await http.post('/trades/buy', {
		id: tradeId,
		quantity,
	})
}