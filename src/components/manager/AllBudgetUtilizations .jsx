

import React from "react";

const AllBudgetUtilizations = ({ data = [] }) => {
  const formatCurrency = (amount) => {
    if (!amount) return "N/A";
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <section>
      <h2 className="text-lg font-bold text-gray-700 mb-4">Project Budget Utilization</h2>
      <div className="bg-white rounded-2xl p-6 shadow-md border overflow-y-auto max-h-[400px]">
        {data.length === 0 ? (
          <p className="text-gray-500 text-sm">No budget utilization data available</p>
        ) : (
          <table className="w-full text-sm text-left border-collapse">
            <thead>
              <tr className="text-gray-600 border-b">
                <th className="pb-2">Project</th>
                <th className="pb-2">Used / Total</th>
                <th className="pb-2 text-right">Utilization</th>
              </tr>
            </thead>
            <tbody>
              {data.map((project) => {
                const utilization = Number(project.utilizationPercent) || 0;
                return (
                  <tr
                    key={project.projectId}
                    className="border-b hover:bg-gray-50 transition"
                  >
                    <td className="py-3 align-top">
                      <div>
                        <p className="font-semibold text-gray-800">{project.projectName}</p>
                        <p className="text-xs text-gray-500">ID: {project.projectId}</p>
                      </div>
                    </td>
                    <td className="py-3 align-top">
                      <p className="text-gray-700 text-xs">
                        {formatCurrency(project.used)} / {formatCurrency(project.totalBudget)}
                      </p>
                    </td>
                    <td className="py-3 text-right align-top">
                      <span
                        className={`font-semibold text-sm ${
                          utilization > 80
                            ? "text-red-600"
                            : utilization > 50
                            ? "text-orange-500"
                            : "text-blue-600"
                        }`}
                      >
                        {utilization.toFixed(2)}%
                      </span>
                      <div className="mt-1 w-full h-2 bg-gray-200 rounded-full">
                        <div
                          className={`h-2 rounded-full ${
                            utilization > 80
                              ? "bg-red-500"
                              : utilization > 50
                              ? "bg-orange-400"
                              : "bg-blue-500"
                          }`}
                          style={{ width: `${utilization}%` }}
                        ></div>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </section>
  );
};

export default AllBudgetUtilizations;
