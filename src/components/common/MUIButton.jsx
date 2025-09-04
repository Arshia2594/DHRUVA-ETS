// import PropTypes from "prop-types";

// const MUIButton = ({ children, variant = "contained", className = "", ...props }) => {
//   let baseClasses =
//     "font-medium rounded px-4 py-2 focus:outline-none transition";

//   if (variant === "contained") {
//     baseClasses += " bg-blue-600 text-white hover:bg-blue-700";
//   } else if (variant === "outlined") {
//     baseClasses += " border border-blue-600 text-blue-600 hover:bg-blue-50";
//   } else if (variant === "text") {
//     baseClasses += " text-blue-600 hover:text-blue-700 bg-transparent";
//   }

//   return (
//     <button className={`${baseClasses} ${className}`} {...props}>
//       {children}
//     </button>
//   );
// };

// MUIButton.propTypes = {
//   children: PropTypes.node.isRequired,
//   variant: PropTypes.string,
//   className: PropTypes.string,
// };

// export default MUIButton;

import React from "react";

const MUIButton = ({ children, onClick, type = "button", className = "" }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`bg-green-700 hover:bg-green-800 text-white text-sm px-4 py-2 rounded-md flex items-center gap-2 transition ${className}`}
    >
      {children}
    </button>
  );
};

export default MUIButton;
