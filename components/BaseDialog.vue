<script setup>
import { useDialogStore } from "~~/stores/useDialogStore";
import { storeToRefs } from "pinia";
import { LazyDialogUrlImport, LazyDialogJsonImport, LazyDialogGoogleExport } from "#components";

const store = useDialogStore();
const { showDialog, dialogHeader, dialogContent, dialogCta } = storeToRefs(store);
const components = {
  DialogUrlImport: LazyDialogUrlImport,
  DialogJsonImport: LazyDialogJsonImport,
  DialogGoogleExport: LazyDialogGoogleExport,
};
</script>
<template>
  <Teleport to="body">
    <Dialog
      :auto-z-index="false"
      :base-z-index="999"
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
        <Button :label="dialogCta || 'Submit'" icon="pi pi-check" autofocus type="submit" form="form-dialog" />
      </template>
    </Dialog>
  </Teleport>
</template>
