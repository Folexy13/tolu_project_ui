import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

import { useLayoutEffect, useRef } from "react";

am4core.useTheme(am4themes_animated);

export const Chart = ({ chartdata }) => {
  const chart = useRef(null);
  useLayoutEffect(() => {
    let x = am4core.create("chartdiv", am4charts.XYChart);

    let title = x.titles.create();
    title.text = " Transaction date Vs Quantity purchased";
    title.fontSize = 20;
    title.align = "center";
    x.paddingRight = 20;

    let data = [];
    for (let i = 1; i < chartdata?.length; i++) {
      data.push({
        date: chartdata[i].createdAt,
        name: "name" + i,
        value: chartdata[i]?.quantity,
        axisLabel: chartdata[i]?.stockItem.stockName,
      });
    }
    x.data = data;

    let dateAxis = x.xAxes.push(new am4charts.DateAxis());
    dateAxis.renderer.grid.template.location = 0;
    dateAxis.title.text = "Purchase date(M/D)";

    let valueAxis = x.yAxes.push(new am4charts.ValueAxis());
    valueAxis.tooltip.disabled = true;
    valueAxis.renderer.minWidth = 35;
    valueAxis.title.text = "Quantity(unit)";

    let series = x.series.push(new am4charts.LineSeries());
    series.dataFields.dateX = "date";
    series.dataFields.valueY = "value";
    series.tooltipText = "{valueY.value}";
    x.cursor = new am4charts.XYCursor();

    let scrollbarX = new am4charts.XYChartScrollbar();
    scrollbarX.series.push(series);
    x.scrollbarX = scrollbarX;

    x.cursor = new am4charts.XYCursor();
    dateAxis.tooltip.label.adapter.add("text", function (text, target) {
      if (target.dataItem) {
        return target.dataItem.dataContext.axisLabel;
      }
      return text;
    });

    chart.current = x;

    return () => {
      x.dispose();
    };
  }, [chartdata]);

  return <div id="chartdiv" style={{ width: "100%", height: "500px" }}></div>;
};
