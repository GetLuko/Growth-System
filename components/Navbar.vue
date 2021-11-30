<template>
  <nav :class="$style.container">
    <div :class="$style.left">
      <div :class="$style.logo">Growth Ladder</div>
      <ul :class="$style.menus">
        <li :class="$style.menu"><a>import</a></li>
        <li :class="$style.menu"><a>export</a></li>
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
    return {
      points,
      level,
      title,
    };
  },
});
</script>

<style lang="scss" module>
.container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 10px;
  height: 50px;
  background-color: #f8f9fa;
}
.logo {
  margin-right: 20px;
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
</style>
