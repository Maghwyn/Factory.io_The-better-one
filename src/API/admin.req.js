import axios from 'axios';


const http = axios.create({
	baseURL: "https://apigame.co",
})


export function tryGetAllFactories() {
	return http.get('/factories')
}

export function tryGetAllFactoiesModel() {
	return http.get('/factories/models')
}

export function tryCreateFactoryModel() {
	return http.post("/factories/models")
}

export function tryCreateRessource(ressource) {
	return http.post("/resources", {name: ressource.name, image_url: ressource.image_url, base_value: ressource.base_value})
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


