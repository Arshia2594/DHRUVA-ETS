


import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const TeamWorkloadSummary = ({ data = [] }) => {
  return (
    <section>
      <h2 className="text-lg font-bold text-gray-700 mb-4">Team Workload Summary</h2>
      <div className="bg-white rounded-2xl p-6 shadow-md border">
        {data.length === 0 ? (
          <p className="text-gray-500 text-sm">No workload data available</p>
        ) : (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data}>
              <XAxis dataKey="Name" tick={{ fontSize: 12 }} />
              <YAxis />
              <Tooltip />
              <Bar dataKey="ProjectCount" fill="#4f46e5" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>
    </section>
  );
};

export default TeamWorkloadSummary;
