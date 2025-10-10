

// import { useLocation, useParams } from "react-router-dom";
// import useAxios from "../../hooks/useAxios";
// import PageTitle from "../../components/common/PageTitle";
// import FilterableCollapsibleTable from "../../components/HOC/FilterableCollapsibleTable";
// import MUIButton from "../../components/common/MUIButton";
// import { exportToExcel, exportToPDF } from "../../utils/exportUtils";
// import { useMemo } from "react";
// import FilterDatePicker from "../../components/common/FilterDatePicker";

// const TeamDetails = () => {
//   const { empId } = useParams();
//   const location = useLocation();
//   const { isManager, showTimeSheet } = location.state || { isManager: false, showTimeSheet: false };

//   // Fetch employee details
//   const {
//     data: empDetails,
//     loading: empLoading,
//     error: empError,
//   } = useAxios(`/employee/employee/${empId}`, {}, true, [empId]);

//   // Fetch timesheet
//   const {
//     data: timesheetData = [],
//     loading: timesheetLoading,
//     error: timesheetError,
//   } = useAxios(`/empTimesheet/manager/employee-timesheet/${empId}`, {}, true, [empId]);

//   // Fetch department projects (once employee department is known)
// const {
//   data: projectData = [],
//   loading: projectLoading,
//   error: projectError,
// } = useAxios(
//   empDetails?.department ? `/project/getAllProjects?department=${empDetails.department}` : null,
//   {},
//   !!empDetails?.department,
//   [empDetails?.department]
// );


//   //  Prepare dropdown options
//   const projectOptions = useMemo(() => {
//     if (!projectData || !Array.isArray(projectData)) return [];
//     return projectData.map((proj) => ({
//      label: proj.ProjectName,
// value: proj.ProjectName,
//     }));
//   }, [projectData]);

//   const filterMeta = useMemo(() => ({
//   WorkDate: { type: "date" },
//   ProjectName: { type: "select", options: projectOptions },
//   ManagerApproval: {
//     type: "select",
//     options: [

//       { label: "Pending", value: "Pending" },
//       { label: "Approved", value: "Approved" },
//       { label: "Rejected", value: "Rejected" },
//     ],
//   },
// }), [projectOptions]);
// console.log("Project Options:", projectOptions);


//   const columns = [
//     { headerName: "Date", field: "WorkDate" },
//     { headerName: "Project", field: "ProjectName" },
//     { headerName: "Title", field: "WorkTitle" },
//     { headerName: "Status", field: "TaskStatus" },
//     { headerName: "Approval", field: "ManagerApproval" },
//     { headerName: "Time Spent (hrs)", field: "TotalTimeSpent" },
//   ];

//   const imageUrl =
//     empDetails?.Photo && typeof empDetails.Photo === "string"
//       ? `${import.meta.env.VITE_BASE_API_URL.replace("/api", "")}/uploads/${empDetails.Photo}`
//       : "/assets/images/team-1.jpg";

//   return (
//     <div className="p-6 space-y-8">
//       {/* EMPLOYEE DETAILS SECTION */}
//       {!showTimeSheet && (
//         <>
//           <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 border border-gray-200 dark:border-gray-700">
//             <PageTitle title={`Employee Details`} />
//             {empLoading ? (
//               <p>Loading employee details...</p>
//             ) : empError ? (
//               <p className="text-red-500">Failed to load employee details</p>
//             ) : (
//               <div className="flex flex-col sm:flex-row sm:items-start gap-8">
//                 <div className="flex-shrink-0 self-center sm:self-start">
//                   <img
//                     src={imageUrl}
//                     alt="Employee"
//                     className="w-32 h-32 rounded-full object-cover border-2 border-gray-300 dark:border-gray-600 shadow"
//                   />
//                 </div>
//                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-4 text-sm w-full">
//                   <div>
//                     <p className="text-gray-500 dark:text-gray-400">Full Name</p>
//                     <p className="font-medium text-gray-900 dark:text-white capitalize">
//                       {empDetails.FirstName} {empDetails.LastName}
//                     </p>
//                   </div>
//                   <div>
//                     <p className="text-gray-500 dark:text-gray-400">Email</p>
//                     <p className="font-medium text-gray-900 dark:text-white">{empDetails.Email}</p>
//                   </div>
//                   <div>
//                     <p className="text-gray-500 dark:text-gray-400">Department</p>
//                     <p className="font-medium text-gray-900 dark:text-white">{empDetails.department}</p>
//                   </div>
//                 </div>
//               </div>
//             )}
//           </div>
//         </>
//       )}

