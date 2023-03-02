<template>
  <section>
    <h2 class="typo-large-title text-center mb-[20px]">
      <BaseLink :href="link" :text="title" target="_blank" />
    </h2>
    <div :id="title"></div>
  </section>
</template>

<script lang="ts" setup>
import { onMounted, PropType } from "vue";
import { ColorsEnum, GrowthDomain } from "~~/types/Growth";

const props = defineProps({
  title: {
    type: String as PropType<GrowthDomain>,
    required: true,
  },
  link: {
    type: String,
    required: true,
  },
  color: {
    type: String as PropType<ColorsEnum>,
    default: "blue",
  },
});
const { init, colorMap } = useGraph();

const color = colorMap[props.color] || colorMap["blue"];

onMounted(() => {
  init(props.title, color);
});
</script>
