import { createApp } from 'vue'
import { createPinia } from "pinia";
import App from './App.vue'
import route from "./router/index";
import i18nInstance from '@/i18n/i18n';
import "@/scss/config.scss"
import './assets/tailwind.css'

const app = createApp(App);
app.use(route());
app.use(createPinia());
app.use(i18nInstance)
app.mount("#app");
