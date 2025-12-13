

import React, { useMemo } from "react";

export default function TimesheetOverview({ data = [] }) {
  // Group by project
  const overview = useMemo(() => {
    const result = {};
    data.forEach((item) => {
      const project = item.ProjectName || "Unknown";
      if (!result[project]) {
        result[project] = {
          totalHours: 0,
          tasks: 0,
          approved: 0,
          pending: 0,
          rejected: 0,
        };
      }
      result[project].totalHours += Number(item.TotalTimeSpent || 0);
      result[project].tasks += 1;
      if (item.ManagerApproval === "Approved") result[project].approved += 1;
      if (item.ManagerApproval === "Pending") result[project].pending += 1;
      if (item.ManagerApproval === "Rejected") result[project].rejected += 1;
    });
    return Object.entries(result).map(([project, stats]) => ({
      project,
      ...stats,
    }));
  }, [data]);

  return (
    <div className="bg-white shadow-md rounded-xl p-6 mt-8 border border-gray-200">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">Timesheet Overview</h2>

      <div className="overflow-x-auto rounded-lg">
        <table className="min-w-full border-collapse">
          <thead className="bg-gray-100 sticky top-0 z-10 shadow-sm">
            <tr className="text-left">
              <th className="p-3 text-sm font-semibold text-gray-700">Project</th>
              <th className="p-3 text-sm font-semibold text-gray-700">Total Hours</th>
              <th className="p-3 text-sm font-semibold text-gray-700">Tasks</th>
              <th className="p-3 text-sm font-semibold text-gray-700">Approved</th>
              <th className="p-3 text-sm font-semibold text-gray-700">Pending</th>
              <th className="p-3 text-sm font-semibold text-gray-700">Rejected</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200">
            {overview.length === 0 ? (
              <tr>
                <td colSpan={6} className="text-center py-6 text-gray-500 text-sm">
                  No data available
                </td>
              </tr>
            ) : (
              overview.map((item) => (
                <tr key={item.project} className="hover:bg-gray-50 transition">
                  <td className="p-3 text-sm text-gray-800">{item.project}</td>
                  <td className="p-3 text-sm text-gray-800">{item.totalHours}</td>
                  <td className="p-3 text-sm text-gray-800">{item.tasks}</td>
                  <td className="p-3 text-sm text-green-700 font-medium">{item.approved}</td>
                  <td className="p-3 text-sm text-yellow-700 font-medium">{item.pending}</td>
                  <td className="p-3 text-sm text-red-700 font-medium">{item.rejected}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

