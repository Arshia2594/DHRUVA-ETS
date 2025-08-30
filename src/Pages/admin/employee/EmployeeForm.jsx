

import { Formik, Form } from "formik";
import * as Yup from "yup";
import PropTypes from "prop-types";
import DateTimePicker from "../../../components/common/DateTimePicker";
import Input from "../../../components/common/Input";
import axiosInstance from "../../../components/common/AxiosInstance";
import FormikDatePicker from "../../../components/common/FormikDatePicker";



const INITIAL_FORM_STATE = {
  EmpID: "",
  Name: "",
  LastName: "",
  Email: "",
  Mobile: "",
  Role: "",
  JoiningDate: "",
};

const FORM_VALIDATION = Yup.object({
  EmpID: Yup.number().required("EmpID is required"),
  Name: Yup.string().required("First Name is required"),
  LastName: Yup.string().required("Last Name is required"),
  Email: Yup.string().email("Invalid Email").required("Email is required"),
  Mobile: Yup.number().typeError("Invalid number").required("Mobile is required"),
  Role: Yup.string().required("Role is required"),
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
      onSuccess(); // Refresh table
      resetForm();
    } catch (error) {
      console.error("Error submitting form:", error);
      alert(error?.response?.data?.message || "Something went wrong!");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-6">
      <Formik
        initialValues={initialValues || INITIAL_FORM_STATE}
        validationSchema={FORM_VALIDATION}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input name="EmpID" label="EmpID" />
            <Input name="Name" label="First Name" />
            <Input name="LastName" label="Last Name" />
            <Input name="Email" label="Email" />
            <Input name="Mobile" label="Mobile" />
            <Input name="Role" label="Role" />
            <FormikDatePicker name="JoiningDate" label="Joining Date" />
             
            <div className="flex space-x-2 col-span-full">
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
    </div>
  );
};

EmployeeForm.propTypes = {
  initialValues: PropTypes.object,
  onSuccess: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};

export default EmployeeForm;
