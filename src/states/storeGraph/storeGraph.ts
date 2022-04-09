import { ref } from "vue";

const graphId = ref(Date.now());

export const storeGraph = () => ({
  graphId,
});
