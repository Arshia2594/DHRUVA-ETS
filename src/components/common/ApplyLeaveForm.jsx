import { FaClipboardList } from "react-icons/fa";
import { Formik, Form } from "formik";
import { motion } from "framer-motion";
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
  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-6 md:p-8"
    >
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
          await applyLeave(payload);
          setSubmitting(false);
          resetForm();
        }}
      >
        {({ values, setFieldValue, isSubmitting }) => (
          <Form className="space-y-5">
            {/* Leave Type + Dates */}
            <div className="grid md:grid-cols-3 gap-5 items-end">
              {/* Leave Type */}
              <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Leave Type
                </label>
                <select
                  name="LeaveType"
                  value={values.LeaveType}
                  onChange={(e) => setFieldValue("LeaveType", e.target.value)}
                  className="w-full px-3 py-[10px] border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-[#006D3C] dark:focus:ring-[#00A65A] focus:outline-none bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100"
                >
                  <option value="">Select Leave Type</option>
                  <option value="Sick Leave">Sick Leave</option>
                  <option value="Casual Leave">Casual Leave</option>
                  <option value="Earned Leave">Earned Leave</option>
                </select>
              </div>

              {/* From Date */}
              <FilterDatePicker
                name="StartDate"
                label="Start Date"
                value={values.StartDate}
                onChange={(val) => setFieldValue("StartDate", val)}
              />

              {/* To Date */}
              <FilterDatePicker
                name="EndDate"
                label="End Date"
                value={values.EndDate}
                onChange={(val) => setFieldValue("EndDate", val)}
              />
            </div>

            {/* Reason */}
            <div>
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Reason
              </label>
              <textarea
                name="Reason"
                value={values.Reason}
                onChange={(e) => setFieldValue("Reason", e.target.value)}
                rows={3}
                placeholder="Enter reason..."
                className="w-full border border-gray-300 dark:border-gray-700 rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#006D3C] dark:focus:ring-[#00A65A] focus:outline-none bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 resize-none"
              />
            </div>

            {/* Admin Only */}
            {isAdmin && (
              <div>
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Apply On Behalf Of
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
                type="button"
                onClick={() => window.dispatchEvent(new Event("resetForm"))}
                className="px-5 py-2 rounded-full border border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700 font-medium transition"
              >
                Reset
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-6 py-2 rounded-full bg-[#006D3C] hover:bg-[#005b32] text-white font-semibold shadow-sm transition-transform transform hover:scale-[1.03]"
              >
                {isSubmitting ? "Applying..." : "Submit"}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </motion.div>
  );
};

export default ApplyLeaveForm;
