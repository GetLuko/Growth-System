import { useIO } from "@/composables/useIO";
import { NavigationGuardWithThis } from "vue-router";
const { importFromURL } = useIO();

export const importGuard: NavigationGuardWithThis<any> = (to, from, next) => {
  if (to.query.m) {
    importFromURL(window.location.href);
    delete to.query.m;
    return next({ query: to.query });
  }
  return next();
};
