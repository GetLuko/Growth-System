<template>
  <Navbar :class="$style.navbar" />
  <router-view></router-view>
  <Toast />
</template>

<script setup lang="ts">
import Navbar from "@/modules/Navbar.vue";
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
</script>

<style module lang="scss">
.container {
  position: relative;
}
.navbar {
  position: fixed;
  top: 0;
  width: 100%;
}
</style>
