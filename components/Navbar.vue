<template>
  <nav :class="$style.container">
    <div :class="$style.left">
      <div :class="$style.logo">Growth Ladder</div>
      <nav :class="$style.menus">
        <button :class="[$style.menu, $style['menu-cta']]" @click="onImport">Import</button>
        <button :class="[$style.menu, $style['menu-link']]" @click="onExport">Export</button>
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
      <span :class="[$style.info, $style['info-points']]">{{ points }} point{{ points === 1 ? '' : 's' }}</span>
      <span :class="[$style.info, $style['info-lvl']]">{{ level }} lvl</span>
      <span :class="$style.info">{{ title }}</span>
    </div>
  </nav>
</template>
<script>
import { defineComponent } from "@vue/composition-api";

export default defineComponent({
  setup() {
    const { points, level, title } = useResult();
    const { exportLadderInfo, importLadderInfo } = useLadderInfo();
    const inputTag = ref(null);

    const onImport = () => {
      if (!inputTag.value) return alert("Fatal error");
      inputTag.value.click();
    };
    const onUpload = (e) => {
      const file = e.target.files[0];
      importLadderInfo(file);
    };
    const onExport = () => exportLadderInfo();

    return {
      points,
      level,
      title,
      inputTag,
      onExport,
      onImport,
      onUpload,
    };
  },
});
</script>

<style lang="scss" module>
@import "~/assets/colors";
.container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 24px;
  height: 64px;
  background-color: $white;
  box-shadow: 0 2px 16px rgb(44 35 2 / 12%)
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
.menu {
  padding: 8px 16px;
  cursor: pointer;
  border: 0;
  height: 40px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition: color .3s;
  font-weight: 600;
  font-size: 14px;
  line-height: 20px;
}

.menu-cta {
  border-radius: 8px;
  background-color: $bluko-500;
  color: $white;
  margin-right: 8px;
  transition: background-color .3s;

  &:hover {
    background-color: $bluko-400;
  }
}

.menu-link {
  border-radius: 8px;
  background-color: transparent;
  color: $bluko-1000;
  transition: color .3s;

  &:hover {
    color: $gray-700;
  }
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
