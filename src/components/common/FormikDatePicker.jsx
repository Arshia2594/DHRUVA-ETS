

import React from "react";
import ReactDatePicker from "react-datepicker";
import { CalendarIcon, XMarkIcon } from "@heroicons/react/24/outline";
import "react-datepicker/dist/react-datepicker.css";

const FilterDatePicker = ({ name, value, onChange }) => {
  const handleChange = (date) => {
    const formattedDate = date ? date.toISOString().split("T")[0] : "";
    onChange(formattedDate);
  };

  return (
    <div className="relative w-full group">
      {/* Calendar Input */}
      <ReactDatePicker
        selected={value ? new Date(value) : null}
        onChange={handleChange}
        dateFormat="dd/MM/yyyy"
        placeholderText="Select date"
        name={name}
        popperClassName="z-[9999]"
        calendarClassName="z-[9999]"
        className="
          w-full h-11 px-3 pl-11 pr-10 rounded-xl border text-sm 
          border-gray-300/80 bg-white/90 text-gray-800 shadow-sm
          focus:border-[#006D3C] focus:ring-2 focus:ring-[#006D3C]/40
          dark:bg-gray-900 dark:text-gray-100 dark:border-gray-700
          dark:focus:ring-[#22C55E]/50 transition-all duration-200
          placeholder:text-gray-400 dark:placeholder:text-gray-500
        "
      />

      {/* Calendar Icon */}
      <CalendarIcon
        className="w-5 h-5 absolute left-3 top-3 text-gray-400 group-focus-within:text-[#006D3C] transition-colors duration-200 pointer-events-none"
      />

      {/* Clear Button */}
      {value && (
        <button
          type="button"
          onClick={() => onChange("")}
          className="absolute right-2.5 top-2.5 p-1.5 rounded-md 
                     text-gray-400 hover:text-gray-700 hover:bg-gray-100
                     dark:hover:bg-gray-800 dark:hover:text-gray-200 
                     transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#006D3C]/40"
          aria-label="Clear date"
        >
          <XMarkIcon className="w-4 h-4" />
        </button>
      )}
    </div>
  );
};

export default FilterDatePicker;
