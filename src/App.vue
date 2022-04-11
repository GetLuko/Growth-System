<template>
  <Navbar />
  <router-view></router-view>
  <Toast />
</template>

<script setup lang="ts">
import Navbar from "@/modules/Navbar";
import { useDark } from "@vueuse/core";

const isDark = useDark();
</script>
