import axios from "axios";

const http = axios.create({
	baseURL: "https://apigame.co",
})

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