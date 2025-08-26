

import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import useAuth from './hooks/useAuth';
import PropTypes from 'prop-types';

// Pages
import LogIn from './Pages/login/LogIn';
import AdminDashboardLayout from './components/layout/AdminDashboardLayout';
import AdminDashboard from './Pages/admin/AdminDahboard';

import Report from './Pages/admin/Report';
import Employee from './Pages/admin/Employee';
import Customer from './Pages/admin/customer/Customer';
import Team from './Pages/admin/Team';
import Reports from './Pages/admin/report/Reports';

// Manager Pages
import Projects from './Pages/manager/Projects';
import ManagerDashboardLayout from './components/layout/ManagerDashboardLayout';
import TimeSheetTracker from './Pages/manager/TimeSheetTracker';

// Employee Pages
import TimeTracking from './Pages/employee/TimeTracking';
import ProjectDetails from './components/common/ProjectDetails';
import EmployeeDashboardLayout from './components/layout/EmployeeDashboardLayout';
import EmployeeDashboard from './Pages/employee/EmployeeDashboard';


// ProtectedRoute component
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
  allowedRoles: PropTypes.arrayOf(PropTypes.string)
};


//  App component
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
            <ProtectedRoute allowedRoles={['Admin']}>
              <AdminDashboardLayout />
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
            <ProtectedRoute allowedRoles={['Manager']}>
              <ManagerDashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route path="dashboard" element={<ManagerDashboardLayout />} />
          <Route path="report" element={<div>Manager reports</div>} />
          <Route path="team" element={<div>Team Details</div>} />
          <Route path="time-tracker" element={<TimeTracking />} />
          <Route path="projects" element={<Projects />} />
          <Route path="project-details" element={<ProjectDetails />} />
        </Route>

        {/* Employee/User Routes */}
        <Route
          path="/user/*"
          element={
            <ProtectedRoute allowedRoles={['User']}>
              <EmployeeDashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route path="dashboard" element={<EmployeeDashboard />} />
          <Route path="report" element={<Reports />} />
          <Route path="time-tracker" element={<TimeSheetTracker />} />
          <Route path="projects" element={<Projects />} />
          <Route path="project-details" element={<ProjectDetails />} />
        </Route>
      </Routes>
    </AuthProvider>
  );
};

export default App;

