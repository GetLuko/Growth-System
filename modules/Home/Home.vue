<template>
  <div :class="$style.container" :key="chartId">
    <RadarChart
      v-for="(key, index) in Object.keys(ladderInfo)"
      :key="index"
      :data="ladderInfo[key]"
      :title="key"
      :color="colors[index]"
      :class="$style.chart"
    />
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
  margin-top: 40px;
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
