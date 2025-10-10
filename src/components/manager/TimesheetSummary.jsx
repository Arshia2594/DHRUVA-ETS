


import React, { useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Legend,
} from "recharts";
import { MdBarChart, MdPieChart, MdInsights } from "react-icons/md";

const COLORS = ["#22c55e", "#facc15", "#ef4444", "#3b82f6", "#a855f7"];

export default function TimesheetSummary({ summary }) {
  const [view, setView] = useState("bar");
  const barData = summary?.byProject || [];
  const pieData = summary?.byStatus || [];

  return (
    <div className="p-5 border rounded-xl shadow bg-white dark:bg-gray-800 transition">
      {/* Header */}
      <div className="flex justify-between items-center mb-3">
        <h3 className="font-bold text-lg flex items-center gap-2 text-gray-800 dark:text-gray-100">
          <MdInsights className="text-green-600" size={22} />
          <span>Project Summary</span>
        </h3>
        <div className="flex space-x-2">
          <button
            onClick={() => setView("bar")}
            className={`px-3 py-1 rounded-md text-sm font-medium flex items-center space-x-1 transition ${
              view === "bar"
                ? "bg-green-500 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            <MdBarChart size={18} />
            <span>By Project</span>
          </button>
          <button
            onClick={() => setView("pie")}
            className={`px-3 py-1 rounded-md text-sm font-medium flex items-center space-x-1 transition ${
              view === "pie"
                ? "bg-green-500 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            <MdPieChart size={18} />
            <span>By Status</span>
          </button>
        </div>
      </div>

      {/* Status Summary */}
      <div className="flex justify-around mb-4 text-sm font-semibold">
        <span className="text-green-600">
           Approved: {summary?.approved?.toFixed(1) || 0} hrs
        </span>
        <span className="text-yellow-500">
           Pending: {summary?.pending?.toFixed(1) || 0} hrs
        </span>
        <span className="text-red-500">
           Rejected: {summary?.rejected?.toFixed(1) || 0} hrs
        </span>
      </div>

      {/* Chart Section */}
      <div className="h-[280px] bg-gray-50 dark:bg-gray-700 rounded-lg p-3 flex items-center justify-center">
        {view === "bar" ? (
          barData.length > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={barData}>
                <XAxis
                  dataKey="projectName"
                  interval={0}
                  angle={-10}
                  textAnchor="middle"
                  height={50}
                  tick={{ fontSize: 12 }}
                />
                <YAxis />
                <Tooltip
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      const project = payload[0].payload;
                      return (
                        <div className="bg-white dark:bg-gray-800 shadow-lg border border-gray-200 dark:border-gray-600 rounded-lg p-3 text-sm">
                          <p className="font-semibold text-green-600 mb-1">
                            {project.projectName}
                          </p>
                          <p className="text-gray-700 dark:text-gray-200 mb-2">
                            Total: {project.totalHours.toFixed(1)} hrs
                          </p>
                          {project.employees?.length > 0 && (
                            <>
                              <p className="font-semibold text-gray-600 dark:text-gray-300 underline mb-1">
                                Employees:
                              </p>
                              <ul className="text-gray-700 dark:text-gray-200">
                                {project.employees.map((e, i) => (
                                  <li key={i}>
                                    {e.empName} - {e.hours.toFixed(1)} hrs
                                  </li>
                                ))}
                              </ul>
                            </>
                          )}
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Legend />
                <Bar dataKey="totalHours" fill="#22c55e" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div className="text-gray-400 text-sm">No project data available</div>
          )
        ) : pieData.length > 0 ? (
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={pieData}
                dataKey="value"
                nameKey="name"
                outerRadius={100}
                label={({ name, percent }) =>
                  `${name} ${(percent * 100).toFixed(0)}%`
                }
              >
                {pieData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        ) : (
          <div className="text-gray-400 text-lg">No status data available</div>
        )}
      </div>
    </div>
  );
}
