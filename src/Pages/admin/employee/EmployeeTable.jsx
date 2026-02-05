// import React, { useEffect, useState, useMemo } from "react";
// import { EyeIcon, PencilIcon, PlusIcon } from "@heroicons/react/24/solid";
// import axiosInstance from "../../../components/common/AxiosInstance";
// import HeaderTitle from "../../../components/common/HeaderTitle";
// import FilterableCollapsibleTable from "../../../components/HOC/FilterableCollapsibleTable";
// import Modal from "../../../components/common/Modal";
// import EmployeeForm from "./EmployeeForm";

// const EmployeeTable = () => {
//   const [employees, setEmployees] = useState([]);
//   const [modalOpen, setModalOpen] = useState(false);
//   const [mode, setMode] = useState("add");
//   const [selectedEmployee, setSelectedEmployee] = useState(null);

//   const fetchEmployees = async () => {
//     const res = await axiosInstance.get("/employee/all");
//     setEmployees(res.data || []);
//   };

//   useEffect(() => {
//     fetchEmployees();
//   }, []);

//   const handleAdd = () => {
//     setMode("add");
//     setSelectedEmployee(null);
//     setModalOpen(true);
//   };

//   const openEmployee = async (row, type) => {
//     const res = await axiosInstance.get(`/employee/employee/${row.EmpID}`);
//     const u = res.data;

//     setSelectedEmployee({
//       EmpID: u.EmpId,
//       Name: u.FirstName,
//       LastName: u.LastName,
//       Email: u.Email,
//       Mobile: u.Mobile,
//       Role: u.Role,
//       Department: u.department,
//       Status: u.status,
//       JoiningDate: u.JoiningDate,
//     });

//     setMode(type);
//     setModalOpen(true);
//   };

//   const columns = useMemo(
//     () => [
//       { field: "EmpID", headerName: "Emp ID" },
//       { field: "Name", headerName: "First Name" },
//       { field: "LastName", headerName: "Last Name" },
//       { field: "Department", headerName: "Department" },
//       { field: "UserName" , headerName: "UserName"},
//       { field: "Designation", headerName:"Designation"},
//       { field: "Status", headerName: "Status" },
//       {
//         field: "actions",
//         headerName: "Actions",
//         render: (row) => (
//           <div className="flex gap-3">
//             <EyeIcon
//               className="h-4 w-4 text-blue-600 cursor-pointer"
//               onClick={() => openEmployee(row, "view")}
//             />
//             <PencilIcon
//               className="h-4 w-4 text-green-600 cursor-pointer"
//               onClick={() => openEmployee(row, "edit")}
//             />
//           </div>
//         ),
//       },
//     ],
//     []
//   );

//   return (
//     <div className="space-y-4">
//       <div className="flex justify-between">
//         <HeaderTitle title="Employees" />
//         <button
//           onClick={handleAdd}
//           className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded"
//         >
//           <PlusIcon className="h-4 w-4" />
//           Add Employee
//         </button>
//       </div>

//       <FilterableCollapsibleTable
//         title="Employee List"
//         columns={columns}
//         data={employees}
//         keyField="EmpID"
//       />

//       <Modal
//         isOpen={modalOpen}
//         onClose={() => setModalOpen(false)}
//         title={
//           mode === "add"
//             ? "Add Employee"
//             : mode === "edit"
//             ? "Edit Employee"
//             : "Employee Details"
//         }
//       >
//         <EmployeeForm
//           initialValues={selectedEmployee}
//           mode={mode}
//           onSuccess={() => {
//             setModalOpen(false);
//             fetchEmployees();
//           }}
//           onCancel={() => setModalOpen(false)}
//         />
//       </Modal>
//     </div>
//   );
// };

// export default EmployeeTable;
















