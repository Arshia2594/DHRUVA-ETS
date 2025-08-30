// import React from "react";
// import { FaEdit, FaEye } from "react-icons/fa";
// import MDAvatarGroup from "./MDAvatarGroup";
// import avatar1 from "../../assets/images/team-1.jpg";
// import avatar2 from "../../assets/images/team-2.jpg";

// const avatars = [
//   { src: avatar1, alt: "Avatar 1", name: "Priyanka" },
//   { src: avatar2, alt: "Avatar 2", name: "Shyamala" },
// ];

// const ProjectCard = ({ projects, onEdit, onView }) => {
//   const getStatusColor = (status) => {
//     switch (status) {
//       case "Completed":
//         return "bg-green-500";
//       case "In Progress":
//         return "bg-orange-500";
//       default:
//         return "bg-red-500";
//     }
//   };

//   return (
//     <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
//       {projects?.map((project) => (
//         <div
//           key={project.ProjectId}
//           className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden flex flex-col justify-between"
//         >
//           <div className="border-b px-4 py-3">
//             <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
//               {project.ProjectName}
//             </h3>
//             <p className="text-sm text-gray-500">
//               {project.Department} - {project.ProjectCode}
//             </p>
//           </div>

//           <div className="px-4 py-3">
//             <div className="flex justify-between mb-2">
//               <div>
//                 <p className="text-xs font-semibold text-gray-600 dark:text-gray-300">
//                   Start Date
//                 </p>
//                 <p className="text-sm text-gray-800 dark:text-white">
//                   {project.ProjectStartDate}
//                 </p>
//               </div>
//               <div>
//                 <p className="text-xs font-semibold text-gray-600 dark:text-gray-300">
//                   End Date
//                 </p>
//                 <p className="text-sm text-gray-800 dark:text-white">
//                   {project.ProjectEndDate}
//                 </p>
//               </div>
//             </div>

//             <div className="flex justify-between items-center mt-4">
//               <MDAvatarGroup
//                 avatars={project?.Members?.map((member, index) => ({
//                   name: member.FirstName,
//                   src: index % 2 === 0 ? avatars[0].src : avatars[1].src,
//                 }))}
//                 max={3}
//                 size="medium"
//               />
//               <span
//                 className={`text-xs px-3 py-1 rounded-full text-white ${getStatusColor(
//                   project.CompletionStatus
//                 )}`}
//               >
//                 {project.CompletionStatus}
//               </span>
//             </div>
//           </div>

//           <div className="flex border-t items-center justify-between px-4 py-2">
//             <button
//               className="text-sm flex items-center gap-2 text-blue-600 hover:bg-purple-100 px-2 py-1 rounded"
//               onClick={() => onView(project)}
//             >
//               <FaEye className="text-sm" />
//               View
//             </button>
//             <button
//               className="text-sm flex items-center gap-2 text-purple-600 hover:bg-purple-100 px-2 py-1 rounded"
//               onClick={() => onEdit(project)}
//             >
//               <FaEdit className="text-sm" />
//               Edit
//             </button>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default ProjectCard;

// import React from "react";
// import { FaEdit, FaEye } from "react-icons/fa";
// import MDAvatarGroup from "./MDAvatarGroup";
// import avatar1 from "../../assets/images/team-1.jpg";
// import avatar2 from "../../assets/images/team-2.jpg";

// const avatars = [
//   { src: avatar1, alt: "Avatar 1", name: "Priyanka" },
//   { src: avatar2, alt: "Avatar 2", name: "Shyamala" },
// ];

// const ProjectCard = ({ projects = [], onEdit, onView }) => {
//   const getStatusColor = (status) => {
//     switch (status) {
//       case "Completed":
//         return "bg-green-500";
//       case "In Progress":
//         return "bg-orange-500";
//       default:
//         return "bg-red-500";
//     }
//   };

//   // Return message if projects is not an array
//   if (!Array.isArray(projects)) {
//     return (
//       <div className="text-red-500 text-sm p-4 bg-red-100 rounded-md">
//         No project data found or invalid response.
//       </div>
//     );
//   }

//   // Return message if projects is an empty array
//   if (projects.length === 0) {
//     return (
//       <div className="text-gray-500 text-sm p-4 bg-gray-100 rounded-md">
//         No projects available.
//       </div>
//     );
//   }

//   return (
//     <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
//       {projects.map((project) => (
//         <div
//           key={project.ProjectId}
//           className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden flex flex-col justify-between"
//         >
//           <div className="border-b px-4 py-3">
//             <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
//               {project.ProjectName}
//             </h3>
//             <p className="text-sm text-gray-500">
//               {project.Department} - {project.ProjectCode}
//             </p>
//           </div>

//           <div className="px-4 py-3">
//             <div className="flex justify-between mb-2">
//               <div>
//                 <p className="text-xs font-semibold text-gray-600 dark:text-gray-300">
//                   Start Date
//                 </p>
//                 <p className="text-sm text-gray-800 dark:text-white">
//                   {project.ProjectStartDate}
//                 </p>
//               </div>
//               <div>
//                 <p className="text-xs font-semibold text-gray-600 dark:text-gray-300">
//                   End Date
//                 </p>
//                 <p className="text-sm text-gray-800 dark:text-white">
//                   {project.ProjectEndDate}
//                 </p>
//               </div>
//             </div>

