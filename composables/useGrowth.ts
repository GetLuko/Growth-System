import { useTabStore } from "~~/stores/useTabStore";
import { storeToRefs } from "pinia";
import { pipe, flatMap, map, reduce, filter, last, first, values, entries } from "@fxts/core";
import { ILevelTitle, LevelsEnum } from "~~/types/Growth";

const tabStore = useTabStore();
const { tabData, activeTabIdx } = storeToRefs(tabStore);

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

const milestoneToPoint = [0, 1, 3, 6, 12, 20];

const currentGrowthData = computed(() => tabData.value[activeTabIdx.value]?.growthData || {});

export const useGrowth = () => {
  const points = computed(() =>
    pipe(
      currentGrowthData.value,
      values,
      flatMap(values),
      map((milestone) => milestoneToPoint[milestone]),
      reduce((a, b) => a + b),
    ),
  );

  const getCurrentPoint2Lvl = (points: number): undefined | [number, string] =>
    pipe(
      pointToLevel,
      entries,
      filter((p2l) => points >= p2l[0]),
      last,
    );
  const getNextPoint2Lvl = (points: number): undefined | [number, string] =>
    pipe(
      pointToLevel,
      entries,
      filter((p2l) => points < p2l[0]),
      first,
    );

  const level = computed(() => pipe(getCurrentPoint2Lvl(points.value), (p2l) => p2l?.[1] || pointToLevel[0]));

  const title = computed(() => {
    const lv = level.value.match(/^\d*/);
    return lv ? levelToTitle[lv[0] as LevelsEnum] : levelToTitle[LevelsEnum.lv3];
  });

  const progress = computed(() => {
    const currentLevelPoint = Number(getCurrentPoint2Lvl(points.value)?.[0] || pointToLevel[0]);
    const nextLevelPoint = Number(
      getNextPoint2Lvl(points.value)?.[0] || pipe(Object.entries(pointToLevel), last)?.[0] || 0,
    );

    return Math.round(((points.value - currentLevelPoint) / (nextLevelPoint - currentLevelPoint)) * 100);
  });

  return {
    points,
    level,
    title,
    progress,
    activeTabIdx,
    currentGrowthData,
  };
};
