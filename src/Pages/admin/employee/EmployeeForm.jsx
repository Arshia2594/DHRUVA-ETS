
import { Formik, Form } from "formik";
import * as Yup from "yup";
import PropTypes from "prop-types";
import Input from "../../../components/common/Input";
import axiosInstance from "../../../components/common/AxiosInstance";
import FormikDatePicker from "../../../components/common/FormikDatePicker";
import FormSelect from "../../../components/common/FormSelect";

const INITIAL_FORM_STATE = {
  EmpID: "",
  Name: "",
  LastName: "",
  Email: "",
  Mobile: "",
  Role: "",
  Department: "",
  BirthDate: "",
  Gender: "",
  MaritalStatus: "",
  EmployeeType: "",
  Status: "",
  JoiningDate: "",
};

const departmentOptions = [
   { value: "Admin-HR", label: "Admin-HR" },
    { value: "Project-Automation", label: "Project-Automation" },
  { value: "IT", label: "IT-OT" },
  { value: "IT-Infra structure", label: "IT Infrastructure" },
  { value: "Project-Design", label: "Project-Design" },
  { value: "Sales", label: "Sales" },
  { value: "DesignProject", label: "Design Project" },

];

const maritalStatusOptions = [
  { value: "Single", label: "Single" },
  { value: "Married", label: "Married" },

];

const employeeTypeOptions = [
  { value: "Permanent", label: "Permanent" },
  { value: "Contract", label: "Contract" },
  { value: "Intern", label: "Intern" },
];

const statusOptions = [
  { value: "Active", label: "Active" },
  { value: "Inactive", label: "Inactive" },
  { value: "On Leave", label: "On Leave" },
];

const GenderOptions = [
  {value: "Male" ,label:"Male"},
  {value:"Female",label:"Female"}
]

const FORM_VALIDATION = Yup.object({
  EmpID: Yup.number().required("EmpID is required"),
  Name: Yup.string().required("First Name is required"),
  LastName: Yup.string().required("Last Name is required"),
  Email: Yup.string().email("Invalid Email").required("Email is required"),
  Mobile: Yup.number().typeError("Invalid number").required("Mobile is required"),
  Role: Yup.string().required("Role is required"),
  Department: Yup.string().required("Department is required"),
  BirthDate: Yup.date().required("Birth Date is required"),
  Gender: Yup.string().required("Gender is required"),
  MaritalStatus: Yup.string().required("Marital Status is required"),
  EmployeeType: Yup.string().required("Employee Type is required"),
  Status: Yup.string().required("Status is required"),
  JoiningDate: Yup.date().required("Joining Date is required"),
});

const EmployeeForm = ({ initialValues, onSuccess, onCancel }) => {
  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      if (!initialValues) {
        await axiosInstance.post("/employee/createEmployee", values);
      } else {
        await axiosInstance.put(`/employee/modifyEmpDeatils?EmpID=${initialValues.EmpID}`, values);
      }
      onSuccess();
      resetForm();
    } catch (error) {
      console.error("Error submitting form:", error);
      alert(error?.response?.data?.message || "Something went wrong!");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Formik
      initialValues={initialValues || INITIAL_FORM_STATE}
      validationSchema={FORM_VALIDATION}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting }) => (
        <Form className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-white p-6 rounded-lg shadow-md mb-6">
          <Input name="EmpID" label="EmpID" />
          <Input name="Name" label="First Name" />
          <Input name="LastName" label="Last Name" />
          <Input name="Email" label="Email" />
          <Input name="Mobile" label="Mobile" />
          <Input name="Role" label="Role" />
          <FormSelect name="Department" label="Department" options={departmentOptions} />
          <FormikDatePicker name="BirthDate" label="Birth Date" />
          {/* <Input name="Gender" label="Gender" /> */}
          <FormSelect name ="gender" label="Gender" options={GenderOptions}/>
          <FormSelect name="MaritalStatus" label="Marital Status" options={maritalStatusOptions} />
          <FormSelect name="EmployeeType" label="Employee Type" options={employeeTypeOptions} />
          <FormSelect name="Status" label="Status" options={statusOptions} />
          <FormikDatePicker name="JoiningDate" label="Joining Date" />

          <div className="flex space-x-2 col-span-full mt-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 disabled:opacity-50"
            >
              {initialValues ? "Update" : "Submit"}
            </button>
            <button
              type="button"
              onClick={onCancel}
              className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
            >
              Cancel
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

EmployeeForm.propTypes = {
  initialValues: PropTypes.object,
  onSuccess: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};

export default EmployeeForm;

