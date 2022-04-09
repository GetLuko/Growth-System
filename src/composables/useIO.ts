import { storeGrowthData } from "../states/storeGrowthData";
import { toRaw } from "vue";
import { pipe } from "@fxts/core";
import { useRouter } from "vue-router";
import { storeGraph } from "../states/storeGraph";

const { growthData } = storeGrowthData();
const { graphId } = storeGraph();
const reader = new FileReader();

reader.onload = (e: any) => {
  try {
    const res = JSON.parse(e.target.result);
    growthData.value = res;
  } catch (error) {
    alert("Invalid JSON file");
  } finally {
    graphId.value = Date.now();
  }
};

export const useIO = () => {
  const router = useRouter();

  return {
    importFromURL: () => {
      try {
        pipe(window.location.search.replace("?m=", ""), atob, JSON.parse, (data) => (growthData.value = data));
      } catch (error) {}
    },
    exportToURL: () =>
      pipe(toRaw(growthData.value), JSON.stringify, btoa, (encodedData) => router.push({ query: { m: encodedData } })),
    importFromFile: (file: Blob) => pipe(file, (file) => reader.readAsText(file)),
    exportToFile: () => {
      try {
        pipe(
          toRaw(growthData.value),
          (growthData) => "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(growthData)),
          (fileString) => {
            const a = document.createElement("a");
            a.setAttribute("href", fileString);
            a.setAttribute("download", `growth-data-${new Date().toISOString()}.json`);
            document.body.appendChild(a); // required for firefox
            a.click();
            a.remove();
          },
        );
      } catch (error) {
        alert("Fail to export");
        console.error(error);
      }
    },
  };
};
