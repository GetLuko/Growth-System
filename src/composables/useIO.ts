import { storeGrowthData } from "@/states/storeGrowthData";
import { toRaw } from "vue";
import { pipe } from "@fxts/core";
import { useGraph } from "@/composables/useGraph";
import { GrowthDataTypeEnums } from "@/states/storeGrowthData/types";
import { useGrowthData } from "./useGrowthData";

const { growthData, otherGrowthData, trimGrowthData } = storeGrowthData();
const { graphId } = useGraph();

const reader = new FileReader();
const otherReader = new FileReader();

reader.onload = (e: any) => {
  const res = JSON.parse(e.target.result);
  growthData.value = trimGrowthData(res);
  graphId.value = Date.now();
};
otherReader.onload = (e: any) => {
  const res = JSON.parse(e.target.result);
  otherGrowthData.value = trimGrowthData(res);
  graphId.value = Date.now();
};

export const useIO = () => {
  const importFromQuery = (queryValue: string | null, type: GrowthDataTypeEnums | undefined) => {
    if (!queryValue) return null;
    if (!type) type = GrowthDataTypeEnums.mine;

    pipe(queryValue, atob, JSON.parse, (data) => {
      if (type === GrowthDataTypeEnums.mine) growthData.value = trimGrowthData(data);
      if (type === GrowthDataTypeEnums.other) otherGrowthData.value = trimGrowthData(data);
    });
  };

  return {
    importFromQuery,
    importFromURL: (urlString: string, type: GrowthDataTypeEnums = GrowthDataTypeEnums.mine) => {
      const url = new URL(urlString);
      importFromQuery(url.searchParams.get("m"), type);
    },
    exportToBase64: () => pipe(toRaw(growthData.value), JSON.stringify, btoa),
    importFromFile: (file: Blob, type: GrowthDataTypeEnums = GrowthDataTypeEnums.mine) =>
      pipe(file, (file) =>
        type === GrowthDataTypeEnums.mine ? reader.readAsText(file) : otherReader.readAsText(file),
      ),
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
