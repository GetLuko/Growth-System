<template>
  <Menubar :model="navItems" :class="$style.navbar" class="fixed shadow-lg">
    <template #start>
      <router-link to="/" class="text-bluko-300 typo-headline mr-5 hover:text-bluko-200"> Growth System </router-link>
    </template>
    <template #end>
      <div class="flex items-center gap-[24px]">
        <ResultBar :class="[$style.navResult]" class="resultBar" />
      </div>
    </template>
  </Menubar>
</template>
<script lang="ts" setup>
const navItems = [
  {
    label: "Chart",
    icon: "pi pi-fw pi-chart-pie",
    to: "/",
  },
  {
    label: "Docs",
    icon: "pi pi-fw pi-book",
    to: "/Docs",
  },
];
</script>

<style module>
.navbar {
  z-index: 100;
  width: 100%;
  top: 0;
  padding: 0 24px;
  height: 64px;
}

.bottomResult {
  height: $result-bar-height;
  background-color: white;
  box-shadow: 0 2px 16px rgb(44 35 2 / 12%);
  position: fixed;
  width: 100%;
  bottom: 0;
  padding: 0 10px;
}
</style>
<style>
a.router-link-active-exact {
  background-color: rgba(158, 173, 230, 0.08);
  border-radius: 4px;
}
</style>
