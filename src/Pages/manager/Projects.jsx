// import { useState } from "react";
// import { useNavigate } from "react-router-dom";

// import {
//   GET_ALL_PROJECTS_DETAILS,
//   GET_PROJECTS_BY_MANAGER_ID,
//   GET_PROJECTS_BY_USER_ID,
// } from "../../utils/Strings";

// import HeaderTitle from "../../components/common/HeaderTitle";
// import ProjectCard from "../../components/common/ProjectCard";
// import ProjectForm from "../../components/common/ProjectForm";
// import useAxios from "../../hooks/useAxios";
// import useAuth from "../../hooks/useAuth";     

// const Projects = () => {
//   const [isCreateUpdate, setIsCreateUpdate] = useState(false);
//   const [objectToEdit, setObjectToEdit] = useState(null);
//   const { auth } = useAuth();
//   const navigate = useNavigate();

//   // Determine API endpoint based on user role
//   const API =
//     auth.role === "Manager"
//       ? GET_PROJECTS_BY_MANAGER_ID
//       : auth.role === "User"
//       ? GET_PROJECTS_BY_USER_ID
//       : GET_ALL_PROJECTS_DETAILS;

//   // Fetch projects using custom hook
//   const projects = useAxios(
//     API,
//     { params: { _limit: 5 } },
//     true,
//     [isCreateUpdate] // Re-fetch whenever create/update state changes
//   );

//   // Debug log
//   console.log("Projects API data:", projects);

//   // Handlers
//   const handleAddClick = (e) => {
//     e.preventDefault();
//     setObjectToEdit(null);
//     setIsCreateUpdate(true);
//   };

//   const handleEditClick = (project) => {
//     setObjectToEdit(project)
//     setIsCreateUpdate(true);
//   };

// //   const handleView = (projectId) => {
// //   const URL =
// //     auth.role === "Manager"
// //       ? `/manager/project-details/${projectId}`
// //       : auth.role === "User"
// //       ? `/user/project-details/${projectId}`
// //       : `/manager/project-details/${projectId}`;
// //   navigate(URL);
// // };

// const handleView = (projectId) => {
//   const role = auth.role?.toLowerCase(); // Get role from context
//   navigate(`/${role}/project-details/${projectId}`); // Dynamic route based on role
// };





//   return (
//     <div className="p-6">
//       <HeaderTitle
//         title="Project Details"
//         nameButton2="ADD"
//         handleButton2={handleAddClick}
//       />

//       {isCreateUpdate ? (
//         <div className="mt-6">
//           <ProjectForm
//             isCreateUpdate={isCreateUpdate}
//             setIsCreateUpdate={setIsCreateUpdate}
//             objectToEdit={objectToEdit}
//           />
//         </div>
//       ) : (
//         <div className="mt-6">
//           <ProjectCard
//             projects={Array.isArray(projects?.data) ? projects.data : []}
//             onEdit={handleEditClick}
//             onView={handleView}
//           />
//         </div>
//       )}
//     </div>
//   );
// };

// export default Projects;




import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

import {
  GET_ALL_PROJECTS_DETAILS,
  GET_PROJECTS_BY_MANAGER_ID,
  GET_PROJECTS_BY_USER_ID,
} from "../../utils/Strings";

import HeaderTitle from "../../components/common/HeaderTitle";
import ProjectCard from "../../components/common/ProjectCard";
import ProjectForm from "../../components/common/ProjectForm";
import useAxios from "../../hooks/useAxios";

const Projects = () => {
  const { auth } = useAuth();
  const navigate = useNavigate();

  const [isCreateUpdate, setIsCreateUpdate] = useState(false);
  const [objectToEdit, setObjectToEdit] = useState(null);

  // Set API based on role
  const API =
    auth.role === "Manager"
      ? GET_PROJECTS_BY_MANAGER_ID
      : auth.role === "User"
      ? GET_PROJECTS_BY_USER_ID
      : GET_ALL_PROJECTS_DETAILS;

  const projects = useAxios(
    API,
    { params: { _limit: 5 } },
    true,
    [isCreateUpdate]
  );

  const handleAddClick = (e) => {
    e.preventDefault();
    setObjectToEdit(null);
    setIsCreateUpdate(true);
  };

  const handleEditClick = (project) => {
    setObjectToEdit(project);
    setIsCreateUpdate(true);
  };

  const handleView = (projectId) => {
    const role = auth?.role?.toLowerCase(); // admin, user, manager
    console.log("Navigating to:", `/${role}/project-details/${projectId}`);
    navigate(`/${role}/project-details/${projectId}`);
  };

  return (
    <div className="p-6">
      <HeaderTitle
        title="Project Details"
        nameButton2="ADD"
        handleButton2={handleAddClick}
      />

      {isCreateUpdate ? (
        <div className="mt-6">
          <ProjectForm
            isCreateUpdate={isCreateUpdate}
            setIsCreateUpdate={setIsCreateUpdate}
            objectToEdit={objectToEdit}
          />
        </div>
      ) : (
        <div className="mt-6">
          <ProjectCard
            projects={Array.isArray(projects?.data) ? projects.data : []}
            onEdit={handleEditClick}
            onView={handleView}
          />
        </div>
      )}
    </div>
  );
};

export default Projects;
