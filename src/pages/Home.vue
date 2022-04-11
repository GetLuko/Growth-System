<template>
  <div :class="$style.container" :key="windowWidth">
    <div v-for="(title, index) in Object.keys(growthData)" :key="index" :class="$style.item">
      <RadarChart :title="title" :color="colors[index]" :class="$style.chart" />
    </div>
  </div>
</template>

<script setup lang="ts">
import RadarChart from "@/modules/RadarChart";

import { storeGrowthData } from "@/states/storeGrowthData";
import { useWindowSize } from "@vueuse/core";

const { width: windowWidth } = useWindowSize();

const { growthData } = storeGrowthData();
const colors = ["blue", "red", "green", "yellow"];
</script>

<style lang="scss" module>
$navbar-height: 64px;
$result-bar-height: 50px;

.container {
  margin: $navbar-height 0 60px;
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
