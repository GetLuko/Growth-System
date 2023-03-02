<script setup>
import { useDialogStore } from "~~/stores/useDialogStore";
import { storeToRefs } from "pinia";
import { useTabStore } from "~~/stores/useTabStore";

const dialogStore = useDialogStore();
const { showDialog } = storeToRefs(dialogStore);
const tabStore = useTabStore();

const link = ref("");
const action = () => {
  tabStore.importUrl(link.value);
  showDialog.value = false;
};
</script>
<template>
  <form @submit.prevent="action" id="form-dialog">
    <InputText
      class="w-full p-inputtext-lg"
      placeholder="https://growth-system.luko.eu?m=eyJFbmdpbmVlcmluZyI6eyJGcm9udGVuZCI6MCwiSGFyZHdhcmUiOjAsIk1vYmlsZSI6MCwiRGF0YUVuZ2luZWVyaW5nIjowLCJPcHMiOjAsIkJhY2tlbmQiOjAsIkZpcm13YXJlIjowLCJNYWNoaW5lTCI6MH0sIkV4ZWN1dGlvbiI6eyJEZWxpdmVyeSI6MCwiT3B0aW1pemF0aW9uIjowLCJDb21tdW5pY2F0aW9uIjowLCJRdWFsaXR5IjowfSwiU3VwcG9ydGluZyI6eyJHcm93aW5nVG9nZXRoZXIiOjAsIkFjY29tcGxpc2htZW50IjowLCJQZW9wbGVNaW5kZWQiOjAsIk9yZ0RldiI6MH0sIlN0cmVuZ3RoZW5pbmciOnsiTWVudG9yc2hpcCI6MCwiUmVjcnVpdG1lbnQiOjAsIkV2YW5nZWxpc20iOjAsIkNvbW11bml0eSI6MH19"
      v-model="link"
    />
  </form>
</template>
