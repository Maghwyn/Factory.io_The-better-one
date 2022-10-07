import { createApp } from 'vue';
import { createPinia } from "pinia";
import { useAuthStore } from './stores/auth.store';
import App from './App.vue'
import route from "./router/index";
import i18nInstance from '@/i18n/i18n';
import "@/scss/config.scss"
import './assets/tailwind.css'
import "@/scss/selectMultislider.scss"

const pinia = createPinia();
const store = useAuthStore(pinia);

store.tryAutoLogin().then(data => {
	store.$state = data;
	bootVueApp();
})

function bootVueApp() {
	const app = createApp(App)
	app.use(route())
	app.use(pinia)
	app.use(i18nInstance)
	app.mount("#app");
}
