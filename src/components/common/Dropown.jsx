// import { useField } from "formik";
// import Select from "react-select";
// import PropTypes from "prop-types";

// const Dropdown = ({ name, label, options, isMulti = true, ...otherProps }) => {
//   const [field, meta, helpers] = useField(name);

//   const handleChange = (selected) => {
//     helpers.setValue(selected || []);
//   };

//   return (
//     <div className="mb-4">
//       <label className="block text-gray-700 font-medium mb-1">{label}</label>
//       <Select
//         isMulti={isMulti}
//         options={options}
//         value={field.value}
//         onChange={handleChange}
//         className="basic-multi-select"
//         classNamePrefix="select"
//         {...otherProps}
//       />
//       {meta.touched && meta.error ? (
//         <p className="text-red-500 text-sm mt-1">{meta.error}</p>
//       ) : null}
//     </div>
//   );
// };

// Dropdown.propTypes = {
//   name: PropTypes.string.isRequired,
//   label: PropTypes.string.isRequired,
//   options: PropTypes.array.isRequired,
//   isMulti: PropTypes.bool,
// };

// export default Dropdown;


import React from "react";
import Select from "react-select";
import { useField, useFormikContext } from "formik";

const Dropdown = ({ name, label, options }) => {
  const [field, meta] = useField(name);
  const { setFieldValue } = useFormikContext();

  const handleChange = (selectedOptions) => {
    setFieldValue(name, selectedOptions);
  };

  return (
    <div className="mb-4">
      <label className="block text-gray-700 font-medium mb-1">{label}</label>
      <Select
        isMulti
        options={options}
        value={field.value}
        onChange={handleChange}
        className="react-select-container"
        classNamePrefix="react-select"
      />
      {meta.touched && meta.error ? (
        <p className="text-red-500 text-sm mt-1">{meta.error}</p>
      ) : null}
    </div>
  );
};

export default Dropdown;
