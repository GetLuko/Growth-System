<script setup>
import { useDialogStore } from "~~/stores/useDialogStore";
import { storeToRefs } from "pinia";
import { useTabStore } from "~~/stores/useTabStore";
import { useGoogleStore } from "~~/stores/useGoogleStore";

const dialogStore = useDialogStore();
const googleStore = useGoogleStore();
const { showDialog } = storeToRefs(dialogStore);
const tabStore = useTabStore();
const { activeTabIdx, tabData } = storeToRefs(tabStore);

const action = async () => {
  await googleStore.save(activeTabIdx.value);
  showDialog.value = false;
};
const openFolderPicker = async () => {
  await googleStore.launchFolderPicker();
};
</script>
<template>
  <form @submit.prevent="action" id="form-dialog">
    <span class="p-input-icon-left p-input-icon-right cursor-pointer">
      <i class="pi pi-folder" @click="openFolderPicker" />
      <InputText
        :value="tabData[activeTabIdx].folder || 'root'"
        readonly
        class="cursor-pointer p-inputtext-sm"
        @click="openFolderPicker"
      />
      <i class="pi pi-times-circle" v-if="tabData[activeTabIdx].folder" @click="tabData[activeTabIdx].folder = ''" />
    </span>
    <span class="px-2">/</span>
    <InputText v-model="tabData[activeTabIdx].name" :placeholder="tabData[activeTabIdx].name" class="p-inputtext-sm" />
    <span>.json</span>
  </form>
</template>