// import React, { useEffect, useState, useMemo } from "react";
// import { EyeIcon, PencilIcon, PlusIcon } from "@heroicons/react/24/solid";
// import axiosInstance from "../../../components/common/AxiosInstance";
// import HeaderTitle from "../../../components/common/HeaderTitle";
// import FilterableCollapsibleTable from "../../../components/HOC/FilterableCollapsibleTable";
// import Modal from "../../../components/common/Modal";
// import EmployeeForm from "./EmployeeForm";

// const EmployeeTable = () => {
//   const [employees, setEmployees] = useState([]);
//   const [modalOpen, setModalOpen] = useState(false);
//   const [mode, setMode] = useState("add");
//   const [selectedEmployee, setSelectedEmployee] = useState(null);

//   const fetchEmployees = async () => {
//     const res = await axiosInstance.get("/employee/all");
//     setEmployees(res.data || []);
//   };

//   useEffect(() => {
//     fetchEmployees();
//   }, []);

//   const handleAdd = () => {
//     setMode("add");
//     setSelectedEmployee(null);
//     setModalOpen(true);
//   };

//   const openEmployee = async (row, type) => {
//     const res = await axiosInstance.get(`/employee/employee/${row.EmpID}`);
//     const u = res.data;

//     setSelectedEmployee({
//       EmpID: u.EmpId,
//       Name: u.FirstName,
//       LastName: u.LastName,
//       Email: u.Email,
//       Mobile: u.Mobile,
//       Role: u.Role,
//       Department: u.department,
//       Status: u.status,
//       JoiningDate: u.JoiningDate,
//     });

//     setMode(type);
//     setModalOpen(true);
//   };

//   const columns = useMemo(
//     () => [
//       { field: "EmpID", headerName: "Emp ID" },
//       { field: "Name", headerName: "First Name" },
//       { field: "LastName", headerName: "Last Name" },
//       { field: "Department", headerName: "Department" },
//       { field: "UserName", headerName: "Username" },
//       { field: "Designation", headerName: "Designation" },
//       { field: "Status", headerName: "Status" },
//       {
//         field: "actions",
//         headerName: "Actions",
//         render: (row) => (
//           <div className="flex gap-3">
//             <EyeIcon
//               className="h-4 w-4 text-[#006633] cursor-pointer"
//               onClick={() => openEmployee(row, "view")}
//             />
//             <PencilIcon
//               className="h-4 w-4 text-green-700 cursor-pointer"
//               onClick={() => openEmployee(row, "edit")}
//             />
//           </div>
//         ),
//       },
//     ],
//     []
//   );

//   return (
//     <div className="space-y-4">
//       {/* HEADER */}
//       <div className="flex items-center justify-between">
//         <HeaderTitle title="Employees" />

//         {/* ✅ THEME MATCHED ADD BUTTON */}
//         {/* <button
//           onClick={handleAdd}
//           className="flex items-center gap-2
//             bg-[#006633] hover:bg-green-800
//             text-white px-4 py-2 rounded-md
//             shadow-sm transition"
//         > */}
//           {/* <PlusIcon className="h-4 w-4" />
//           Add Employee
//         </button> */}
//       </div>

//       {/* TABLE WITH FILTER + PAGINATION */}
//       <FilterableCollapsibleTable
//         title="Employee List"
//         columns={columns}
//         data={employees}
//         keyField="EmpID"
//         filterFields={["Name", "Department", "Status"]}
//         filterMeta={{
//           Name: {
//             label: "Employee Name",
//             placeholder: "Search by name",
//           },
//           Department: {
//             label: "Department",
//             type: "select",
//             options: [
//               { label: "HR", value: "HR" },
//               { label: "IT", value: "IT" },
//               { label: "Sales", value: "Sales" },
//             ],
//           },
//           Status: {
//             label: "Status",
//             type: "select",
//             options: [
//               { label: "Active", value: "Active" },
//               { label: "Inactive", value: "Inactive" },
//             ],
//           },
//         }}
//         onAddClick={handleAdd}
//       />

