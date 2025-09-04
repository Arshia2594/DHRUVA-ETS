

import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import axiosInstance from "../../components/common/AxiosInstance";
import HeaderTitle from "../../components/common/HeaderTitle";
import ReportFilterForm from "../../components/common/ReportFilterForm";
import ReportHeaderActions from "../../components/common/ReportHeaderActions";
import ColumnChart from "../../components/common/ColumnChart";
import DonutChart from "../../components/common/DonutChart";
import ReportTable from "../../components/common/ReportTable";

const Reports = () => {
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
      const res = await axiosInstance.get(
        "/empTimesheet/get-weekly-overview",
        { params }
      );
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
          .filter(
            (r) =>
              r.ProjectName === project &&
              dayjs(r.WorkDate).format("YYYY-MM-DD") === date
          )
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
      credits: { enabled: false },
    });

    setDonutChartConfig({
      chart: { type: "pie" },
      title: { text: "Work Distribution" },
      series: [{ name: "Minutes", colorByPoint: true, data: donutData }],
      credits: { enabled: false },
    });
  }, [filteredRows]);

  return (
    <div className="p-6">
      <HeaderTitle title="Report Dashboard" />

      {/* FILTER + EXPORT BUTTONS */}
      <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4 mb-6">
        {/* Filters */}
        <div className="flex-1">
          <ReportFilterForm projectOptions={projectOptions} onSubmit={handleSearch} />
        </div>

        {/* Export Buttons */}
        <div className="flex items-center gap-2 mt-4 lg:mt-0">
          <ReportHeaderActions rows={filteredRows} />
        </div>
      </div>

      {/* CHARTS */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 mb-6">
        <div className="lg:col-span-8">
          <ColumnChart config={columnChartConfig} />
        </div>
        <div className="lg:col-span-4">
          <DonutChart config={donutChartConfig} />
        </div>
      </div>

      {/* TABLE */}
      <ReportTable rows={filteredRows} />
    </div>
  );
};

export default Reports;

