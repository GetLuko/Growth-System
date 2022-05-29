import { useDark } from "@vueuse/core";
import { ref } from "vue";

const isDark = useDark();

export const storeTheme = () => {
  return {
    isDark,
  };
};
