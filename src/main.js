import { createApp } from 'vue'
import { createPinia } from "pinia";
import App from './App.vue'
import route from "./router/index";
import "@/scss/config.scss"
import './assets/tailwind.css'

const app = createApp(App);
app.use(route());
app.use(createPinia());
app.mount("#app");
