import { computed } from "vue";
import { pipe, flatMap, map, reduce, filter, last, first, values, entries } from "@fxts/core";
import { storeGrowthData } from "@/states/storeGrowthData";
import { LevelsEnum } from "@/states/storeGrowthData/types";

const { DefaultGrowthData, growthData, otherGrowthData, milestoneToPoint, pointToLevel, levelToTitle } =
  storeGrowthData();

export const useGrowthData = () => {
  const points = computed(() =>
    pipe(
      growthData.value,
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

  const cleanGrowthData = () => {
    growthData.value = DefaultGrowthData();
  };
  const cleanOtherGrowthData = () => {
    otherGrowthData.value = null;
  };
  const cleanAllGrowthData = () => {
    cleanGrowthData();
    cleanOtherGrowthData();
  };
  const hasOtherGrowthData = () => !!otherGrowthData.value;

  return { points, level, title, progress, cleanOtherGrowthData, hasOtherGrowthData, cleanAllGrowthData };
};
