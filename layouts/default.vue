<script setup>
import { storeToRefs } from "pinia";
import { usePrimeVue } from "primevue/config";
import { useToast } from "primevue/usetoast";
import { useToastStore } from "@/stores/useToastStore";

const $primevue = usePrimeVue();
defineExpose({
  $primevue,
});
const toast = useToast();
const { option } = storeToRefs(useToastStore());
watch(
  () => option.value,
  (v) => {
    toast.add({ severity: "info", summary: "", detail: "", life: 5000, ...v });
  },
);
</script>
<template>
  <div class="h-full relative">
    <TheNavbar />
    <main>
      <slot />
    </main>
    <BaseDialog />
    <Toast position="bottom-right" />
  </div>
</template>
<style module>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
