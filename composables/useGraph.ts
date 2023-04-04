import * as d3 from "d3";
import { computed, ref } from "vue";
import { useTabStore } from "~~/stores/useTabStore";
import { useWindowSize } from "@vueuse/core";
import { GrowthData, GrowthDomain, Engineering, Execution, Supporting, Strengthening } from "~~/types/Growth";
import { IGraphData, IGraphSkill } from "~~/types/Graph";
import { storeToRefs } from "pinia";

const { width: windowWidth } = useWindowSize();
const { tabData, activeTabIdx } = storeToRefs(useTabStore());

const colorMap = {
  blue: "rgba(88, 117, 236)",
  red: "rgba(217, 87, 98)",
  green: "rgba(85, 164, 151)",
  yellow: "rgba(200, 157, 70)",
  violet: "rgba(128, 0, 255)",
};

export const useGraph = () => {
  const cfg = {
    w: windowWidth.value > 570 ? 570 : windowWidth.value - 30,
    h: windowWidth.value > 570 ? 570 : windowWidth.value - 30,
    maxValue: 6,
    levels: 6,
    opacityArea: 0.2,
    radius: 10,
    radians: 2 * Math.PI,
    factorLegend: 0.6,
    ToRight: 0,
    TranslateX: 15,
    TranslateY: 15,
    ExtraWidthX: 30,
    ExtraWidthY: 30,
  };
  let dataValues: any[] = [];
  let maxAxisValues: any[] = [];

  function init(title: keyof GrowthData, color: string) {
    const growthData = tabData.value[activeTabIdx.value].growthData;
    if (!growthData) return;

    const data: IGraphData = {
      name: title.replace(" ", "-"),
      skills: computed(() => {
        return Object.entries(growthData[title]).map(([axis, value], idx) => ({
          axis,
          value: value + 1,
          order: idx,
        }));
      }),
      color: color,
    };

    const allAxis = data.skills.value.map((skill) => skill.axis);
    const total = allAxis.length;
    d3.select(`#${title}`).select("svg").remove();

    const g = d3
      .select(`#${title}`)
      .append("svg")
      .attr("width", cfg.w + cfg.ExtraWidthX)
      .attr("height", cfg.h + cfg.ExtraWidthY)
      .append("g")
      .attr("transform", "translate(" + cfg.TranslateX + "," + cfg.TranslateY + ")")
      .attr("id", "chartArea");

    for (let j = 0; j < cfg.levels; j++) {
      const levelFactor = Math.min(cfg.w / 2, cfg.h / 2) * ((j + 1) / cfg.levels);

      //Web
      g.selectAll(".levels")
        .data(allAxis)
        .enter()
        .append("svg:line")
        .attr("x1", function (d, i) {
          return levelFactor * (1 - Math.sin((i * cfg.radians) / total));
        })
        .attr("y1", function (d, i) {
          return levelFactor * (1 - Math.cos((i * cfg.radians) / total));
        })
        .attr("x2", function (d, i) {
          return levelFactor * (1 - Math.sin(((i + 1) * cfg.radians) / total));
        })
        .attr("y2", function (d, i) {
          return levelFactor * (1 - Math.cos(((i + 1) * cfg.radians) / total));
        })
        .attr("class", "web")
        .style("stroke", "white")
        .style("stroke-opacity", "0.75")
        .style("stroke-width", "0.3px")
        .attr("transform", "translate(" + (cfg.w / 2 - levelFactor) + ", " + (cfg.h / 2 - levelFactor) + ")");

      //Text labels along 12 0'clock axis [1-10]
      g.selectAll(".levels")
        .data([1]) //dummy data
        .enter()
        .append("svg:text")
        .attr("x", function (d) {
          return levelFactor * (1 - Math.sin(0));
        })
        .attr("y", function (d) {
          return levelFactor * (1 - Math.cos(0));
        })
        .attr("class", "skill-value")
        .style("font-family", "Circular")
        .style("font-size", "12px")
        .attr(
          "transform",
          "translate(" + (cfg.w / 2 - levelFactor + cfg.ToRight) + ", " + (cfg.h / 2 - levelFactor) + ")",
        )
        .attr("fill", "white")
        .text((j * cfg.maxValue) / cfg.levels);
    }

    drawAxis();
    initPolygon();
    drawNode();

    function drawAxis() {
      var axis = g
        .selectAll(".axis")
        .data(allAxis)
        .enter()
        .append("g")
        .attr("class", "axis")
        .attr("id", function (d) {
          return d;
        });

      //Axis lines
      axis
        .append("line")
        .attr("x1", cfg.w / 2)
        .attr("y1", cfg.h / 2)
        .attr("x2", function (j, i) {
          maxAxisValues[i] = { x: (cfg.w / 2) * (1 - Math.sin((i * cfg.radians) / total)), y: 0 };
          return maxAxisValues[i].x;
        })
        .attr("y2", function (j, i) {
          maxAxisValues[i].y = (cfg.h / 2) * (1 - Math.cos((i * cfg.radians) / total));
          return maxAxisValues[i].y;
        })
        .attr("class", "line")
        .style("stroke", "grey")
        .style("stroke-width", "1px");

      //Axis labels
      axis
        .append("text")
        .attr("class", "skill-legend")
        .text(function (d) {
          return d;
        })
        .style("font-family", "Circular")
        .style("font-size", "14px")
        .style("cursor", "pointer")
        .style("fill", "white")
        .attr("text-anchor", "middle")
        .attr("dy", "1.5em")
        .attr("transform", "translate(0, -10)")
        .attr("x", function (d, i) {
          return (cfg.w / 2) * (1 - cfg.factorLegend * Math.sin((i * cfg.radians) / total));
        })
        .attr("y", function (d, i) {
          return (cfg.h / 2) * (1 - cfg.factorLegend * Math.cos((i * cfg.radians) / total));
        });
    }

    //Fill Areas
    function initPolygon() {
      dataValues = [];

      g.selectAll(".nodes").data(data.skills.value, function (j, i) {
        return dataValues.push([
          (cfg.w / 2) *
            (1 -
              (parseFloat(Math.max((j as IGraphSkill).value, 0).toString()) / cfg.maxValue) *
                Math.sin((i * cfg.radians) / total)),
          (cfg.h / 2) *
            (1 -
              (parseFloat(Math.max((j as IGraphSkill).value, 0).toString()) / cfg.maxValue) *
                Math.cos((i * cfg.radians) / total)),
        ]);
      });
      dataValues.push(dataValues[0]);

      g.selectAll(".area")
        .data([dataValues])
        .enter()
        .append("polygon")
        .attr("id", "radar-chart-area-" + title)
        .style("stroke-width", "2px")
        .style("stroke", data.color)
        .attr("points", function (d) {
          var str = "";
          for (var pti = 0; pti < d.length; pti++) {
            str = str + d[pti][0] + "," + d[pti][1] + " ";
          }
          return str;
        })
        .style("fill", function (j, i) {
          return data.color;
        })
        .style("fill-opacity", cfg.opacityArea);
    }

    function dragend(event: any, i: IGraphSkill) {
      move.call(this, event, i, true);
      g.selectAll(".node").remove();
      tabData.value[activeTabIdx.value].growthData[title as GrowthDomain][i.axis] = i.value - 1;

      drawNode();
    }

    function move(event, i: IGraphSkill, isSticky = false) {
      this.parentNode.appendChild(this);
      var dragTarget = d3.select(this);

      var oldData = dragTarget.data()[0];
      var oldX = parseFloat(dragTarget.attr("cx")) - cfg.w / 2;
      var oldY = cfg.h / 2 - parseFloat(dragTarget.attr("cy"));

      //Bug for vector @ 270deg -Infinity/Infinity slope
      oldX = Math.abs(oldX) < 0.0000001 ? 0 : oldX;
      oldY = Math.abs(oldY) < 0.0000001 ? 0 : oldY;

      var newY = 0,
        newX = 0,
        newValue = 0;
      var maxX = maxAxisValues[i.order].x - cfg.w / 2;
      var maxY = cfg.h / 2 - maxAxisValues[i.order].y;

      if (oldX === 0) {
        newY = oldY - event.dy;

        if (Math.abs(newY) > Math.abs(maxY)) {
          newY = maxY;
        }
        newValue = ((newY / oldY) * oldData.value).toFixed(2);
      } else {
        var slope = oldY / oldX;

        newX = event.dx + parseFloat(dragTarget.attr("cx")) - cfg.w / 2;

        if (Math.abs(newX) > Math.abs(maxX)) {
          newX = maxX;
        }
        newY = newX * slope;

        var ratio = newX / oldX;
        newValue = (ratio * oldData.value).toFixed(2);
      }

      //Bound the drag behavior to the max and min of the axis, not by pixels but by value calc (easier)
      if (newValue >= 1 && newValue <= cfg.levels) {
        dragTarget
          .attr("cx", function () {
            return newX + cfg.w / 2;
          })
          .attr("cy", function () {
            return cfg.h / 2 - newY;
          });

        //Updating the data set with the new value
        dragTarget.data()[0].value = isSticky ? Math.round(newValue) : newValue;

        //center display for value
        d3.select(".updatevalue.skill")
          .text(dragTarget.data()[0].axis)
          .style("display", "block")
          .style("font-size", "12px")
          .style("text-align", "center")
          .style("margin", "20px 0 5px 0");

        d3.select(".updatevalue.value")
          .text(newValue)
          .style("display", "block")
          .style("text-align", "center")
          .style("visibility", "visible");
      } else {
        if (newValue <= 1) {
          newValue = 1;
        } else if (newValue >= cfg.levels) {
          newValue = cfg.levels;
        }
        dragTarget.on("drag", null);
      }
      updatePoly();
    }

    function updatePoly() {
      dataValues = [];

      g.selectAll(".nodes").data(data.skills.value, (j, i) =>
        dataValues.push([
          (cfg.w / 2) *
            (1 -
              (parseFloat(Math.max((j as IGraphSkill).value, 0).toString()) / cfg.maxValue) *
                Math.sin((i * cfg.radians) / total)),
          (cfg.h / 2) *
            (1 -
              (parseFloat(Math.max((j as IGraphSkill).value, 0).toString()) / cfg.maxValue) *
                Math.cos((i * cfg.radians) / total)),
        ]),
      );

      dataValues = [dataValues];

      g.selectAll(`#radar-chart-area-${title}`)
        .data(dataValues)
        .attr("points", function (d) {
          var str = "";
          for (var pti = 0; pti < d.length; pti++) {
            str = str + d[pti][0] + "," + d[pti][1] + " ";
          }
          return str;
        });
    }

    //Put circles on the polygon at inflection points
    function drawNode() {
      g.selectAll(".nodes")
        .data(data.skills.value)
        .enter()
        .append("svg:circle")
        .attr("class", "node")
        .attr("id", (skill) => "radar-chart-points-" + skill.axis)
        .attr("r", cfg.radius)
        .attr("alt", function (j) {
          return Math.max(j.value, 0);
        })
        .attr("cx", function (j, i) {
          return (cfg.w / 2) * (1 - (Math.max(j.value, 0) / cfg.maxValue) * Math.sin((i * cfg.radians) / total));
        })
        .attr("cy", function (j, i) {
          return (cfg.h / 2) * (1 - (Math.max(j.value, 0) / cfg.maxValue) * Math.cos((i * cfg.radians) / total));
        })
        .attr("data-id", function (j) {
          return j.axis;
        })
        .style("fill", data.color)
        .style("fill-opacity", 0.75)
        .style("z-index", 12)
        .style("cursor", "pointer")
        .on("mouseover", function (event, i) {
          event.target.setAttribute("r", cfg.radius + 4);
        })
        .on("mouseout", function (event, i) {
          event.target.setAttribute("r", cfg.radius);
        })
        .call(d3.drag().on("drag", move).on("end", dragend));
    }
  }

  return {
    init,
    colorMap,
  };
};
