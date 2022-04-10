import { computed, watch } from "vue";
import { pipe, flatMap, map, reduce, filter, last, values } from "@fxts/core";
import { storeGrowthData } from "@/states/storeGrowthData";
import { LevelsEnum } from "@/states/storeGrowthData/types";

const { growthData, milestoneToPoint, pointToLevel, levelToTitle } = storeGrowthData();

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

  const level = computed(() =>
    pipe(
      pointToLevel,
      filter((obj) => points.value >= obj.point),
      last,
      (last) => last?.level || pointToLevel[0].level,
    ),
  );

  const title = computed(() => {
    const lv = level.value.match(/^\d*/);

    return lv && lv[0] in LevelsEnum ? levelToTitle[lv[0] as LevelsEnum] : levelToTitle[LevelsEnum.lv3];
  });

  return { points, level, title };
};
