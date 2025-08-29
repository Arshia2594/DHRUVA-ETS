// import Highcharts from "highcharts";
// import { useEffect, useRef } from "react";

// const ColumnChart = ({ config }) => {
//   const chartRef = useRef(null);

//   useEffect(() => {
//     if (config && chartRef.current) {
//       Highcharts.chart(chartRef.current, config);
//     }
//   }, [config]);

//   return <div ref={chartRef} className="w-full h-96" />;
// };

// export default ColumnChart;

import React, { useEffect, useRef } from "react";
import Highcharts from "highcharts";

const ColumnChart = ({ config }) => {
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

export default ColumnChart;