//       {/* MODAL */}
//       <Modal
//         isOpen={modalOpen}
//         onClose={() => setModalOpen(false)}
//         title={
//           mode === "add"
//             ? "Add Employee"
//             : mode === "edit"
//             ? "Edit Employee"
//             : "Employee Details"
//         }
//       >
//         <EmployeeForm
//           initialValues={selectedEmployee}
//           mode={mode}
//           onSuccess={() => {
//             setModalOpen(false);
//             fetchEmployees();
//           }}
//           onCancel={() => setModalOpen(false)}
//         />
//       </Modal>
//     </div>
//   );
// };

// export default EmployeeTable;



import React, { useEffect, useState, useMemo } from "react";
import { EyeIcon, PencilIcon } from "@heroicons/react/24/solid";
import axiosInstance from "../../../components/common/AxiosInstance";
import HeaderTitle from "../../../components/common/HeaderTitle";
import FilterableCollapsibleTable from "../../../components/HOC/FilterableCollapsibleTable";
import Modal from "../../../components/common/Modal";
import EmployeeForm from "./EmployeeForm";

/* =======================
   DEFAULT AVATAR
======================= */
const DEFAULT_AVATAR = "https://i.pravatar.cc/150?img=32";

const EmployeeTable = () => {
  const [employees, setEmployees] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [mode, setMode] = useState("add");
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  /* =======================
     FETCH EMPLOYEES
  ======================= */
  const fetchEmployees = async () => {
    try {
      const res = await axiosInstance.get("/employee/all");

      // ✅ Normalize avatar for table
      const normalized = (res.data || []).map((emp) => ({
        ...emp,
        avatar: emp.avatar || DEFAULT_AVATAR,
      }));

      setEmployees(normalized);
    } catch (err) {
      console.error("Failed to load employees", err);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  /* =======================
     ADD EMPLOYEE
  ======================= */
  const handleAdd = () => {
    setMode("add");
    setSelectedEmployee(null);
    setModalOpen(true);
  };

  /* =======================
     VIEW / EDIT EMPLOYEE
  ======================= */
  const openEmployee = async (row, type) => {
    try {
      const res = await axiosInstance.get(
        `/employee/employee/${row.EmpID}`
      );
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
        UserName: u.UserName,
        Designation: u.Designation,
        avatar: u.avatar || DEFAULT_AVATAR, // ✅ IMPORTANT
      });

      setMode(type);
      setModalOpen(true);
    } catch (err) {
      console.error("Failed to open employee", err);
    }
  };

  /* =======================
     TABLE COLUMNS
  ======================= */
  const columns = useMemo(
    () => [
      { field: "EmpID", headerName: "Emp ID" },

      {
        headerName: "Employee",
        render: (row) => (
          <div className="flex items-center gap-3">
            <img
              src={row.avatar || DEFAULT_AVATAR}
              alt="profile"
              className="h-9 w-9 rounded-full object-cover border"
            />
            <div>
              <p className="font-medium text-gray-900">
                {row.Name} {row.LastName}
              </p>
              <p className="text-xs text-gray-500">
                {row.Designation || "Employee"}
              </p>
            </div>
          </div>
        ),
      },

      { field: "Department", headerName: "Department" },
      { field: "UserName", headerName: "Username" },
      { field: "Status", headerName: "Status" },

      {
        field: "actions",
        headerName: "Actions",
        render: (row) => (
          <div className="flex gap-3">
            <EyeIcon
              className="h-4 w-4 text-[#006633] cursor-pointer"
              onClick={() => openEmployee(row, "view")}
            />
            <PencilIcon
              className="h-4 w-4 text-green-700 cursor-pointer"
              onClick={() => openEmployee(row, "edit")}
            />
          </div>
        ),
      },
    ],
    []
  );

  /* =======================
     RENDER
  ======================= */
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <HeaderTitle title="Employees" />
      </div>

      <FilterableCollapsibleTable
        title="Employee List"
        columns={columns}
        data={employees}
        keyField="EmpID"
        filterFields={["Name", "Department", "Status"]}
        onAddClick={handleAdd}
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
