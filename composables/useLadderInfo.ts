import { ILadderInfo } from "~/interface/LadderInfo.interface";
import { useState } from "#app";

export const useLadderInfo = () => {
  return useState(
    "LadderInfo",
    (): ILadderInfo => ({
      Engineering: {
        Frontend: 0,
        Hardware: 0,
        Mobile: 0,
        Data: 0,
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
    }),
  );
};
