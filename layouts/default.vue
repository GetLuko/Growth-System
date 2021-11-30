<template>
  <div :class="$style.container">
    <Navbar />
    <slot />
  </div>
</template>

<style module>
.container {
  position: relative;
}
</style>
