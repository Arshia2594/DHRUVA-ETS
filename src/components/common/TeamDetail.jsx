import { useParams } from "react-router-dom";
import useAxios from "../../hooks/useAxios";
import PageTitle from "../../components/common/PageTitle";
import FilterableCollapsibleTable from "../../components/HOC/FilterableCollapsibleTable";

const TeamDetails = () => {
  const { empId } = useParams();

  const { data, loading, error } = useAxios(
    `/empTimesheet/manager/employee-timesheet/${empId}`,
    {},
    true,
    [empId]
  );

  const columns = [
    { headerName: "Date", field: "WorkDate" },
    { headerName: "Project", field: "ProjectName" },
    { headerName: "Title", field: "WorkTitle" },
    { headerName: "Status", field: "TaskStatus" },
    { headerName: "Approval", field: "ManagerApproval" },
    { headerName: "Time Spent (hrs)", field: "TotalTimeSpent" },
  ];

  return (
    <div className="p-4 space-y-6">
      <PageTitle title={`Employee Timesheet - ID: ${empId}`} />
      {loading ? (
        <p>Loading timesheet...</p>
      ) : error ? (
        <p className="text-red-500">Failed to fetch timesheet.</p>
      ) : (
        <FilterableCollapsibleTable
          columns={columns}
          data={data}
          collapsibleFields={[
            "WorkDetails",
            "WorkStartTime",
            "WorkEndTime"
          ]}
          keyField="TimeSheetId"
          filterFields={["WorkDate", "ProjectName", "TaskStatus", "ManagerApproval"]}
        />
      )}
    </div>
  );
};

export default TeamDetails;
