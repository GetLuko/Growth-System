import { createRouter, createWebHistory } from "vue-router";
import Home from "@/pages/Home.vue";
import AboutSystem from "@/pages/AboutSystem.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", component: Home },
    { path: "/AboutSystem", component: AboutSystem },
  ],
});

export { router };
