<script setup>
import { useDialogStore } from "~~/stores/useDialogStore";
import { storeToRefs } from "pinia";
import { LazyDialogUrlImport, LazyDialogJsonImport } from "#components";

const store = useDialogStore();
const { showDialog, dialogHeader, dialogContent } = storeToRefs(store);
const components = {
  DialogUrlImport: LazyDialogUrlImport,
  DialogJsonImport: LazyDialogJsonImport,
};
</script>
<template>
  <Teleport to="body">
    <Dialog
      class=""
      v-model:visible="showDialog"
      modal
      :breakpoints="{ '960px': '80vw', '640px': '95vw' }"
      :style="{ width: '50vw' }"
    >
      <template #header>
        <h3 class="typo-headline">{{ dialogHeader }}</h3>
      </template>
      <component :is="components[dialogContent]"></component>

      <template #footer>
        <Button label="Close" icon="pi pi-times" class="p-button-text" @click="showDialog = false" />
        <Button label="Import" icon="pi pi-check" autofocus type="submit" form="form-dialog" />
      </template>
    </Dialog>
  </Teleport>
</template>
