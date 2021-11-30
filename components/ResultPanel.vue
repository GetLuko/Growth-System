<template>
  <div :class="$style.container">
    <div>
      Points: <span>{{ points }}</span>
    </div>
    <div>
      Sub Level: <span>{{ level }}</span>
    </div>
    <div>
      Level Name: <span>{{ title }} </span>
    </div>
  </div>
</template>
<script>
import { defineComponent } from "vue";

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
<style module>
.container {
  padding: 10px;
  border-radius: 8px;
  border: 1px solid rgb(0, 0, 0, 80%);
  background: rgb(0, 0, 0, 10%);
}
</style>
