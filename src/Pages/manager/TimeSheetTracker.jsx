import React, { useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import dayjs from "dayjs";
import { PlusCircleIcon } from "@heroicons/react/24/solid";

import TimesheetForm from "../../components/common/TimeSheetForm";
import CustomizedCalendar from "../../components/common/CustomizedCalendar";
import FilterableCollapsibleTable from "../../components/HOC/FilterableCollapsibleTable";
import PageTitle from "../../components/common/PageTitle";
import MUIButton from "../../components/common/MUIButton";
import CustomTabs from "../../components/common/CustomTabs";
import useAxios from "../../hooks/useAxios";
import useAuth from "../../hooks/useAuth";
import {
  CREATE_EMPTIMESHEET,
  GET_TIMESHEETENTRIES_BY_EMP_ID,
  GET_PROJECTS_BY_USER_ID,
  GET_PROJECTS_BY_MANAGER_ID,
  GET_ALL_PROJECTS_DETAILS,
} from "../../utils/Strings";
import { createEventFromTask } from "../../utils/Lib";
import { exportToExcel, exportToPDF } from "../../utils/exportUtils";
import FilterDatePicker from "../../components/common/FilterDatePicker";

// Validation schema
const TimesheetSchema = Yup.object().shape({
  workTitle: Yup.string().required("Work title is required"),
  workDescription: Yup.string().required("Work description is required"),
  project: Yup.string().required("Please select a project"),
  startTime: Yup.string().required("Start time is required"),
  endTime: Yup.string().required("End time is required"),
  date: Yup.date().required("Date is required"),
});

const TimeSheetTracker = () => {
  const [open, setOpen] = useState(false);
  const [showCalendarView, setShowCalendarView] = useState(0);

  const { auth } = useAuth();

  //  Dynamic project API based on role
  const projectAPI =
    auth.role === "Manager"
      ? GET_PROJECTS_BY_MANAGER_ID
      : auth.role === "User"
      ? GET_PROJECTS_BY_USER_ID
      : GET_ALL_PROJECTS_DETAILS;

  const projectResponse = useAxios(projectAPI, {}, true);

  //  Format options for table filter
  const filterProjectOptions = (projectResponse?.data ?? []).map((proj) => ({
    label: proj.ProjectName,
    value: proj.ProjectName,
  }));

  const timesheetEntries = useAxios(
    GET_TIMESHEETENTRIES_BY_EMP_ID,
    {},
    true,
    open
  );

  const createTimesheetEntry = useAxios(
    CREATE_EMPTIMESHEET,
    { method: "POST" },
    false
  );

  const calendarEntries = timesheetEntries.loading
    ? []
    : timesheetEntries.data
        ?.filter((item) => item.ManagerApproval === "Approved")
        ?.map(createEventFromTask);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleTabChange = (index) => setShowCalendarView(index);

  const tabsData = [
    { label: "OVERVIEW" },
    { label: "CALENDAR" },
  ];

  const columns = [
    { headerName: "Date", field: "WorkDate" },
    { headerName: "Project Name", field: "ProjectName" },
    { headerName: "Title", field: "WorkTitle" },
    { headerName: "Duration (hours)", field: "TotalTimeSpent" },
  ];

  return (
    <div className="p-4 space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <PageTitle
          title={
            showCalendarView === 0
              ? "Timesheet Overview"
              : "Timesheet Calendar"
          }
        />

        <div className="flex flex-wrap items-center justify-between gap-3 w-full md:w-auto">
          <CustomTabs
            tabs={tabsData}
            value={showCalendarView}
            onChange={handleTabChange}
            tabStyles={{
              default:
                "relative px-4 py-3 font-medium text-gray-700 dark:text-gray-200 transition-colors duration-200",
              active: "text-green-600 dark:text-green-400 font-semibold",
              hover: "hover:text-green-600 dark:hover:text-green-400",
            }}
            indicatorColor="bg-green-600"
          />

          {showCalendarView === 0 && (
            <>
              <div className="flex gap-3 mt-3">
                <MUIButton
                  onClick={handleOpen}
                  bgColor="bg-green-500"
                  hoverColor="hover:bg-green-600"
                  className="flex items-center gap-2 px-4 py-2 text-white rounded-md shadow-md"
                >
                  <PlusCircleIcon className="w-5 h-5" />
                  Add
                </MUIButton>

                <MUIButton
                  onClick={() => {
                    if (!timesheetEntries.loading && timesheetEntries.data?.length > 0) {
                      exportToExcel(timesheetEntries.data, "Timesheet.xlsx");
                      exportToPDF(columns, timesheetEntries.data, "Timesheet.pdf");
                    } else {
                      alert("No timesheet data available to export.");
                    }
                  }}
                  bgColor="bg-blue-600"
                  hoverColor="hover:bg-blue-700"
                  className="px-4 py-2 rounded-md text-white"
                >
                  Download
                </MUIButton>
              </div>
            </>
          )}
        </div>
      </div>

      {/*  Modal */}
      {open && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 w-full max-w-md rounded-lg shadow-lg p-6 relative">
            <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">
              Timesheet Form
            </h2>
            <button
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 dark:hover:text-gray-200"
              onClick={handleClose}
            >
              ✕
            </button>

            <Formik
              initialValues={{
                workTitle: "",
                workDescription: "",
                project: "",
                startTime: null,
                endTime: null,
                date: dayjs(),
              }}
              validationSchema={TimesheetSchema}
              onSubmit={(values) => {
                const requestObj = {
                  ProjectId: values.project,
                  WorkTitle: values.workTitle,
                  WorkDetails: values.workDescription,
                  WorkDate: values.date,
                  TaskStatus: "In Progress",
                  WorkStartTime: values.startTime,
                  WorkEndTime: values.endTime,
                };
                createTimesheetEntry.refetch({ data: requestObj });
                timesheetEntries.refetch();
                handleClose();
              }}
            >
              {({ values, errors, touched, handleChange, setFieldValue }) => (
                <Form className="space-y-4">
                  <TimesheetForm
                    values={values}
                    errors={errors}
                    touched={touched}
                    handleChange={handleChange}
                    setFieldValue={setFieldValue}
                  />
                  <div className="flex justify-end gap-3 mt-2">
                    <MUIButton
                      type="button"
                      onClick={handleClose}
                      bgColor="bg-gray-200"
                      hoverColor="hover:bg-gray-300"
                      className="px-4 py-2 rounded-md"
                    >
                      Cancel
                    </MUIButton>
                    <MUIButton
                      type="submit"
                      bgColor="bg-red-700"
                      hoverColor="hover:bg-red-800"
                      className="px-4 py-2 rounded-md text-white"
                    >
                      Submit
                    </MUIButton>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      )}

      {/* Table or Calendar View */}
      {showCalendarView === 0 ? (
        <FilterableCollapsibleTable
          columns={columns}
          data={timesheetEntries.loading ? [] : timesheetEntries.data}
          collapsibleFields={[
            "WorkDetails",
            "TaskStatus",
            "WorkStartTime",
            "WorkEndTime",
          ]}
          keyField={"TimeSheetId"}
          filterFields={["WorkDate", "ProjectName"]}
          filterMeta={{
            ProjectName: {
              type: "select",
              options: filterProjectOptions,
            },
            WorkDate: {
              type: "date",
            },
          }}
          FormikDateFilter={FilterDatePicker}
          onAddclick={handleOpen}
        />
      ) : (
        <CustomizedCalendar events={calendarEntries} />
      )}
    </div>
  );
};

export default TimeSheetTracker;
