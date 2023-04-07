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
const deleteFolder = () => {
  tabData.value[activeTabIdx.value].folder = undefined;
  tabData.value[activeTabIdx.value].folderId = undefined;
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
      <i
        class="pi pi-times-circle hover:!text-terracotta-500"
        v-if="tabData[activeTabIdx].folder"
        @click="deleteFolder"
      />
    </span>
    <span class="px-2">/</span>
    <InputText v-model="tabData[activeTabIdx].name" :placeholder="tabData[activeTabIdx].name" class="p-inputtext-sm" />
    <span>.json</span>
  </form>
</template>
