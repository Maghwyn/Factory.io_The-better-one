import axios from "axios";

const http = axios.create({
	baseURL: "https://apigame.co",
	headers: {
		Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Imtldm51bWJlciIsInN1YiI6Miwicm9sZSI6MSwiaWF0IjoxNjY0OTg1NjMzLCJleHAiOjE2NjU1OTA0MzN9.bH4uhdla6bQt3AIjCrg9mD0hJFbKxEMILVygtmOlrVQ"
	}
})

export const setAuthorizationBearer = (jwt) => {
	http.defaults.headers.common["Authorization"] = `Bearer ${jwt}`;
}

export const tryLogin = async (username, password) => {
	return await http.post("/auth/login", { 
		username,
		password,
	})
}

export const trySignUp = async (username, password) => {
	return await http.post("/auth/signup", {
		username,
		password,
	})
}

export const getUserInfo = async () => {
	return await http.get('/auth/me');
}