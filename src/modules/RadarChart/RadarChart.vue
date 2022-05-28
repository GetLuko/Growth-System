<template>
  <section>
    <h2 :class="$style.title">
      <BaseLink :href="link" :text="title" target="_blank" />
    </h2>
    <div :id="title"></div>
  </section>
</template>

<script lang="ts" setup>
import { onMounted, PropType } from "vue";
import { ColorsEnum, IGrowthData } from "@/states/storeGrowthData/types";
import { useGraph } from "@/composables/useGraph";
import BaseLink from "@/components/BaseLink";

const { init, colorMap } = useGraph();

const props = defineProps({
  title: {
    type: String,
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

const color = colorMap[props.color] || colorMap["blue"];

onMounted(() => {
  init(props.title as keyof IGrowthData, color);
});
</script>
<style lang="scss" module>
.title {
  @include typo-large-title;
  text-align: center;
  margin-bottom: 20px;
}
</style>
