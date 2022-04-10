<template>
  <nav :class="$style.container">
    <div :class="$style.left">
      <div :class="$style.logo">Growth System</div>
      <nav :class="$style.menus">
        <Button @click="onImport">Import</Button>
        <Button @click="onExport" class="p-button-secondary">Export</Button>
      </nav>
      <input
        ref="inputTag"
        type="file"
        accept="application/json"
        name="files[]"
        size="1"
        :class="$style.hide"
        @change="onUpload"
      />
    </div>
    <div :class="$style.right">
      <span :class="[$style.info, $style['info-points']]">{{ points }} point{{ points === 1 ? "" : "s" }}</span>
      <span :class="[$style.info, $style['info-lvl']]">{{ level }} lvl</span>
      <span :class="$style.info">{{ title }}</span>
    </div>
  </nav>
</template>
<script lang="ts" setup>
import { ref } from "vue";
import { useGrowthData } from "@/composables/useGrowthData";
import { useIO } from "@/composables/useIO";

const inputTag = ref<HTMLElement | null>(null);
const { points, level, title } = useGrowthData();
const { exportToFile, importFromFile } = useIO();

const onImport = () => {
  inputTag.value?.click();
};

const onUpload = (e: Event) => {
  const target = e.target as HTMLInputElement;
  const file = target.files;
  if (!file) return alert("Fail to upload");

  importFromFile(file[0]);
};
const onExport = () => exportToFile();
</script>

<style lang="scss" module>
.container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 24px;
  height: 64px;
  background-color: $white;
  box-shadow: 0 2px 16px rgb(44 35 2 / 12%);
}
.logo {
  margin-right: 32px;
  color: $bluko-500;
}
.menus {
  display: flex;
  align-items: center;
  list-style-type: none;
}
.left,
.right {
  display: flex;
  align-items: center;
}

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

.hide {
  display: none;
}
</style>
