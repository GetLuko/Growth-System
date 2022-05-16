import { useIO } from "@/composables/useIO";
import { NavigationGuardWithThis } from "vue-router";
const { importFromURL } = useIO();

export const importGuard: NavigationGuardWithThis<any> = (to, from, next) => {
  if (to.query.m) {
    importFromURL(window.location.href);
  }
  return next();
};
