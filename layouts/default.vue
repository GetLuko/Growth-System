<template>
  <div :class="$style.container">
    <ClientOnly>
      <Navbar :class="$style.navbar" />
      <slot />
    </ClientOnly>
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
