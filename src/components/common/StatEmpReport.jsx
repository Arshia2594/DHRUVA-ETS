import {
  AiOutlineClockCircle,
  AiOutlineCheckCircle,
  AiOutlineCalendar,
} from "react-icons/ai";
import { FiFolder } from "react-icons/fi";
import { motion } from "framer-motion";

const StatCards = ({ timesheetData, leaveData, projectData }) => {
  // ----- TOTAL HOURS -----
  const totalMinutes = (timesheetData || [])
    .map((item) => {
      const [h, m, s] = item.TotalTimeSpent?.split(":").map(Number) || [0, 0, 0];
      return (h || 0) * 60 + (m || 0);
    })
    .reduce((a, b) => a + b, 0);

  const totalHours = Math.floor(totalMinutes / 60);
  const remainingMinutes = totalMinutes % 60;

  // ----- APPROVAL % -----
  const approvedCount =
    timesheetData?.filter((t) => t.ManagerApproval === "Approved").length || 0;

  const totalEntries = timesheetData?.length || 0;
  const approvalPercentage =
    totalEntries > 0 ? Math.round((approvedCount / totalEntries) * 100) : 0;

  // ----- LEAVES -----
  const leavesTaken = (leaveData || [])
    .filter((l) => l.Status === "Approved")
    .reduce((sum, leave) => sum + (leave.TotalDays || 0), 0);

  // ----- ACTIVE PROJECTS -----
  const activeProjects = Array.isArray(projectData)
    ? projectData.filter((p) => p.Project?.CompletionStatus !== "Completed").length
    : 0;

  const stats = [
    {
      label: "Total Hours Worked",
      value: `${totalHours}:${remainingMinutes.toString().padStart(2, "0")}`,
      icon: <AiOutlineClockCircle size={26} />,
      color: "text-blue-600",
      bg: "bg-blue-100/60",
    },
    {
      label: "% Approved",
      value: `${approvalPercentage}%`,
      icon: <AiOutlineCheckCircle size={26} />,
      color: "text-green-600",
      bg: "bg-green-100/60",
    },
    {
      label: "Leaves Taken",
      value: `${leavesTaken} Days`,
      icon: <AiOutlineCalendar size={26} />,
      color: "text-red-600",
      bg: "bg-red-100/60",
    },
    {
      label: "Active Projects",
      value: activeProjects,
      icon: <FiFolder size={26} />,
      color: "text-yellow-600",
      bg: "bg-yellow-100/60",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-6">
      {stats.map((stat, index) => (
        <motion.div
          key={index}
          whileHover={{ y: -6, scale: 1.03 }}
          transition={{ type: "spring", stiffness: 260, damping: 18 }}
          className="bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-200 
                     p-6 flex items-center space-x-4 cursor-pointer
                     shadow-[0_6px_20px_rgba(0,0,0,0.08)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.12)]
                     transition-all"
        >
          <div className={`p-3 rounded-xl ${stat.bg} ${stat.color} shadow-inner`}>
            {stat.icon}
          </div>

          <div>
            <h2 className="text-3xl font-bold text-gray-800 leading-none tracking-tight">
              {stat.value}
            </h2>
            <p className="text-gray-500 text-sm mt-1 font-medium">{stat.label}</p>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default StatCards;
