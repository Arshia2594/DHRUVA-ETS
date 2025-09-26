
import { useField } from "formik";
import ReactDatePicker from "react-datepicker";
import { CalendarIcon, XMarkIcon } from "@heroicons/react/24/outline";
import "react-datepicker/dist/react-datepicker.css";

const FormikDatePicker = ({
  name,
  label,
  minDate,
  maxDate,
  showClearButton = true,
  dateFormat = "dd/MM/yyyy",
  ...props
}) => {
  const [field, meta, helpers] = useField(name);
  const hasError = meta.touched && meta.error;

  return (
    <div className="w-full">
      {label && (
        <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-200">
          {label}
        </label>
      )}

      <div className="relative">
        <ReactDatePicker
          selected={field.value ? new Date(field.value) : null}
          onChange={(date) => helpers.setValue(date)}
          dateFormat={dateFormat}
          minDate={minDate}
          maxDate={maxDate}
          className={`h-10 px-3 pl-10 rounded-md border text-sm
            ${hasError ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-green-600"} 
            focus:outline-none focus:ring-2
            bg-white dark:bg-gray-800 dark:border-gray-600 dark:text-white`}
          {...props}
        />

        <CalendarIcon className="w-5 h-5 text-gray-400 absolute left-3 top-2.5 pointer-events-none" />

        {showClearButton && field.value && (
          <button
            type="button"
            onClick={() => helpers.setValue(null)}
            className="absolute right-2 top-2.5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 focus:outline-none"
            aria-label="Clear date"
          >
            <XMarkIcon className="w-4 h-4" />
          </button>
        )}
      </div>

      {hasError && (
        <p className="text-sm text-red-500 mt-1">{meta.error}</p>
      )}
    </div>
  );
};

export default FormikDatePicker;
