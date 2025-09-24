
// import React, { useState } from "react";
//  import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/solid";
// import axiosInstance from "../common/AxiosInstance";


// const CollapsibleTable = ({ columns, data, collapsibleFields, keyField, refetch, isManager = false }) => {
//   const [openRows, setOpenRows] = useState({});

//   const handleToggleRow = (key) => {
//     setOpenRows((prev) => ({
//       ...prev,
//       [key]: !prev[key],
//     }));
//   };

//   const handleApproval = async (timesheetId, status) => {
//     try {
//       await axiosInstance.put(`/empTimesheet/manager/approve-timesheet/${timesheetId}`, {
//         approvalStatus: status,
//       });
//       refetch();
//     } catch (error) {
//       console.error("Approval failed:", error);
//     }
//   };

//   return (
//     <div className="overflow-x-auto border rounded-lg shadow-md bg-white dark:bg-gray-900">
//       <table className="min-w-full text-sm text-gray-800 dark:text-gray-100">
//         <thead className="bg-green-700 text-white text-left">
//           <tr>
//             <th className="px-3 py-3 w-10"></th>
//             <th className="px-4 py-3">Sr. No.</th>
//             {columns.map((col) => (
//               <th key={col.field} className="px-4 py-3">{col.headerName}</th>
//             ))}
//           </tr>
//         </thead>
//         <tbody>
//           {data.map((row, index) => (
//             <React.Fragment key={row[keyField]}>
//               <tr className="border-b border-gray-200 dark:border-gray-700 hover:bg-green-50 dark:hover:bg-gray-800">
//                 <td className="px-3 py-2">
//                   <button
//                     onClick={() => handleToggleRow(row[keyField])}
//                     className="text-gray-600 dark:text-gray-300 hover:text-green-600"
//                   >
//                     {openRows[row[keyField]] ? (
//                       <ChevronUpIcon className="h-5 w-5" />
//                     ) : (
//                       <ChevronDownIcon className="h-5 w-5" />
//                     )}
//                   </button>
//                 </td>
//                 <td className="px-4 py-2 font-medium">{index + 1}</td>

//                 {columns.map((col) => (
//                   <td key={col.field} className="px-4 py-2">
//                     {col.field === "ManagerApproval" && isManager ? (
//                       <div className="flex flex-col gap-2">
//                         <span
//                           className={`px-2 py-1 rounded text-xs font-medium ${
//                             row.ManagerApproval === "Approved"
//                               ? "bg-green-100 text-green-700"
//                               : row.ManagerApproval === "Rejected"
//                               ? "bg-red-100 text-red-700"
//                               : "bg-yellow-100 text-yellow-700"
//                           }`}
//                         >
//                           {row.ManagerApproval}
//                         </span>

//                         {row.ManagerApproval === "Pending" && (
//                           <div className="flex gap-2">
//                             <button
//                               onClick={() => handleApproval(row.TimeSheetId, "Approved")}
//                               className="text-green-600 hover:text-green-800 text-xs"
//                             >
//                               Approve
//                             </button>
//                             <button
//                               onClick={() => handleApproval(row.TimeSheetId, "Rejected")}
//                               className="text-red-600 hover:text-red-800 text-xs"
//                             >
//                               Reject
//                             </button>
//                           </div>
//                         )}
//                       </div>
//                     ) : (
//                       row[col.field]
//                     )}
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
import axiosInstance from "../common/AxiosInstance";

const CollapsibleTable = ({
  columns,
  data,
  collapsibleFields,
  keyField,
  refetch,
  isManager = false,
}) => {
  const [openRows, setOpenRows] = useState({});

  const handleToggleRow = (key) => {
    setOpenRows((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const handleApproval = async (timesheetId, status) => {
    try {
      await axiosInstance.put(
        `/empTimesheet/manager/approve-timesheet/${timesheetId}`,
        {
          approvalStatus: status,
        }
      );
      refetch();
    } catch (error) {
      console.error("Approval failed:", error);
    }
  };

  return (
    <div className="overflow-x-auto border rounded-lg shadow-md bg-white dark:bg-gray-900">
      <table className="min-w-full text-sm text-gray-800 dark:text-gray-100">
        <thead className="bg-green-700 text-white text-left">
          <tr>
            <th className="px-3 py-3 w-10"></th>
            <th className="px-4 py-3">Sr. No.</th>
            {columns.map((col) => (
              <th key={col.field} className="px-4 py-3">
                {col.headerName}
              </th>
            ))}
            {isManager && (
              <th className="px-4 py-3 text-center">Actions</th>
            )}
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
                  >
                    {openRows[row[keyField]] ? (
                      <ChevronUpIcon className="h-5 w-5" />
                    ) : (
                      <ChevronDownIcon className="h-5 w-5" />
                    )}
                  </button>
                </td>
                <td className="px-4 py-2 font-medium">{index + 1}</td>

                {columns.map((col) => (
                  <td key={col.field} className="px-4 py-2">
                    {col.field === "ManagerApproval" ? (
                      <span
                        className={`px-2 py-1 rounded text-xs font-medium ${
                          row.ManagerApproval === "Approved"
                            ? "bg-green-100 text-green-700"
                            : row.ManagerApproval === "Rejected"
                            ? "bg-red-100 text-red-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {row.ManagerApproval}
                      </span>
                    ) : (
                      row[col.field]
                    )}
                  </td>
                ))}

                {isManager && (
                  <td className="px-4 py-2 text-center">
                    {row.ManagerApproval === "Pending" ? (
                      <div className="flex justify-center gap-2">
                        <button
                          onClick={() =>
                            handleApproval(row.TimeSheetId, "Approved")
                          }
                          className="px-3 py-1 text-xs font-semibold bg-green-100 text-green-700 hover:bg-green-200 rounded"
                        >
                          Approve
                        </button>
                        <button
                          onClick={() =>
                            handleApproval(row.TimeSheetId, "Rejected")
                          }
                          className="px-3 py-1 text-xs font-semibold bg-red-100 text-red-700 hover:bg-red-200 rounded"
                        >
                          Reject
                        </button>
                      </div>
                    ) : (
                      <span className="text-gray-400 text-xs italic">—</span>
                    )}
                  </td>
                )}
              </tr>

              {/* Collapsible Content */}
              {openRows[row[keyField]] && (
                <tr className="bg-gray-50 dark:bg-gray-900">
                  <td colSpan={columns.length + (isManager ? 3 : 2)} className="p-0">
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

