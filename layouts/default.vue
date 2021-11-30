<template>
  <div :class="$style.container">
    <Navbar :class="$style.navbar" />
    <slot />
  </div>
</template>

<style module>
.container {
  position: relative;
}
.navbar {
  position: fixed;
  top: 0;
  width: 100%;
}
</style>
