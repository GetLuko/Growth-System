<script setup>
import { storeToRefs } from "pinia";
import { useGoogleStore } from "~~/stores/useGoogleStore";
import { useTabStore } from "~~/stores/useTabStore";
import { useDialogStore } from "~~/stores/useDialogStore";

const tabStore = useTabStore();
const googleStore = useGoogleStore();
const dialogStore = useDialogStore();
const { activeTabIdx } = storeToRefs(tabStore);
const { showDialog, dialogHeader, dialogContent, dialogCta } = storeToRefs(dialogStore);

const items = [
  {
    label: "JSON Export",
    icon: "pi pi-code",
    command: () => {
      tabStore.exportJson(activeTabIdx.value);
    },
  },
  {
    label: "Google Drive",
    icon: "pi pi-google",
    command: () => {
      dialogHeader.value = "Save into Google Drive";
      dialogContent.value = "DialogGoogleExport";
      dialogCta.value = "Save";
      showDialog.value = true;
    },
  },
  {
    label: "Url Export",
    icon: "pi pi-link",
    command: () => {
      tabStore.exportUrl(activeTabIdx.value);
    },
  },
];
</script>
<template>
  <SpeedDial
    :model="items"
    :radius="80"
    direction="up-right"
    type="quarter-circle"
    show-icon="pi pi-upload"
    hide-icon="pi pi-upload"
    :tooltip-options="{ position: 'right' }"
  />
</template>