//       {/* TIMESHEET VIEW */}
//       {showTimeSheet && (
//         <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow border border-gray-200 dark:border-gray-700 space-y-4">
//           <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
//             <div>
//               <PageTitle title="Employee Timesheet" />
//               <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
//                 {empDetails?.FirstName} {empDetails?.LastName}
//               </h2>
//             </div>
//             <MUIButton
//               onClick={() => {
//                 if (!timesheetData || timesheetData.length === 0) {
//                   alert("No timesheet data available to export.");
//                   return;
//                 }
//                 exportToExcel(timesheetData, "Timesheet.xlsx");
//                 exportToPDF(columns, timesheetData, "Timesheet.pdf");
//               }}
//               bgColor="bg-green-600"
//               hoverColor="hover:bg-green-700"
//               className="px-5 py-2 rounded-md text-white shadow-md"
//             >
//               Download PDF / Excel
//             </MUIButton>
//           </div>

//           {timesheetLoading ? (
//             <p className="text-gray-500">Loading timesheet...</p>
//           ) : timesheetError ? (
//             <p className="text-red-500">Failed to fetch timesheet.</p>
//           ) : (
//             <FilterableCollapsibleTable
//   columns={columns}
//   data={timesheetData || []}
//   collapsibleFields={["WorkDetails", "TaskStatus", "WorkStartTime", "WorkEndTime"]}
//   keyField={"TimeSheetId"}
//   filterFields={["WorkDate", "ProjectName", "ManagerApproval"]}
//   filterMeta={filterMeta}
//   FormikDateFilter={FilterDatePicker}
// />

//           )}
//         </div>
//       )}
//     </div>
//   );
// };

// export default TeamDetails;
import { useLocation, useParams } from "react-router-dom";
import useAxios from "../../hooks/useAxios";
import PageTitle from "../../components/common/PageTitle";
import FilterableCollapsibleTable from "../../components/HOC/FilterableCollapsibleTable";
import MUIButton from "../../components/common/MUIButton";
import { exportToExcel, exportToPDF } from "../../utils/exportUtils";
import { useMemo } from "react";
import FilterDatePicker from "../../components/common/FilterDatePicker";

