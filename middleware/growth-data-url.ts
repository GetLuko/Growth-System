import { useTabStore } from "~~/stores/useTabStore";
import { storeToRefs } from "pinia";

const tabStore = useTabStore();
const { tabData } = storeToRefs(tabStore);

export default defineNuxtRouteMiddleware((to, from) => {
  if (to.query.m) {
    tabData.value = [];
    tabStore.importUrl(window.location.href);

    delete to.query.m;
    return navigateTo({ ...to, query: to.query });
  }
  return;
});
