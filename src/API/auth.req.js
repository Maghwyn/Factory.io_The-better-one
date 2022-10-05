import axios from "axios";

const http = axios.create({
	baseURL: "http://apigame.co",
	headers: {
        "Content-Type": "application/json"
    }
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