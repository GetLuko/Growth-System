export type GrowthDomain = "Engineering" | "Execution" | "Supporting" | "Strengthening" | "DataAnalytics";
export type Engineering = {
  Frontend: number;
  Hardware: number;
  Mobile: number;
  DataEngineering: number;
  Ops: number;
  Backend: number;
  Firmware: number;
  MachineL: number;
};
export type Execution = {
  Delivery: number;
  Optimization: number;
  Communication: number;
  Quality: number;
};

export type Supporting = {
  GrowingTogether: number;
  Accomplishment: number;
  PeopleMinded: number;
  OrgDev: number;
};

export type Strengthening = {
  Mentorship: number;
  Recruitment: number;
  Evangelism: number;
  Community: number;
};

export type DataAnalytics = {
  BusinessAnalytics: number;
  ProductAnalytics: number;
  DataScience: number;
  BiEngineering: number;
};

export type GrowthData = {
  [key in GrowthDomain]: Engineering | Execution | Supporting | Strengthening | DataAnalytics;
};

export type TabData = { id: number; name?: string; growthData: GrowthData };

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
  violet = "violet",
  red = "red",
  green = "green",
  yellow = "yellow",
}

export type ILevelTitle = {
  [key in LevelsEnum]: string;
};

export enum GrowthDataTypeEnums {
  mine = "mine",
  other = "other",
}
