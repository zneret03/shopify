import React, { useRef, useEffect } from "react";
import { buildChart, months, MontColor } from "../../utils/index";

interface PropTypes {
  soldProduct: any;
  width: string;
  height: string;
  axes: boolean;
  legend: boolean;
  chartType: string;
}

const DoughnutChart: React.FC<PropTypes> = ({
  soldProduct,
  width,
  height,
  axes,
  legend,
  chartType,
}) => {
  const MonthlySales = useRef(null);

  //**render pie chart with monthly sales
  const initMonthlySales = () => {
    const ctx = MonthlySales.current;
    const sortTypes = "Subtotal";
    //*Get month for monthly sales
    const fetchTimeStamp: any = soldProduct.map((obj: any) => obj.timestamp);
    const timestamp = fetchTimeStamp.map((timeStamp: any) => {
      const today = new Date(timeStamp);
      const slice = today.getMonth();
      return slice;
    });

    //const labels = sortedData.map((label: any) => label.product);
    const data: Object[] = [];
    const sampleData = soldProduct.reduce(
      (a: any, b: any) => a + b[sortTypes],
      0
    );
    const labels = timestamp.map((time: any) => months[time]);

    if (sampleData) {
      data.push(sampleData);
      const textTitle = "Monthly Sales";
      const borderColor = labels.map((month: any) => MontColor[month]);
      const backgroundColor = borderColor.map((color: any) => `${color}D3`);
      const config = {
        ctx,
        chartType,
        labels,
        data,
        backgroundColor,
        borderColor,
        axes,
        legend,
        textTitle,
      };

      buildChart(config);
    }
  };

  useEffect(initMonthlySales, [soldProduct]);

  return (
    <div className="container mx-auto px-8 py-4 mt-4 sm:block hidden">
      <div className="">
        <canvas ref={MonthlySales} height={width} width={height} />
      </div>
    </div>
  );
};

export default DoughnutChart;
