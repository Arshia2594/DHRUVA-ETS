
// import React, { useEffect, useState } from "react";
// import { Formik, Form, useFormikContext } from "formik";
// import * as Yup from "yup";
// import PropTypes from "prop-types";
// import Input from "./Input";
// import FormSelect from "./FormSelect";
// import useAxios from "../../hooks/useAxios";
// import { GET_ALL_NORMAL_USERS } from "../../utils/Strings";
// import FormikMultiSelect from "./FormikMultiSelect";
// import FormikDatePicker from "./FormikDatePicker";

// // Initial form state
// const INITIAL_FORM_STATE = {
//   ProjectCode: "",
//   ProjectName: "",
//   ManagerId: "",
//   Department: "",
//   CompletionStatus: "Pending",
//   ProjectStartDate: "",
//   ProjectEndDate: "",
//   Members: [],
// };

// // Yup validation
// const FORM_VALIDATION = Yup.object().shape({
//   ProjectCode: Yup.string().required("Project code is required"),
//   ProjectName: Yup.string().required("Project name is required"),
//   ManagerId: Yup.string().required("Manager selection is required"),
//   Department: Yup.string().required("Department is required"),
// });

// const ProjectForm = ({ setIsCreateUpdate, objectToEdit, isCreateUpdate }) => {
//   const departments = useAxios("/department/get-departments", { params: { _limit: 5 } }, true);
//   const managers = useAxios("/employee/get-manager-list", { params: { _limit: 5 } }, true);


//   const FORM_STATE = objectToEdit
//     ? {
//       ProjectId: objectToEdit?.ProjectId,
//       ProjectCode: objectToEdit?.ProjectCode,
//       ProjectName: objectToEdit?.ProjectName,
//       ManagerId: objectToEdit?.ManagerId,
//       Department: objectToEdit?.Department,
//       CompletionStatus: objectToEdit?.CompletionStatus,
//       ProjectStartDate: objectToEdit?.ProjectStartDate,
//       ProjectEndDate: objectToEdit?.ProjectEndDate,
//       Members: objectToEdit?.Members?.map((member) => member.EmpId) || [],
//       MembersAvatar: objectToEdit?.MembersAvatar,

//     }
//     : INITIAL_FORM_STATE;

//   const createProject = useAxios("/project/create-project", { method: "POST" }, false);
//   const updateProject = useAxios("/project/update-project", { method: "PUT" }, false, isCreateUpdate);

//   return (
//     <Formik
//       initialValues={FORM_STATE}
//       validationSchema={FORM_VALIDATION}
//       enableReinitialize
//       onSubmit={(values, { setSubmitting, resetForm }) => {
//         objectToEdit
//           ? updateProject.refetch({ data: values })
//           : createProject.refetch({ data: values });

//         setSubmitting(false);
//         setIsCreateUpdate(false);
//         resetForm();
//       }}
//     >
//       {({ handleSubmit, isSubmitting }) => (
//         <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 max-w-6xl mx-auto">
//           <Form onSubmit={handleSubmit}>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               <Input name="ProjectCode" label="Project Code" />
//               <Input name="ProjectName" label="Project Name" />

//               <FormSelect
//                 name="ManagerId"
//                 label="Manager"
//                 options={
//                   managers?.data?.map((item) => ({
//                     value: item.EmpId,
//                     label: item.FirstName,
//                   })) || []
//                 }
//               />

//               <FormSelect
//                 name="Department"
//                 label="Department"
//                 options={
//                   departments?.data?.map((item) => ({
//                     value: item.DepartmentName,
//                     label: item.DepartmentName,
//                   })) || []
//                 }
//               />
//               <DepartmentMembersSelect />

//               <FormikDatePicker name="ProjectStartDate" label="Start Date" />
//               <FormikDatePicker name="ProjectEndDate" label="End Date" />
//             </div>

//             <div className="flex justify-end mt-8 gap-4">
//               <button
//                 type="submit"
//                 disabled={isSubmitting}
//                 className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-2 rounded shadow-md transition"
//               >
//                 Submit
//               </button>
//               <button
//                 type="button"
//                 onClick={() => setIsCreateUpdate(false)}
//                 className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold px-6 py-2 rounded shadow-md transition"
//               >
//                 Cancel
//               </button>
//             </div>
//           </Form>

//         </div>
//       )}
//     </Formik>
//   );
// };

// const DepartmentMembersSelect = () => {
//   const { values } = useFormikContext();
//   const [url, setUrl] = useState(null); //  start with null URL

//   useEffect(() => {
//     if (values.Department?.trim()) {
//       const dept = values.Department.trim().toLowerCase();
//       setUrl(`${GET_ALL_NORMAL_USERS}?department=${dept}`);
//     } else {
//       setUrl(null); //  prevent API call if no department
//     }
//   }, [values.Department]);

//   const users = useAxios(url, { params: { _limit: 100 } }, !!url); // only call if url exists

//   return (
//     <FormikMultiSelect
//       name="Members"
//       label="Select Members"
//       options={
//         users?.data?.map((item) => ({
//           value: item.EmpId,
//           label: `${item.FirstName} ${item.LastName}`,
//         })) || []
//       }
//       isDisabled={!values.Department}
//     />
//   );
// };
// ProjectForm.propTypes = {
//   setIsCreateUpdate: PropTypes.func.isRequired,
//   objectToEdit: PropTypes.object,
//   isCreateUpdate: PropTypes.bool,
// };

