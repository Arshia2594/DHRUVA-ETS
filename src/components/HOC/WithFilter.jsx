
import React, { useState } from "react";
import { FunnelIcon, PlusCircleIcon } from "@heroicons/react/24/solid";

const withFilter = (WrappedTable) => {
  return function FilterableComponent({
    data = [],
    filterFields = [],
    filterMeta = {},
    onAddClick,
    title = "",
    ...props
  }) {
    const [filters, setFilters] = useState({});
    const [showFilters, setShowFilters] = useState(false);

    const handleFilterChange = (field, value) => {
      setFilters((prev) => ({
        ...prev,
        [field]: value?.toLowerCase?.() || value,
      }));
    };

    const clearAllFilters = () => setFilters({});

    const filteredData = data.filter((row) =>
      filterFields.every((field) => {
        const rowValue = String(row[field] || "").toLowerCase();
        const filterValue = (filters[field] || "").toLowerCase();
        return rowValue.includes(filterValue);
      })
    );

    return (
      <div className="space-y-4 w-full">
        {/* Header */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          {title && (
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
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
                className={`flex items-center gap-2 px-4 py-2 rounded-md font-medium transition shadow-sm ${
                  showFilters
                    ? "bg-green-700 text-white"
                    : "bg-white text-gray-800 border hover:bg-gray-100"
                }`}
              >
                <FunnelIcon className="h-5 w-5" />
                {showFilters ? "Hide Filters" : "Show Filters"}
              </button>
            )}
          </div>
        </div>

     
        <div
          className={`transition-all duration-300 ease-in-out ${
            showFilters ? "max-h-[600px] opacity-100 mt-2" : "max-h-0 opacity-0"
          }`}
          style={{ overflow: showFilters ? "visible" : "hidden" }}
        >
          {showFilters && (
            <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm p-5 space-y-4 relative">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {filterFields.map((field) => {
                  const meta = filterMeta[field] || {};
                  const type = meta.type || "text";

                  if (type === "select") {
                    return (
                      <div key={field}>
                        <label className="block text-sm font-medium mb-1 capitalize text-gray-700 dark:text-gray-200">
                          {field}
                        </label>
                        <select
                          value={filters[field] || ""}
                          onChange={(e) =>
                            handleFilterChange(field, e.target.value)
                          }
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-sm focus:ring-2 focus:ring-green-600 focus:outline-none dark:bg-gray-800 dark:text-white"
                        >
                          <option value="">All</option>
                          {meta.options?.map((opt) => (
                            <option key={opt.value} value={opt.value}>
                              {opt.label}
                            </option>
                          ))}
                        </select>
                      </div>
                    );
                  }

                  if (type === "date") {
                    const FormikDateFilter =
                      props.FormikDateFilter || (() => <p>Missing date</p>);
                    return (
                      <div key={field}>
                        <label className="block text-sm font-medium mb-1 capitalize text-gray-700 dark:text-gray-200">
                          {field}
                        </label>
                        <FormikDateFilter
                          value={filters[field] || ""}
                          onChange={(dateStr) =>
                            handleFilterChange(field, dateStr)
                          }
                        />
                      </div>
                    );
                  }

                  return (
                    <div key={field}>
                      <label className="block text-sm font-medium mb-1 capitalize text-gray-700 dark:text-gray-200">
                        {field}
                      </label>
                      <input
                        type="text"
                        placeholder={`Filter by ${field}`}
                        value={filters[field] || ""}
                        onChange={(e) =>
                          handleFilterChange(field, e.target.value)
                        }
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-sm focus:ring-2 focus:ring-green-600 focus:outline-none dark:bg-gray-800 dark:text-white"
                      />
                    </div>
                  );
                })}
              </div>

              <div className="flex justify-end">
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

        {/* Table */}
        <WrappedTable data={filteredData} {...props} />
      </div>
    );
  };
};

export default withFilter;
