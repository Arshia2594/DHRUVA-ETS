// import React from "react";
// import { useField, useFormikContext } from "formik";
// import PropTypes from "prop-types";

// const FormSelect = ({ options, name, label, ...otherProps }) => {
//   const { setFieldValue } = useFormikContext();
//   const [field, meta] = useField(name);

//   const handleChange = (e) => {
//     setFieldValue(name, e.target.value);
//   };

//   return (
//     <div className="flex flex-col">
//       {label && (
//         <label
//           htmlFor={name}
//           className="mb-1 text-sm font-medium text-gray-700 dark:text-gray-300"
//         >
//           {label}
//         </label>
//       )}
//       <select
//         {...field}
//         {...otherProps}
//         onChange={handleChange}
//         id={name}
//         className={`px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 ${
//           meta.touched && meta.error
//             ? "border-blue-500 focus:ring-gray-500"
//             : "border-blue-300 focus:ring-blue-500"
//         } dark:bg-gray-700 dark:text-white`}
//       >
//         <option value="">Select {label}</option>
//         {options?.map((option) => (
//           <option key={option.value} value={option.value}>
//             {option.label}
//           </option>
//         ))}
//       </select>
//       {meta.touched && meta.error && (
//         <div className="text-red-500 text-sm mt-1">{meta.error}</div>
//       )}
//     </div>
//   );
// };

// FormSelect.propTypes = {
//   name: PropTypes.string.isRequired,
//   label: PropTypes.string,
//   options: PropTypes.arrayOf(
//     PropTypes.shape({
//       value: PropTypes.any,
//       label: PropTypes.string,
//     })
//   ).isRequired,
// };

// export default FormSelect;

import React from "react";
import { useField, useFormikContext } from "formik";
import PropTypes from "prop-types";

const FormSelect = ({ options, name, label, ...otherProps }) => {
  const { setFieldValue } = useFormikContext();
  const [field, meta] = useField(name);
  const hasError = meta.touched && meta.error;

  const handleChange = (e) => {
    setFieldValue(name, e.target.value);
  };

  return (
    <div className="flex flex-col mb-4">
      {label && (
        <label
          htmlFor={name}
          className="mb-1 text-sm font-medium text-gray-700 dark:text-gray-200"
        >
          {label}
        </label>
      )}
      <select
        {...field}
        {...otherProps}
        onChange={handleChange}
        id={name}
        className={`px-3 py-2 rounded-md border text-sm shadow-sm focus:outline-none focus:ring-2
          ${
            hasError
              ? "border-red-500 focus:ring-red-500"
              : "border-gray-300 dark:border-gray-600 focus:ring-green-600"
          }
          bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100
        `}
      >
        <option value="">Select {label}</option>
        {options?.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      {hasError && (
        <div className="text-red-500 text-xs mt-1">{meta.error}</div>
      )}
    </div>
  );
};

FormSelect.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.any,
      label: PropTypes.string,
    })
  ).isRequired,
};

export default FormSelect;

