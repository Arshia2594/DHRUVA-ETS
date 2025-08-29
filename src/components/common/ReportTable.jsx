// // import React, { useState } from "react";
// // import dayjs from "dayjs";

// // const ITEMS_PER_PAGE = 10;

// // const ReportTable = ({ rows }) => {
// //   const [page, setPage] = useState(1);
// //   const totalPages = Math.ceil(rows.length / ITEMS_PER_PAGE);

// //   const paginatedRows = rows.slice(
// //     (page - 1) * ITEMS_PER_PAGE,
// //     page * ITEMS_PER_PAGE
// //   );

// //   return (
// //     <div className="mt-10">
// //       <h2 className="text-xl font-semibold mb-4">Employee Report Table</h2>
// //       <div className="overflow-x-auto border rounded-md">
// //         <table className="min-w-full divide-y divide-gray-200">
// //           <thead className="bg-gray-100">
// //             <tr>
// //               <th className="px-4 py-2">Project</th>
// //               <th className="px-4 py-2">Work Details</th>
// //               <th className="px-4 py-2">Date</th>
// //               <th className="px-4 py-2">Start</th>
// //               <th className="px-4 py-2">End</th>
// //               <th className="px-4 py-2">Duration</th>
// //             </tr>
// //           </thead>
// //           <tbody className="divide-y divide-gray-200">
// //             {paginatedRows.map((row, idx) => (
// //               <tr key={idx}>
// //                 <td className="px-4 py-2">{row.ProjectName}</td>
// //                 <td className="px-4 py-2">{row.WorkDetails}</td>
// //                 <td className="px-4 py-2">{dayjs(row.WorkDate).format("YYYY-MM-DD")}</td>
// //                 <td className="px-4 py-2">{row.WorkStartTime}</td>
// //                 <td className="px-4 py-2">{row.WorkEndTime}</td>
// //                 <td className="px-4 py-2">{row.TotalTimeSpent}</td>
// //               </tr>
// //             ))}
// //           </tbody>
// //         </table>
// //       </div>

// //       {/* Pagination */}
// //       <div className="flex justify-end mt-4 gap-2">
// //         <button
// //           className="px-3 py-1 bg-gray-200 rounded"
// //           disabled={page === 1}
// //           onClick={() => setPage((p) => p - 1)}
// //         >
// //           Prev
// //         </button>
// //         <span className="px-3 py-1">{page} / {totalPages}</span>
// //         <button
// //           className="px-3 py-1 bg-gray-200 rounded"
// //           disabled={page === totalPages}
// //           onClick={() => setPage((p) => p + 1)}
// //         >
// //           Next
// //         </button>
// //       </div>
// //     </div>
// //   );
// // };

// // export default ReportTable;


// import React, { useState } from "react";
// import dayjs from "dayjs";

// const ITEMS_PER_PAGE = 5;

// const ReportTable = ({ rows }) => {
//   const [page, setPage] = useState(1);
//   const totalPages = Math.ceil(rows.length / ITEMS_PER_PAGE);

//   const handlePageChange = (dir) => {
//     setPage((prev) => Math.max(1, Math.min(prev + dir, totalPages)));
//   };

//   const currentRows = rows.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

//   return (
//     <div className="bg-white p-4 mt-6 shadow-md rounded-md">
//       <h2 className="text-lg font-semibold mb-4">Employee Report Table</h2>
//       <div className="overflow-x-auto">
//         <table className="min-w-full table-auto">
//           <thead className="bg-gray-100 text-left">
//             <tr>
//               <th className="px-4 py-2">Project</th>
//               <th className="px-4 py-2">Work Details</th>
//               <th className="px-4 py-2">Date</th>
//               <th className="px-4 py-2">Start</th>
//               <th className="px-4 py-2">End</th>
//               <th className="px-4 py-2">Duration</th>
//             </tr>
//           </thead>
//           <tbody>
//             {currentRows.map((row, i) => (
//               <tr key={i} className="border-t">
//                 <td className="px-4 py-2">{row.ProjectName}</td>
//                 <td className="px-4 py-2">{row.WorkDetails}</td>
//                 <td className="px-4 py-2">{dayjs(row.WorkDate).format("YYYY-MM-DD")}</td>
//                 <td className="px-4 py-2">{row.WorkStartTime}</td>
//                 <td className="px-4 py-2">{row.WorkEndTime}</td>
//                 <td className="px-4 py-2">{row.TotalTimeSpent}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       <div className="mt-4 flex justify-end gap-2">
//         <button
//           onClick={() => handlePageChange(-1)}
//           disabled={page === 1}
//           className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
//         >
//           Prev
//         </button>
//         <span className="px-3 py-1 text-sm">Page {page} of {totalPages}</span>
//         <button
//           onClick={() => handlePageChange(1)}
//           disabled={page === totalPages}
//           className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
//         >
//           Next
//         </button>
//       </div>
//     </div>
//   );
// };

// export default ReportTable;

import React, { useState } from "react";

const ITEMS_PER_PAGE = 5;

const ReportTable = ({ rows }) => {
  const [currentPage, setCurrentPage] = useState(1);

  const paginatedRows = rows.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const totalPages = Math.ceil(rows.length / ITEMS_PER_PAGE);

  return (
    <div className="mt-6 bg-white shadow-md rounded-md overflow-hidden">
      <h3 className="text-lg font-semibold px-4 py-2 border-b">Employee Report Table</h3>
      <table className="min-w-full table-auto text-sm">
        <thead className="bg-gray-100 text-gray-700">
          <tr>
            <th className="px-4 py-2 text-left">Project</th>
            <th className="px-4 py-2 text-left">Work Details</th>
            <th className="px-4 py-2 text-left">Date</th>
            <th className="px-4 py-2 text-left">Start</th>
            <th className="px-4 py-2 text-left">End</th>
            <th className="px-4 py-2 text-left">Duration</th>
          </tr>
        </thead>
        <tbody>
          {paginatedRows.map((row, idx) => (
            <tr key={idx} className="border-t">
              <td className="px-4 py-2">{row.ProjectName}</td>
              <td className="px-4 py-2">{row.WorkDetail}</td>
              <td className="px-4 py-2">{row.WorkDate}</td>
              <td className="px-4 py-2">{row.StartTime}</td>
              <td className="px-4 py-2">{row.EndTime}</td>
              <td className="px-4 py-2">{row.TotalTimeSpentInMinutes} mins</td>
            </tr>
          ))}
          {paginatedRows.length === 0 && (
            <tr>
              <td colSpan="6" className="text-center py-4 text-gray-500">No data found.</td>
            </tr>
          )}
        </tbody>
      </table>

      <div className="flex justify-between items-center px-4 py-3 bg-gray-50">
        <div className="text-sm">
          Page {currentPage} of {totalPages || 1}
        </div>
        <div className="flex gap-2">
          <button
            className="px-3 py-1 border rounded disabled:opacity-50"
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            Prev
          </button>
          <button
            className="px-3 py-1 border rounded disabled:opacity-50"
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages || totalPages === 0}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReportTable;

