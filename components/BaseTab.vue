<script setup lang="ts">
import { PropType } from "vue";
import { TabData } from "@/types/Growth";

const props = defineProps({
  tab: {
    type: Object as PropType<TabData>,
    required: true,
  },
});

const tabName = ref("");
const isEdit = ref(false);
const inputElement = ref<HTMLElement>();
const onEdit = () => {
  isEdit.value = true;

  nextTick(() => {
    inputElement.value?.focus();
  });
};
const onFinishEdit = () => {
  isEdit.value = false;
};
const onKeyDown = (e: KeyboardEvent) => {
  if (e.code == "Enter") return (isEdit.value = false);
  if (e.code == "Escape") return (isEdit.value = false);
};
watch(
  () => isEdit.value,
  (v) => {
    props.tab.name = tabName.value || props.tab.name;
  },
);
</script>
<template>
  <div>
    <input
      v-if="isEdit"
      autofocus
      class="px-2 rounded"
      name="modify tab"
      ref="inputElement"
      type="text"
      @blur="onFinishEdit"
      :value="tab.name"
      @keydown.stop="onKeyDown"
      @input="(event) => (tabName = event.target?.value)"
    />
    <span v-else="!tab.isEdit" class="p-2" @dblclick="onEdit"> {{ tab.name || `Data ${tab.id}` }} </span>
  </div>
</template>
