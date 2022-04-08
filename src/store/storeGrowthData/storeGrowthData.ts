import { reactive } from "vue";
import { IGrowthData } from "./types";

const growthData = reactive<IGrowthData>({
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

export const storeLadder = () => {
  growthData;
};
