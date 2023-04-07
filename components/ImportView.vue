<script setup lang="ts">
import { useTabStore } from "~~/stores/useTabStore";
import { useDialogStore } from "~~/stores/useDialogStore";
import { useGoogleStore } from "~~/stores/useGoogleStore";
import { storeToRefs } from "pinia";

const tagStore = useTabStore();
const dialogStore = useDialogStore();
const googleStore = useGoogleStore();
const { showDialog, dialogHeader, dialogContent, dialogCta } = storeToRefs(dialogStore);

const items = [
  { name: "New", icon: "pi-file", action: () => tagStore.createNewData() },
  {
    name: "URL",
    icon: "pi-link",
    action: () => {
      dialogHeader.value = "Import from url";
      dialogContent.value = "DialogUrlImport";
      dialogCta.value = "Import";
      showDialog.value = true;
    },
  },
  {
    name: "JSON",
    icon: "pi-code",
    action: () => {
      dialogHeader.value = "Import from JSON";
      dialogContent.value = "DialogJsonImport";
      dialogCta.value = "Import";
      showDialog.value = true;
    },
  },
  {
    name: "Google Drive",
    icon: "pi-google",
    action: async () => {
      await googleStore.launchPicker();
    },
  },
];
</script>

<template>
  <section
    :class="$style.container"
    class="max-w-[720px] p-[32px] sm:p-[24px] flex flex-col justify-center items-center mx-auto"
  >
    <h2 class="typo-extra-large-title mb-8">Import From</h2>
    <ul class="grid grid-cols-2 gap-4">
      <li
        v-for="item in items"
        class="border-2 border-bluko-200 rounded-lg p-4 text-center flex flex-col gap-2 cursor-pointer hover:bg-bluko-200 hover:border-bluko-100 hover:text-black"
        @click="item.action?.()"
      >
        <i :class="item.icon" class="pi text-[40px]"></i>
        {{ item.name }}
      </li>
    </ul>
  </section>
</template>
<style lang="scss" module>
.container {
  height: calc(100vh - $navbar-height - 47px);
}
</style>
