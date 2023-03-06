<script setup>
import { useTabStore } from "~~/stores/useTabStore";
import { storeToRefs } from "pinia";
import { useConfirm } from "primevue/useconfirm";

const tabStore = useTabStore();
const confirm = useConfirm();
const { tabData, activeTabIdx } = storeToRefs(tabStore);
const deleteData = (tabId, name) => {
  confirm.require({
    target: document.body,
    message: `Are you sure you want to delete "${name}"?`,
    header: "Confirmation",
    icon: "pi pi-exclamation-triangle",
    accept: () => {
      tabStore.deleteData(tabId);
    },
  });
};

definePageMeta({
  middleware: ["growth-data-url"],
});
const onChangeTab = (t) => {
  activeTabIdx.value = t.index;
};
</script>
<template>
  <div>
    <TabView @tab-change="onChangeTab" class="mt-[64px]" lazy scrollable>
      <TabPanel v-for="(tab, idx) in tabData" :key="idx">
        <template #header>
          <div class="flex gap-2 items-center text-white">
            <BaseTab :tab="tab" />
            <span
              class="hover:bg-gray-800 w-[20px] h-[20px] rounded-[50%] flex justify-center items-center"
              @click="() => deleteData(tab.id, tab.name)"
            >
              <i class="pi pi-times text-[10px]"></i>
            </span>
          </div>
        </template>
        <GraphView />
        <ExportMenu class="absolute bottom-10 left-10" />
      </TabPanel>
      <TabPanel>
        <template #header>
          <i class="pi pi-plus text-white"></i>
        </template>
        <ImportView />
      </TabPanel>
    </TabView>
  </div>
</template>
