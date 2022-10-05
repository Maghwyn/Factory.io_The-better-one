import axios from 'axios';


const http = axios.create({
	baseURL: "https://apigame.co",
	headers: {
		Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Imtldm51bWJlciIsInN1YiI6Miwicm9sZSI6MSwiaWF0IjoxNjY0OTg1NjMzLCJleHAiOjE2NjU1OTA0MzN9.bH4uhdla6bQt3AIjCrg9mD0hJFbKxEMILVygtmOlrVQ"
	}
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


