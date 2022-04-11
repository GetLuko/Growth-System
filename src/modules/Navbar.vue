<template>
  <Menubar :model="items" :class="$style.container">
    <template #start>
      <div :class="$style.logo">Growth System</div>
    </template>
    <template #end>
      <div :class="$style.right">
        <span :class="[$style.info, $style['info-points']]">{{ points }} point{{ points === 1 ? "" : "s" }}</span>
        <span :class="[$style.info, $style['info-lvl']]">{{ level }} lvl</span>
        <span :class="$style.info">{{ title }}</span>
      </div>
      <input
        ref="inputTag"
        type="file"
        accept="application/json"
        name="files[]"
        size="1"
        :class="$style.hide"
        @change="onUpload"
      />
    </template>
  </Menubar>
</template>
<script lang="ts" setup>
import { ref } from "vue";
import { useGrowthData } from "@/composables/useGrowthData";
import { useIO } from "@/composables/useIO";
import { useClipboard } from "@vueuse/core";
import { useToast } from "primevue/usetoast";

const inputTag = ref<HTMLElement | null>(null);
const { points, level, title } = useGrowthData();
const { exportToFile, exportToBase64, importFromFile } = useIO();
const exportedURL = ref<string>("");
const toast = useToast();
const { copy } = useClipboard({ source: exportedURL });

const onImport = () => {
  inputTag.value?.click();
};

const onUpload = (e: Event) => {
  const target = e.target as HTMLInputElement;
  const file = target.files;
  if (!file) return alert("Fail to upload");

  importFromFile(file[0]);
};

const onExportToFile = () => exportToFile();
const onExportLink = () => {
  exportedURL.value = window.location.origin + `?m=${exportToBase64()}`;
  copy();
  toast.add({ severity: "success", detail: "URL Copied!", life: 2000 });
};
const items = ref([
  {
    label: "Export",
    icon: "pi pi-fw pi-download",
    items: [
      {
        label: "Link",
        icon: "pi pi-fw pi-link",
        command: onExportLink,
      },
      {
        label: "JSON",
        icon: "pi pi-fw pi-file",
        command: onExportToFile,
      },
    ],
  },
  {
    label: "Import",
    icon: "pi pi-fw pi-upload",
    command: onImport,
  },
]);
</script>

<style lang="scss" module>
.container {
  padding: 0 24px;
  height: 64px;
  background-color: $white;
  box-shadow: 0 2px 16px rgb(44 35 2 / 12%);
}
.logo {
  margin-right: 10px;
  color: $bluko-500;
}

.right {
  display: flex;
  align-items: center;
}

.info {
  color: inherit;
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  position: relative;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  margin-left: 12px;
  -webkit-box-orient: horizontal;
  -webkit-box-direction: normal;
  -ms-flex-direction: row;
  flex-direction: row;
  width: -webkit-fit-content;
  width: -moz-fit-content;
  width: fit-content;
  padding: 5px 12px;
  border-radius: 24px;
  color: $bluko-700;
  background: $bluko-50;
}

.info-points {
  color: $mint-700;
  background: $mint-100;
}

.info-lvl {
  color: $gold-700;
  background: $gold-100;
}

.hide {
  display: none;
}
</style>