// export default ProjectForm;

import React, { useEffect, useState } from "react";
import { Formik, Form, useFormikContext } from "formik";
import * as Yup from "yup";
import PropTypes from "prop-types";
import { motion } from "framer-motion";
import Input from "./Input";
import FormSelect from "./FormSelect";
import useAxios from "../../hooks/useAxios";
import { GET_ALL_NORMAL_USERS } from "../../utils/Strings";
import FormikMultiSelect from "./FormikMultiSelect";
import FilterDatePicker from "./FilterDatePicker";

const INITIAL_FORM_STATE = {
  ProjectCode: "",
  ProjectName: "",
  ManagerId: "",
  Department: "",
  CompletionStatus: "Pending",
  ProjectStartDate: "",
  ProjectEndDate: "",
  Members: [],
};

const FORM_VALIDATION = Yup.object().shape({
  ProjectCode: Yup.string().required("Project code is required"),
  ProjectName: Yup.string().required("Project name is required"),
  ManagerId: Yup.string().required("Manager selection is required"),
  Department: Yup.string().required("Department is required"),
});

const ProjectForm = ({ setIsCreateUpdate, objectToEdit }) => {
  const departments = useAxios("/department/get-departments", {}, true);
  const managers = useAxios("/employee/get-manager-list", {}, true);

  const FORM_STATE = objectToEdit
    ? {
      ...INITIAL_FORM_STATE,
      ...objectToEdit,
      Members: objectToEdit?.Members?.map((m) => m.EmpId) || [],
    }
    : INITIAL_FORM_STATE;

  const createProject = useAxios("/project/create-project", { method: "POST" }, false);
  const updateProject = useAxios("/project/update-project", { method: "PUT" }, false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 border border-gray-100 dark:border-gray-700"
    >
      <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-8 tracking-tight">
        Project Details
      </h2>

      <Formik
        initialValues={FORM_STATE}
        validationSchema={FORM_VALIDATION}
        enableReinitialize
        onSubmit={(values, { setSubmitting, resetForm }) => {
          const formattedValues = {
            ...values,
            ProjectStartDate: values.ProjectStartDate
              ? values.ProjectStartDate
              : "",
            ProjectEndDate: values.ProjectEndDate
              ? values.ProjectEndDate
              : "",
          };

          if (objectToEdit) updateProject.refetch({ data: formattedValues });
          else createProject.refetch({ data: formattedValues });

          setSubmitting(false);
          resetForm();
          setIsCreateUpdate(false);
        }}


      >
        {({ handleSubmit, isSubmitting }) => (
          <Form onSubmit={handleSubmit} className="space-y-10">
            {/*  Project Basic Info  */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input name="ProjectCode" label="Project Code" />
              <Input name="ProjectName" label="Project Name" />
              <FormSelect
                name="ManagerId"
                label="Manager"
                options={
                  managers?.data?.map((item) => ({
                    value: item.EmpId,
                    label: item.FirstName,
                  })) || []
                }
              />
              <FormSelect
                name="Department"
                label="Department"
                options={
                  departments?.data?.map((item) => ({
                    value: item.DepartmentName,
                    label: item.DepartmentName,
                  })) || []
                }
              />
            </div>

            {/* Members + Dates Row */}
<div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
  <div className="flex flex-col">
    <DepartmentMembersSelect />
  </div>

  <div className="flex flex-col">
    <FilterDatePicker
      name="ProjectStartDate"
      label="Project Start Date"
      placeholder="Select start date"
    />
  </div>

  <div className="flex flex-col">
    <FilterDatePicker
      name="ProjectEndDate"
      label="Project End Date"
      placeholder="Select end date"
    />
  </div>
</div>

            {/* Action Buttons  */}
            <div className="flex justify-end gap-4 pt-6 border-t border-gray-100 dark:border-gray-700">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                type="submit"
                disabled={isSubmitting}
                className=" bg-green-600 hover:bg-green-700 
                text-white font-semibold px-8 py-2.5 rounded-lg shadow-md transition-all"
              >
                {objectToEdit ? "Update Project" : "Create Project"}
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                type="button"
                onClick={() => setIsCreateUpdate(false)}
                className="bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 
                text-gray-800 dark:text-white font-semibold px-8 py-2.5 rounded-lg transition-all"
              >
                Cancel
              </motion.button>
            </div>
          </Form>
        )}
      </Formik>
    </motion.div>
  );
};

//  MEMBERS DROPDOWN  
const DepartmentMembersSelect = () => {
  const { values } = useFormikContext();
  const [url, setUrl] = useState(null);

  useEffect(() => {
    if (values.Department?.trim()) {
      const dept = values.Department.trim().toLowerCase();
      setUrl(`${GET_ALL_NORMAL_USERS}?department=${dept}`);
    } else {
      setUrl(null);
    }
  }, [values.Department]);

  const users = useAxios(url, {}, !!url);

  return (
    <FormikMultiSelect
      name="Members"
      label="Select Members"
      options={
        users?.data?.map((item) => ({
          value: item.EmpId,
          label: `${item.FirstName} ${item.LastName}`,
        })) || []
      }
      isDisabled={!values.Department}
    />
  );
};

ProjectForm.propTypes = {
  setIsCreateUpdate: PropTypes.func.isRequired,
  objectToEdit: PropTypes.object,
};

export default ProjectForm;
