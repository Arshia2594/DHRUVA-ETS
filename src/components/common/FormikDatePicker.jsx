

// import { useField } from "formik";
// import ReactDatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";

// const FormikDatePicker = ({ name, label, ...props }) => {
//   const [field, meta, helpers] = useField(name);

//   return (
//     <div className="mb-4">
//       <label className="block text-gray-700 font-medium mb-1">{label}</label>
//       <ReactDatePicker
//         selected={field.value ? new Date(field.value) : null}
//         onChange={(date) => helpers.setValue(date)}
//         className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
//         {...props}
//       />
//       {meta.touched && meta.error ? (
//         <p className="text-red-500 text-sm mt-1">{meta.error}</p>
//       ) : null}
//     </div>
//   );
// };

// export default FormikDatePicker;

// import { useField } from "formik";
// import ReactDatePicker from "react-datepicker";
// import { CalendarIcon, XMarkIcon } from "@heroicons/react/24/outline"; // Heroicons v2
// import "react-datepicker/dist/react-datepicker.css";

// const FormikDatePicker = ({
//   name,
//   label,
//   minDate,
//   maxDate,
//   showClearButton = true,
//   dateFormat = "dd/MM/yyyy",
//   ...props
// }) => {
//   const [field, meta, helpers] = useField(name);

//   return (
//     <div className="mb-4 relative">
//       {label && <label className="block text-gray-700 font-medium mb-1">{label}</label>}

//       <div className="relative">
//         <ReactDatePicker
//           selected={field.value ? new Date(field.value) : null}
//           onChange={(date) => helpers.setValue(date)}
//           className="w-full border border-gray-300 rounded px-3 py-2 pl-10 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
//           dateFormat={dateFormat}
//           minDate={minDate}
//           maxDate={maxDate}
//           {...props}
//         />
//         {/* Calendar Icon */}
//         <CalendarIcon className="w-5 h-5 text-gray-400 absolute left-3 top-2.5 pointer-events-none" />

//         {/* Clear Button */}
//         {showClearButton && field.value && (
//           <button
//             type="button"
//             onClick={() => helpers.setValue(null)}
//             className="absolute right-2 top-2.5 text-gray-400 hover:text-gray-600 focus:outline-none"
//           >
//             <XMarkIcon className="w-4 h-4" />
//           </button>
//         )}
//       </div>

//       {meta.touched && meta.error && (
//         <p className="text-red-500 text-sm mt-1">{meta.error}</p>
//       )}
//     </div>
//   );
// };

// export default FormikDatePicker;
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
    <div className="mb-4 relative">
      {/* Label */}
      {label && (
        <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-200">
          {label}
        </label>
      )}

      {/* Input + Icon */}
      <div className="relative">
        <ReactDatePicker
          selected={field.value ? new Date(field.value) : null}
          onChange={(date) => helpers.setValue(date)}
          dateFormat={dateFormat}
          minDate={minDate}
          maxDate={maxDate}
          className={`w-full px-3 py-2 pl-10 rounded-md shadow-sm text-sm focus:outline-none focus:ring-2 
            ${hasError ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-green-600"} 
            bg-white dark:bg-gray-800 dark:border-gray-600 dark:text-white`}
          {...props}
        />

        {/* Calendar Icon */}
        <CalendarIcon className="w-5 h-5 text-gray-400 absolute left-3 top-2.5 pointer-events-none" />

        {/* Clear Button */}
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

      {/* Error Message */}
      {hasError && (
        <p className="text-sm text-red-500 mt-1">{meta.error}</p>
      )}
    </div>
  );
};

export default FormikDatePicker;
