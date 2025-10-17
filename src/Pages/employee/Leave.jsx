
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

  const { data: leavesRaw = [], refetch: refetchLeaves, loading: leavesLoading } =
    useAxios(endpoint, {}, !!empId, [empId]);

  const usersQueryUrl = GET_ALL_NORMAL_USERS;
  const { data: users = [] } = useAxios(usersQueryUrl, { params: { _limit: 200 } }, isAdmin);

  const applyLeave = async (payload) => {
    try {
      await axiosInstance.post(`/employee/leave/apply`, payload);
      refetchLeaves();
      console.log("Leave applied");
    } catch (err) {
      console.error("Leave apply failed:", err);
    }
  };

  const updateLeaveStatus = async (leaveId, status) => {
    try {
      await axiosInstance.put(`/employee/leave/status/${leaveId}`, { Status: status });
      refetchLeaves();
      console.log("Leave status updated");
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

  // include action buttons inside data itself
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
        StartDate: l.StartDate || "",
        EndDate: l.EndDate || "",
        LeaveType: l.LeaveType || "",
        Status: status,
        actions:
          (isManager || isAdmin) && (
            <div className="flex items-center justify-center gap-2">
              <button
                onClick={() => updateLeaveStatus(leaveId, "Approved")}
                disabled={status === "Approved"}
                className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 disabled:opacity-50"
              >
                Approve
              </button>
              <button
                onClick={() => updateLeaveStatus(leaveId, "Rejected")}
                disabled={status === "Rejected"}
                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 disabled:opacity-50"
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
    EmployeeName: { type: "text" },
    LeaveType: {
      type: "select",
      options: [
        { label: "All", value: "" },
        { label: "Sick Leave", value: "Sick Leave" },
        { label: "Casual Leave", value: "Casual Leave" },
        { label: "Earned Leave", value: "Earned Leave" },
      ],
    },
    StartDate: { type: "date" },
    EndDate: { type: "date" },
  };

  //  column config
  const columns = [
    ...(isManager || isAdmin ? [{ field: "EmployeeName", headerName: "Employee" }] : []),
    { field: "LeaveType", headerName: "Type" },
    { field: "StartDate", headerName: "Start" },
    { field: "EndDate", headerName: "End" },
    { field: "Reason", headerName: "Reason" },
    {
      field: "Status",
      headerName: "Status",
      renderCell: ({ row }) => {
        const status = row?.Status;
        const cls =
          status === "Approved"
            ? "text-green-600 font-semibold"
            : status === "Rejected"
            ? "text-red-600 font-semibold"
            : "text-blue-600 font-semibold";
        return <span className={cls}>{status}</span>;
      },
    },
    ...(isManager || isAdmin ? [{ field: "actions", headerName: "Action" }] : []),
  ];

  return (
    <div className="p-4">
      <HeaderTitle
        title={
          isAdmin
            ? "All Leave Requests"
            : isManager
            ? "My Leaves & Approvals"
            : "My Leaves"
        }
      />

      {/* Leave Apply Form */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 max-w-3xl mx-auto mb-6">
        <Formik
          initialValues={INITIAL_FORM_STATE}
          validationSchema={FORM_VALIDATION}
          enableReinitialize
          onSubmit={async (values, { setSubmitting, resetForm }) => {
            const payload = {
              LeaveType: values.LeaveType,
              StartDate: values.StartDate,
              EndDate: values.EndDate,
              Reason: values.Reason,
              EmpId: isAdmin ? values.EmpId : empId,
            };
            await applyLeave(payload);
            setSubmitting(false);
            resetForm();
          }}
        >
          {({ values, setFieldValue, isSubmitting }) => (
            <Form className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Leave Type</label>
                  <select
                    name="LeaveType"
                    value={values.LeaveType}
                    onChange={(e) => setFieldValue("LeaveType", e.target.value)}
                    className="w-full px-3 py-2 border rounded-md"
                    required
                  >
                    <option value="">Select Leave Type</option>
                    <option value="Sick Leave">Sick Leave</option>
                    <option value="Casual Leave">Casual Leave</option>
                    <option value="Earned Leave">Earned Leave</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Start Date</label>
                  <FilterDatePicker
                    name="StartDate"
                    value={values.StartDate}
                    onChange={(val) => setFieldValue("StartDate", val)}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">End Date</label>
                  <FilterDatePicker
                    name="EndDate"
                    value={values.EndDate}
                    onChange={(val) => setFieldValue("EndDate", val)}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Reason</label>
                <textarea
                  name="Reason"
                  value={values.Reason}
                  onChange={(e) => setFieldValue("Reason", e.target.value)}
                  className="w-full px-3 py-2 border rounded-md"
                  rows={3}
                  placeholder="Enter reason..."
                />
              </div>

              {isAdmin && (
                <div>
                  <label className="block text-sm font-medium mb-1">Apply On Behalf Of</label>
                  <FormSelect
                    name="EmpId"
                    value={values.EmpId}
                    onChange={(val) => setFieldValue("EmpId", val)}
                    options={
                      users?.map((u) => ({
                        value: u.EmpId,
                        label: `${u.FirstName} ${u.LastName}`.trim(),
                      })) || []
                    }
                    placeholder="Select employee"
                  />
                </div>
              )}

              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => window.dispatchEvent(new Event("resetForm"))}
                  className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded"
                >
                  Reset
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
                >
                  {isSubmitting ? "Applying..." : "Submit"}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>

      {/* Table */}
      <div className="bg-white dark:bg-gray-900 rounded-lg border dark:border-gray-700 shadow-sm p-4">
        <FilterableCollapsibleTable
          title="Leaves"
          data={leaves}
          columns={columns}
          filterFields={filterFields}
          filterMeta={filterMeta}
          FormikDateFilter={({ value, onChange }) => (
            <FilterDatePicker value={value} onChange={onChange} />
          )}
        />
        {leavesLoading && <div className="text-sm text-gray-500 mt-2">Loading leaves...</div>}
      </div>
    </div>
  );
};

export default Leave;
