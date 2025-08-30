

import { useState, useEffect } from "react";
import EmployeeForm from "./EmployeeForm";
import DataTable from "../../../components/common/DataTable";
import axiosInstance from "../../../components/common/AxiosInstance";
import Swal from "sweetalert2";

const columns = [
  { id: "EmpID", label: "EmpID" },
  { id: "Name", label: "First Name" },
  { id: "LastName", label: "Last Name" },
  { id: "Email", label: "Email" },
  { id: "Mobile", label: "Mobile" },
  { id: "Role", label: "Role" },
  { id: "JoiningDate", label: "Joining Date" },
  
];

export default function EmployeeTable() {
  const [rows, setRows] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  const fetchEmployees = async () => {
    try {
      const response = await axiosInstance.get("/employee/getAllEmpDetails");
      setRows(response.data || []);
    } catch (error) {
      console.error("API error:", error);
      setRows([]);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const handleAdd = () => {
    setSelectedEmployee(null);
    setShowForm(true);
  };

  const handleEdit = (employee) => {
    setSelectedEmployee(employee);
    setShowForm(true);
  };

  // const handleView = (employee) => {
  //   alert(JSON.stringify(employee, null, 2));
  // };
const handleView = (employee) => {
  Swal.fire({
    title: `${employee.Name} ${employee.LastName}`,
    html: `
      <div style="text-align: left; font-size: 14px;">
        <p><strong>Email:</strong> ${employee.Email}</p>
        <p><strong>Mobile:</strong> ${employee.Mobile}</p>
        <p><strong>Role:</strong> ${employee.Role}</p>
        <p><strong>Joining Date:</strong> ${employee.JoiningDate}</p>
      </div>
    `,
    icon: "info",
    confirmButtonText: "Close",
    customClass: {
      confirmButton: "swal-custom-btn",
    },
  });
};


  // const handleDelete = async (employee) => {
  //   if (!confirm("Are you sure to delete this employee?")) return;
  //   try {
  //     await axiosInstance.delete(`/employee/delete?EmpID=${employee.EmpID}`);
  //     setRows(rows.filter((r) => r.EmpID !== employee.EmpID));
  //   } catch (error) {
  //     console.error("Delete error:", error);
  //   }
  // };

  const handleDelete = async (employee) => {
  Swal.fire({
    title: "Are you sure?",
    text: `Do you want to delete ${employee.Name} ${employee.LastName}?`,
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#d33",
    cancelButtonColor: "#3085d6",
    confirmButtonText: "Yes, delete it!",
  }).then(async (result) => {
    if (result.isConfirmed) {
      try {
        await axiosInstance.delete(`/employee/delete?EmpID=${employee.EmpID}`);
        setRows((prev) => prev.filter((r) => r.EmpID !== employee.EmpID));

        Swal.fire({
          toast: true,
          position: "top-end",
          icon: "success",
          title: "Employee deleted successfully",
          showConfirmButton: false,
          timer: 2000,
          timerProgressBar: true,
        });
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Error!",
          text: "Failed to delete employee.",
        });
        console.error("Delete error:", error);
      }
    }
  });
};


  return (
    <div className="p-6">
      {showForm ? (
        <EmployeeForm
          initialValues={selectedEmployee}
          onCancel={() => setShowForm(false)}
          onSuccess={() => {
            fetchEmployees();
            setShowForm(false);
          }}
        />
      ) : (
        <>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">Employee Details</h2>
            <button
              onClick={handleAdd}
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            >
              Add Employee
            </button>
          </div>

          <DataTable
            rows={rows}
            columns={columns}
            onEdit={handleEdit}
            onView={handleView}
            onDelete={handleDelete}
          />
        </>
      )}
    </div>
  );
}
