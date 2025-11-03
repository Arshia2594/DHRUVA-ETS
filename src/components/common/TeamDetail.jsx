
import { useLocation, useParams } from "react-router-dom";
import useAxios from "../../hooks/useAxios";
import PageTitle from "../../components/common/PageTitle";
import FilterableCollapsibleTable from "../../components/HOC/FilterableCollapsibleTable";
import MUIButton from "../../components/common/MUIButton";
import { exportToExcel, exportToPDF } from "../../utils/exportUtils";
import { useMemo } from "react";
import FilterDatePicker from "../../components/common/FilterDatePicker";
import { CalendarDaysIcon, CheckCircleIcon, ClockIcon, GiftIcon } from "@heroicons/react/24/outline";

const TeamDetails = () => {
  const { empId } = useParams();
  const location = useLocation();
  const { isManager, showTimeSheet } = location.state || { isManager: false, showTimeSheet: false };

  // Fetch employee details
  const {
    data: empDetails,
    loading: empLoading,
    error: empError,
  } = useAxios(`/employee/employee/${empId}`, {}, true, [empId]);

  // Fetch timesheet
  const {
    data: timesheetData = [],
    loading: timesheetLoading,
    error: timesheetError,
    refetch: refetchTimesheet,
  } = useAxios(`/empTimesheet/manager/employee-timesheet/${empId}`, {}, true, [empId]);

  // Fetch department projects (for dropdown filter)
  const { data: projectData = [] } = useAxios(
    empDetails?.department ? `/project/getAllProjects?department=${empDetails.department}` : null,
    {},
    !!empDetails?.department,
    [empDetails?.department]
  );

 
  const {
    data: leaveStats = {},
    loading: leaveStatsLoading,
    error: leaveStatsError,
  } = useAxios(`/employee/leave/stats`, {}, true, [empId]); // Removed /${empId}

  // Prepare project dropdown options
  const projectOptions = useMemo(() => {
    if (!projectData || !Array.isArray(projectData)) return [];
    return projectData.map((proj) => ({ label: proj.ProjectName, value: proj.ProjectName }));
  }, [projectData]);

  const filterMeta = useMemo(
    () => ({
      WorkDate: { type: "date" },
      ProjectName: { type: "select", options: projectOptions },
      ManagerApproval: {
        type: "select",
        options: [
          { label: "Pending", value: "Pending" },
          { label: "Approved", value: "Approved" },
          { label: "Rejected", value: "Rejected" },
        ],
      },
    }),
    [projectOptions]
  );

  const columns = [
    { headerName: "Date", field: "WorkDate" },
    { headerName: "Project", field: "ProjectName" },
    { headerName: "Title", field: "WorkTitle" },
    { headerName: "Status", field: "TaskStatus" },
    { headerName: "Approval", field: "ManagerApproval" },
    { headerName: "Time Spent (hrs)", field: "TotalTimeSpent" },
  ];

  const imageUrl =
    empDetails?.Photo && typeof empDetails.Photo === "string"
      ? `${import.meta.env.VITE_BASE_API_URL.replace("/api", "")}/uploads/${empDetails.Photo}`
      : "/assets/images/team-1.jpg";

  return (
    <div className="p-6 space-y-8">
      {/* EMPLOYEE LEAVE SUMMARY */}
<div className="border-t border-gray-200 dark:border-gray-700 pt-8 mt-10">
  <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-6">
    Employee Leave Summary
  </h2>

  {leaveStatsLoading ? (
    <p className="text-gray-500">Loading leave summary...</p>
  ) : leaveStatsError ? (
    <p className="text-red-500">Failed to fetch leave summary.</p>
  ) : (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {/* Total Leaves */}
      <div className="bg-white dark:bg-gray-800 shadow-md rounded-xl p-6 flex flex-col items-center justify-center border border-gray-100 dark:border-gray-700 hover:shadow-lg transition-all duration-200">
        <CalendarDaysIcon className="w-8 h-8 text-green-600 mb-2" />
        <p className="text-gray-600 dark:text-gray-400 font-medium">Total Leaves</p>
        <h3 className="text-3xl font-bold text-green-600 mt-1">{leaveStats.totalLeaves || 0}</h3>
      </div>

      {/* Used */}
      <div className="bg-white dark:bg-gray-800 shadow-md rounded-xl p-6 flex flex-col items-center justify-center border border-gray-100 dark:border-gray-700 hover:shadow-lg transition-all duration-200">
        <CheckCircleIcon className="w-8 h-8 text-red-500 mb-2" />
        <p className="text-gray-600 dark:text-gray-400 font-medium">Used</p>
        <h3 className="text-3xl font-bold text-red-500 mt-1">{leaveStats.used || 0}</h3>
      </div>

      {/* Remaining */}
      <div className="bg-white dark:bg-gray-800 shadow-md rounded-xl p-6 flex flex-col items-center justify-center border border-gray-100 dark:border-gray-700 hover:shadow-lg transition-all duration-200">
        <ClockIcon className="w-8 h-8 text-blue-600 mb-2" />
        <p className="text-gray-600 dark:text-gray-400 font-medium">Remaining</p>
        <h3 className="text-3xl font-bold text-blue-600 mt-1">{leaveStats.remaining || 0}</h3>
      </div>

      {/* Comp Off */}
      <div className="bg-white dark:bg-gray-800 shadow-md rounded-xl p-6 flex flex-col items-center justify-center border border-gray-100 dark:border-gray-700 hover:shadow-lg transition-all duration-200">
        <GiftIcon className="w-8 h-8 text-yellow-500 mb-2" />
        <p className="text-gray-600 dark:text-gray-400 font-medium">Comp Off</p>
        <h3 className="text-3xl font-bold text-yellow-500 mt-1">{leaveStats.compOff || 0}</h3>
      </div>
    </div>
  )}
</div>
      {/* EMPLOYEE DETAILS */}
      {!showTimeSheet && (
        <>
          <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 border border-gray-200 dark:border-gray-700">
            <PageTitle title="Employee Details" />
            {empLoading ? (
              <p>Loading employee details...</p>
            ) : empError ? (
              <p className="text-red-500">Failed to load employee details</p>
            ) : (
              <div className="flex flex-col sm:flex-row sm:items-start gap-8">
                <div className="flex-shrink-0 self-center sm:self-start">
                  <img
                    src={imageUrl}
                    alt="Employee"
                    className="w-32 h-32 rounded-full object-cover border-2 border-gray-300 dark:border-gray-600 shadow"
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-4 text-sm w-full">
                  <div>
                    <p className="text-gray-500 dark:text-gray-400">Full Name</p>
                    <p className="font-medium text-gray-900 dark:text-white capitalize">
                      {empDetails.FirstName} {empDetails.LastName}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-500 dark:text-gray-400">Email</p>
                    <p className="font-medium text-gray-900 dark:text-white">{empDetails.Email}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 dark:text-gray-400">Mobile</p>
                    <p className="font-medium text-gray-900 dark:text-white">{empDetails.Mobile}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 dark:text-gray-400">Role</p>
                    <p className="font-medium text-gray-900 dark:text-white">{empDetails.Role}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 dark:text-gray-400">Department</p>
                    <p className="font-medium text-gray-900 dark:text-white">{empDetails.department}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 dark:text-gray-400">Designation</p>
                    <p className="font-medium text-gray-900 dark:text-white">{empDetails.Designation}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 dark:text-gray-400">Joining Date</p>
                    <p className="font-medium text-gray-900 dark:text-white">{empDetails.JoiningDate}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </>
      )}

      {/* TIMESHEET */}
      {showTimeSheet && (
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow border border-gray-200 dark:border-gray-700 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <PageTitle title="Employee Timesheet" />
              <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                {empDetails?.FirstName} {empDetails?.LastName} - Timesheet
              </h2>
            </div>
            <MUIButton
              onClick={() => {
                if (!timesheetData || timesheetData.length === 0) {
                  alert("No timesheet data available to export.");
                  return;
                }
                exportToExcel(timesheetData, "Timesheet.xlsx");
                exportToPDF(columns, timesheetData, "Timesheet.pdf");
              }}
              bgColor="bg-green-600"
              hoverColor="hover:bg-green-700"
              className="px-5 py-2 rounded-md text-white shadow-md"
            >
              Download PDF / Excel
            </MUIButton>
          </div>

          {timesheetLoading ? (
            <p className="text-gray-500">Loading timesheet...</p>
          ) : timesheetError ? (
            <p className="text-red-500">Failed to fetch timesheet.</p>
          ) : (
            <FilterableCollapsibleTable
              columns={columns}
              data={timesheetData || []}
              collapsibleFields={["WorkDetails", "TaskStatus", "WorkStartTime", "WorkEndTime"]}
              keyField="TimeSheetId"
              filterFields={["WorkDate", "ProjectName", "ManagerApproval"]}
              filterMeta={filterMeta}
              FormikDateFilter={FilterDatePicker}
              refetch={refetchTimesheet}
              isManager={isManager}
            />
          )}
        </div>
      )}

    </div>
  );
};

export default TeamDetails;
