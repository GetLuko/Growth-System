import { computed } from "vue";
import { useLadderInfo } from "./useLadderInfo";
import { pipe, flatMap, map, reduce, filter, last, values } from "@fxts/core";

const milestoneToPoint = [0, 1, 3, 6, 12, 20];
const pointToLevel = [
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

const levelToTitle = {
  "3": "Engineer I",
  "4": "Engineer II",
  "5": "Senior Engineer (= EL)",
  "6": "Staff Engineer (= EM)",
  "7": "Principal Engineer (= SM)",
  "8": "Distinguished Engineer (= VP)",
};

export const useResult = () => {
  const { ladderInfo } = useLadderInfo();

  const points = computed(() => {
    return pipe(
      ladderInfo.value,
      values,
      flatMap(values),
      map((milestone) => milestoneToPoint[milestone]),
      reduce((a, b) => a + b),
    );
  });

  const level = computed(() => {
    return pipe(
      pointToLevel,
      filter((obj) => points.value >= obj.point),
      last,
      (last) => last.level,
    );
  });

  const title = computed(() => {
    const lv = level.value.match(/^\d*/)[0];
    return levelToTitle[lv];
  });

  return { points, level, title };
};
