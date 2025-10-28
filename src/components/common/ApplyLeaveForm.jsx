
import { FaClipboardList, FaCalendarAlt, FaUserTie, FaRegStickyNote } from "react-icons/fa";
import { Formik, Form } from "formik";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import FilterDatePicker from "../../components/common/FilterDatePicker";
import FormSelect from "../../components/common/FormSelect";

const ApplyLeaveForm = ({
  INITIAL_FORM_STATE,
  FORM_VALIDATION,
  isAdmin,
  empId,
  users,
  applyLeave,
}) => {
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");

  return (
    <>
      {/*  Leave Form */}
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 p-6 md:p-8 relative overflow-hidden"
      >
        {/* Decorative accent bar */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#00A65A] to-[#006D3C] rounded-t-2xl" />

        {/* Title */}
        <h3 className="text-xl font-semibold mb-6 text-gray-800 dark:text-gray-200 flex items-center gap-3">
          <FaClipboardList className="text-[#006D3C]" size={22} />
          Apply for Leave
        </h3>

        {/* Formik Form */}
        <Formik
          initialValues={INITIAL_FORM_STATE}
          validationSchema={FORM_VALIDATION}
          onSubmit={async (values, { setSubmitting, resetForm }) => {
            const payload = {
              LeaveType: values.LeaveType,
              StartDate: values.StartDate,
              EndDate: values.EndDate,
              Reason: values.Reason,
              EmpId: isAdmin ? values.EmpId : empId,
            };
            try {
              await applyLeave(payload);
              setPopupMessage("Leave application submitted successfully!");
              setShowPopup(true);
              resetForm();
            } catch (err) {
              setPopupMessage("Something went wrong. Please try again!");
              setShowPopup(true);
            } finally {
              setSubmitting(false);
            }
          }}
        >
          {({ values, setFieldValue, isSubmitting }) => (
            <Form className="space-y-6">
              {/* Row 1: Leave Type & Dates */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5 items-end">
                {/* Leave Type */}
                <div className="flex flex-col">
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 flex items-center gap-2">
                    <FaUserTie size={14} className="text-[#006D3C]" />
                    Leave Type
                  </label>
                  <select
                    name="LeaveType"
                    value={values.LeaveType}
                    onChange={(e) => setFieldValue("LeaveType", e.target.value)}
                    className="w-full px-3 py-[10px] border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-[#006D3C] focus:outline-none bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100"
                  >
                    <option value="">Select Leave Type</option>
                    <option value="Sick Leave">Sick Leave</option>
                    <option value="Casual Leave">Casual Leave</option>
                    <option value="Earned Leave">Earned Leave</option>
                  </select>
                </div>

                {/* Start Date */}
                <div className="flex flex-col">
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 flex items-center gap-2">
                    <FaCalendarAlt size={14} className="text-[#006D3C]" />
                    Start Date
                  </label>
                  <FilterDatePicker
                    name="StartDate"
                    value={values.StartDate}
                    onChange={(val) => setFieldValue("StartDate", val)}
                    className="w-full"
                  />
                </div>

                {/* End Date */}
                <div className="flex flex-col">
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 flex items-center gap-2">
                    <FaCalendarAlt size={14} className="text-[#006D3C]" />
                    End Date
                  </label>
                  <FilterDatePicker
                    name="EndDate"
                    value={values.EndDate}
                    onChange={(val) => setFieldValue("EndDate", val)}
                    className="w-full"
                  />
                </div>
              </div>

              {/* Reason */}
              <div>
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 flex items-center gap-2">
                  <FaRegStickyNote size={14} className="text-[#006D3C]" />
                  Reason
                </label>
                <textarea
                  name="Reason"
                  value={values.Reason}
                  onChange={(e) => setFieldValue("Reason", e.target.value)}
                  rows={3}
                  placeholder="Enter reason..."
                  className="w-full border border-gray-300 dark:border-gray-700 rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#006D3C] focus:outline-none bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 resize-none"
                />
              </div>

              {/* Admin-only field */}
              {isAdmin && (
                <div>
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 flex items-center gap-2">
                    <FaUserTie size={14} className="text-[#006D3C]" />
                    Apply on Behalf Of
                  </label>
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

              {/* Buttons */}
              <div className="flex justify-end gap-4 pt-2">
                <button
                  type="reset"
                  className="px-5 py-2 rounded-full border border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700 font-medium transition"
                >
                  Reset
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-6 py-2 rounded-full bg-green-600 hover:bg-green-700 text-white font-semibold shadow-md transition-transform transform hover:scale-[1.03]"
                >
                  {isSubmitting ? "Applying..." : "Submit"}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </motion.div>

      {/*  Popup Modal  */}
      <AnimatePresence>
        {showPopup && (
          <motion.div
            className="fixed inset-0 bg-black/40 flex items-center justify-center z-[9999]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8 max-w-sm w-full text-center border border-gray-200 dark:border-gray-700"
            >
              <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-3">
                {popupMessage.includes("successfully")
                  ? " Success"
                  : "Alert"}
              </h4>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                {popupMessage}
              </p>
              <button
                onClick={() => setShowPopup(false)}
                className="px-5 py-2 rounded-full bg-green-600 hover:bg-green-700 text-white font-medium transition"
              >
                OK
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ApplyLeaveForm;
