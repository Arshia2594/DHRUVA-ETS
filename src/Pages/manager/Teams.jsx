
import { useEffect, useState } from "react";
import useAxios from "../../hooks/useAxios";
import useAuth from "../../hooks/useAuth";
import FilterableCollapsibleTable from "../../components/HOC/FilterableCollapsibleTable";


const Team = () => {
  const { auth } = useAuth();
  const [endpoint, setEndpoint] = useState(null);

  useEffect(() => {
    if (auth?.empId) {
      setEndpoint(`/employee/manager/team/${auth.empId}`);
    }
  }, [auth?.empId]);

  const { data: team = [], loading, error, refetch } = useAxios(
    endpoint,
    {},
    !!endpoint,
    [endpoint]
  );

  const columns = [
    { field: "EmpId", headerName: "Emp ID" },
    { field: "FirstName", headerName: "First Name" },
    { field: "LastName", headerName: "Last Name" },
    { field: "Email", headerName: "Email" },
    { field: "department", headerName: "Department" },
    { field: "Designation", headerName: "Designation" },
  ];

  const collapsibleFields = [
    "Address",
    "JoiningDate",
    "Mobile",
  ];

  if (loading) return <div className="p-6">Loading team...</div>;
  if (error) return <div className="p-6 text-red-500">Failed to load team.</div>;

  return (
    <div className="p-6">
      <FilterableCollapsibleTable
        title="My Team"
        columns={columns}
        data={team}
        collapsibleFields={collapsibleFields}
        keyField="EmpId"
        filterFields={["FirstName", "LastName", "Email", "department", "Designation"]}
      />
    </div>
  );
};

export default Team;

