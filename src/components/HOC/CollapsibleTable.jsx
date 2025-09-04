
// import React, { useState } from "react";
// import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/solid";

// const CollapsibleTable = ({ columns, data, collapsibleFields, keyField }) => {
//   const [openRows, setOpenRows] = useState({});

//   const handleToggleRow = (key) => {
//     setOpenRows((prev) => ({
//       ...prev,
//       [key]: !prev[key],
//     }));
//   };

//   return (
//     <div className="overflow-x-auto border rounded-lg shadow-md bg-white dark:bg-gray-900">
//       <table className="min-w-full text-sm text-gray-800 dark:text-gray-100">
//         <thead className="bg-teal-600 text-white text-left">
//           <tr>
//             <th className="px-3 py-3 w-10"></th>
//             <th className="px-4 py-3">Sr. No.</th>
//             {columns.map((column) => (
//               <th key={column.field} className="px-4 py-3">
//                 {column.headerName}
//               </th>
//             ))}
//           </tr>
//         </thead>
//         <tbody>
//           {data.map((row, index) => (
//             <React.Fragment key={row[keyField]}>
//               <tr className="border-b border-gray-200 dark:border-gray-700 hover:bg-teal-50 dark:hover:bg-gray-800">
//                 <td className="px-3 py-2">
//                   <button
//                     onClick={() => handleToggleRow(row[keyField])}
//                     className="text-gray-600 dark:text-gray-300 hover:text-teal-500"
//                     aria-label="Toggle Row"
//                   >
//                     {openRows[row[keyField]] ? (
//                       <ChevronUpIcon className="h-5 w-5" />
//                     ) : (
//                       <ChevronDownIcon className="h-5 w-5" />
//                     )}
//                   </button>
//                 </td>
//                 <td className="px-4 py-2 font-medium">{index + 1}</td>
//                 {columns.map((column) => (
//                   <td key={column.field} className="px-4 py-2">
//                     {row[column.field]}
//                   </td>
//                 ))}
//               </tr>

//               {openRows[row[keyField]] && (
//                 <tr className="bg-gray-50 dark:bg-gray-900">
//                   <td colSpan={columns.length + 2} className="p-0">
//                     <div className="p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
//                       {collapsibleFields.map((field) => (
//                         <div
//                           key={field}
//                           className="border border-gray-200 dark:border-gray-700 rounded p-3 bg-white dark:bg-gray-800 shadow-sm"
//                         >
//                           <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
//                             {field}
//                           </p>
//                           <p className="text-sm text-gray-600 dark:text-gray-200">
//                             {row[field] ?? "—"}
//                           </p>
//                         </div>
//                       ))}
//                     </div>
//                   </td>
//                 </tr>
//               )}
//             </React.Fragment>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };


// export default CollapsibleTable;

import React, { useState } from "react";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/solid";

const CollapsibleTable = ({ columns, data, collapsibleFields, keyField }) => {
  const [openRows, setOpenRows] = useState({});

  const handleToggleRow = (key) => {
    setOpenRows((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  return (
    <div className="overflow-x-auto border rounded-lg shadow-md bg-white dark:bg-gray-900">
      <table className="min-w-full text-sm text-gray-800 dark:text-gray-100">
        <thead className="bg-green-700 text-white text-left">
          <tr>
            <th className="px-3 py-3 w-10"></th>
            <th className="px-4 py-3">Sr. No.</th>
            {columns.map((column) => (
              <th key={column.field} className="px-4 py-3">
                {column.headerName}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <React.Fragment key={row[keyField]}>
              <tr className="border-b border-gray-200 dark:border-gray-700 hover:bg-green-50 dark:hover:bg-gray-800">
                <td className="px-3 py-2">
                  <button
                    onClick={() => handleToggleRow(row[keyField])}
                    className="text-gray-600 dark:text-gray-300 hover:text-green-600"
                    aria-label="Toggle Row"
                  >
                    {openRows[row[keyField]] ? (
                      <ChevronUpIcon className="h-5 w-5" />
                    ) : (
                      <ChevronDownIcon className="h-5 w-5" />
                    )}
                  </button>
                </td>
                <td className="px-4 py-2 font-medium">{index + 1}</td>
                {columns.map((column) => (
                  <td key={column.field} className="px-4 py-2">
                    {row[column.field]}
                  </td>
                ))}
              </tr>

              {openRows[row[keyField]] && (
                <tr className="bg-gray-50 dark:bg-gray-900">
                  <td colSpan={columns.length + 2} className="p-0">
                    <div className="p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                      {collapsibleFields.map((field) => (
                        <div
                          key={field}
                          className="border border-gray-200 dark:border-gray-700 rounded p-3 bg-white dark:bg-gray-800 shadow-sm"
                        >
                          <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
                            {field}
                          </p>
                          <p className="text-sm text-gray-600 dark:text-gray-200">
                            {row[field] ?? "—"}
                          </p>
                        </div>
                      ))}
                    </div>
                  </td>
                </tr>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CollapsibleTable;
