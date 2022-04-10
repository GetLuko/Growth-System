<template>
  <section>
    <h2 :class="$style.title">{{ title }}</h2>
    <div :id="title" :key="graphId"></div>
  </section>
</template>

<script lang="ts" setup>
import { onMounted, ref, PropType, computed } from "vue";
import { storeGrowthData } from "@/states/storeGrowthData";
import { ColorsEnum } from "@/states/storeGrowthData/types";
import { useGraph } from "@/composables/useGraph";

const { growthData } = storeGrowthData();
const { init, colorMap, graphId } = useGraph();

const props = defineProps({
  title: {
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
  init(props.title, color);
});
</script>
<style lang="scss" module>
.title {
  @include typo-large-title;
  text-align: center;
}
</style>
