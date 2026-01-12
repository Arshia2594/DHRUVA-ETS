import { Formik, Form } from "formik";
import * as Yup from "yup";
import PropTypes from "prop-types";
import Input from "../../../components/common/Input";
import FormSelect from "../../../components/common/FormSelect";
import FormikDatePicker from "../../../components/common/FormikDatePicker";
import axiosInstance from "../../../components/common/AxiosInstance";

const INITIAL_FORM_STATE = {
  EmpID: "",
  Name: "",
  LastName: "",
  Email: "",
  Mobile: "",
  Role: "user",
  Department: "",
  UserName: "",       
  Designation: "",
  Status: "Active",
  JoiningDate: "",
};

const departmentOptions = [
  { value: "Admin-HR", label: "Admin-HR" },
  { value: "Project-Automation", label: "Project-Automation" },
  { value: "IT", label: "IT" },
  { value: "Sales", label: "Sales" },
];

const statusOptions = [
  { value: "Active", label: "Active" },
  { value: "Inactive", label: "Inactive" },
];

const FORM_VALIDATION = Yup.object({
  Name: Yup.string().required("First Name required"),
  LastName: Yup.string().required("Last Name required"),
  Email: Yup.string().email().required(),
  Mobile: Yup.string().required(),
  Department: Yup.string().required(),
   UserName: Yup.string().required("Username required"),      
  Designation: Yup.string().required("Designation required"),
  JoiningDate: Yup.date().required(),
});

const EmployeeForm = ({ initialValues, mode, onSuccess, onCancel }) => {
  const isView = mode === "view";
  const isEdit = mode === "edit";

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const payload = {
        FirstName: values.Name,
        LastName: values.LastName,
        Email: values.Email,
        Mobile: values.Mobile,
        Role: values.Role,
        JoiningDate: values.JoiningDate,
        department: values.Department,
        status: values.Status,
      };

      if (isEdit) {
        await axiosInstance.put(
          `/employee/editUser/${values.EmpID}`,
          payload
        );
      } else {
        await axiosInstance.post("/employee/addUser", payload);
      }

      onSuccess();
    } catch (err) {
      alert(err?.response?.data?.message || "Error");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Formik
      initialValues={initialValues || INITIAL_FORM_STATE}
      validationSchema={isView ? null : FORM_VALIDATION}
      onSubmit={handleSubmit}
      enableReinitialize
    >
      {({ isSubmitting }) => (
        <Form className="grid grid-cols-1 md:grid-cols-2 gap-4">

          <Input name="Name" label="First Name" disabled={isView} />
          <Input name="LastName" label="Last Name" disabled={isView} />
          <Input name="Email" label="Email" disabled={isView} />
          <Input name="Mobile" label="Mobile" disabled={isView} />
          <Input
            name="UserName"
            label="Username"
            disabled={isView}
          />

          <Input
            name="Designation"
            label="Designation"
            disabled={isView}
          />


          <FormSelect
            name="Department"
            label="Department"
            options={departmentOptions}
            disabled={isView}
          />

          <FormSelect
            name="Status"
            label="Status"
            options={statusOptions}
            disabled={isView}
          />



          <FormikDatePicker
            name="JoiningDate"
            label="Joining Date"
            disabled={isView}
          />

          <div className="col-span-full flex justify-end gap-2 mt-4">
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 bg-gray-300 rounded"
            >
              Close
            </button>

            {!isView && (
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-4 py-2 bg-green-600 text-white rounded"
              >
                {isEdit ? "Update" : "Submit"}
              </button>
            )}
          </div>
        </Form>
      )}
    </Formik>
  );
};

EmployeeForm.propTypes = {
  initialValues: PropTypes.object,
  mode: PropTypes.string.isRequired,
  onSuccess: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};

export default EmployeeForm;
