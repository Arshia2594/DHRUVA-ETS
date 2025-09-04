
// import React, { useState, useMemo } from "react";

// const withPagination = (WrappedTable) => {
//   return function PaginatedComponent({
//     data,
//     rowsPerPageOptions = [5, 10, 25, 50],
//     ...props
//   }) {
//     const [currentPage, setCurrentPage] = useState(0);
//     const [rowsPerPage, setRowsPerPage] = useState(rowsPerPageOptions[0]);

//     const totalPages = Math.ceil(data.length / rowsPerPage);

//     // Slice the data for current page
//     const paginatedData = useMemo(() => {
//       return data.slice(
//         currentPage * rowsPerPage,
//         (currentPage + 1) * rowsPerPage
//       );
//     }, [data, currentPage, rowsPerPage]);

//     const handlePageChange = (page) => {
//       if (page >= 0 && page < totalPages) setCurrentPage(page);
//     };

//     const handleRowsPerPageChange = (e) => {
//       setRowsPerPage(Number(e.target.value));
//       setCurrentPage(0); // Reset to first page
//     };

//     const pageNumbers = useMemo(() => {
//       return [...Array(totalPages).keys()];
//     }, [totalPages]);

//     return (
//       <div className="space-y-6">
//         {/* Render paginated table */}
//         <WrappedTable data={paginatedData} {...props} />

//         {/* Pagination Controls */}
//         <div className="flex flex-col md:flex-row items-center justify-between gap-4">
//           {/* Rows per page selector */}
//           <div className="flex items-center gap-3 text-sm">
//             <span className="text-gray-700 dark:text-gray-200 font-medium">
//               Rows per page:
//             </span>
//             <select
//               value={rowsPerPage}
//               onChange={handleRowsPerPageChange}
//               className="px-3 py-1 border rounded-md bg-white dark:bg-gray-800 dark:border-gray-600 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-teal-400"
//             >
//               {rowsPerPageOptions.map((option) => (
//                 <option key={option} value={option}>
//                   {option}
//                 </option>
//               ))}
//             </select>
//           </div>

//           {/* Page navigation */}
//           <div className="flex flex-wrap items-center gap-2 text-sm">
//             {/* Prev */}
//             <button
//               onClick={() => handlePageChange(currentPage - 1)}
//               disabled={currentPage === 0}
//               className={`px-3 py-1 rounded-md border transition 
//                 ${
//                   currentPage === 0
//                     ? "cursor-not-allowed text-gray-400 dark:text-gray-500 border-gray-300 dark:border-gray-700"
//                     : "hover:bg-teal-500 hover:text-white text-gray-700 dark:text-gray-200 border-gray-300 dark:border-gray-700"
//                 }`}
//             >
//               Previous
//             </button>

//             {/* Page Numbers */}
//             {pageNumbers.map((page) => (
//               <button
//                 key={page}
//                 onClick={() => handlePageChange(page)}
//                 className={`px-3 py-1 rounded-md border transition font-medium ${
//                   page === currentPage
//                     ? "bg-teal-600 text-white border-teal-600"
//                     : "text-gray-700 dark:text-gray-200 border-gray-300 dark:border-gray-700 hover:bg-teal-100 dark:hover:bg-teal-600"
//                 }`}
//               >
//                 {page + 1}
//               </button>
//             ))}

//             {/* Next */}
//             <button
//               onClick={() => handlePageChange(currentPage + 1)}
//               disabled={currentPage >= totalPages - 1 || totalPages === 0}
//               className={`px-3 py-1 rounded-md border transition 
//                 ${
//                   currentPage >= totalPages - 1 || totalPages === 0
//                     ? "cursor-not-allowed text-gray-400 dark:text-gray-500 border-gray-300 dark:border-gray-700"
//                     : "hover:bg-teal-500 hover:text-white text-gray-700 dark:text-gray-200 border-gray-300 dark:border-gray-700"
//                 }`}
//             >
//               Next
//             </button>
//           </div>
//         </div>
//       </div>
//     );
//   };
// };

// export default withPagination;

import React, { useState, useMemo } from "react";

const withPagination = (WrappedTable) => {
  return function PaginatedComponent({
    data,
    rowsPerPageOptions = [5, 10, 25, 50],
    ...props
  }) {
    const [currentPage, setCurrentPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(rowsPerPageOptions[0]);

    const totalPages = Math.ceil(data.length / rowsPerPage);

    const paginatedData = useMemo(() => {
      return data.slice(
        currentPage * rowsPerPage,
        (currentPage + 1) * rowsPerPage
      );
    }, [data, currentPage, rowsPerPage]);

    const handlePageChange = (page) => {
      if (page >= 0 && page < totalPages) setCurrentPage(page);
    };

    const handleRowsPerPageChange = (e) => {
      setRowsPerPage(Number(e.target.value));
      setCurrentPage(0); // Reset to first page
    };

    const pageNumbers = useMemo(() => {
      return [...Array(totalPages).keys()];
    }, [totalPages]);

    return (
      <div className="space-y-6">
        <WrappedTable data={paginatedData} {...props} />

        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 text-sm">
            <span className="text-gray-700 dark:text-gray-200 font-medium">
              Rows per page:
            </span>
            <select
              value={rowsPerPage}
              onChange={handleRowsPerPageChange}
              className="px-3 py-1 border rounded-md bg-white dark:bg-gray-800 dark:border-gray-600 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-green-600"
            >
              {rowsPerPageOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-wrap items-center gap-2 text-sm">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 0}
              className={`px-3 py-1 rounded-md border transition 
                ${
                  currentPage === 0
                    ? "cursor-not-allowed text-gray-400 dark:text-gray-500 border-gray-300 dark:border-gray-700"
                    : "hover:bg-green-600 hover:text-white text-gray-700 dark:text-gray-200 border-gray-300 dark:border-gray-700"
                }`}
            >
              Previous
            </button>

            {pageNumbers.map((page) => (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`px-3 py-1 rounded-md border transition font-medium ${
                  page === currentPage
                    ? "bg-green-700 text-white border-green-700"
                    : "text-gray-700 dark:text-gray-200 border-gray-300 dark:border-gray-700 hover:bg-green-100 dark:hover:bg-green-700"
                }`}
              >
                {page + 1}
              </button>
            ))}

            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage >= totalPages - 1 || totalPages === 0}
              className={`px-3 py-1 rounded-md border transition 
                ${
                  currentPage >= totalPages - 1 || totalPages === 0
                    ? "cursor-not-allowed text-gray-400 dark:text-gray-500 border-gray-300 dark:border-gray-700"
                    : "hover:bg-green-600 hover:text-white text-gray-700 dark:text-gray-200 border-gray-300 dark:border-gray-700"
                }`}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    );
  };
};

export default withPagination;

