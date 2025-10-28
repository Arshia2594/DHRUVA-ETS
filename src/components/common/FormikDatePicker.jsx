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
    <div className="relative w-full">
      {/* Calendar Input */}
      <ReactDatePicker
        selected={value ? new Date(value) : null}
        onChange={handleChange}
        dateFormat="dd/MM/yyyy"
        placeholderText="Select date"
        name={name}
        className="w-full h-10 px-3 pl-10 pr-8 rounded-md border text-sm 
                   border-gray-300 focus:ring-2 focus:ring-[#006D3C] focus:outline-none
                   bg-white text-gray-800 
                   dark:bg-gray-800 dark:text-white dark:border-gray-700"
        popperClassName="z-[50]"
        calendarClassName="z-[50]"
      />

      {/* Calendar Icon */}
      <CalendarIcon
        className="w-5 h-5 text-gray-400 absolute left-3 top-2.5 pointer-events-none"
      />

      {/* Clear Button */}
      {value && (
        <button
          type="button"
          onClick={() => onChange("")}
          className="absolute right-2 top-2.5 text-gray-400 hover:text-gray-600 
                     dark:hover:text-gray-300 focus:outline-none"
          aria-label="Clear date"
        >
          <XMarkIcon className="w-4 h-4" />
        </button>
      )}
    </div>
  );
};

export default FilterDatePicker;
