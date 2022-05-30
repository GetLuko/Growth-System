<template>
  <div :class="{ [$style.container]: true, [$style.isDark]: isDark }">
    <Avatar :image="image" shape="circle" />
    <div :class="$style.inner">
      <div :class="$style.title">{{ title }}</div>

      <div :class="$style.progressBarContainer">
        <ProgressBar :value="progress === Infinity ? 100 : progress" :showValue="false" :class="$style.progressBar" />
        <div :class="$style.progressBarValue">
          level {{ level }} - {{ progress === Infinity ? "Max" : progress + "%" }} ({{ points }} pts)
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref, watch, onMounted } from "vue";
import ProgressBar from "primevue/progressbar";
import Avatar from "primevue/avatar";
import { useGrowthData } from "@/composables/useGrowthData";
import { storeTheme } from "@/states/storeTheme";

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
const { isDark } = storeTheme();
const { level } = useGrowthData();
const gradeImages = import.meta.glob("../../assets/grades/*.png");
const getAsset = (lv: string) =>
  gradeImages[`../../assets/grades/${parseInt(lv)}.png`]().then((asset) => asset.default);
const image = ref(null);

watch(level, async (lvl) => {
  const src = await getAsset(lvl);
  image.value = src;
});
onMounted(async () => {
  const src = await getAsset(level.value);
  image.value = src;
});
</script>

<style module lang="scss">
.container {
  width: 30vw;
  display: flex;
  gap: 8px;
  align-items: center;
}
.isDark {
  color: white;
}

.inner {
  flex: 2;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

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
