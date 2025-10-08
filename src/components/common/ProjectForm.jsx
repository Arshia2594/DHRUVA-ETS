
import React, { useEffect, useState } from "react";
import { Formik, Form, useFormikContext } from "formik";
import * as Yup from "yup";
import PropTypes from "prop-types";
import Input from "./Input";
import FormSelect from "./FormSelect";
import useAxios from "../../hooks/useAxios";
import { GET_ALL_NORMAL_USERS } from "../../utils/Strings";
import FormikMultiSelect from "./FormikMultiSelect";
import FormikDatePicker from "./FormikDatePicker";

// Initial form state
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

// Yup validation
const FORM_VALIDATION = Yup.object().shape({
  ProjectCode: Yup.string().required("Project code is required"),
  ProjectName: Yup.string().required("Project name is required"),
  ManagerId: Yup.string().required("Manager selection is required"),
  Department: Yup.string().required("Department is required"),
});

const ProjectForm = ({ setIsCreateUpdate, objectToEdit, isCreateUpdate }) => {
  const departments = useAxios("/department/get-departments", { params: { _limit: 5 } }, true);
  const managers = useAxios("/employee/get-manager-list", { params: { _limit: 5 } }, true);

 
  const FORM_STATE = objectToEdit
    ? {
      ProjectId: objectToEdit?.ProjectId,
      ProjectCode: objectToEdit?.ProjectCode,
      ProjectName: objectToEdit?.ProjectName,
      ManagerId: objectToEdit?.ManagerId,
      Department: objectToEdit?.Department,
      CompletionStatus: objectToEdit?.CompletionStatus,
      ProjectStartDate: objectToEdit?.ProjectStartDate,
      ProjectEndDate: objectToEdit?.ProjectEndDate,
      Members: objectToEdit?.Members?.map((member) => member.EmpId) || [],
      MembersAvatar: objectToEdit?.MembersAvatar,
    }
    : INITIAL_FORM_STATE;

  const createProject = useAxios("/project/create-project", { method: "POST" }, false);
  const updateProject = useAxios("/project/update-project", { method: "PUT" }, false, isCreateUpdate);

  return (
    <Formik
      initialValues={FORM_STATE}
      validationSchema={FORM_VALIDATION}
      enableReinitialize
      onSubmit={(values, { setSubmitting, resetForm }) => {
        objectToEdit
          ? updateProject.refetch({ data: values })
          : createProject.refetch({ data: values });

        setSubmitting(false);
        setIsCreateUpdate(false);
        resetForm();
      }}
    >
      {({ handleSubmit, isSubmitting }) => (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 max-w-6xl mx-auto">
          <Form onSubmit={handleSubmit}>
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

              <DepartmentMembersSelect />

              <FormikDatePicker name="ProjectStartDate" label="Start Date" />
              <FormikDatePicker name="ProjectEndDate" label="End Date" />
            </div>

            <div className="flex justify-end mt-8 gap-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-2 rounded shadow-md transition"
              >
                Submit
              </button>
              <button
                type="button"
                onClick={() => setIsCreateUpdate(false)}
                className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold px-6 py-2 rounded shadow-md transition"
              >
                Cancel
              </button>
            </div>
          </Form>

        </div>
      )}
    </Formik>
  );
};

const DepartmentMembersSelect = () => {
  const { values } = useFormikContext();
  const [url, setUrl] = useState(null); //  start with null URL

  useEffect(() => {
    if (values.Department?.trim()) {
      const dept = values.Department.trim().toLowerCase();
      setUrl(`${GET_ALL_NORMAL_USERS}?department=${dept}`);
    } else {
      setUrl(null); //  prevent API call if no department
    }
  }, [values.Department]);

  const users = useAxios(url, { params: { _limit: 100 } }, !!url); // only call if url exists

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
  isCreateUpdate: PropTypes.bool,
};

export default ProjectForm;
