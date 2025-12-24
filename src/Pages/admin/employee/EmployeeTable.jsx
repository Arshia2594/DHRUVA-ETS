import React, { useEffect, useState, useMemo } from "react";
import { EyeIcon, PencilIcon, TrashIcon } from "@heroicons/react/24/solid";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import HeaderTitle from "../../../components/common/HeaderTitle";
import FilterableCollapsibleTable from "../../../components/HOC/FilterableCollapsibleTable";
import axiosInstance from "../../../components/common/AxiosInstance";

const EmployeeTable = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();


    //  FETCH EMPLOYEES

  const fetchEmployees = async () => {
    try {
      setLoading(true);
      const res = await axiosInstance.get("/employee/all");
      setEmployees(res.data || []);
    } catch (error) {
      console.error("Failed to fetch employees", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

    //  ACTION HANDLERS
 
  const handleView = (row) => {
    navigate(`/admin/employees/view/${row.EmpID}`);
  };

  const handleEdit = (row) => {
    navigate(`/admin/employees/edit/${row.EmpID}`);
  };

  const handleDelete = async (row) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "This employee will be permanently deleted.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete",
      cancelButtonText: "Cancel",
    });

    if (!confirm.isConfirmed) return;

    try {
      await axiosInstance.delete(`/employee/${row.EmpID}`);

      Swal.fire({
        title: "Deleted!",
        text: "Employee deleted successfully.",
        icon: "success",
      });

      fetchEmployees();
    } catch (error) {
      console.error("Delete failed", error);
      Swal.fire("Error", "Unable to delete employee", "error");
    }
  };


    //  TABLE COLUMNS
  
  const columns = useMemo(
    () => [
      { field: "EmpID", headerName: "Employee ID" },
      { field: "Name", headerName: "First Name" },
      { field: "LastName", headerName: "Last Name" },
      { field: "Email", headerName: "Email" },
      { field: "Mobile", headerName: "Mobile" },
      { field: "Department", headerName: "Department" },
      { field: "Designation", headerName: "Designation" },
      { field: "Status", headerName: "Status" },

      /*  ACTION COLUMN */
      {
        field: "actions",
        headerName: "Actions",
        render: (row) => (
          <div className="flex items-center gap-3">
            <button
              onClick={() => handleView(row)}
              title="View"
              className="text-blue-600 hover:text-blue-800"
            >
              <EyeIcon className="h-4 w-4" />
            </button>

            <button
              onClick={() => handleEdit(row)}
              title="Edit"
              className="text-green-600 hover:text-green-800"
            >
              <PencilIcon className="h-4 w-4" />
            </button>

            <button
              onClick={() => handleDelete(row)}
              title="Delete"
              className="text-red-600 hover:text-red-800"
            >
              <TrashIcon className="h-4 w-4" />
            </button>
          </div>
        ),
      },
    ],
    []
  );


    // COLLAPSIBLE FIELDS
  
  const collapsibleFields = [
    "Gender",
    "MaritalStatus",
    "EmployeeType",
    "BirthDate",
  ];


   //  FILTER CONFIG

  const filterFields = ["EmpID", "Name", "Department", "Status"];

  const filterMeta = {
    Status: {
      type: "select",
      label: "Status",
      options: [
        { label: "Active", value: "Active" },
        { label: "Inactive", value: "Inactive" },
      ],
    },
  };

  return (
    <div className="space-y-6">
      <HeaderTitle title="Employees" />

      {loading ? (
        <div className="text-center text-gray-500 py-10">
          Loading employees...
        </div>
      ) : (
        <FilterableCollapsibleTable
          title="Employee List"
          columns={columns}
          data={employees}
          keyField="EmpID"
          collapsibleFields={collapsibleFields}
          filterFields={filterFields}
          filterMeta={filterMeta}
          initialRowsPerPage={10}
        />
      )}
    </div>
  );
};

export default EmployeeTable;
