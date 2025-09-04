
// import React from "react";
// import { useField } from "formik";
// import { ClockIcon, XMarkIcon } from "@heroicons/react/24/outline";

// const FormikTimePicker = ({ label, showClearButton = true, ...props }) => {
//   const [field, meta, helpers] = useField(props);
//   const hasError = meta.touched && meta.error;

//   return (
//     <div className="mb-4 relative">
//       {/* Label */}
//       {label && (
//         <label
//           htmlFor={props.id || props.name}
//           className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1"
//         >
//           {label}
//         </label>
//       )}

//       <div className="relative">
//         {/* Clock Icon */}
//         <ClockIcon className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />

//         {/* Time Input */}
//         <input
//           type="time"
//           {...field}
//           {...props}
//           value={field.value || ""}
//           onChange={(e) => helpers.setValue(e.target.value)}
//           className={`w-full pl-10 pr-10 py-2 text-sm rounded-md border shadow-sm 
//             bg-white dark:bg-gray-800 
//             text-gray-800 dark:text-white
//             focus:outline-none focus:ring-2
//             ${
//               hasError
//                 ? "border-red-500 focus:ring-red-400"
//                 : "border-gray-300 dark:border-gray-600 focus:ring-green-600 focus:border-green-600"
//             }`}
//         />

//         {/* Clear Button */}
//         {showClearButton && field.value && (
//           <button
//             type="button"
//             onClick={() => helpers.setValue("")}
//             className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 focus:outline-none"
//             aria-label="Clear time"
//           >
//             <XMarkIcon className="w-4 h-4" />
//           </button>
//         )}
//       </div>

//       {/* Error Message */}
//       {hasError && (
//         <p className="text-sm text-red-500 mt-1">{meta.error}</p>
//       )}
//     </div>
//   );
// };

// export default FormikTimePicker;


import React from "react";
import { useField } from "formik";
import { ClockIcon, XMarkIcon } from "@heroicons/react/24/outline";

const FormikTimePicker = ({ label, showClearButton = true, ...props }) => {
  const [field, meta, helpers] = useField(props);
  const hasError = meta.touched && meta.error;

  return (
    <div className="mb-4 relative">
      {/* Label */}
      {label && (
        <label
          htmlFor={props.id || props.name}
          className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1"
        >
          {label}
        </label>
      )}

      <div className="relative">
        {/* Clock Icon (left) */}
        <ClockIcon className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />

        {/* Time Input */}
        <input
          type="time"
          {...field}
          {...props}
          value={field.value || ""}
          onChange={(e) => helpers.setValue(e.target.value)}
          className={`w-full appearance-none pl-10 pr-10 py-2 text-sm rounded-md border shadow-sm
            bg-white dark:bg-gray-800
            text-gray-800 dark:text-white
            focus:outline-none focus:ring-2
            ${hasError
              ? "border-red-500 focus:ring-red-400"
              : "border-green-600 focus:ring-green-600"}
          `}
        />

        {/* Clear Button */}
        {showClearButton && field.value && (
          <button
            type="button"
            onClick={() => helpers.setValue("")}
            className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 focus:outline-none"
            aria-label="Clear time"
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

export default FormikTimePicker;
