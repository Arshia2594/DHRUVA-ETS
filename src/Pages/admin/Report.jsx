// import { useEffect, useRef, useState } from "react";
// import { Formik, Form } from "formik";
// import * as Yup from "yup";
// import dayjs from "dayjs";
// import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
// import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
// import Highcharts from "highcharts";
// import axios from "axios";


// import Dropdown from "../../components/common/Dropown";
// import FormikDatePicker from "../../components/common/FormikDatePicker";
// import HeaderTitle from "../../components/common/HeaderTitle";
// import MUIButton from "../../components/common/MUIButton";

// dayjs.extend(isSameOrAfter);
// dayjs.extend(isSameOrBefore);

// const validationSchema = Yup.object({
//   startDate: Yup.date().required("Start date is required"),
//   endDate: Yup.date()
//     .required("End date is required")
//     .min(Yup.ref("startDate"), "End date must be after the start date"),
// });

// const Reports = () => {
//   const [filteredRows, setFilteredRows] = useState([]);
//   const [projectOptions, setProjectOptions] = useState([]);
//   const [columnChartConfig, setColumnChartConfig] = useState(null);
//   const [donutChartConfig, setDonutChartConfig] = useState(null);

//   const columnChartContainer = useRef(null);
//   const donutChartContainer = useRef(null);

//   const initialValues = {
//     project: [],
//     startDate: null,
//     endDate: null,
//   };

