<template>
  <Menubar :model="navItems" :class="$style.navbar">
    <template #start>
      <router-link to="/">
        <div :class="[$style.logo, { [$style.isDark]: isDark }]" class="logo">Growth System</div>
      </router-link>
    </template>
    <template #end>
      <div :class="$style.rightNav">
        <ResultBar
          :points="points"
          :level="level"
          :title="title"
          :class="[$style.navResult, { [$style.isDark]: isDark }]"
          class="resultBar"
          :progress="progress"
        />
        <div :class="$style.switch">
          <i class="pi pi-sun"></i>
          <InputSwitch v-model="isDark" />
          <i class="pi pi-moon"></i>
        </div>
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
  <ResultBar
    :points="points"
    :level="level"
    :title="title"
    :progress="progress"
    :class="[$style.bottomResult, { [$style.isDark]: isDark }]"
  />
</template>
<script lang="ts" setup>
import { ref, watch } from "vue";
import { useGrowthData } from "@/composables/useGrowthData";
import { useIO } from "@/composables/useIO";
import { useClipboard } from "@vueuse/core";
import { useToast } from "primevue/usetoast";
import ResultBar from "@/components/ResultBar";
import { useGraph } from "@/composables/useGraph";
import { storeTheme } from "@/states/storeTheme";

const inputTag = ref<HTMLElement | null>(null);
const { points, level, title, progress, cleanAllGrowthData } = useGrowthData();
const { exportToFile, exportToBase64, importFromFile } = useIO();
const exportedURL = ref<string>("");
const toast = useToast();
const { copy } = useClipboard({ source: exportedURL });
const { isDark } = storeTheme();
const { graphId } = useGraph();
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
    label: "Data",
    icon: "pi pi-fw pi-chart-bar",
    items: [
      {
        label: "Export to",
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
      {
        label: "Clear",
        icon: "pi pi-fw pi-trash",
        command: cleanAllGrowthData,
      },
    ],
  },
  {
    label: "Docs",
    icon: "pi pi-fw pi-book",
    to: "/Docs",
  },
]);
</script>

<style lang="scss" module>
.navbar {
  position: fixed !important;
  z-index: 100;
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
  &.isDark {
    color: rgb(129, 156, 216);
  }
}

.navResult {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  gap: 8px;
  width: 30vw;

  @include below(small) {
    display: none;
  }
  &.isDark {
    color: white;
  }
}

.bottomResult {
  height: $result-bar-height;
  background-color: white;
  box-shadow: 0 2px 16px rgb(44 35 2 / 12%);
  position: fixed;
  width: 100%;
  bottom: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0 10px;
  gap: 8px;

  @include above(small) {
    display: none;
  }

  &.isDark {
    background-color: rgb(46, 47, 63);
  }
}

.switch {
  display: flex;
  align-items: center;
  gap: 8px;
}

.rightNav {
  display: flex;
  align-items: center;
  gap: 24px;
}

.hide {
  display: none;
}
</style>
