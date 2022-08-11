import {createRouter, createWebHistory} from 'vue-router';
import Widget from "../components/Widget.vue";

const routes = [
    {
        path: '/',
        component: Widget,
        name: 'home'
    },
];

export const router = createRouter({
    history: createWebHistory(),
    routes
});
