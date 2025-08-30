

import { useField } from "formik";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const FormikDatePicker = ({ name, label, ...props }) => {
  const [field, meta, helpers] = useField(name);

  return (
    <div className="mb-4">
      <label className="block text-gray-700 font-medium mb-1">{label}</label>
      <ReactDatePicker
        selected={field.value ? new Date(field.value) : null}
        onChange={(date) => helpers.setValue(date)}
        className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
        {...props}
      />
      {meta.touched && meta.error ? (
        <p className="text-red-500 text-sm mt-1">{meta.error}</p>
      ) : null}
    </div>
  );
};

export default FormikDatePicker;