const TeamDetails = () => {
  const { empId } = useParams();
  const location = useLocation();
  const { isManager, showTimeSheet } = location.state || { isManager: false, showTimeSheet: false };

  // Fetch employee details
  const {
    data: empDetails,
    loading: empLoading,
    error: empError,
  } = useAxios(`/employee/employee/${empId}`, {}, true, [empId]);

  // Fetch timesheet
  const {
    data: timesheetData = [],
    loading: timesheetLoading,
    error: timesheetError,
    refetch: refetchTimesheet,
  } = useAxios(`/empTimesheet/manager/employee-timesheet/${empId}`, {}, true, [empId]);

  // Fetch department projects (for dropdown filter)
  const {
    data: projectData = [],
  } = useAxios(
    empDetails?.department ? `/project/getAllProjects?department=${empDetails.department}` : null,
    {},
    !!empDetails?.department,
    [empDetails?.department]
  );

  // Prepare project dropdown options
  const projectOptions = useMemo(() => {
    if (!projectData || !Array.isArray(projectData)) return [];
    return projectData.map(proj => ({ label: proj.ProjectName, value: proj.ProjectName }));
  }, [projectData]);

  const filterMeta = useMemo(() => ({
    WorkDate: { type: "date" },
    ProjectName: { type: "select", options: projectOptions },
    ManagerApproval: { type: "select", options: [
      { label: "Pending", value: "Pending" },
      { label: "Approved", value: "Approved" },
      { label: "Rejected", value: "Rejected" },
    ]},
  }), [projectOptions]);

  const columns = [
    { headerName: "Date", field: "WorkDate" },
    { headerName: "Project", field: "ProjectName" },
    { headerName: "Title", field: "WorkTitle" },
    { headerName: "Status", field: "TaskStatus" },
    { headerName: "Approval", field: "ManagerApproval" },
    { headerName: "Time Spent (hrs)", field: "TotalTimeSpent" },
  ];

  const imageUrl =
    empDetails?.Photo && typeof empDetails.Photo === "string"
      ? `${import.meta.env.VITE_BASE_API_URL.replace("/api", "")}/uploads/${empDetails.Photo}`
      : "/assets/images/team-1.jpg";

  return (
    <div className="p-6 space-y-8">
      {/* EMPLOYEE DETAILS, EXPERIENCE, EDUCATION, SKILLS */}
      {!showTimeSheet && (
        <>
          {/* Employee Info */}
          <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 border border-gray-200 dark:border-gray-700">
            <PageTitle title={`Employee Details`} />
            {empLoading ? (
              <p>Loading employee details...</p>
            ) : empError ? (
              <p className="text-red-500">Failed to load employee details</p>
            ) : (
              <div className="flex flex-col sm:flex-row sm:items-start gap-8">
                <div className="flex-shrink-0 self-center sm:self-start">
                  <img src={imageUrl} alt="Employee" className="w-32 h-32 rounded-full object-cover border-2 border-gray-300 dark:border-gray-600 shadow"/>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-4 text-sm w-full">
                  <div>
                    <p className="text-gray-500 dark:text-gray-400">Full Name</p>
                    <p className="font-medium text-gray-900 dark:text-white capitalize">{empDetails.FirstName} {empDetails.LastName}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 dark:text-gray-400">Email</p>
                    <p className="font-medium text-gray-900 dark:text-white">{empDetails.Email}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 dark:text-gray-400">Mobile</p>
                    <p className="font-medium text-gray-900 dark:text-white">{empDetails.Mobile}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 dark:text-gray-400">Role</p>
                    <p className="font-medium text-gray-900 dark:text-white">{empDetails.Role}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 dark:text-gray-400">Department</p>
                    <p className="font-medium text-gray-900 dark:text-white">{empDetails.department}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 dark:text-gray-400">Designation</p>
                    <p className="font-medium text-gray-900 dark:text-white">{empDetails.Designation}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 dark:text-gray-400">Joining Date</p>
                    <p className="font-medium text-gray-900 dark:text-white">{empDetails.JoiningDate}</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Experience */}
          <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6">
            <PageTitle title="Experience" />
            {empDetails?.Experience?.length > 0 ? (
              <ul className="space-y-3">
                {empDetails.Experience.map((exp, idx) => (
                  <li key={idx} className="border-b pb-3">
                    <p className="font-medium text-gray-900 dark:text-white">{exp.CompanyName}</p>
                    <p className="text-gray-600 dark:text-gray-300">{exp.Role} ({exp.StartDate} - {exp.EndDate || "Present"})</p>
                    <p className="text-sm text-gray-500">{exp.Description}</p>
                  </li>
                ))}
              </ul>
            ) : <p className="text-gray-500">No experience added.</p>}
          </div>

          {/* Education */}
          <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6">
            <PageTitle title="Education" />
            {empDetails?.Education?.length > 0 ? (
              <ul className="space-y-3">
                {empDetails.Education.map((edu, idx) => (
                  <li key={idx} className="border-b pb-3">
                    <p className="font-medium text-gray-900 dark:text-white">{edu.Degree}</p>
                    <p className="text-gray-600 dark:text-gray-300">{edu.Institution} ({edu.Year})</p>
                  </li>
                ))}
              </ul>
            ) : <p className="text-gray-500">No education details available.</p>}
          </div>

          {/* Skills */}
          <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6">
            <PageTitle title="Skills" />
            {empDetails?.Skills?.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {empDetails.Skills.map((skill, idx) => (
                  <span key={idx} className="px-3 py-1 text-sm bg-green-100 text-green-700 rounded-full">{skill}</span>
                ))}
              </div>
            ) : <p className="text-gray-500">No skills added.</p>}
          </div>
        </>
      )}

      {/* TIMESHEET */}
      {showTimeSheet && (
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow border border-gray-200 dark:border-gray-700 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <PageTitle title="Employee Timesheet" />
              <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                {empDetails?.FirstName} {empDetails?.LastName} - Timesheet
              </h2>
            </div>
            <MUIButton
              onClick={() => {
                if (!timesheetData || timesheetData.length === 0) {
                  alert("No timesheet data available to export.");
                  return;
                }
                exportToExcel(timesheetData, "Timesheet.xlsx");
                exportToPDF(columns, timesheetData, "Timesheet.pdf");
              }}
              bgColor="bg-green-600"
              hoverColor="hover:bg-green-700"
              className="px-5 py-2 rounded-md text-white shadow-md"
            >
              Download PDF / Excel
            </MUIButton>
          </div>

          {timesheetLoading ? (
            <p className="text-gray-500">Loading timesheet...</p>
          ) : timesheetError ? (
            <p className="text-red-500">Failed to fetch timesheet.</p>
          ) : (
            <FilterableCollapsibleTable
              columns={columns}
              data={timesheetData || []}
              collapsibleFields={["WorkDetails", "TaskStatus", "WorkStartTime", "WorkEndTime"]}
              keyField="TimeSheetId"
              filterFields={["WorkDate", "ProjectName", "ManagerApproval"]}
              filterMeta={filterMeta}
              FormikDateFilter={FilterDatePicker}
              refetch={refetchTimesheet}
              isManager={isManager}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default TeamDetails;
