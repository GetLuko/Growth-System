<template>
  <div>
    <div :class="$style.title">
      {{ title }}
    </div>

    <div :class="$style.progressBarContainer">
      <ProgressBar :value="progress === Infinity ? 100 : progress" :showValue="false" :class="$style.progressBar" />
      <div :class="$style.progressBarValue">
        level {{ level }} - {{ progress === Infinity ? "Max" : progress + "%" }} ({{ points }} pts)
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { PropType } from "vue";
import ProgressBar from "primevue/progressbar";

const props = defineProps({
  points: {
    type: Number,
    required: true,
  },
  progress: {
    type: Number,
    default: 0,
  },
  level: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
});
</script>
<style module lang="scss">
.progressBarContainer {
  position: relative;
  width: 100%;
  display: flex;
  justify-content: center;
}
.progressBar {
  width: 100%;
}
.progressBarValue {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translateY(-50%) translateX(-50%);
  color: white;
  font-size: 13px;
  width: 100%;
  text-align: center;
}
</style>
