import { createRouter, createWebHistory } from "vue-router";
import Home from "@/pages/Home.vue";
import Docs from "@/pages/Docs.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", component: Home },
    { path: "/Docs", component: Docs },
  ],
});

export { router };
