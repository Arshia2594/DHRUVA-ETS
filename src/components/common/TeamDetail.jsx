
import { useLocation, useParams } from "react-router-dom";
import useAxios from "../../hooks/useAxios";
import PageTitle from "../../components/common/PageTitle";
import FilterableCollapsibleTable from "../../components/HOC/FilterableCollapsibleTable";

const TeamDetails = () => {
  const { empId } = useParams();
   const location = useLocation();
   const { isManager } = location.state || { isManager: false };

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
      : "/assets/images/team-1.jpg"; // fallback image

  return (
    <div className="p-6 space-y-8">
      <PageTitle title={`Employee Timesheet - ID: ${empId}`} />

      {/* EMPLOYEE PROFILE CARD */}
      {empLoading ? (
        <p>Loading employee details...</p>
      ) : empError ? (
        <p className="text-red-500">Failed to load employee details</p>
      ) : (
        <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 border border-gray-200 dark:border-gray-700">
  <div className="flex flex-col sm:flex-row sm:items-start gap-8">
    {/* Photo Section */}
    <div className="flex-shrink-0 self-center sm:self-start">
      <img
        src={imageUrl}
        alt="Employee"
        className="w-32 h-32 rounded-full object-cover border-2 border-gray-300 dark:border-gray-600 shadow"
      />
    </div>

    {/* Info Section */}
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
</div>

      )}

      {/* TIMESHEET TABLE */}
      {timesheetLoading ? (
        <p>Loading timesheet...</p>
      ) : timesheetError ? (
        <p className="text-red-500">Failed to fetch timesheet.</p>
      ) : (
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow border border-gray-200 dark:border-gray-700">
          {/* <FilterableCollapsibleTable
            columns={columns}
            data={timesheetData}
            collapsibleFields={["WorkDetails", "WorkStartTime", "WorkEndTime"]}
            keyField="TimeSheetId"
            filterFields={["WorkDate", "ProjectName", "TaskStatus", "ManagerApproval"]}
          /> */}
          <FilterableCollapsibleTable
          columns={columns}
          data={timesheetData}
          collapsibleFields={["WorkDetails", "TaskStatus", "WorkStartTime", "WorkEndTime"]}
          keyField="TimeSheetId"
          filterFields={["WorkDate", "ProjectName", "ManagerApproval"]}
          refetch={refetchTimesheet}
          isManager={isManager} // <--- This controls approve/reject buttons
        />
        </div>
      )}
    </div>
  );
};

export default TeamDetails;
