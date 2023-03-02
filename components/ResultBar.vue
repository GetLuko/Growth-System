<script lang="ts" setup>
import { ref, watch, onMounted } from "vue";
import { useGrowth } from "@/composables/useGrowth";

const { level, progress, title, points } = useGrowth();
const gradeImages = import.meta.glob("../assets/grades/*.png");
const getAsset = (lv: string) => gradeImages[`../assets/grades/${parseInt(lv)}.png`]().then((asset) => asset.default);
const image = ref();

watch(
  () => level.value,
  async (lvl) => {
    const src = await getAsset(lvl);
    image.value = src;
  },
);
onMounted(async () => {
  const src = await getAsset(level.value);
  image.value = src;
});
</script>

<template>
  <div class="flex gap-2 items-center max-w-[300px] w-[30vw]" v-if="!isNaN(progress)">
    <Avatar :image="image" shape="circle" />

    <div class="flex flex-col gap-1 flex-2 w-full">
      <div class="typo-sub-text">{{ title }}</div>

      <div class="w-full flex justify-center relative">
        <ProgressBar :value="progress === Infinity ? 100 : progress" :showValue="false" class="w-full" />
        <div
          class="absolute left-1/2 top-1/2 w-full text-center translate-x-[-50%] translate-y-[-50%] text-white typo-caption"
        >
          level {{ level }} - {{ progress === Infinity ? "Max" : progress + "%" }} ({{ points }} pts)
        </div>
      </div>
    </div>
  </div>
</template>
