import { defineStore } from "pinia";
type ToastOption = {
  severity?: "info" | "warn" | "success" | "error";
  summary?: string;
  detail?: string;
  life?: number;
};

export const useToastStore = defineStore("ToastStore", () => {
  const option = ref<ToastOption>({});
  const show = (op: ToastOption) => {
    option.value = op;
  };
  return {
    option,
    show,
  };
});
