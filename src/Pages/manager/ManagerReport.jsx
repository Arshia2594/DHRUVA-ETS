import React from "react";
import useAxios from "../../hooks/useAxios";
import ProjectSummaryCards from "../../components/manager/ProjectSummaryCards";

import TeamWorkloadSummary from "../../components/manager/TeamWorkloadSummary";
import AllBudgetUtilizations from "../../components/manager/AllBudgetUtilizations ";
import UpcomingDeadlinesForReport from "../../components/manager/UpcomingDeadlinesForReport";

const ManagerReport = () => {
  const { data: projectSummary = {}, loading: sLoad, error: sErr } = useAxios("/project/get-project-statuswise-counts");
  const { data: deadlines = [], loading: dLoad, error: dErr } = useAxios("/project/get-upcoming-deadlines");
  const { data: workloads = [], loading: wLoad, error: wErr } = useAxios("/employee/team/workload-summary");
  const { data: budgets = [], loading: bLoad, error: bErr } = useAxios("/project/budget/utilization");

  if (sLoad || dLoad || wLoad || bLoad)
    return <p className="text-center text-gray-500 mt-10">Loading report...</p>;
  if (sErr || dErr || wErr || bErr)
    return <p className="text-center text-red-500 mt-10">Error loading report data</p>;

  return (
    <div className="px-8 py-6 space-y-10">
      {/*  Summary Cards */}
      <ProjectSummaryCards summary={projectSummary} />

      {/*  Upcoming Deadlines */}
      <UpcomingDeadlinesForReport deadlines={Array.isArray(deadlines) ? deadlines : []} />

      {/* Workload & Budget side by side */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <TeamWorkloadSummary data={Array.isArray(workloads) ? workloads : []} />
        <AllBudgetUtilizations data={Array.isArray(budgets) ? budgets : []} />
      </div>
    </div>
  );
};

export default ManagerReport;
