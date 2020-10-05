import React, { useRef, useEffect } from "react";
import { buildChart, backgroundColor, borderColor } from "../utils/index";

interface PropTypes {
  topSalesData: any;
  totalPurchase: number;
}

const Analytics: React.FC<PropTypes> = ({ topSalesData, totalPurchase }) => {
  const topSalesChart = useRef(null);

  const initSalesChart = () => {
    const ctx = topSalesChart.current;
    const sortTypes = "Subtotal";

    //*Sort data from highest to lowest
    const sortedData = topSalesData.sort(
      (a: any, b: any) => b[sortTypes] - a[sortTypes]
    );

    const labels = sortedData.map((label: any) => label.product);
    const data = sortedData.map((data: any) => data[sortTypes]);

    if (data.length > 0) {
      const chartType = "bar";
      const axes = true;
      const legend = false;
      const textTitle = "Top Sales Analytics";
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

  useEffect(initSalesChart, []);

  return (
    <div className="container mx-auto px-8 mt-4 sm:block hidden">
      <div className="mb-4 flex items-center">
        <section>
          <span className="font-bold md:text-xl text-lg">Total : </span>
          <span className="font-bold md:text-xl text-lg text-red-500">
            ₱{totalPurchase.toLocaleString()}
          </span>
        </section>
      </div>
      <div className="">
        <canvas ref={topSalesChart} height="40vh" width="80vw" />
      </div>
    </div>
  );
};

export default Analytics;
