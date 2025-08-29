// import Highcharts from "highcharts";
// import { useEffect, useRef } from "react";

// const DonutChart = ({ config }) => {
//   const chartRef = useRef(null);

//   useEffect(() => {
//     if (config && chartRef.current) {
//       Highcharts.chart(chartRef.current, config);
//     }
//   }, [config]);

//   return <div ref={chartRef} className="w-full h-96" />;
// };

// export default DonutChart;


import React, { useEffect, useRef } from "react";
import Highcharts from "highcharts";

const DonutChart = ({ config }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    if (config && chartRef.current) {
      Highcharts.chart(chartRef.current, config);
    }
  }, [config]);

  return (
    <div
      ref={chartRef}
      className="w-full h-[400px] bg-white shadow-md rounded-md p-4"
    />
  );
};

export default DonutChart;
