import { createApp } from "vue";
import { router } from "./router";
import guards from "@/router/guards";
import multiguard from "vue-router-multiguard";
import App from "./App.vue";

const app = createApp(App);
router.beforeEach(multiguard(guards));

app.use(router);
app.mount("#app");

export { app };
