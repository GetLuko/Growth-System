<template>
  <div :class="$style.container" :key="windowWidth">
    <div v-for="(title, index) in Object.keys(growthData)" :key="`${title}-${graphId}`" :class="$style.item">
      <RadarChart
        :title="title"
        :link="links[title]"
        :color="colors[index]"
        :class="$style.chart"
        :key="otherGrowthData?.[title]"
      />
    </div>
    <CompareMode />
  </div>
</template>

<script setup lang="ts">
import RadarChart from "@/modules/RadarChart";
import { storeGrowthData } from "@/states/storeGrowthData";
import { useWindowSize } from "@vueuse/core";
import { useGraph } from "@/composables/useGraph";
import CompareMode from "@/modules/CompareMode";

const { width: windowWidth } = useWindowSize();
const { graphId } = useGraph();

const { growthData, otherGrowthData } = storeGrowthData();
const colors = ["blue", "red", "green", "yellow"];
const links = {
  Engineering: "https://luko.notion.site/Engineering-Growth-Track-0e160fee19df42789be55a23bc83f3a8",
  Execution: "https://luko.notion.site/Execution-Growth-Track-e6d072e1ac5b4e518bc2e916eea0f999",
  Supporting: "https://luko.notion.site/Supporting-Growth-Track-3cc636233d624f6d861e542fca0af142",
  Strengthening: "https://luko.notion.site/Strengthening-Growth-Track-f885547be9a74a1f86412fae3e3366ef",
};
</script>

<style lang="scss" module>
.container {
  margin-top: $navbar-height;
  overflow-x: hidden;
  height: calc(100vh - $navbar-height);
  display: grid;
  grid-template-columns: 1fr 1fr;
  justify-items: center;
  align-items: center;
  row-gap: 100px;
  overflow-y: scroll;
  scroll-snap-type: y mandatory;

  @media screen and (max-width: 1200px) {
    grid-template-columns: 1fr;
  }
  @include below(xsmall) {
    height: calc(100vh - $navbar-height - $result-bar-height);
  }
}
.item {
  display: flex;
  align-items: center;
  scroll-snap-align: start;
  height: calc(100vh - $navbar-height);
  @include below(xsmall) {
    height: calc(100vh - $navbar-height - $result-bar-height);
  }
}
</style>
