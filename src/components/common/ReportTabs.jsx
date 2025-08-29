import React from "react";

const tabs = ["Summary", "Detailed", "Weekly", "Shared"];

const ReportTabs = ({ activeTab = "Summary", onTabChange = () => {} }) => {
  return (
    <div className="flex space-x-4 border-b pb-2 mb-4 text-sm font-medium text-gray-600">
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => onTabChange(tab)}
          className={`hover:text-blue-600 px-2 py-1 border-b-2 ${
            activeTab === tab ? "border-blue-500 text-blue-600" : "border-transparent"
          }`}
        >
          {tab}
        </button>
      ))}
    </div>
  );
};

export default ReportTabs;
