import Chart from "chart.js";
import theme from "./theme";
const { fonts } = theme;

const buildScales = (axes: any) => {
  const scales = {
    xAxes: [
      {
        ticks: {
          fontFamily: fonts.inter,
          fontSize: 15,
        },
      },
    ],
    yAxes: [
      {
        ticks: {
          beginAtZero: true,
          fontFamily: fonts.inter,
          fontSize: 12,
        },
      },
    ],
  };

  return axes ? scales : null;
};

const buildLegend = (legend: any) => {
  const leg = {
    position: "right",
    align: "start",
    labels: {
      fontFamily: fonts.inter,
    },
  };
  return legend ? leg : null;
};

const buildChart = (config: any) => {
  const {
    ctx,
    chartType,
    labels,
    data,
    backgroundColor,
    borderColor,
    axes,
    legend,
    textTitle,
  } = config;

  return new Chart(ctx, {
    type: chartType,
    responsive: true,
    maintainAspectRatio: false,
    data: {
      labels,
      datasets: [
        {
          data,
          backgroundColor,
          borderColor,
          borderWidth: 1,
        },
      ],
    },
    options: {
      scales: buildScales(axes),
      legend: buildLegend(legend),
      title: {
        display: true,
        text: textTitle,
        fontSize: 25,
      },
      tooltips: {
        titleFontFamily: fonts.inter,
        bodyFontFamily: fonts.inter,
        cornerRadius: 3,
      },
    },
  });
};

export default buildChart;
