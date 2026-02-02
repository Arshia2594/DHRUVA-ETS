import React from "react";

const StatCard = ({ title, value, icon, accent = "green", trend }) => {
  const accentMap = {
    green: "border-green-500 bg-green-50 text-green-700",
    blue: "border-blue-500 bg-blue-50 text-blue-700",
   from: "border-yellow-500 bg-yellow-50 text-yellow-700",
    red: "border-red-500 bg-red-50 text-red-700",
  };

  return (
    <div className="bg-white border rounded-xl shadow-sm p-4 flex items-center justify-between">
      <div>
        <p className="text-sm text-gray-500">{title}</p>
        <p className="text-2xl font-semibold text-gray-900 mt-1">
          {value}
        </p>

        {trend && (
          <p className="text-xs mt-1 text-gray-500">
            <span className="text-green-600 font-medium">
              {trend}
            </span>{" "}
            vs last month
          </p>
        )}
      </div>

      <div
        className={`h-10 w-10 flex items-center justify-center rounded-lg border ${accentMap[accent]}`}
      >
        {icon}
      </div>
    </div>
  );
};

export default StatCard;
