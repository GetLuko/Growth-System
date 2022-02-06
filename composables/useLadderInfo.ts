import { ILadderInfo } from "~/interface/LadderInfo.interface";
import { useState } from "#app";

const init = {
  Engineering: {
    Frontend: 0,
    Hardware: 0,
    Mobile: 0,
    DataEngineering: 0,
    DataAnalytics: 0,
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

export const useLadderInfo = () => {
  const ladderInfo = useState<ILadderInfo>("LadderInfo", () => {
    try {
      return JSON.parse(atob(location.search.replace('?m=', '')))
    } catch(err) {
      return init
    }
  });
  const chartId = useState<number>(("graphId", () => Date.now()));

  window.onpopstate = function(event) {
    try {
      ladderInfo.value = JSON.parse(atob(event.target.location.search.replace('?m=', '')))
      chartId.value = Date.now();
    } catch(err) {
    }
  }

  const reader = new FileReader();
  reader.onload = (e: any) => {
    try {
      const res = JSON.parse(e.target.result);
      ladderInfo.value = res;
    } catch (error) {
      alert("Invalid JSON file");
    } finally {
      chartId.value = Date.now();
    }
  };

  return {
    ladderInfo,
    exportLadderInfo: () => {
      try {
        const dataStr =
          "data:text/json;charset=utf-8," +
          encodeURIComponent(JSON.stringify(ladderInfo.value));
        const aTag = document.createElement("a");

        aTag.setAttribute("href", dataStr);
        aTag.setAttribute("download", `ladder_info.json`);
        document.body.appendChild(aTag); // required for firefox
        aTag.click();
        aTag.remove();
      } catch (error) {
        console.error("Fail to export", error);
      }
    },
    importLadderInfo: (file) => {
      reader.readAsText(file);
    },
    chartId,
  };
};
