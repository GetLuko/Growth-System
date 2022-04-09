import { ref } from "vue";
import { IGrowthData, ILevelPoint, ILevelTitle } from "./types";

const growthData = ref<IGrowthData>({
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
});

const pointToLevel: Array<ILevelPoint> = [
  { point: 0, level: "3.1" },
  { point: 4, level: "3.2" },
  { point: 9, level: "3.3" },
  { point: 14, level: "4.1" },
  { point: 19, level: "4.2" },
  { point: 24, level: "4.3" },
  { point: 31, level: "5.1" },
  { point: 38, level: "5.2" },
  { point: 45, level: "5.3" },
  { point: 54, level: "6.1" },
  { point: 63, level: "6.2" },
  { point: 72, level: "6.3" },
  { point: 84, level: "7.1" },
  { point: 96, level: "7.2" },
  { point: 108, level: "7.3" },
  { point: 123, level: "8.1" },
  { point: 138, level: "8.2" },
  { point: 153, level: "8.3" },
];

const levelToTitle: ILevelTitle = {
  "3": "Engineer I",
  "4": "Engineer II",
  "5": "Senior Engineer (= EL)",
  "6": "Staff Engineer (= EM)",
  "7": "Principal Engineer (= SM)",
  "8": "Distinguished Engineer (= VP)",
};

export const storeGrowthData = () => {
  return {
    growthData,
    milestoneToPoint: [0, 1, 3, 6, 12, 20],
    pointToLevel,
    levelToTitle,
  };
};
