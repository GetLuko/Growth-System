import { createApp } from "vue";
import { router } from "./router";
import guards from "@/router/guards";
import multiguard from "vue-router-multiguard";
import App from "./App.vue";
import PrimeVue from "primevue/config";
import Button from "primevue/button";
import Menubar from "primevue/menubar";
import Toast from "primevue/toast";
import ToastService from "primevue/toastservice";

import "minireset.css/minireset.min.css";
import "@/assets/my-primevue.css";
import "@/assets/fonts.scss";
import "primevue/resources/primevue.min.css";
import "primeicons/primeicons.css";

const app = createApp(App);
router.beforeEach(multiguard(guards));

app.use(PrimeVue);
app.use(ToastService);
app.component("Button", Button);
app.component("Menubar", Menubar);
app.component("Toast", Toast);
app.use(router);
app.mount("#app");

export { app };
