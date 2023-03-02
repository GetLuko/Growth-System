<script setup>
import { storeToRefs } from "pinia";
import { useGoogleStore } from "~~/stores/useGoogleStore";
import { useTabStore } from "~~/stores/useTabStore";

const tabStore = useTabStore();
const googleStore = useGoogleStore();
const { activeTabIdx } = storeToRefs(tabStore);
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
      googleStore.save(activeTabIdx.value);
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
