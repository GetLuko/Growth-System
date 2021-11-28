<template>
  <canvas ref="ctx" width="450" height="450"></canvas>
</template>

<script>
import Chart from "chart.js/auto";
import "chartjs-plugin-dragdata";
import { onMounted, ref } from "vue";

export default {
  props: {
    data: {
      type: Object,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    color: {
      type: String,
      default: "blue",
    },
  },
  setup(props) {
    const ctx = ref(null);
    const colorMap = {
      blue: "rgba(54, 162, 235)",
      red: "rgba(255, 99, 132)",
      green: "rgba(36, 176, 26)",
      yellow: "rgba(199, 185, 38)",
    };
    const color = colorMap[props.color] || colorMap["blue"];

    onMounted(() => {
      if (!ctx.value) return console.error("No canvas element");

      new Chart(ctx.value, {
        type: "radar",
        data: {
          labels: Object.keys(props.data),
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
            },
          ],
        },
        options: {
          elements: {
            point: {
              radius: 5,
            },
          },
          responsive: false,
          onHover: function (e) {
            const point = e.chart.getElementsAtEventForMode(
              e,
              "nearest",
              { intersect: true },
              false,
            );
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
                // console.log(e)
              },
              onDrag: function (e, datasetIndex, index, value) {
                e.target.style.cursor = "grabbing";
                // console.log(e, datasetIndex, index, value)
              },
              onDragEnd: function (e, datasetIndex, index, value) {
                e.target.style.cursor = "default";
                // console.log(datasetIndex, index, value)
              },
              magnet: {
                to: Math.round, // to: (value) => value + 5
              },
            },
          },
          scales: {
            r: {
              max: 6,
              min: -1,
              stepSize: 1,
              pointLabels: {
                font: {
                  size: 16,
                },
              },
            },
          },
        },
      });
    });
    return {
      ctx,
    };
  },
};
</script>
