

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
    <div className="p-4 border rounded-lg shadow-sm bg-white">
      {/* Header with toggle */}
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-bold text-lg flex items-center space-x-2">
          <MdInsights className="text-green-600" size={22} />
          <span>Project Summary</span>
        </h3>
        <div className="flex space-x-2">
          <button
            onClick={() => setView("bar")}
            className={`px-3 py-1 rounded-md text-sm font-medium flex items-center space-x-1 shadow-sm transition ${
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
            className={`px-3 py-1 rounded-md text-sm font-medium flex items-center space-x-1 shadow-sm transition ${
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

      {/* Chart */}
      <div className="h-[280px] bg-gray-50 rounded-md p-3">
        {view === "bar" ? (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={barData}>
              <XAxis dataKey="projectName" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="hours" fill="#22c55e" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={pieData}
                dataKey="value"
                nameKey="name"
                outerRadius={100}
                label
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
        )}
      </div>
    </div>
  );
}
