// import React, { useEffect, useMemo, useState } from "react";
// import dayjs from "dayjs";
// import axiosInstance from "../../components/common/AxiosInstance";
// import HeaderTitle from "../../components/common/HeaderTitle";
// import ReportFilterForm from "../../components/common/ReportFilterForm";
// import ReportHeaderActions from "../../components/common/ReportHeaderActions";
// import ColumnChart from "../../components/common/ColumnChart";
// import DonutChart from "../../components/common/DonutChart";
// import ReportTable from "../../components/common/ReportTable";


// const Reports = () => {
//   const [projectOptions, setProjectOptions] = useState([]);
//   const [filteredRows, setFilteredRows] = useState([]);
//   const [columnChartConfig, setColumnChartConfig] = useState(null);
//   const [donutChartConfig, setDonutChartConfig] = useState(null);

//   const getLast7Days = () =>
//     Array.from({ length: 7 }).map((_, i) =>
//       dayjs().subtract(6 - i, "day").format("YYYY-MM-DD")
//     );

//   const fetchProjects = async () => {
//     try {
//       const res = await axiosInstance.get("/project/get-projects-by-user-id");
//       const options = (res.data?.data || []).map((p) => ({
//         value: p.ProjectId,
//         label: p.ProjectName,
//       }));

//       setProjectOptions(options);
//     } catch {
//       setProjectOptions([]);
//     }
//   };

//   // const fetchData = async (params) => {
//   //   try {
//   //     const res = await axiosInstance.get(
//   //       "/empTimesheet/get-week-overview",
//   //       { params }
//   //     );
//   //     setFilteredRows(res.data?.data || []);

//   //   } catch {
//   //     setFilteredRows([]);
//   //   }
//   // };

//   const fetchData = async (params) => {
//     try {
//       const res = await axiosInstance.get(
//         "/empTimesheet/get-week-overview",
//         { params }
//       );

//       const rows =
//         Array.isArray(res.data?.data)
//           ? res.data.data
//           : Array.isArray(res.data)
//             ? res.data
//             : [];

//       //setFilteredRows(rows);
//       setFilteredRows(res.data.data || []);
//     } catch (err) {
//       console.error("Report API error", err);
//       setFilteredRows([]);
//     }
//   };


//   const handleSearch = async (values) => {
//     const projectIds = values.project.map((p) => p.value);
//     await fetchData({
//       projectIds,
//       startDate: dayjs(values.startDate).format("YYYY-MM-DD"),
//       endDate: dayjs(values.endDate).format("YYYY-MM-DD"),
//       forDownload: true,
//     });
//   };

//   useEffect(() => {
//     fetchProjects();
//     fetchData({
//       startDate: dayjs().subtract(6, "days").format("YYYY-MM-DD"),
//       endDate: dayjs().format("YYYY-MM-DD"),
//       forDownload: true,
//     });
//   }, []);

//   useEffect(() => {
//     const categories = [
//       ...new Set(
//         filteredRows.map(r =>
//           dayjs(r.WorkDate).format("YYYY-MM-DD")
//         )
//       ),
//     ];

//     const projects = [...new Set(filteredRows.map((row) => row.ProjectName))];

//     const series = projects.map((project) => {
//       const data = categories.map((date) =>
//         filteredRows
//           .filter(
//             (r) =>
//               r.ProjectName === project &&
//               dayjs(r.WorkDate).format("YYYY-MM-DD") === date
//           )
//           .reduce((acc, r) => acc + (parseFloat(r.TotalTimeSpentInMinutes) || 0), 0)
//       );
//       return { name: project, data };
//     });

//     const donutData = projects.map((project) => ({
//       name: project,
//       y: filteredRows
//         .filter((r) => r.ProjectName === project)
//         .reduce((acc, r) => acc + (parseFloat(r.TotalTimeSpentInMinutes) || 0), 0),
//     }));

//     setColumnChartConfig({
//       chart: { type: "column" },
//       accessibility: { enabled: false },
//       title: { text: "Weekly Project Work Hours" },
//       xAxis: { categories, title: { text: "Date" } },
//       yAxis: { min: 0, title: { text: "Minutes" } },
//       series,
//       credits: { enabled: false },
//     });

//     setDonutChartConfig({
//       chart: { type: "pie" },
//       accessibility: { enabled: false },
//       title: { text: "Work Distribution" },
//       series: [{ name: "Minutes", colorByPoint: true, data: donutData }],
//       credits: { enabled: false },
//     });
//   }, [filteredRows]);

//   return (
//     <div className="p-6">
//       <HeaderTitle title="Report Dashboard" />

//       <div className="bg-white dark:bg-gray-800 p-4 rounded-md shadow mb-6">
//         <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4">
//           {/* Filters */}
//           <div className="flex flex-wrap gap-4 items-end">
//             <ReportFilterForm
//               projectOptions={projectOptions}
//               onSubmit={handleSearch}
//               compact
//             />
//           </div>

//           {/* Export Buttons */}
//           <div className="flex gap-2 justify-end items-center">
//             <ReportHeaderActions rows={filteredRows} />
//           </div>
//         </div>
//       </div>

//       {/* CHARTS */}
//       <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 mb-6">
//         <div className="lg:col-span-8">
//           {columnChartConfig && <ColumnChart config={columnChartConfig} />}
//         </div>
//         <div className="lg:col-span-4">
//           {donutChartConfig && <DonutChart config={donutChartConfig} />}
//         </div>
//       </div>

//       {/* TABLE */}
//       <ReportTable rows={filteredRows} />
//     </div>
//   );
// };

// export default Reports;


import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import { getWeeklyProjectHours } from "./Report/report.api";
import ReportCardWrapper from "./Report/ReportCardWrapper";
import { buildBarChart, buildDonutChart } from "./Report/reportCharts";



const WeeklyProjectReportCard = () => {
  const [bar, setBar] = useState(null);
  const [donut, setDonut] = useState(null);

  useEffect(() => {
    loadReport();
  }, []);

  const loadReport = async () => {
    const res = await getWeeklyProjectHours();
    const data = res.data.data;

    setBar(buildBarChart(data));
    setDonut(buildDonutChart(data));
  };

  const exportExcel = async () => {
    const res = await getWeeklyProjectHours({ forDownload: true });
    const rows = res.data.data;

    const csv =
      "Project,Hours\n" +
      rows.map(r => `${r.projectName},${r.totalHours}`).join("\n");

    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "weekly-project-report.csv";
    a.click();
  };

  const exportPDF = () => {
    window.open(
      `${import.meta.env.VITE_BASE_API_URL}/report/weekly-project-hours/export/pdf`,
      "_blank"
    );
  };

  return (
    <ReportCardWrapper
      title="Weekly Project Work Hours"
      actions={
        <>
          <button onClick={exportPDF} className="btn btn-danger">
            Export PDF
          </button>
          <button onClick={exportExcel} className="btn btn-success">
            Export Excel
          </button>
        </>
      }
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {bar && (
          <Chart
            options={bar.options}
            series={bar.series}
            type="bar"
            height={300}
          />
        )}

        {donut && (
          <Chart
            options={donut.options}
            series={donut.series}
            type="donut"
            height={300}
          />
        )}
      </div>
    </ReportCardWrapper>
  );
};

export default WeeklyProjectReportCard;
