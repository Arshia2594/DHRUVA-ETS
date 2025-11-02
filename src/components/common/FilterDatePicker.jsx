


import React from "react";
import ReactDatePicker from "react-datepicker";
import { CalendarIcon, XMarkIcon } from "@heroicons/react/24/outline";
import "react-datepicker/dist/react-datepicker.css";
import { useFormikContext, useField } from "formik";

const FilterDatePicker = ({
  name,
  label, 
  placeholder = "Select date",
  disablePast = false,
  disableFuture = false,
}) => {
  const { setFieldValue } = useFormikContext();
  const [field] = useField(name);

  const currentValue =
    field.value && !isNaN(new Date(field.value).getTime())
      ? new Date(field.value)
      : null;

  const handleChange = (date) => {
    const formatted = date ? date.toISOString().split("T")[0] : "";
    setFieldValue(name, formatted);
  };

  const handleClear = () => setFieldValue(name, "");

  return (
    <div className="relative w-full">
      {label && (
        <label
          htmlFor={`${name}-datepicker`}
          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
        >
          {label}
        </label>
      )}

      <div
        className="absolute left-3 top-9 z-20 text-[#006D3C] dark:text-green-400 cursor-pointer"
        onClick={(e) => {
          e.stopPropagation();
          document.querySelector(`#${name}-datepicker`)?.focus();
        }}
      >
        <CalendarIcon className="w-5 h-5" />
      </div>

      <ReactDatePicker
        id={`${name}-datepicker`}
        selected={currentValue}
        onChange={(date) => handleChange(date)}
        dateFormat="dd/MM/yyyy"
        placeholderText={placeholder}
        showPopperArrow={false}
        minDate={disablePast ? new Date() : null}
        maxDate={disableFuture ? new Date() : null}
        className="w-full h-11 pl-11 pr-9 rounded-lg border border-gray-300 
          focus:ring-2 focus:ring-[#006D3C] focus:outline-none 
          bg-white dark:bg-gray-800 dark:text-gray-100 dark:border-gray-700 
          text-sm transition-all placeholder-gray-400"
        calendarClassName="rounded-lg shadow-lg border border-gray-200 dark:border-gray-600 dark:bg-gray-800"
      />

      {currentValue && (
        <button
          type="button"
          onClick={handleClear}
          className="absolute right-3 top-[2.6rem] 
            text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 
            focus:outline-none"
        >
          <XMarkIcon className="w-4 h-4" />
        </button>
      )}
    </div>
  );
};

export default FilterDatePicker;

