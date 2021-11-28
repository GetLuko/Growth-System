<template>
  <div :class="$style.container">
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
    const ladderInfo = useLadderInfo();

    return { ladderInfo, colors };
  },
};
</script>
<style module>
.container {
  height: 100vh;
  display: grid;
  grid-template-columns: 1fr 1fr;
  justify-items: center;
  align-items: center;
  row-gap: 20px;
}
@media screen and (max-width: 1000px) {
  .container {
    grid-template-columns: 1fr;
  }
}
</style>
