import React from "react";
import ReactDatePicker from "react-datepicker";
import { CalendarIcon, XMarkIcon } from "@heroicons/react/24/outline";
import "react-datepicker/dist/react-datepicker.css";

let formikLib = {};
try {
  formikLib = require("formik");
} catch (err) {}
const { useFormikContext, useField } = formikLib;

const FilterDatePicker = ({
  name,
  value: externalValue,
  onChange: externalOnChange,
  placeholder = "Select date",
  disablePast = false,
  disableFuture = false,
}) => {
  const formikContext =
    typeof useFormikContext === "function" ? useFormikContext() : undefined;
  const isInFormik = !!formikContext?.setFieldValue;

  const [field] =
    isInFormik && typeof useField === "function" ? useField(name) : [{}];

  const rawValue = isInFormik ? field.value : externalValue;

  //  Safely convert stored value (string or Date) to a Date object
  const currentValue =
    rawValue && !isNaN(new Date(rawValue).getTime())
      ? new Date(rawValue)
      : null;

  //  Handle change for both Formik and external use
  const handleChange = (date) => {
    const formatted =
      date instanceof Date && !isNaN(date)
        ? date.toISOString().split("T")[0]
        : "";

    if (isInFormik) {
      formikContext.setFieldValue(name, formatted);
    } else if (externalOnChange) {
      if (externalOnChange.length === 1) {
        externalOnChange(formatted);
      } else {
        externalOnChange(name, formatted);
      }
    }
  };

  const handleClear = () => {
    if (isInFormik) {
      formikContext.setFieldValue(name, "");
    } else if (externalOnChange) {
      if (externalOnChange.length === 1) {
        externalOnChange("");
      } else {
        externalOnChange(name, "");
      }
    }
  };

  return (
    <div className="relative w-full">
      {/* Calendar Icon */}
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

      {/* Date Picker */}
      <ReactDatePicker
        id={`${name}-datepicker`}
        selected={currentValue}
        onChange={(date) => handleChange(date)} 
        dateFormat="dd/MM/yyyy"
        placeholderText={placeholder}
        name={name}
        showPopperArrow={false}
        popperPlacement="bottom-start"
        portalId="root-datepicker-portal"
        popperClassName="datepicker-popper"
        minDate={disablePast ? new Date() : null}
        maxDate={disableFuture ? new Date() : null}
        className="w-full h-10 pl-10 pr-9 rounded-lg border border-gray-300 
          focus:ring-2 focus:ring-[#006D3C] focus:outline-none 
          bg-white dark:bg-gray-800 dark:text-gray-100 dark:border-gray-700 
          text-sm transition-all"
        calendarClassName="rounded-lg shadow-lg border border-gray-200 dark:border-gray-600 dark:bg-gray-800"
      />

      {/* Clear Button */}
      {currentValue && (
        <button
          type="button"
          onClick={handleClear}
          className="absolute right-3 top-1/2 -translate-y-1/2 
            text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 
            focus:outline-none z-10"
          aria-label="Clear date"
        >
          <XMarkIcon className="w-4 h-4" />
        </button>
      )}
    </div>
  );
};

export default FilterDatePicker;
