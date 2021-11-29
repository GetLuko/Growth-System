<template>
  <div :class="$style.container">
    <ResultPanel :class="$style.result" />
    <slot />
  </div>
</template>

<style module>
.container {
  position: relative;
}
.result {
  position: fixed;
  top: 20px;
  right: 20px;
}
</style>
