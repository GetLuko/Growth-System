// store/filters.ts
import { defineStore } from "pinia";
import { GrowthData } from "~~/types/Growth";
import { get, isNil } from "lodash-es";
import { pipe } from "@fxts/core";
import { useStorage } from "@vueuse/core";
import { useIO } from "~~/composables/useIO";
import { useToastStore } from "./useToastStore";
import { useClipboard } from "@vueuse/core";

const { getFilename } = useIO();
const tabData = useStorage<{ id: number; name?: string; growthData: GrowthData }[]>("tabData", []);
const toastStore = useToastStore();
const getDefaultGrowthData = (): GrowthData => {
  return {
    Engineering: {
      Frontend: 0,
      Hardware: 0,
      Mobile: 0,
      DataEngineering: 0,
      Ops: 0,
      Backend: 0,
      Firmware: 0,
      MachineL: 0,
    },
    Execution: {
      Delivery: 0,
      Optimization: 0,
      Communication: 0,
      Quality: 0,
    },
    Supporting: {
      GrowingTogether: 0,
      Accomplishment: 0,
      PeopleMinded: 0,
      OrgDev: 0,
    },
    Strengthening: {
      Mentorship: 0,
      Recruitment: 0,
      Evangelism: 0,
      Community: 0,
    },
  };
};

const trimGrowthData = (data: any) => {
  const blackList = ["Engineering.DataAnalytics"];
  blackList.forEach((key) => {
    if (isNil(get(data, key))) return;
    const splittedKeys = key.split(".");
    let d = null;
    for (let i = 0; i < splittedKeys.length - 1; i++) {
      d = data[splittedKeys[i]];
    }
    delete d[splittedKeys[splittedKeys.length - 1]];
  });
  return data;
};

const exportUrlAddress = ref<string>("");
const { copy } = useClipboard({ source: exportUrlAddress });
const activeTabIdx = ref(0);

export const useTabStore = defineStore("GrowthStore", () => {
  const idGenerator = (function* () {
    let i = 1;
    while (true) {
      if (tabData.value.find((t) => t.id === i)) {
        i++;
        continue;
      }
      yield i;
    }
  })();
  const createNewData = (customName?: string) => {
    const id = idGenerator.next().value;
    tabData.value.push({ id, name: customName || `Data ${id}`, growthData: getDefaultGrowthData() });
  };

  const importUrl = (urlString: string) => {
    const url = new URL(urlString);
    const queryValue = url.searchParams.get("m");
    if (!queryValue) {
      window.alert("Invalid URL");
      return;
    }
    tabData.value.push({
      id: idGenerator.next().value,
      growthData: pipe(queryValue, atob, JSON.parse, (data) => trimGrowthData(data)),
    });
  };

  const importJson = (jsonString: string, filename?: string) => {
    tabData.value.push({
      id: idGenerator.next().value,
      name: filename,
      growthData: pipe(
        jsonString,
        (txt) => txt.trim(),
        JSON.parse,
        (data) => trimGrowthData(data),
      ),
    });
  };
  const getTabData = (tabIndex: number) => {
    return tabData.value[tabIndex];
  };

  const exportUrl = (tabIndex: number) => {
    const tab = getTabData(tabIndex);
    exportUrlAddress.value = pipe(
      toRaw(tab?.growthData),
      JSON.stringify,
      btoa,
      (base64Data) => window.location.origin + `?m=${base64Data}`,
    );
    copy();
    toastStore.show({
      severity: "success",
      summary: "Success",
      detail: "Tab data url copied!",
    });
  };

  const exportJson = (tabIndex: number) => {
    const tab = getTabData(tabIndex);
    if (!tab) throw new Error("Cannot find growth data");

    try {
      pipe(
        toRaw(tab.growthData),
        (growthData) => "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(growthData)),
        (fileString) => {
          const a = document.createElement("a");
          a.setAttribute("href", fileString);
          a.setAttribute("download", getFilename(tab));
          document.body.appendChild(a); // required for firefox
          a.click();
          a.remove();
        },
      );
    } catch (error) {
      toastStore.show({
        severity: "error",
        summary: "Error",
        detail: `Fail to export "${getFilename(tab)}"`,
      });
      console.error(error);
    }
  };

  const deleteData = (id: number) => {
    const idx = tabData.value.findIndex((d) => d.id === id);
    tabData.value.splice(idx, 1);
  };

  return {
    tabData,
    activeTabIdx,
    createNewData,
    deleteData,
    importUrl,
    importJson,
    exportUrl,
    exportJson,
  };
});
