import { IGrowthData, ILevelTitle } from "./types";
import { useStorage } from "@vueuse/core";

function DefaultGrowthData(): IGrowthData {
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
}

const growthData = useStorage<IGrowthData>("growth-data", DefaultGrowthData(), undefined, {
  serializer: {
    read: (v: any) => JSON.parse(atob(v)),
    write: (v: any) => btoa(JSON.stringify(v)),
  },
});

const otherGrowthData = useStorage<IGrowthData | null>("other-growth-data", null, undefined, {
  serializer: {
    read: (v: any) => (v ? JSON.parse(atob(v)) : null),
    write: (v: any) => btoa(JSON.stringify(v)),
  },
});

const pointToLevel = {
  0: "3.1",
  4: "3.2",
  9: "3.3",
  14: "4.1",
  19: "4.2",
  24: "4.3",
  31: "5.1",
  38: "5.2",
  45: "5.3",
  54: "6.1",
  63: "6.2",
  72: "6.3",
  84: "7.1",
  96: "7.2",
  108: "7.3",
  123: "8.1",
  138: "8.2",
  153: "8.3",
};

const levelToTitle: ILevelTitle = {
  "3": "Engineer I",
  "4": "Engineer II",
  "5": "Senior Engineer (= EL)",
  "6": "Staff Engineer (= EM)",
  "7": "Principal Engineer (= SEM)",
  "8": "Distinguished Engineer (= VPE)",
};

export const storeGrowthData = () => {
  return {
    DefaultGrowthData,
    growthData,
    otherGrowthData,
    milestoneToPoint: [0, 1, 3, 6, 12, 20],
    pointToLevel,
    levelToTitle,
  };
};
