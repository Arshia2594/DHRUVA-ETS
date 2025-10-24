
import React, { useEffect, useMemo, useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import useAxios from "../../hooks/useAxios";
import { useAuth } from "../../context/AuthContext";
import HeaderTitle from "../../components/common/HeaderTitle";
import axiosInstance from "../../components/common/AxiosInstance";
import FilterableCollapsibleTable from "../../components/HOC/FilterableCollapsibleTable";
import FormSelect from "../../components/common/FormSelect";
import FilterDatePicker from "../../components/common/FilterDatePicker";
import { GET_ALL_NORMAL_USERS } from "../../utils/Strings";
import { motion } from "framer-motion";
import { FaCalendarAlt, FaClipboardList, FaUserTie } from "react-icons/fa";
import ApplyLeaveForm from "../../components/common/ApplyLeaveForm";

const Leave = () => {
  const { auth } = useAuth();
  const role = auth?.role?.toLowerCase();
  const isManager = role === "manager";
  const isAdmin = role === "admin";
  const empId = auth?.empId;

  const endpoint = useMemo(() => {
    if (isAdmin) return `/employee/leave/all`;
    if (isManager) return `/employee/leave/manager/leaves`;
    return `/employee/leave/my-leaves`;
  }, [isAdmin, isManager]);

  const { data: leavesResponse = {}, refetch: refetchLeaves, loading: leavesLoading } =
    useAxios(endpoint, {}, !!empId, [empId]);

  const leavesRaw = Array.isArray(leavesResponse)
    ? leavesResponse
    : Array.isArray(leavesResponse?.data)
      ? leavesResponse.data
      : [];

  const usersQueryUrl = GET_ALL_NORMAL_USERS;
  const department = isAdmin ? "all" : auth?.department || "all";

  const { data: users = [] } = useAxios(
    usersQueryUrl,
    { params: { _limit: 200, department } },
    isAdmin
  );

  const applyLeave = async (payload) => {
    try {
      await axiosInstance.post(`/employee/leave/apply`, payload);
      refetchLeaves();
    } catch (err) {
      console.error("Leave apply failed:", err);
    }
  };

  const updateLeaveStatus = async (leaveId, status) => {
    try {
      await axiosInstance.put(`/employee/leave/status/${leaveId}`, { Status: status });
      refetchLeaves();
    } catch (err) {
      console.error("Failed to update status:", err);
    }
  };

  const INITIAL_FORM_STATE = {
    LeaveType: "",
    StartDate: "",
    EndDate: "",
    Reason: "",
    EmpId: isAdmin ? "" : empId,
  };

  const FORM_VALIDATION = Yup.object().shape({
    LeaveType: Yup.string().required("Leave type is required"),
    StartDate: Yup.string().required("Start date is required"),
    EndDate: Yup.string()
      .required("End date is required")
      .test("is-after-start", "End date must be same or after start date", function (value) {
        const { StartDate } = this.parent;
        if (!StartDate || !value) return true;
        return new Date(value) >= new Date(StartDate);
      }),
    Reason: Yup.string().required("Reason is required"),
    EmpId: isAdmin ? Yup.mixed().required("Please pick an employee") : Yup.mixed(),
  });

  const leaves = useMemo(() => {
    return (leavesRaw || []).map((l) => {
      const status = l.Status || "Pending";
      const leaveId = l.LeaveId;

      return {
        ...l,
        EmployeeName:
          l.User?.FirstName || l.User?.FirstName === ""
            ? `${l.User?.FirstName ?? ""} ${l.User?.LastName ?? ""}`.trim()
            : l.EmployeeName || "N/A",
        //  Format StartDate & EndDate properly
        StartDate: l.StartDate ? new Date(l.StartDate).toLocaleDateString("en-IN") : "-",
        EndDate: l.EndDate ? new Date(l.EndDate).toLocaleDateString("en-IN") : "-",

        Status: (
          <span
            className={`px-3 py-1 rounded-full text-sm font-semibold ${status === "Approved"
                ? "bg-green-100 text-green-700"
                : status === "Rejected"
                  ? "bg-red-100 text-red-700"
                  : "bg-yellow-100 text-yellow-700"
              }`}
          >
            {status}
          </span>
        ),
        actions:
          (isManager || isAdmin) && (
            <div className="flex items-center justify-center gap-2">
              <button
                onClick={() => updateLeaveStatus(leaveId, "Approved")}
                disabled={status === "Approved"}
                className="px-3 py-1 rounded-md bg-green-500 text-white text-sm font-medium hover:bg-green-600 transition disabled:opacity-50"
              >
                Approve
              </button>
              <button
                onClick={() => updateLeaveStatus(leaveId, "Rejected")}
                disabled={status === "Rejected"}
                className="px-3 py-1 rounded-md bg-red-500 text-white text-sm font-medium hover:bg-red-600 transition disabled:opacity-50"
              >
                Reject
              </button>
            </div>
          ),
      };
    });
  }, [leavesRaw, isManager, isAdmin]);



  const filterFields = ["EmployeeName", "LeaveType", "StartDate", "EndDate"];

  const filterMeta = {
    LeaveType: {
      type: "select",
      options: [
        { label: "All", value: "" },
        { label: "Sick Leave", value: "Sick Leave" },
        { label: "Casual Leave", value: "Casual Leave" },
        { label: "Earned Leave", value: "Earned Leave" },
      ],
    },
    // StartDate: { type: "date" },
    // EndDate: { type: "date" },
  };


  const columns = [
    ...(isManager || isAdmin ? [{ field: "EmployeeName", headerName: "Employee" }] : []),
    { field: "LeaveType", headerName: "Type" },
    { field: "StartDate", headerName: "Start" },
    { field: "EndDate", headerName: "End" },
    { field: "Reason", headerName: "Reason" },
    { field: "Status", headerName: "Status" },
    ...(isManager || isAdmin ? [{ field: "actions", headerName: "Action" }] : []),
  ];

  const [stats, setStats] = useState({ totalLeaves: 0, used: 0, remaining: 0, compOff: 0 });

useEffect(() => {
  const fetchStats = async () => {
    try {
      const url = isManager
        ? "/employee/leave/manager/stats"
        : "/employee/leave/stats";
      const res = await axiosInstance.get(url);
      setStats(res.data);
    } catch (err) {
      console.error("Error fetching leave stats:", err);
    }
  };

  fetchStats();
}, [isManager]);



  return (
    <div className="space-y-8">
      <HeaderTitle
        title={
          isAdmin
            ? "All Leave Requests"
            : isManager
              ? "My Leaves & Approvals"
              : "My Leaves"
        }
      />

        {/* Leave Summary Section */}
{!(isAdmin) && (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4 }}
    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
  >
  <div className="bg-white dark:bg-gray-900 rounded-xl shadow-md p-4 flex flex-col items-center justify-center">
    <p className="text-sm text-gray-500">Total Leaves</p>
    <h3 className="text-2xl font-bold text-[#006D3C]">{stats.totalLeaves}</h3>
  </div>

  <div className="bg-white dark:bg-gray-900 rounded-xl shadow-md p-4 flex flex-col items-center justify-center">
    <p className="text-sm text-gray-500">Used</p>
    <h3 className="text-2xl font-bold text-[#E53E3E]">{stats.used}</h3>
  </div>

  <div className="bg-white dark:bg-gray-900 rounded-xl shadow-md p-4 flex flex-col items-center justify-center">
    <p className="text-sm text-gray-500">Remaining</p>
    <h3 className="text-2xl font-bold text-[#3182CE]">{stats.remaining}</h3>
  </div>

  <div className="bg-white dark:bg-gray-900 rounded-xl shadow-md p-4 flex flex-col items-center justify-center">
    <p className="text-sm text-gray-500">Comp Off</p>
    <h3 className="text-2xl font-bold text-[#D69E2E]">{stats.compOff}</h3>
  </div>
</motion.div>
)}


      <ApplyLeaveForm
        INITIAL_FORM_STATE={INITIAL_FORM_STATE}
        FORM_VALIDATION={FORM_VALIDATION}
        isAdmin={isAdmin}
        empId={empId}
        users={users}
        applyLeave={applyLeave}
      />

      {/* Leave Table */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-5 border border-gray-100 dark:border-gray-700"
      >
        <FilterableCollapsibleTable
          title="Leave Records"
          data={leaves}
          columns={columns}
          filterFields={filterFields}
          filterMeta={filterMeta}
        />

        {leavesLoading && (
          <p className="text-center text-gray-500 text-sm mt-3">Loading leaves...</p>
        )}
      </motion.div>

    </div>
  );
};

export default Leave;
