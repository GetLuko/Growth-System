<template>
  <nav :class="$style.container">
    <div :class="$style.left">
      <div :class="$style.logo">Growth Ladder</div>
      <ul :class="$style.menus">
        <li :class="$style.menu" @click="onImport">
          <span> import </span>
          <input
            ref="inputTag"
            type="file"
            accept="application/json"
            name="files[]"
            size="1"
            :class="$style.hide"
            @change="onUpload"
          />
        </li>
        <li :class="$style.menu" @click="onExport">export</li>
      </ul>
    </div>
    <div :class="$style.right">
      <span :class="$style.info">{{ points }} point</span>
      <span :class="$style.info">{{ level }} lv</span>
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
.container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0;
  height: 50px;
  background-color: #e7e7e7;
}
.logo {
  padding: 0 20px;
  margin-right: 10px;
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
  padding: 15px;
  cursor: pointer;
  &:hover {
    background-color: #d6d6d6;
  }
}
.info {
  padding: 15px;
}
.hide {
  display: none;
}
</style>
