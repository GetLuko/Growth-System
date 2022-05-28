<template>
  <div>
    <Button
      class="p-button-rounded"
      :class="[$style.compareModeButton, { 'p-button-secondary': !isCompareMode }]"
      @click="onCompareMode"
    >
      <i class="pi pi-users"></i>
    </Button>
    <Dialog
      v-model:visible="isVisible"
      header="Select an import method"
      :breakpoints="{ '960px': '75vw', '640px': '95vw' }"
      :style="{ width: '50vw' }"
      :draggable="false"
      dismissable-mask
      modal
    >
      <div class="p-inputgroup">
        <Button icon="pi pi-link" />
        <InputText
          placeholder="https://growth-system.luko.eu?m=eyJFbmdpbmVlcmluZyI6eyJGcm9udGVuZCI6MCwiSGFyZHdhcmUiOjAsIk1vYmlsZSI6MCwiRGF0YUVuZ2luZWVyaW5nIjowLCJPcHMiOjAsIkJhY2tlbmQiOjAsIkZpcm13YXJlIjowLCJNYWNoaW5lTCI6MH0sIkV4ZWN1dGlvbiI6eyJEZWxpdmVyeSI6MCwiT3B0aW1pemF0aW9uIjowLCJDb21tdW5pY2F0aW9uIjowLCJRdWFsaXR5IjowfSwiU3VwcG9ydGluZyI6eyJHcm93aW5nVG9nZXRoZXIiOjAsIkFjY29tcGxpc2htZW50IjowLCJQZW9wbGVNaW5kZWQiOjAsIk9yZ0RldiI6MH0sIlN0cmVuZ3RoZW5pbmciOnsiTWVudG9yc2hpcCI6MCwiUmVjcnVpdG1lbnQiOjAsIkV2YW5nZWxpc20iOjAsIkNvbW11bml0eSI6MH19"
          v-model="link"
          @input="onChangeLink"
        />
      </div>

      <div :class="$style.seperator">
        <hr :class="$style.item" />
        <span :class="$style.item">OR</span>
        <hr :class="$style.item" />
      </div>

      <FileUpload
        mode="basic"
        name="file[]"
        :style="{ width: '100%' }"
        chooseLabel="Choose a file (.json)"
        accept="application/json"
        :maxFileSize="1000"
        @select="onSelectFile"
        ref="fileInput"
      />
      <template #footer>
        <div :class="$style.footer">
          <Button label="cancel" icon="pi pi-times" class="p-button-text" @click="onCancel" />
          <Button label="import" icon="pi pi-check" autofocus @click="onSubmit" :disabled="isDisabledSubmit" />
        </div>
      </template>
    </Dialog>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref, watch } from "vue";
import ToggleButton from "primevue/togglebutton";
import FileUpload from "primevue/fileupload";
import InputText from "primevue/inputtext";
import { useIO } from "@/composables/useIO";
import { GrowthDataTypeEnums } from "@/states/storeGrowthData/types";
import { useGraph } from "@/composables/useGraph";
import { useGrowthData } from "@/composables/useGrowthData";

const { cleanOtherGrowthData } = useGrowthData();
const { graphId } = useGraph();
const isCompareMode = ref(false);
const isVisible = ref(false);
const { importFromURL, importFromFile } = useIO();
const onCompareMode = () => {
  isCompareMode.value = true;
  isVisible.value = true;
};
const fileInput = ref<any>(null);
const link = ref<null | string>(null);
const isDisabledSubmit = computed(() => {
  if (link.value && link.value.length > 400) return false;
  if (fileInput.value && fileInput.value.files[0]) return false;
  return true;
});

const onChangeLink = () => {
  fileInput.value?.clear();
};
const onSelectFile = (e: any) => {
  // clean data
  link.value = null;
};
const onCancel = () => {
  // turn off compare mode
  isCompareMode.value = false;

  // update graph
  cleanOtherGrowthData();
  graphId.value = Date.now();

  // close popup
  isVisible.value = false;

  // clean data
  link.value = null;
  fileInput.value?.clear();
};

const onSubmit = () => {
  if (link.value) importFromURL(link.value, GrowthDataTypeEnums.other);
  else if (fileInput.value) importFromFile(fileInput.value.files[0], GrowthDataTypeEnums.other);

  graphId.value = Date.now();
  // turn on compare mode
  isCompareMode.value = true;

  // close popup
  isVisible.value = false;

  // clean data
  link.value = null;
  fileInput.value?.clear();
};
</script>

<style lang="scss" module>
.compareModeButton {
  position: fixed !important;
  left: 40px;
  bottom: 40px;
  height: 60px !important;
  width: 60px !important;
  i {
    font-size: 25px;
    margin: 0 auto;
  }
  @include below(xsmall) {
    left: 15px;
    bottom: 60px;
    height: 50px !important;
    width: 50px !important;
  }
  i {
    font-size: 20px;
    margin: 0 auto;
  }
}
.seperator {
  margin: 34px auto;
  width: 80%;
  display: flex;
  align-items: center;
  .item {
    flex: 1;
    text-align: center;
  }
  hr {
    height: 0;
  }
}
.footer {
  display: flex;
  justify-content: space-between;
}
</style>
