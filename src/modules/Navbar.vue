<template>
  <Menubar :model="navItems" :class="$style.navbar">
    <template #start>
      <div :class="$style.logo">Growth System</div>
    </template>
    <template #end>
      <ResultBar :points="points" :level="level" :title="title" :class="$style.navResult" />
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
  <ResultBar :points="points" :level="level" :title="title" :class="$style.bottomResult" />
</template>
<script lang="ts" setup>
import { ref } from "vue";
import { useGrowthData } from "@/composables/useGrowthData";
import { useIO } from "@/composables/useIO";
import { useClipboard } from "@vueuse/core";
import { useToast } from "primevue/usetoast";
import ResultBar from "@/components/ResultBar";

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
const navItems = ref([
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
.navbar {
  position: fixed !important;
  width: 100%;
  top: 0;
  padding: 0 24px;
  height: 64px;
  background-color: $white;
  box-shadow: 0 2px 16px rgb(44 35 2 / 12%);
}
.logo {
  margin-right: 10px;
  color: $bluko-500;
}

.navResult {
  display: flex;
  align-items: center;
  @include below(xsmall) {
    display: none;
  }
}
.bottomResult {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50px;
  background-color: white;
  box-shadow: 0 2px 16px rgb(44 35 2 / 12%);
  position: fixed;
  width: 100%;
  bottom: 0;

  @include above(xsmall) {
    display: none;
  }
}

.hide {
  display: none;
}
</style>