//             <div className="flex justify-between items-center mt-4">
//               <MDAvatarGroup
//                 avatars={project?.Members?.map((member, index) => ({
//                   name: member.FirstName,
//                   src: index % 2 === 0 ? avatars[0].src : avatars[1].src,
//                 }))}
//                 max={3}
//                 size="medium"
//               />
//               <span
//                 className={`text-xs px-3 py-1 rounded-full text-white ${getStatusColor(
//                   project.CompletionStatus
//                 )}`}
//               >
//                 {project.CompletionStatus}
//               </span>
//             </div>
//           </div>

//               <div className="flex border-t items-center justify-between px-4 py-2">
//             <button
//               className="text-sm flex items-center gap-2 text-blue-600 hover:bg-purple-100 px-2 py-1 rounded"
//               onClick={() => onView(project)}
//             >
//               <FaEye className="text-sm" />
//               View
//             </button>
//             <button
//               className="text-sm flex items-center gap-2 text-purple-600 hover:bg-purple-100 px-2 py-1 rounded"
//               onClick={() => onEdit(project)}
//             >
//               <FaEdit className="text-sm" />
//               Edit
//             </button>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default ProjectCard;


import React from "react";
import { FaEdit, FaEye } from "react-icons/fa";
import MDAvatarGroup from "./MDAvatarGroup";
import avatar1 from "../../assets/images/team-1.jpg";
import avatar2 from "../../assets/images/team-2.jpg";

const avatars = [
    { src: avatar1, alt: "Avatar 1", name: "Priyanka" },
    { src: avatar2, alt: "Avatar 2", name: "Shyamala" },
];

const ProjectCard = ({ projects = [], onEdit, onView }) => {
    const getStatusColor = (status) => {
        switch (status) {
            case "Completed":
                return "bg-green-500";
            case "In Progress":
                return "bg-orange-500";
            default:
                return "bg-red-500";
        }
    };

    if (!Array.isArray(projects)) {
        return (
            <div className="text-red-500 text-sm p-4 bg-red-100 rounded-md">
                No project data found or invalid response.
            </div>
        );
    }

    if (projects.length === 0) {
        return (
            <div className="text-gray-500 text-sm p-4 bg-gray-100 rounded-md">
                No projects available.
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {projects.map((project) => (
                <div
                    key={project.ProjectId}
                    className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden flex flex-col justify-between"
                >
                    {/* Header */}
                    <div className="border-b px-4 py-3">
                        <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                            {project.ProjectName}
                        </h3>
                        <p className="text-sm text-gray-500 dark:text-gray-300">
                            {project.Department} - {project.ProjectCode}
                        </p>
                    </div>

                    {/* Dates & Status */}
                    <div className="px-4 py-3 flex flex-col justify-between flex-1">
                        <div className="flex justify-between mb-2">
                            <div>
                                <p className="text-xs font-semibold text-gray-600 dark:text-gray-300">
                                    Start Date
                                </p>
                                <p className="text-sm text-gray-800 dark:text-white">
                                    {project.ProjectStartDate || "-"}
                                </p>
                            </div>
                            <div>
                                <p className="text-xs font-semibold text-gray-600 dark:text-gray-300">
                                    End Date
                                </p>
                                <p className="text-sm text-gray-800 dark:text-white">
                                    {project.ProjectEndDate || "-"}
                                </p>
                            </div>
                        </div>

                        <div className="flex justify-between items-center mt-4">
                            <MDAvatarGroup
                                avatars={project?.Members?.map((member, index) => ({
                                    name: member.FirstName,
                                    src: index % 2 === 0 ? avatars[0].src : avatars[1].src,
                                }))}
                                max={3}
                                size="medium"
                            />
                            <span
                                className={`text-xs px-3 py-1 rounded-full text-white ${getStatusColor(
                                    project.CompletionStatus
                                )}`}
                            >
                                {project.CompletionStatus || "Unknown"}
                            </span>
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="flex border-t items-center justify-between px-4 py-2 bg-gray-50 dark:bg-gray-700">
                        <button
              className="text-sm flex items-center gap-2 text-green-600 hover:bg-green-100 px-2 py-1 rounded transition"
              onClick={() => onView(project.ProjectId || project.id)}
            >
              <FaEye className="text-sm" />
              View
            </button>
                        {/* <button
                            className="text-sm flex items-center gap-2 text-blue-600 hover:bg-purple-100 px-2 py-1 rounded"
                            onClick={() => onView(project)}
                        >
                            <FaEye className="text-sm" />
                            View
                        </button> */}

                        <button
                            className="text-sm flex items-center gap-2 text-purple-600 hover:bg-purple-100 px-2 py-1 rounded transition"
                            onClick={() => onEdit(project)}
                        >
                            <FaEdit className="text-sm" />
                            Edit
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ProjectCard;
