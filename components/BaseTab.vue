<script setup lang="ts">
import { PropType } from "vue";
import { TabData } from "@/types/Growth";
import TabPanel from "primevue/tabpanel";

const props = defineProps({
  tab: {
    type: Object as PropType<TabData>,
    required: true,
  },
});
const isEdit = ref(false);
const onEdit = () => {
  isEdit.value = true;
  nextTick(() => inputElement.value?.focus());
};
const onFinishEdit = () => {
  isEdit.value = false;
};
const onKeyDown = (e: KeyboardEvent) => {
  if (e.code == "Enter") return (isEdit.value = false);
  if (e.code == "Escape") return (isEdit.value = false);
};
const inputElement = ref<HTMLElement>();
watch(
  () => isEdit.value,
  (v) => {
    if (!v && !props.tab.name) {
      props.tab.name = `Data ${props.tab.id}`;
    }
  },
);
</script>
<template>
  <div>
    <input
      name="modify tab"
      v-show="isEdit"
      ref="inputElement"
      type="text"
      @blur="onFinishEdit"
      :value="tab.name"
      @keydown.stop="onKeyDown"
      @input="(event) => (tab.name = event.target?.value)"
    />
    <span v-show="!isEdit" class="p-2" @dblclick="onEdit"> {{ tab.name || `Data ${tab.id}` }} </span>
  </div>
</template>
