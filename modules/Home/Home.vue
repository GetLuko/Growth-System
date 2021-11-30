<template>
  <div :class="$style.container" :key="chartId">
    <div v-for="(key, index) in Object.keys(ladderInfo)" :key="index">
      <RadarChart
        :data="ladderInfo[key]"
        :title="key"
        :color="colors[index]"
        :class="$style.chart"
      />
    </div>
  </div>
</template>

<script>
export default {
  layout: "default",
  setup() {
    const colors = ["blue", "red", "green", "yellow"];
    const { ladderInfo, chartId } = useLadderInfo();

    return { ladderInfo, colors, chartId };
  },
};
</script>
<style lang="scss" module>
.container {
  margin-top: 80px;
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
