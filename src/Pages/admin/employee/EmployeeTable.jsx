import React, { useEffect, useState, useMemo } from "react";
import { EyeIcon, PencilIcon, PlusIcon } from "@heroicons/react/24/solid";
import axiosInstance from "../../../components/common/AxiosInstance";
import HeaderTitle from "../../../components/common/HeaderTitle";
import FilterableCollapsibleTable from "../../../components/HOC/FilterableCollapsibleTable";
import Modal from "../../../components/common/Modal";
import EmployeeForm from "./EmployeeForm";

const EmployeeTable = () => {
  const [employees, setEmployees] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [mode, setMode] = useState("add");
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  const fetchEmployees = async () => {
    const res = await axiosInstance.get("/employee/all");
    setEmployees(res.data || []);
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const handleAdd = () => {
    setMode("add");
    setSelectedEmployee(null);
    setModalOpen(true);
  };

  const openEmployee = async (row, type) => {
    const res = await axiosInstance.get(`/employee/employee/${row.EmpID}`);
    const u = res.data;

    setSelectedEmployee({
      EmpID: u.EmpId,
      Name: u.FirstName,
      LastName: u.LastName,
      Email: u.Email,
      Mobile: u.Mobile,
      Role: u.Role,
      Department: u.department,
      Status: u.status,
      JoiningDate: u.JoiningDate,
    });

    setMode(type);
    setModalOpen(true);
  };

  const columns = useMemo(
    () => [
      { field: "EmpID", headerName: "Emp ID" },
      { field: "Name", headerName: "First Name" },
      { field: "LastName", headerName: "Last Name" },
      { field: "Department", headerName: "Department" },
      { field: "UserName" , headerName: "UserName"},
      { field: "Designation", headerName:"Designation"},
      { field: "Status", headerName: "Status" },
      {
        field: "actions",
        headerName: "Actions",
        render: (row) => (
          <div className="flex gap-3">
            <EyeIcon
              className="h-4 w-4 text-blue-600 cursor-pointer"
              onClick={() => openEmployee(row, "view")}
            />
            <PencilIcon
              className="h-4 w-4 text-green-600 cursor-pointer"
              onClick={() => openEmployee(row, "edit")}
            />
          </div>
        ),
      },
    ],
    []
  );

  return (
    <div className="space-y-4">
      <div className="flex justify-between">
        <HeaderTitle title="Employees" />
        <button
          onClick={handleAdd}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded"
        >
          <PlusIcon className="h-4 w-4" />
          Add Employee
        </button>
      </div>

      <FilterableCollapsibleTable
        title="Employee List"
        columns={columns}
        data={employees}
        keyField="EmpID"
      />

      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={
          mode === "add"
            ? "Add Employee"
            : mode === "edit"
            ? "Edit Employee"
            : "Employee Details"
        }
      >
        <EmployeeForm
          initialValues={selectedEmployee}
          mode={mode}
          onSuccess={() => {
            setModalOpen(false);
            fetchEmployees();
          }}
          onCancel={() => setModalOpen(false)}
        />
      </Modal>
    </div>
  );
};

export default EmployeeTable;
