import axios from "axios";

export const http = axios.create({
	baseURL: "https://apigame.co",
	//baseURL: " http://localhost:3000/"
})