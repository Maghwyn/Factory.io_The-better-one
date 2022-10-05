import { createRouter, createWebHistory } from "vue-router";
import routes from '@/router/router'

export default function route() {
    const Router = createRouter({
        history: createWebHistory(),
        routes,
    });

    return Router
}