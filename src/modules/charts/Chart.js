import React from "react";
import {
  Chart,
  ChartTitle,
  ChartLegend,
  ChartSeries,
  ChartTooltip,
  ChartSeriesItem,
  ChartCategoryAxis,
  ChartCategoryAxisTitle,
  ChartCategoryAxisItem,
} from "@progress/kendo-react-charts";
import { COLORS } from "./constants";

// Graph data
const series = [
  {
    status: "Взято задач",
    data: [43, 30, 59, 29, 40, 18, 49, 20],
    color: COLORS.first,
  },
  {
    status: "Выполнено задач",
    data: [25, 15, 30, 39, 69, 20, 12, 74],
    color: COLORS.second,
  }
];

const categories = ["1-st", "2-nd", "3-rd", "4-th", "5-th", "6-th", "7-th", "8-th"];

const renderTooltip = context => {
  const { value } = context.point || context;
  return (
    <div>
      {value} tasks passed
    </div>
  );
};

const seriesLabels = {
  padding: 3,
  font: "normal 16px Open Sans, sans-serif",
  position: "center",
};

const ChartBar = props => {
  return (
    <Chart transitions={false}>
      <ChartTitle/>
      <ChartLegend position="bottom" orientation="horizontal" />
      <ChartTooltip render={renderTooltip} />
      <ChartCategoryAxis>
        <ChartCategoryAxisItem categories={categories}>
          <ChartCategoryAxisTitle text="" />
        </ChartCategoryAxisItem>
      </ChartCategoryAxis>
      <ChartSeries>
        {series.map((item, idx) => (
          <ChartSeriesItem
            key={idx}
            type="column"
            gap={1}
            spacing={0.05}
            labels={seriesLabels}
            data={item.data}
            name={item.status}
            color={item.color}
          />
        ))}
      </ChartSeries>
    </Chart>
  );
};

export default ChartBar;