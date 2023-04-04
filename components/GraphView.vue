<script setup lang="ts">
import { GrowthDomain, ColorsEnum } from "~~/types/Growth";
import { useWindowSize } from "@vueuse/core";
import { useTabStore } from "~~/stores/useTabStore";
import { storeToRefs } from "pinia";

const { width: windowWidth } = useWindowSize();
const { tabData, activeTabIdx } = storeToRefs(useTabStore());

const colors = Object.values(ColorsEnum);
const links: {
  [key in GrowthDomain]: string;
} = {
  Engineering: "https://luko.notion.site/Engineering-Growth-Track-0e160fee19df42789be55a23bc83f3a8",
  Execution: "https://luko.notion.site/Execution-Growth-Track-e6d072e1ac5b4e518bc2e916eea0f999",
  Supporting: "https://luko.notion.site/Supporting-Growth-Track-3cc636233d624f6d861e542fca0af142",
  Strengthening: "https://luko.notion.site/Strengthening-Growth-Track-f885547be9a74a1f86412fae3e3366ef",
  DataAnalytics: "https://www.notion.so/luko/Analytics-Growth-Track-908451d465894c468c1078c9fff67b70",
};
const tabGrowthData = computed(() => tabData.value[activeTabIdx.value].growthData || {});
</script>
<template>
  <div :class="$style.container" :key="windowWidth">
    <section v-for="(title, idx) in Object.keys(tabGrowthData) as GrowthDomain[]" :key="title" :class="$style.item">
      <RadarChart :title="title" :link="links[title as GrowthDomain]" :color="colors[idx]" :class="$style.chart" />
    </section>
  </div>
</template>
<style lang="scss" module>
.container {
  overflow-x: hidden;
  display: grid;
  grid-template-columns: 1fr 1fr;
  justify-items: center;
  align-items: center;
  row-gap: 100px;
  height: calc(100vh - $navbar-height - 47px);
  scroll-snap-type: y mandatory;

  @media screen and (max-width: 1200px) {
    grid-template-columns: 1fr;
  }
}
.item {
  display: flex;
  align-items: center;
  scroll-snap-align: start;
  height: calc(100vh - $navbar-height);
}
</style>
