import { useState } from "#app";
import { computed } from "vue";
import { useLadderInfo } from "./useLadderInfo";
import { pipe, flatMap, map, toArray, reduce, find } from "@fxts/core";

const milestoneToPoint = [0, 1, 3, 6, 12, 20];
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
const levelToTitle = {
  "3": "Engineer I",
  "4": "Engineer II",
  "5": "Senior Engineer (= EL)",
  "6": "Staff Engineer (= EM)",
  "7": "Principal Engineer (= SM)",
  "8": "Distinguished Engineer (= VP)",
};

export const useResult = () => {
  const ladderInfo = useLadderInfo();

  const points = computed(() => {
    return pipe(
      ladderInfo.value,
      Object.values,
      flatMap(Object.values),
      map((milestone) => milestoneToPoint[milestone]),
      reduce((a, b) => a + b),
    );
  });

  const level = computed(() => {
    return pipe(
      pointToLevel,
      Object.keys,
      find((levelPoint) => parseInt(levelPoint) >= points.value),
      (levelPoint) => pointToLevel[levelPoint],
    );
  });

  const title = computed(() => {
    const lv = level.value.match(/^\d*/)[0];
    return levelToTitle[lv];
  });

  return { points, level, title };
};
