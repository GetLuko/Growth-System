<template>
  <div>
    <span class="info-points" :class="[$style.info, $style['info-points']]">
      {{ points }} point{{ points === 1 ? "" : "s" }}
    </span>
    <span class="info-lvl" :class="[$style.info, $style['info-lvl']]">{{ level }} lvl</span>
    <span class="info-title" :class="$style.info">{{ title }}</span>
  </div>
</template>
<script lang="ts" setup>
import { PropType } from "vue";

const props = defineProps({
  points: {
    type: Number,
    required: true,
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
.info {
  color: inherit;
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  position: relative;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  margin-left: 12px;
  -webkit-box-orient: horizontal;
  -webkit-box-direction: normal;
  -ms-flex-direction: row;
  flex-direction: row;
  width: -webkit-fit-content;
  width: -moz-fit-content;
  width: fit-content;
  padding: 5px 12px;
  border-radius: 24px;
  color: $bluko-700;
  background: $bluko-50;
}

.info-points {
  color: $mint-700;
  background: $mint-100;
}

.info-lvl {
  color: $gold-700;
  background: $gold-100;
}
</style>
