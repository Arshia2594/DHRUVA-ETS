
// import React from "react";
// import { Routes, Route, Navigate } from "react-router-dom";
// import { AuthProvider } from "./context/AuthContext";
// import useAuth from "./hooks/useAuth";
// import PropTypes from "prop-types";

// // Layout
// import RoleBasedDashboardLayout from "./components/layout/RoleBasedDashboardLayout";

// // Public Page
// import LogIn from "./Pages/login/LogIn";

// // Admin Pages
// import AdminDashboard from "./Pages/admin/AdminDahboard";
// import Report from "./Pages/admin/Report";
// import Employee from "./Pages/admin/Employee";
// import Customer from "./Pages/admin/customer/Customer";
// import Projects from "./Pages/manager/Projects"; // Reused
// import Team from "./Pages/admin/Team";

// // Manager Pages
// import ManagerDashboard from "./Pages/manager/ManagerDashboard";
// import TimeTracking from "./Pages/manager/TimeSheetTracker";
// import ProjectDetails from "./components/common/ProjectDetails";

// // Employee/User Pages
// import EmployeeDashboard from "./Pages/employee/EmployeeDashboard";
// import Reports from "./Pages/admin/report/Reports"; // Shared
// import TimeSheetTracker from "./Pages/manager/TimeSheetTracker";

// // --------------------------
// // ProtectedRoute Component
// // --------------------------
// const ProtectedRoute = ({ children, allowedRoles }) => {
//   const { auth } = useAuth();

//   if (!auth?.token) {
//     return <Navigate to="/login" />;
//   }

//   if (allowedRoles && !allowedRoles.includes(auth.role)) {
//     return <Navigate to="/login" />;
//   }

//   return children;
// };

// ProtectedRoute.propTypes = {
//   children: PropTypes.node.isRequired,
//   allowedRoles: PropTypes.arrayOf(PropTypes.string),
// };

// // --------------------------
// // App Component
// // --------------------------
// const App = () => {
//   return (
//     <AuthProvider>
//       <Routes>
//         {/* Public Route */}
//         <Route path="/login" element={<LogIn />} />

//         {/* Admin Routes */}
//         <Route
//           path="/admin/*"
//           element={
//             <ProtectedRoute allowedRoles={["Admin"]}>
//               <RoleBasedDashboardLayout role="Admin" />
//             </ProtectedRoute>
//           }
//         >
//           <Route path="dashboard" element={<AdminDashboard />} />
//           <Route path="report" element={<Report />} />
//           <Route path="employees" element={<Employee />} />
//           <Route path="customers" element={<Customer />} />
//           <Route path="projects" element={<Projects />} />
//           <Route path="teams/:teamId" element={<Team />} />
//         </Route>

//         {/* Manager Routes */}
//         <Route
//           path="/manager/*"
//           element={
//             <ProtectedRoute allowedRoles={["Manager"]}>
//               <RoleBasedDashboardLayout role="Manager" />
//             </ProtectedRoute>
//           }
//         >
//           <Route path="dashboard" element={<ManagerDashboard />} />
//           <Route path="report" element={<div>Manager reports</div>} />
//           <Route path="team" element={<div>Team Details</div>} />
//           <Route path="time-tracker" element={<TimeTracking />} />
//           <Route path="projects" element={<Projects />} />
//           <Route path="project-details" element={<ProjectDetails />} />
//         </Route>

//         {/* Employee/User Routes */}
//         <Route
//           path="/user/*"
//           element={
//             <ProtectedRoute allowedRoles={["User"]}>
//               <RoleBasedDashboardLayout role="User" />
//             </ProtectedRoute>
//           }
//         >
//           <Route path="dashboard" element={<EmployeeDashboard />} />
//           <Route path="report" element={<Reports />} />
//           <Route path="time-tracker" element={<TimeSheetTracker />} />
//           <Route path="projects" element={<Projects />} />
//           <Route path="project-details" element={<ProjectDetails />} />
//         </Route>
//       </Routes>
//     </AuthProvider>
//   );
// };

// export default App;


import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import useAuth from "./hooks/useAuth";
import PropTypes from "prop-types";

// Layout
import RoleBasedDashboardLayout from "./components/layout/RoleBasedDashboardLayout";

// Public Page
import LogIn from "./Pages/login/LogIn";

// Admin Pages
import AdminDashboard from "./Pages/admin/AdminDahboard";
import Report from "./Pages/admin/Report";
import Employee from "./Pages/admin/Employee";
import Customer from "./Pages/admin/customer/Customer";
import Projects from "./Pages/manager/Projects"; // Reused
import Team from "./Pages/admin/Team";

// Manager Pages
import ManagerDashboard from "./Pages/manager/ManagerDashboard";
import TimeTracking from "./Pages/manager/TimeSheetTracker";
import ProjectDetails from "./components/common/ProjectDetails";

// Employee/User Pages
import EmployeeDashboard from "./Pages/employee/EmployeeDashboard";
import Reports from "./Pages/admin/report/Reports"; // Shared
import TimeSheetTracker from "./Pages/manager/TimeSheetTracker";

// --------------------------
// ProtectedRoute Component
// --------------------------
const ProtectedRoute = ({ children, allowedRoles }) => {
  const { auth } = useAuth();

  if (!auth?.token) {
    return <Navigate to="/login" />;
  }

  if (allowedRoles && !allowedRoles.includes(auth.role)) {
    return <Navigate to="/login" />;
  }

  return children;
};

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
  allowedRoles: PropTypes.arrayOf(PropTypes.string),
};

// --------------------------
// App Component
// --------------------------
const App = () => {
  return (
    <AuthProvider>
      <Routes>
        {/* Public Route */}
        <Route path="/login" element={<LogIn />} />

        {/* Admin Routes */}
        <Route
          path="/admin/*"
          element={
            <ProtectedRoute allowedRoles={["Admin"]}>
              <RoleBasedDashboardLayout role="Admin" />
            </ProtectedRoute>
          }
        >
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="report" element={<Report />} />
          <Route path="employees" element={<Employee />} />
          <Route path="customers" element={<Customer />} />
          <Route path="projects" element={<Projects />} />
          <Route path="teams/:teamId" element={<Team />} />
        </Route>

        {/* Manager Routes */}
        <Route
          path="/manager/*"
          element={
            <ProtectedRoute allowedRoles={["Manager"]}>
              <RoleBasedDashboardLayout role="Manager" />
            </ProtectedRoute>
          }
        >
          <Route path="dashboard" element={<ManagerDashboard />} />
          <Route path="report" element={<div>Manager reports</div>} />
          <Route path="team" element={<div>Team Details</div>} />
          <Route path="time-tracker" element={<TimeTracking />} />
          <Route path="projects" element={<Projects />} />
          <Route path="project-details/:id" element={<ProjectDetails />} />
        </Route>

        {/* Employee/User Routes */}
        <Route
          path="/user/*"
          element={
            <ProtectedRoute allowedRoles={["User"]}>
              <RoleBasedDashboardLayout role="User" />
            </ProtectedRoute>
          }
        >
          <Route path="dashboard" element={<EmployeeDashboard />} />
          <Route path="report" element={<Reports />} />
          <Route path="time-tracker" element={<TimeSheetTracker />} />
          <Route path="projects" element={<Projects />} />
          <Route path="project-details/:id" element={<ProjectDetails />} />
        </Route>
      </Routes>
    </AuthProvider>
  );
};

export default App;



