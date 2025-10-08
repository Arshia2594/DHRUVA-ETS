// import { useField } from "formik";
// import Select from "react-select";

// const customStyles = {
//   control: (base) => ({
//     ...base,
//     minHeight: "40px",
//     borderRadius: "0.375rem",
//     borderColor: "#d1d5db",
//     fontSize: "0.875rem",
//   }),
//   multiValue: (base) => ({
//     ...base,
//     backgroundColor: "#e5e7eb",
//   }),
//   multiValueLabel: (base) => ({
//     ...base,
//     color: "#374151",
//     fontWeight: 500,
//   }),
//   multiValueRemove: (base) => ({
//     ...base,
//     color: "#6b7280",
//     ':hover': {
//       backgroundColor: "#f87171",
//       color: "white",
//     },
//   }),
// };

// const FormikMultiSelect = ({ name, label, options, isDisabled }) => {
//   const [field, meta, helpers] = useField(name);
//   const hasError = meta.touched && meta.error;

//   const handleChange = (selectedOptions) => {
//     const values = selectedOptions ? selectedOptions.map((opt) => opt.value) : [];
//     helpers.setValue(values);
//   };

//   const selectedValues = options.filter((opt) =>
//     field.value?.includes(opt.value)
//   );

//   return (
//     <div className="w-full">
//       {label && (
//         <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-200">
//           {label}
//         </label>
//       )}
//       <Select
//         isMulti
//         name={name}
//         value={selectedValues}
//         options={options}
//         onChange={handleChange}
//         styles={customStyles}
//         className="text-sm"
//         isDisabled={isDisabled}
//       />
//       {hasError && (
//         <p className="text-sm text-red-500 mt-1">{meta.error}</p>
//       )}
//     </div>
//   );
// };

// export default FormikMultiSelect;
// FormikMultiSelect.jsx
import React from 'react';
import { useField, useFormikContext } from 'formik';
import Select from 'react-select';

const FormikMultiSelect = ({ label, ...props }) => {
  const [field, meta, helpers] = useField(props.name);
  const { setFieldValue } = useFormikContext();

  return (
    <div>
      {label && <label>{label}</label>}
      <Select
        {...props}
        isMulti
        name={field.name}
        value={props.options?.filter(option =>
          field.value?.includes(option.value)
        )}
        onChange={selected => {
          const selectedValues = selected.map(option => option.value);
          setFieldValue(field.name, selectedValues);
        }}
      />
      {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ) : null}
    </div>
  );
};

export default FormikMultiSelect;
