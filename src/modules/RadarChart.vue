<template>
  <canvas ref="ctx" width="600" height="400"></canvas>
</template>

<script lang="ts" setup>
import { Chart, RadialLinearScale, RadarController, PointElement, LineElement, Filler, Legend } from "chart.js";
import "chartjs-plugin-dragdata";
import { onMounted, ref, PropType } from "vue";
import { storeGrowthData } from "../states/storeGrowthData";
import { useIO } from "../composables/useIO";

enum ColorsEnum {
  blue = "blue",
  red = "red",
  green = "green",
  yellow = "yellow",
}
const { growthData } = storeGrowthData();
const { exportToURL } = useIO();
const props = defineProps({
  data: {
    type: Object as PropType<any>,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  color: {
    type: String as PropType<ColorsEnum>,
    default: "blue",
  },
});

Chart.register(RadialLinearScale, RadarController, PointElement, LineElement, Filler, Legend);
const ctx = ref(null);
const colorMap = {
  blue: "rgba(88, 117, 236)",
  red: "rgba(217, 87, 98)",
  green: "rgba(85, 164, 151)",
  yellow: "rgba(200, 157, 70)",
};
const color = colorMap[props.color] || colorMap["blue"];
const labels = Object.keys(props.data);

onMounted(() => {
  if (!ctx.value) return console.error("No canvas element");

  new Chart(ctx.value, {
    type: "radar",
    data: {
      labels: labels,
      datasets: [
        {
          label: props.title,
          data: Object.values(props.data),
          backgroundColor: color.replace(")", ",0.2)"),
          borderColor: color,
          pointBackgroundColor: color,
          pointBorderColor: "#fff",
          pointHoverBackgroundColor: "#fff",
          pointHoverBorderColor: color,
          pointHitRadius: 30,
        },
      ],
    },
    options: {
      elements: {
        point: {
          radius: 5,
        },
      },
      responsive: true,
      onHover: function (e: any) {
        const point = e.chart.getElementsAtEventForMode(e, "nearest", { intersect: true }, false);
        if (point.length) e.native.target.style.cursor = "grab";
        else e.native.target.style.cursor = "default";
      },
      plugins: {
        legend: {
          labels: {
            font: {
              size: 24,
            },
          },
        },
        dragData: {
          round: 1,
          showTooltip: false,
          onDragStart: function (e) {
            console.log(e);
          },
          onDrag: function (e, datasetIndex, index, value) {
            e.target.style.cursor = "grabbing";
            // console.log(e, datasetIndex, index, value)
          },
          onDragEnd: function (e, datasetIndex, index, value) {
            e.target.style.cursor = "default";
            growthData.value[props.title][labels[index]] = value;
            exportToURL();
          },
          magnet: {
            to: Math.round, // to: (value) => value + 5
          },
        },
      },
      scales: {
        r: {
          max: 5,
          min: -1,
          stepSize: 1,
          pointLabels: {
            font: {
              size: 14,
            },
          },
        },
      },
    },
  });
});
</script>
