
import { useLocation, useParams } from "react-router-dom";
import useAxios from "../../hooks/useAxios";
import PageTitle from "../../components/common/PageTitle";
import FilterableCollapsibleTable from "../../components/HOC/FilterableCollapsibleTable";

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
      {/* EMPLOYEE DETAILS + EXPERIENCE/EDUCATION/SKILLS  */}
      {!showTimeSheet && (
        <>
          {/* EMPLOYEE INFO */}
          <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 border border-gray-200 dark:border-gray-700">
            <PageTitle title={`Employee Details`} />
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

          {/* EXPERIENCE SECTION */}
          <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6">
            <PageTitle title={`Experience`} />
            <ul className="space-y-3">
              {empDetails?.Experience?.length > 0 ? (
                empDetails.Experience.map((exp, idx) => (
                  <li key={idx} className="border-b pb-3">
                    <p className="font-medium text-gray-900 dark:text-white">{exp.CompanyName}</p>
                    <p className="text-gray-600 dark:text-gray-300">
                      {exp.Role} ({exp.StartDate} - {exp.EndDate || "Present"})
                    </p>
                    <p className="text-sm text-gray-500">{exp.Description}</p>
                  </li>
                ))
              ) : (
                <p className="text-gray-500">No experience added.</p>
              )}
            </ul>
          </div>

          {/* EDUCATION SECTION */}
          <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6">
            <PageTitle title={`Education`} />
            <ul className="space-y-3">
              {empDetails?.Education?.length > 0 ? (
                empDetails.Education.map((edu, idx) => (
                  <li key={idx} className="border-b pb-3">
                    <p className="font-medium text-gray-900 dark:text-white">{edu.Degree}</p>
                    <p className="text-gray-600 dark:text-gray-300">
                      {edu.Institution} ({edu.Year})
                    </p>
                  </li>
                ))
              ) : (
                <p className="text-gray-500">No education details available.</p>
              )}
            </ul>
          </div>

          {/* SKILLS SECTION */}
          <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6">
            <PageTitle title={`Skills`} />
            {empDetails?.Skills?.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {empDetails.Skills.map((skill, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 text-sm bg-green-100 text-green-700 rounded-full"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            ) : (
              <p className="text-gray-500">No skills added.</p>
            )}
          </div>
        </>
      )}

      {/* TIMESHEET (only if showTimeSheet = true) */}
      {showTimeSheet && (
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow border border-gray-200 dark:border-gray-700">
          <PageTitle title={`Employee Timesheet`} />
          {timesheetLoading ? (
            <p>Loading timesheet...</p>
          ) : timesheetError ? (
            <p className="text-red-500">Failed to fetch timesheet.</p>
          ) : (
            <FilterableCollapsibleTable
            title={`${empDetails?.FirstName} ${empDetails?.LastName} - Timesheet`}
              columns={columns}
              data={timesheetData}
              collapsibleFields={["WorkDetails", "TaskStatus", "WorkStartTime", "WorkEndTime"]}
              keyField="TimeSheetId"
              filterFields={["WorkDate", "ProjectName", "ManagerApproval"]}
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

