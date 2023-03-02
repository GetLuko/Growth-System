<script setup>
import { useDialogStore } from "~~/stores/useDialogStore";
import { storeToRefs } from "pinia";
import { useTabStore } from "~~/stores/useTabStore";

const dialogStore = useDialogStore();
const { showDialog } = storeToRefs(dialogStore);
const tabStore = useTabStore();

const jsonStr = ref("");
const action = () => {
  tabStore.importJson(jsonStr.value);
  showDialog.value = false;
};
</script>
<template>
  <form @submit.prevent="action" id="form-dialog">
    <Textarea v-model="jsonStr" class="w-full h-[300px]" />
  </form>
</template>
