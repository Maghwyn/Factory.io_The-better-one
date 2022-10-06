import { http } from "./axios.config";

export function tryGetAllFactories() {
	return http.get('/factories')
}



export function tryCreateRessource(ressource) {
	return http.post("/resources", {
		name: ressource.name,
		image_url: ressource.image_url,
		base_value: ressource.base_value
	})
}

export function tryGetAllRessources() {
	return http.get("/resources")
}

export function tryGetRessourceById(id) {
	return http.get(`/resources/${id}`)
}

export function trylogin(user) {
	return http.post('/login', {username: user.userName, password: user.password})
}

export function trySignup(user) {
	return http.post('/login', {username: user.userName, password: user.password})
}

export function tryGetAllUsers() {
	return http.get('users/admin/users')
}

export function tryGetAllModels() {
	return http.get('/factories/models')
}

export function tryRemoveModel(id) {
	return http.delete(`/factories/models/${id}`)
}

export function tryCreateModel(model) {
	return http.post("/factories/models", {resource_id: model.resource_id, upgrade_base_value: model.upgrade_base_value, upgrade_coef: model.upgrade_coef, upgrade_resource_id: model.upgrade_resource_id, generate_per_minute: model.generate_per_minute })
}

export function tryUpdateModel(model) {
	return http.put("/factories/models", {resource_id: model.resource_id, upgrade_base_value: model.upgrade_base_value, upgrade_coef: model.upgrade_coef, upgrade_resource_id: model.upgrade_resource_id, generate_per_minute: model.generate_per_minute })
}

