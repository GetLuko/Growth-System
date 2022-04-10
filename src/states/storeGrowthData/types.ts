export interface IGrowthData {
  Engineering: {
    Frontend: number;
    Hardware: number;
    Mobile: number;
    DataEngineering: number;
    Ops: number;
    Backend: number;
    Firmware: number;
    MachineL: number;
  };
  Execution: {
    Delivery: number;
    Optimization: number;
    Communication: number;
    Quality: number;
  };
  Supporting: {
    GrowingTogether: number;
    Accomplishment: number;
    PeopleMinded: number;
    OrgDev: number;
  };
  Strengthening: {
    Mentorship: number;
    Recruitment: number;
    Evangelism: number;
    Community: number;
  };
}

export interface ILevelPoint {
  point: number;
  level: string;
}

export enum LevelsEnum {
  lv3 = "3",
  lv4 = "4",
  lv5 = "5",
  lv6 = "6",
  lv7 = "7",
  lv8 = "8",
}

export enum ColorsEnum {
  blue = "blue",
  red = "red",
  green = "green",
  yellow = "yellow",
}

export type ILevelTitle = {
  [key in LevelsEnum]: string;
};
