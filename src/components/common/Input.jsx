// import PropTypes from "prop-types";
// import { useField } from "formik";

// const Input = ({ name, label, type = "text", ...otherProps }) => {
//   const [field, meta] = useField(name);

//   return (
//     <div className="flex flex-col">
//       {label && <label className="mb-1 font-medium text-gray-700">{label}</label>}
//       <input
//         {...field}
//         {...otherProps}
//         type={type}
//         className={`border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 ${
//           meta.touched && meta.error ? "border-red-500" : "border-gray-300"
//         }`}
//       />
//       {meta.touched && meta.error && (
//         <span className="text-red-500 text-sm mt-1">{meta.error}</span>
//       )}
//     </div>
//   );
// };

// Input.propTypes = {
//   name: PropTypes.string.isRequired,
//   label: PropTypes.string,
//   type: PropTypes.string,
// };

// export default Input;
import { useField } from "formik";
import PropTypes from "prop-types";

const Input = ({ label, ...props }) => {
  const [field, meta] = useField(props.name);
  const hasError = meta.touched && meta.error;

  return (
    <div className="flex flex-col mb-3">
      {label && <label className="mb-1 font-medium text-gray-700">{label}</label>}
      <input
        {...field}
        {...props}
        className={`border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400 ${
          hasError ? "border-red-500" : "border-gray-300"
        }`}
      />
      {hasError && <span className="text-red-500 text-sm mt-1">{meta.error}</span>}
    </div>
  );
};

Input.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
};

export default Input;

