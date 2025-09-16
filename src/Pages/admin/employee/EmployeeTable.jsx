


import { useState, useEffect } from "react";
import EmployeeForm from "./EmployeeForm";
import DataTable from "../../../components/common/DataTable";
import axiosInstance from "../../../components/common/AxiosInstance";
import Swal from "sweetalert2";
import {
  PlusCircleIcon
} from "@heroicons/react/24/solid";


import team1 from "../../../assets/images/team-1.jpg"
import team2 from "../../../assets/images/team-2.jpg"
import team3 from "../../../assets/images/team-3.jpg"
import team4 from "../../../assets/images/team-4.jpg"
import team5 from "../../../assets/images/team-5.jpg"

const profileImages = [team1, team2, team3, team4, team5]



const columns = [
  { id: "EmpID", label: "Emp ID" },
  { id: "Name", label: "First Name" },
  { id: "LastName", label: "Last Name" },
  { id: "Email", label: "Email" },
  { id: "Mobile", label: "Mobile" },
  { id: "Role", label: "Role" },
  { id: "JoiningDate", label: "Joining Date" },
  { id: "Department", label: "Department" },
  { id: "BirthDate", label: "Birth Date" },
  { id: "Gender", label: "Gender" },
  { id: "MaritalStatus", label: "Marital Status" },
  { id: "EmployeeType", label: "Employee Type" },
  { id: "Status", label: "Status" },

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
  //   Swal.fire({
  //     html: `
  //     <div style="text-align: center;">

  //       <img src="${profileImage}" style="width:100px; height:100px; border-radius:50%; object-fit:cover;" />

  //       <h2 style="font-size: 20px; font-weight: bold; margin: 0;">${employee.Name} ${employee.LastName}</h2>
  //       <div style="text-align: left; font-size: 14px; padding-top: 10px;">
  //         <p><strong>Email:</strong> ${employee.Email}</p>
  //         <p><strong>Mobile:</strong> ${employee.Mobile}</p>
  //         <p><strong>Role:</strong> ${employee.Role}</p>
  //         <p><strong>Department:</strong> ${employee.Department}</p>
  //         <p><strong>Birth Date:</strong> ${employee.BirthDate}</p>
  //         <p><strong>Gender:</strong> ${employee.Gender}</p>
  //         <p><strong>Marital Status:</strong> ${employee.MaritalStatus}</p>
  //         <p><strong>Employee Type:</strong> ${employee.EmployeeType}</p>
  //         <p><strong>Status:</strong> ${employee.Status}</p>
  //         <p><strong>Joining Date:</strong> ${employee.JoiningDate}</p>
  //       </div>
  //     </div>
  //   `,
  //     showConfirmButton: true,
  //     confirmButtonText: "Close",
  //     customClass: {
  //       popup: 'custom-swal-popup',
  //       confirmButton: 'swal-custom-btn',
  //     },
  //     width: 500,
  //   });
  // };
  const handleView = (employee) => {
    
  const imageIndex = employee.EmpID % profileImages.length;
  const selectedImage = profileImages[imageIndex];

    Swal.fire({
      html: `
    <div style="text-align: center;">
      <img src="${selectedImage}" style="width:100px; height:100px; border-radius:50%; object-fit:cover; margin: 0 auto;" />

      <h2 style="font-size: 20px; font-weight: bold; margin: 10px 0;">${employee.Name} ${employee.LastName}</h2>
      <div style="text-align: left; font-size: 14px; padding-top: 10px;">
        <p><strong>Email:</strong> ${employee.Email}</p>
        <p><strong>Mobile:</strong> ${employee.Mobile}</p>
        <p><strong>Role:</strong> ${employee.Role}</p>
        <p><strong>Department:</strong> ${employee.Department}</p>
        <p><strong>Birth Date:</strong> ${employee.BirthDate}</p>
        <p><strong>Gender:</strong> ${employee.Gender}</p>
        <p><strong>Marital Status:</strong> ${employee.MaritalStatus}</p>
        <p><strong>Employee Type:</strong> ${employee.EmployeeType}</p>
        <p><strong>Status:</strong> ${employee.Status}</p>
        <p><strong>Joining Date:</strong> ${employee.JoiningDate}</p>
      </div>
    </div>
  `,
      showConfirmButton: true,
      confirmButtonText: "Close",
      customClass: {
        popup: 'custom-swal-popup',
        confirmButton: 'swal-custom-btn',
      },
      width: 500,
    });
  }


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
    <div className="p-6 bg-gray-50 dark:bg-gray-900 min-h-screen">
      {showForm ? (
        <div className="bg-white dark:bg-gray-800 p-6 shadow-md rounded-lg">
          <EmployeeForm
            initialValues={selectedEmployee}
            onCancel={() => setShowForm(false)}
            onSuccess={() => {
              fetchEmployees();
              setShowForm(false);
            }}
          />
        </div>
      ) : (
        <>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-2 sm:mb-0">
              Employee Details
            </h2>
            <button
              onClick={handleAdd}
              className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md text-sm shadow transition-all"
            >
              <PlusCircleIcon className="w-5 h-5" />
              Add Employee
            </button>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
            <DataTable
              rows={rows}
              columns={columns}
              onEdit={handleEdit}
              onView={handleView}
              onDelete={handleDelete}
            />
          </div>
        </>
      )}
    </div>
  );
}
