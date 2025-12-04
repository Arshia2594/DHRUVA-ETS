
import { motion } from "framer-motion";
import MonthlyHoursApexChart from "../../components/chart/MonthlyHourChart";
import ProjectHoursBarChart from "../../components/chart/ProjectHoursBarChart";
import StatCards from "../../components/common/StatEmpReport";
import useAxios from "../../hooks/useAxios";
import dayjs from "dayjs";

const EmployeeReport = () => {
  const empId = localStorage.getItem("EmpId");

  const { data: timesheetData, loading: loadingTimesheet } = useAxios(
    `/empTimesheet/get-timesheets?empId=${empId}`
  );
  const { data: leaveData, loading: loadingLeave } = useAxios(
    `/employee/leave/my-leaves?empId=${empId}`
  );
  const { data: projectData, loading: loadingProjects, error } = useAxios(
    `/project/getProjectsByEmpId/${empId}`
  );

  const loading = loadingTimesheet || loadingLeave || loadingProjects;

  if (loading) {
    return <p className="p-6 text-gray-600">Loading employee report...</p>;
  }

  if (error) {
    return <p className="p-6 text-red-500">Error loading data. Please try again.</p>;
  }

  const convertToHours = (timeString) => {
    if (!timeString) return 0;
    const [h, m, s] = timeString.split(":").map(Number);
    return h + m / 60 + s / 3600;
  };

  const monthlyData =
    timesheetData?.map((item) => ({
      day: dayjs(item.WorkDate).format("DD"),
      hours: convertToHours(item.TotalTimeSpent),
    })) || [];

  const projectHours =
    projectData?.map((p) => ({
      name: p.ProjectName,
      hours: convertToHours(p.TotalHoursSpent),
    })) || [];

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
      className="p-6"
    >
      {/* STAT CARDS */}
      {/* <StatCards
        timesheetData={timesheetData || []}
        leaveData={leaveData || []}
        projectData={projectData || []}
      /> */}

      {/* CHARTS ROW */}
      <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Hours Chart */}
        <motion.div
          whileHover={{ y: -6, scale: 1.01 }}
          transition={{ type: "spring", stiffness: 220, damping: 16 }}
          
        >
          <MonthlyHoursApexChart data={monthlyData} />
        </motion.div>

        {/* Project Hours Chart */}
        <motion.div
          whileHover={{ y: -6, scale: 1.01 }}
          transition={{ type: "spring", stiffness: 220, damping: 16 }}
          
        >
          <ProjectHoursBarChart data={projectHours} />
        </motion.div>
      </div>
    </motion.div>
  );
};

export default EmployeeReport;