//   // Fetch projects
//   const fetchProjects = async () => {
//     try {
//       const response = await axios.get("/project/get-projects-by-user-id");
//       const options = response.data.map((p) => ({
//         value: p.ProjectId,
//         label: p.ProjectName,
//       }));
//       setProjectOptions(options);
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   useEffect(() => {
//     fetchProjects();
//     fetchDefaultData();
//   }, []);

//   const getLast7Days = () => {
//     const days = [];
//     for (let i = 6; i >= 0; i--) {
//       days.push(dayjs().subtract(i, "day").format("YYYY-MM-DD"));
//     }
//     return days;
//   };

//   const fetchDefaultData = async () => {
//     const defaultStart = dayjs().subtract(6, "day").format("YYYY-MM-DD");
//     const defaultEnd = dayjs().format("YYYY-MM-DD");

//     try {
//       const response = await axios.get("/empTimesheet/get-weekly-overview", {
//         params: { startDate: defaultStart, endDate: defaultEnd, forDownload: true },
//       });
//       setFilteredRows(response.data || []);
//     } catch (error) {
//       console.error(error);
//       setFilteredRows([]);
//     }
//   };

//   const handleSearch = async (values) => {
//     const { project, startDate, endDate } = values;
//     const projectIds = project?.map((p) => p.value);

//     try {
//       const response = await axios.get("/empTimesheet/get-weekly-overview", {
//         params: {
//           projectIds,
//           startDate: dayjs(startDate).format("YYYY-MM-DD"),
//           endDate: dayjs(endDate).format("YYYY-MM-DD"),
//           forDownload: true,
//         },
//       });
//       setFilteredRows(response.data || []);
//     } catch (error) {
//       console.error(error);
//       setFilteredRows([]);
//     }
//   };

//   // Setup Highcharts
//   useEffect(() => {
//     if (filteredRows.length === 0) return;

//     const categories = getLast7Days();
//     const projects = [...new Set(filteredRows.map((r) => r.ProjectName))];

//     const seriesData = projects.map((p) => {
//       const data = categories.map((date) =>
//         filteredRows
//           .filter((r) => r.ProjectName === p && dayjs(r.WorkDate).format("YYYY-MM-DD") === date)
//           .reduce((acc, r) => acc + (r.TotalTimeSpent || 0), 0)
//       );
//       return { name: p, data };
//     });

//     const donutData = projects.map((p) => ({
//       name: p,
//       y: filteredRows
//         .filter((r) => r.ProjectName === p)
//         .reduce((acc, r) => acc + (parseFloat(r.TotalTimeSpentInMinutes) || 0), 0),
//     }));

//     setColumnChartConfig({
//       chart: { type: "column" },
//       title: { text: "Project Work Hours" },
//       xAxis: { categories, title: { text: "Date" } },
//       yAxis: { min: 0, title: { text: "Hours" } },
//       series: seriesData,
//     });

//     setDonutChartConfig({
//       chart: { type: "pie" },
//       title: { text: "Work Hours Distribution" },
//       series: [{ name: "Hours", colorByPoint: true, data: donutData }],
//     });
//   }, [filteredRows]);

//   useEffect(() => {
//     if (columnChartConfig && columnChartContainer.current) {
//       Highcharts.chart(columnChartContainer.current, columnChartConfig);
//     }
//     if (donutChartConfig && donutChartContainer.current) {
//       Highcharts.chart(donutChartContainer.current, donutChartConfig);
//     }
//   }, [columnChartConfig, donutChartConfig]);

//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-6 text-gray-800">Report Dashboard</h1>

//       <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSearch}>
//         {() => (
//           <Form className="grid grid-cols-1 md:grid-cols-12 gap-4 mb-6 items-end">
//             <div className="md:col-span-3">
//               <Dropdown name="project" label="Project" options={projectOptions} />
//             </div>
//             <div className="md:col-span-3">
//               <FormikDatePicker name="startDate" label="Start Date" />
//             </div>
//             <div className="md:col-span-3">
//               <FormikDatePicker name="endDate" label="End Date" />
//             </div>
//             <div className="md:col-span-3 flex space-x-2">
//               <MUIButton type="submit" variant="contained" className="w-full flex items-center justify-center">
//                 🔍 Search
//               </MUIButton>
//             </div>
//           </Form>
//         )}
//       </Formik>

//       <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
//         <div className="md:col-span-2 h-96" ref={columnChartContainer}></div>
//         <div className="h-96" ref={donutChartContainer}></div>
//       </div>

//       <HeaderTitle
//         title="Employee Report Table"
//         buttons={[{ label: "Add", onClick: () => alert("Add clicked"), variant: "success" }]}
//       />

//       <div className="overflow-x-auto shadow rounded p-4 bg-white">
//         <table className="min-w-full divide-y divide-gray-200">
//           <thead className="bg-gray-100">
//             <tr>
//               <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Project Name</th>
//               <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Work Details</th>
//               <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Date</th>
//               <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Start Time</th>
//               <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">End Time</th>
//               <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Duration (Hours)</th>
//             </tr>
//           </thead>
//           <tbody className="divide-y divide-gray-200">
//             {filteredRows.map((row, idx) => (
//               <tr key={idx} className="hover:bg-gray-50">
//                 <td className="px-4 py-2">{row.ProjectName}</td>
//                 <td className="px-4 py-2">{row.WorkDetails}</td>
//                 <td className="px-4 py-2">{dayjs(row.WorkDate).format("YYYY-MM-DD")}</td>
//                 <td className="px-4 py-2">{row.WorkStartTime}</td>
//                 <td className="px-4 py-2">{row.WorkEndTime}</td>
//                 <td className="px-4 py-2">{row.TotalTimeSpent}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default Reports;

// Reports.jsx
// import React, { useEffect, useRef, useState } from "react";
// import { Formik, Form } from "formik";
// import * as Yup from "yup";
// import dayjs from "dayjs";
// import Highcharts from "highcharts";
// import "highcharts/modules/accessibility"; // just import, do not call
// import { MagnifyingGlassIcon } from "@heroicons/react/24/solid"; // Heroicons v2
// import Dropdown from "../../components/common/Dropown";
// import FormikDatePicker from "../../components/common/FormikDatePicker";
// import HeaderTitle from "../../components/common/HeaderTitle";
// import MUIButton from "../../components/common/MUIButton";
// import axiosInstance from "../../components/common/AxiosInstance";

// import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
// import isSameOrBefore from "dayjs/plugin/isSameOrBefore";

// dayjs.extend(isSameOrAfter);
// dayjs.extend(isSameOrBefore);

// // --- Validation Schema ---
// const validationSchema = Yup.object({
//   startDate: Yup.date().required("Start date is required"),
//   endDate: Yup.date()
//     .required("End date is required")
//     .min(Yup.ref("startDate"), "End date must be after the start date"),
// });

// const Reports = () => {
//   const [filteredRows, setFilteredRows] = useState([]);
//   const [projectOptions, setProjectOptions] = useState([]);

//   const columnChartContainer = useRef(null);
//   const donutChartContainer = useRef(null);

//   const [columnChartConfig, setColumnChartConfig] = useState(null);
//   const [donutChartConfig, setDonutChartConfig] = useState(null);

//   const initialValues = {
//     project: [],
//     startDate: dayjs().subtract(6, "days"),
//     endDate: dayjs(),
//   };

//   // --- Fetch Projects ---
//   const fetchProjects = async () => {
//     try {
//       const response = await axiosInstance.get("/project/get-projects-by-user-id");
//       const projects = Array.isArray(response.data) ? response.data : [];
//       const options = projects.map((p) => ({
//         value: p.ProjectId,
//         label: p.ProjectName,
//       }));
//       setProjectOptions(options);
//     } catch (error) {
//       console.error("Error fetching projects:", error);
//       setProjectOptions([]);
//     }
//   };

//   // --- Fetch Default Data ---
//   const fetchDefaultData = async () => {
//     try {
//       const response = await axiosInstance.get("/empTimesheet/get-weekly-overview", {
//         params: {
//           startDate: dayjs().subtract(6, "days").format("YYYY-MM-DD"),
//           endDate: dayjs().format("YYYY-MM-DD"),
//           forDownload: true,
//         },
//       });
//       const data = Array.isArray(response.data) ? response.data : [];
//       setFilteredRows(data);
//     } catch (error) {
//       console.error("Error fetching default data:", error);
//       setFilteredRows([]);
//     }
//   };

//   useEffect(() => {
//     fetchProjects();
//     fetchDefaultData();
//   }, []);

//   // --- Helper for last 7 days ---
//   const getLast7Days = () => {
//     return Array.from({ length: 7 }).map((_, i) =>
//       dayjs().subtract(6 - i, "day").format("YYYY-MM-DD")
//     );
//   };

//   // --- Handle Search ---
//   const handleSearch = async (values) => {
//     try {
//       const projectIds = values.project?.map((p) => p.value);
//       const response = await axiosInstance.get("/empTimesheet/get-weekly-overview", {
//         params: {
//           projectIds,
//           startDate: dayjs(values.startDate).format("YYYY-MM-DD"),
//           endDate: dayjs(values.endDate).format("YYYY-MM-DD"),
//           forDownload: true,
//         },
//       });
//       const data = Array.isArray(response.data) ? response.data : [];
//       setFilteredRows(data);
//     } catch (error) {
//       console.error(error);
//       setFilteredRows([]);
//     }
//   };

//   // --- Prepare Highcharts ---
//   useEffect(() => {
//     const categories = getLast7Days();
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
//       title: { text: "Weekly Project Work Hours" },
//       xAxis: { categories, title: { text: "Date" } },
//       yAxis: { min: 0, title: { text: "Hours" } },
//       series,
//       accessibility: { enabled: true },
//     });

//     setDonutChartConfig({
//       chart: { type: "pie" },
//       title: { text: "Work Hours Distribution" },
//       series: [{ name: "Hours", colorByPoint: true, data: donutData }],
//       accessibility: { enabled: true },
//     });
//   }, [filteredRows]);

//   useEffect(() => {
//     if (columnChartConfig && columnChartContainer.current) {
//       Highcharts.chart(columnChartContainer.current, columnChartConfig);
//     }
//     if (donutChartConfig && donutChartContainer.current) {
//       Highcharts.chart(donutChartContainer.current, donutChartConfig);
//     }
//   }, [columnChartConfig, donutChartConfig]);

//   return (
//     <div className="p-6">
//       <HeaderTitle title="Report Dashboard" />

//       <Formik
//         initialValues={initialValues}
//         validationSchema={validationSchema}
//         onSubmit={handleSearch}
//       >
//         {() => (
//           <Form className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end">
//             <div className="md:col-span-3">
//               <Dropdown name="project" label="Project" options={projectOptions} />
//             </div>
//             <div className="md:col-span-3">
//               <FormikDatePicker name="startDate" label="Start Date" />
//             </div>
//             <div className="md:col-span-3">
//               <FormikDatePicker name="endDate" label="End Date" />
//             </div>
//             <div className="md:col-span-3 flex gap-2">
//               <MUIButton
//                 type="submit"
//                 variant="contained"
//                 bgColor="#3e4282"
//                 hoverColor="#2c2f63"
//                 className="flex items-center gap-2 px-4"
//               >
//                 <MagnifyingGlassIcon className="w-5 h-5" /> Search
//               </MUIButton>
//             </div>
//           </Form>
//         )}
//       </Formik>

//       <div className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-4">
//         <div className="lg:col-span-8">
//           <div ref={columnChartContainer} className="w-full h-96"></div>
//         </div>
//         <div className="lg:col-span-4">
//           <div ref={donutChartContainer} className="w-full h-96"></div>
//         </div>
//       </div>

//       {/* Table */}
//       <div className="mt-10">
//         <h2 className="text-xl font-semibold mb-4">Employee Report Table</h2>
//         <div className="overflow-x-auto border rounded-md">
//           <table className="min-w-full divide-y divide-gray-200">
//             <thead className="bg-gray-100">
//               <tr>
//                 <th className="px-4 py-2">Project Name</th>
//                 <th className="px-4 py-2">Work Details</th>
//                 <th className="px-4 py-2">Date</th>
//                 <th className="px-4 py-2">Start Time</th>
//                 <th className="px-4 py-2">End Time</th>
//                 <th className="px-4 py-2">Duration (Hours)</th>
//               </tr>
//             </thead>
//             <tbody className="divide-y divide-gray-200">
//               {filteredRows.map((row, idx) => (
//                 <tr key={idx}>
//                   <td className="px-4 py-2">{row.ProjectName}</td>
//                   <td className="px-4 py-2">{row.WorkDetails}</td>
//                   <td className="px-4 py-2">{dayjs(row.WorkDate).format("YYYY-MM-DD")}</td>
//                   <td className="px-4 py-2">{row.WorkStartTime}</td>
//                   <td className="px-4 py-2">{row.WorkEndTime}</td>
//                   <td className="px-4 py-2">{row.TotalTimeSpent}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Reports;



import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import axiosInstance from "../../components/common/AxiosInstance";
import HeaderTitle from "../../components/common/HeaderTitle";
import ReportTabs from "../../components/common/ReportTabs";
import ReportFilterForm from "../../components/common/ReportFilterForm";
import ReportHeaderActions from "../../components/common/ReportHeaderActions";
import ColumnChart from "../../components/common/ColumnChart";
import DonutChart from "../../components/common/DonutChart";
import ReportTable from "../../components/common/ReportTable";

const Reports = () => {
  const [activeTab, setActiveTab] = useState("Summary");
  const [projectOptions, setProjectOptions] = useState([]);
  const [filteredRows, setFilteredRows] = useState([]);
  const [columnChartConfig, setColumnChartConfig] = useState(null);
  const [donutChartConfig, setDonutChartConfig] = useState(null);

  const getLast7Days = () =>
    Array.from({ length: 7 }).map((_, i) =>
      dayjs().subtract(6 - i, "day").format("YYYY-MM-DD")
    );

  const fetchProjects = async () => {
    try {
      const res = await axiosInstance.get("/project/get-projects-by-user-id");
      const options = res.data.map((p) => ({
        value: p.ProjectId,
        label: p.ProjectName,
      }));
      setProjectOptions(options);
    } catch {
      setProjectOptions([]);
    }
  };

  const fetchData = async (params) => {
    try {
      const res = await axiosInstance.get("/empTimesheet/get-weekly-overview", { params });
      setFilteredRows(res.data);
    } catch {
      setFilteredRows([]);
    }
  };

  const handleSearch = async (values) => {
    const projectIds = values.project.map((p) => p.value);
    await fetchData({
      projectIds,
      startDate: dayjs(values.startDate).format("YYYY-MM-DD"),
      endDate: dayjs(values.endDate).format("YYYY-MM-DD"),
      forDownload: true,
    });
  };

  useEffect(() => {
    fetchProjects();
    fetchData({
      startDate: dayjs().subtract(6, "days").format("YYYY-MM-DD"),
      endDate: dayjs().format("YYYY-MM-DD"),
      forDownload: true,
    });
  }, []);

  useEffect(() => {
    const categories = getLast7Days();
    const projects = [...new Set(filteredRows.map((row) => row.ProjectName))];

    const series = projects.map((project) => {
      const data = categories.map((date) =>
        filteredRows
          .filter((r) => r.ProjectName === project && dayjs(r.WorkDate).format("YYYY-MM-DD") === date)
          .reduce((acc, r) => acc + (parseFloat(r.TotalTimeSpentInMinutes) || 0), 0)
      );
      return { name: project, data };
    });

    const donutData = projects.map((project) => ({
      name: project,
      y: filteredRows
        .filter((r) => r.ProjectName === project)
        .reduce((acc, r) => acc + (parseFloat(r.TotalTimeSpentInMinutes) || 0), 0),
    }));

    setColumnChartConfig({
      chart: { type: "column" },
      title: { text: "Weekly Project Work Hours" },
      xAxis: { categories, title: { text: "Date" } },
      yAxis: { min: 0, title: { text: "Minutes" } },
      series,
    });

    setDonutChartConfig({
      chart: { type: "pie" },
      title: { text: "Work Distribution" },
      series: [{ name: "Minutes", colorByPoint: true, data: donutData }],
    });
  }, [filteredRows]);

  return (
    <div className="p-6">
      <HeaderTitle title="Report Dashboard" />
      <ReportTabs activeTab={activeTab} onTabChange={setActiveTab} />

      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-4">
        {/* <ReportFilterForm projectOptions={projectOptions} onSubmit={handleSearch} />
       <ReportHeaderActions rows={filteredRows} /> */}
       <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4 mb-4">
  {/* Left side: Filter + Search */}
  <div className="w-full">
    <ReportFilterForm projectOptions={projectOptions} onSubmit={handleSearch} />
  </div>

  {/* Right side: PDF & Excel Buttons */}
  <div className="flex items-end gap-2">
    <ReportHeaderActions  rows={filteredRows} />
  </div>
</div>

       <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4 mb-4">

</div>

      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        <div className="lg:col-span-8">
          <ColumnChart config={columnChartConfig} />
        </div>
        <div className="lg:col-span-4">
          <DonutChart config={donutChartConfig} />
        </div>
      </div>

      <ReportTable rows={filteredRows} />
    </div>
  );
};

export default Reports;
