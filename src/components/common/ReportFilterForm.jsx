

// import React from "react";
// import { Formik, Form, ErrorMessage } from "formik";
// import * as Yup from "yup";
// import dayjs from "dayjs";

// import FormikDatePicker from "./FormikDatePicker";
// import Dropdown from "./Dropown";
// import MUIButton from "./MUIButton";
// import { MagnifyingGlassIcon, CalendarIcon } from "@heroicons/react/24/solid";

// const validationSchema = Yup.object({
//   startDate: Yup.date().required("Start date is required"),
//   endDate: Yup.date()
//     .required("End date is required")
//     .min(Yup.ref("startDate"), "End date must be after start date"),
// });

// const ReportFilterForm = ({ projectOptions = [], onSubmit }) => {
//   const initialValues = {
//     project: [],
//     startDate: dayjs().subtract(6, "days").toDate(),
//     endDate: dayjs().toDate(),
//   };

//   return (
//     <Formik
//       initialValues={initialValues}
//       validationSchema={validationSchema}
//       onSubmit={(values) => onSubmit && onSubmit(values)}
//     >
//       {({ isSubmitting }) => (
//         <Form className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
//           {/* Project Dropdown */}
//           <div>
//             <Dropdown name="project" label="Project" options={projectOptions} />
//           </div>

//           {/* Start Date */}
//           <div className="relative">
//             <FormikDatePicker name="startDate" label="Start Date" />
//             <CalendarIcon className="w-5 h-5 absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
//             <ErrorMessage
//               name="startDate"
//               component="div"
//               className="text-red-500 text-sm mt-1"
//             />
//           </div>

//           {/* End Date */}
//           <div className="relative">
//             <FormikDatePicker name="endDate" label="End Date" />
//             <CalendarIcon className="w-5 h-5 absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
//             <ErrorMessage
//               name="endDate"
//               component="div"
//               className="text-red-500 text-sm mt-1"
//             />
//           </div>

//           {/* Search Button */}
//           <div>
//             <MUIButton
//               type="submit"
//               disabled={isSubmitting}
//               className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white hover:bg-blue-700 px-4 py-2 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
//             >
//               <MagnifyingGlassIcon className="w-5 h-5" />
//               Search
//             </MUIButton>
//           </div>
//         </Form>
//       )}
//     </Formik>
//   );
// };

// export default ReportFilterForm;

import React from "react";
import { Formik, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import dayjs from "dayjs";

import FormikDatePicker from "./FormikDatePicker";
import Dropdown from "./Dropown";
import MUIButton from "./MUIButton";
import { MagnifyingGlassIcon, CalendarIcon } from "@heroicons/react/24/solid";

const validationSchema = Yup.object({
  startDate: Yup.date().required("Start date is required"),
  endDate: Yup.date()
    .required("End date is required")
    .min(Yup.ref("startDate"), "End date must be after start date"),
});

const ReportFilterForm = ({ projectOptions = [], onSubmit }) => {
  const initialValues = {
    project: [],
    startDate: dayjs().subtract(6, "days").toDate(),
    endDate: dayjs().toDate(),
  };

  return (
    <Formik
  initialValues={initialValues}
  validationSchema={validationSchema}
  onSubmit={(values) => onSubmit && onSubmit(values)}
>
  {({ isSubmitting }) => (
    <Form className="flex flex-col lg:flex-row flex-wrap items-end gap-4 bg-white dark:bg-gray-800 p-4 rounded-md shadow">

      {/* Project Dropdown */}
      <div className="w-full sm:w-[200px]">
        <Dropdown name="project" label="Project" options={projectOptions} />
      </div>

      {/* Start Date */}
      <div className="w-full sm:w-[200px] relative">
        <FormikDatePicker name="startDate" label="Start Date" />
        <ErrorMessage
          name="startDate"
          component="div"
          className="text-red-500 text-sm mt-1"
        />
      </div>

      {/* End Date */}
      <div className="w-full sm:w-[200px] relative">
        <FormikDatePicker name="endDate" label="End Date" />
        <ErrorMessage
          name="endDate"
          component="div"
          className="text-red-500 text-sm mt-1"
        />
      </div>

      {/* Search Button */}
      <div className="w-full sm:w-auto">
        <MUIButton
          type="submit"
          disabled={isSubmitting}
          className="flex items-center justify-center gap-2 bg-green-600 text-white hover:bg-green-700 px-4 py-2 rounded-md transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <MagnifyingGlassIcon className="w-5 h-5" />
          Search
        </MUIButton>
      </div>
      
    </Form>
  )}
</Formik>

  );
};

export default ReportFilterForm;
