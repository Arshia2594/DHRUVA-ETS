import React from "react";
import ProjectSummary from "../../components/common/ProjectSummary";


const Report = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Reports</h1>

      {/* Show Project Summary Section */}
      <ProjectSummary />

    </div>
  );
};

export default Report;

