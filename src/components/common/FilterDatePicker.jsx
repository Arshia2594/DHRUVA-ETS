import React from "react";
import ReactDatePicker from "react-datepicker";
import { CalendarIcon, XMarkIcon } from "@heroicons/react/24/outline";
import "react-datepicker/dist/react-datepicker.css";

const FilterDatePicker = ({
  name,
  value,
  onChange,
  placeholder = "Select date",
}) => {
  // Convert to YYYY-MM-DD format when selected
  const handleChange = (date) => {
    const formattedDate = date ? date.toISOString().split("T")[0] : "";
    onChange(formattedDate);
  };

  return (
    <div className="relative w-full">
      {/* ✅ Calendar Icon */}
      <div
        className="absolute left-3 top-1/2 -translate-y-1/2 z-10 
        text-[#006D3C] dark:text-green-400 cursor-pointer"
        onClick={(e) => {
          e.stopPropagation();
          document.querySelector(`#${name}-datepicker`)?.focus();
        }}
      >
        <CalendarIcon className="w-5 h-5 pointer-events-none" />
      </div>

      {/* ✅ Date Picker Input */}
      <ReactDatePicker
        id={`${name}-datepicker`}
        selected={value ? new Date(value) : null}
        onChange={handleChange}
        dateFormat="dd/MM/yyyy"
        placeholderText={placeholder}
        name={name}
        showPopperArrow={false}
        popperPlacement="bottom-start"
        portalId="root-datepicker-portal"
        popperClassName="datepicker-popper"
        className="w-full h-10 pl-10 pr-9 rounded-lg border border-gray-300 
          focus:ring-2 focus:ring-[#006D3C] focus:outline-none 
          bg-white dark:bg-gray-800 dark:text-gray-100 dark:border-gray-700 text-sm transition-all"
        calendarClassName="rounded-lg shadow-lg border border-gray-200 dark:border-gray-600 dark:bg-gray-800"
      />

      {/* ✅ Clear Button */}
      {value && (
        <button
          type="button"
          onClick={() => onChange("")}
          className="absolute right-3 top-1/2 -translate-y-1/2 
          text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 focus:outline-none z-10"
          aria-label="Clear date"
        >
          <XMarkIcon className="w-4 h-4" />
        </button>
      )}
    </div>
  );
};

export default FilterDatePicker;
