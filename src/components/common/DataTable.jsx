

import PropTypes from "prop-types";
import { useState, useMemo } from "react";

const DataTable = ({ rows = [], columns, onEdit, onView, onDelete }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const visibleRows = useMemo(() => {
    return rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
  }, [rows, page, rowsPerPage]);

  return (
    <div className="overflow-x-auto bg-white shadow rounded-lg">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-100">
          <tr>
            {columns.map((col) => (
              <th
                key={col.id}
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                {col.label}
              </th>
            ))}
            {(onEdit || onView || onDelete) && <th className="px-6 py-3 text-center">Actions</th>}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {visibleRows.map((row, idx) => (
            <tr key={idx} className="hover:bg-gray-50">
              {columns.map((col) => (
                <td key={col.id} className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                  {row[col.id]}
                </td>
              ))}
              {(onEdit || onView || onDelete) && (
                <td className="px-6 py-4 whitespace-nowrap text-sm text-center space-x-1">
                  {onEdit && (
                    <button
                      onClick={() => onEdit(row)}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      Edit
                    </button>
                  )}
                  {onView && (
                    <button
                      onClick={() => onView(row)}
                      className="text-green-600 hover:text-green-800"
                    >
                      View
                    </button>
                  )}
                  {onDelete && (
                    <button
                      onClick={() => onDelete(row)}
                      className="text-red-600 hover:text-red-800"
                    >
                      Delete
                    </button>
                  )}
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
      {/* Pagination */}
      <div className="flex justify-between items-center p-4">
        <span>
          Page {page + 1} of {Math.ceil(rows.length / rowsPerPage)}
        </span>
        <select
          value={rowsPerPage}
          onChange={(e) => setRowsPerPage(parseInt(e.target.value))}
          className="border rounded px-2 py-1"
        >
          {[5, 10, 25].map((n) => (
            <option key={n} value={n}>
              {n} / page
            </option>
          ))}
        </select>
        <div className="space-x-2">
          <button
            disabled={page === 0}
            onClick={() => setPage((prev) => prev - 1)}
            className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
          >
            Prev
          </button>
          <button
            disabled={(page + 1) * rowsPerPage >= rows.length}
            onClick={() => setPage((prev) => prev + 1)}
            className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

DataTable.propTypes = {
  rows: PropTypes.array,
  columns: PropTypes.array.isRequired,
  onEdit: PropTypes.func,
  onView: PropTypes.func,
  onDelete: PropTypes.func,
};

export default DataTable;

