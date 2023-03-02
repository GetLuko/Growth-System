<template>
  <a :href="href" :target="target"> {{ text }} <i class="pi pi-link"></i> </a>
</template>

<script lang="ts" setup>
defineProps({
  text: {
    type: String,
    required: true,
  },
  href: {
    type: String,
    required: true,
  },
  target: {
    type: String,
    default: undefined,
  },
});
</script>
