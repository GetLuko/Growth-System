<template>
  <div :class="$style.container">
    <div>
      Points: <span>{{ points }}</span>
    </div>
    <div>
      Level: <span>{{ level }}</span>
    </div>
    <div>
      Title: <span>{{ title }} </span>
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
  padding: 20px 0 0 0;
}
</style>
