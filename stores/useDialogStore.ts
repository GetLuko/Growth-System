import { defineStore } from "pinia";

export const useDialogStore = defineStore("DialogStore", () => {
  const showDialog = ref(false);
  const dialogHeader = ref("");
  const dialogContent = ref("");
  const dialogCta = ref("");

  return {
    showDialog,
    dialogHeader,
    dialogContent,
    dialogCta,
  };
});
