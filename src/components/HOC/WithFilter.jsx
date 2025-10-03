
import React, { useState } from "react";
import { FunnelIcon, PlusCircleIcon } from "@heroicons/react/24/solid";

const withFilter = (WrappedTable) => {
  return function FilterableComponent({
    data = [],
    filterFields = [],
    onAddClick,
    title = "Table",
    ...props
  }) {
    const [filters, setFilters] = useState({});
    const [showFilters, setShowFilters] = useState(false);

    const handleFilterChange = (field, value) => {
      setFilters((prev) => ({
        ...prev,
        [field]: value.toLowerCase(),
      }));
    };

    const clearAllFilters = () => {
      setFilters({});
    };

    const filteredData = data.filter((row) =>
      filterFields.every((field) => {
        const rowValue = String(row[field] || "").toLowerCase();
        const filterValue = filters[field] || "";
        return rowValue.includes(filterValue);
      })
    );

    return (
      <div className="space-y-4 w-full">
        {/* Header & Actions */}
        <div className="flex flex-wrap items-center justify-between gap-2">
          {/* <h2 className="text-lg font-semibold text-gray-800 dark:text-white">{title}</h2> */}
          {title && (
            <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
              {title}
            </h2>
          )}


          <div className="flex items-center gap-3">
            {onAddClick && (
              <button
                onClick={onAddClick}
                className="flex items-center gap-1 px-4 py-2 bg-green-700 hover:bg-green-800 text-white font-medium rounded-md shadow transition"
              >
                <PlusCircleIcon className="h-5 w-5" />
                Add
              </button>
            )}

            {filterFields.length > 0 && (
              <button
                onClick={() => setShowFilters((prev) => !prev)}
                className={`flex items-center gap-1 px-3 py-2 rounded-md font-medium transition ${showFilters
                    ? "bg-green-700 text-white"
                    : "bg-gray-200 text-gray-800 hover:bg-gray-300"
                  }`}
              >
                <FunnelIcon className="h-5 w-5" />
                {showFilters ? "Hide Filters" : "Show Filters"}
              </button>
            )}
          </div>
        </div>

        {/* Filter Section */}
        <div
          className={`transition-all duration-300 ease-in-out overflow-hidden ${showFilters ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
            }`}
        >
          {showFilters && (
            <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg space-y-4 border border-green-700 dark:border-green-600">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {filterFields.map((field) => (
                  <div key={field}>
                    <label className="block text-sm text-gray-700 dark:text-gray-200 mb-1 capitalize">
                      {field}
                    </label>
                    <input
                      type="text"
                      placeholder={`Filter by ${field}`}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-sm focus:ring-2 focus:ring-green-600 focus:outline-none dark:bg-gray-800 dark:text-white"
                      value={filters[field] || ""}
                      onChange={(e) => handleFilterChange(field, e.target.value)}
                    />
                  </div>
                ))}
              </div>

              <div className="text-right">
                <button
                  onClick={clearAllFilters}
                  className="text-sm text-red-600 hover:underline"
                >
                  Clear all filters
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Filtered Table */}
        <WrappedTable data={filteredData} {...props} />
      </div>
    );
  };
};

export default withFilter;
