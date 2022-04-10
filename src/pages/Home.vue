<template>
  <div :class="$style.container" :key="graphId">
    <div v-for="(key, index) in Object.keys(growthData)" :key="index">
      <RadarChart :title="key" :color="colors[index]" :class="$style.chart" />
    </div>
  </div>
</template>

<script setup lang="ts">
import RadarChart from "@/modules/RadarChart";
import { storeGrowthData } from "@/states/storeGrowthData";
import { useGraph } from "@/composables/useGraph";

const { graphId } = useGraph();
const { growthData } = storeGrowthData();
const colors = ["blue", "red", "green", "yellow"];
</script>

<style lang="scss" module>
.container {
  margin-top: 120px;
  min-height: 100vh;
  display: grid;
  grid-template-columns: 1fr 1fr;
  justify-items: center;
  align-items: center;

  @media screen and (max-width: 1200px) {
    grid-template-columns: 1fr;
    row-gap: 100px;
    margin: 80px 0 60px;
  }
}
</style>
