import { createApp } from "vue";
import { router } from "./router";
import guards from "@/router/guards";
import multiguard from "vue-router-multiguard";
import App from "./App.vue";
import PrimeVue from "primevue/config";
import Button from "primevue/button";

import "minireset.css/minireset.min.css";
import "@/assets/my-primevue.css";
import "primevue/resources/primevue.min.css";
import "primeicons/primeicons.css";

const app = createApp(App);
router.beforeEach(multiguard(guards));

app.use(PrimeVue);
app.component("Button", Button);
app.use(router);
app.mount("#app");

export { app };
