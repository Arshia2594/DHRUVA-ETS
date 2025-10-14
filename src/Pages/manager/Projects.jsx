

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

   if (!auth) return null; 
  const [isCreateUpdate, setIsCreateUpdate] = useState(false);
  const [objectToEdit, setObjectToEdit] = useState(null);

  //  API selection based on role
  const API =
    auth.role === "Manager"
      ? GET_PROJECTS_BY_MANAGER_ID
      : auth.role === "User"
      ? GET_PROJECTS_BY_USER_ID
      : GET_ALL_PROJECTS_DETAILS;

  //  Fetch projects
  const projects = useAxios(
    API,
    {
      params:
        auth.role === "Admin"
          ? {}
          : { department: auth?.department },
    },
    true,
    [isCreateUpdate]
  );

  //  Add button handler
  const handleAddClick = () => {
    console.log("Add button clicked"); // test log
    setObjectToEdit(null);
    setIsCreateUpdate(true);
  };

  //  Edit button handler
  const handleEditClick = (project) => {
    setObjectToEdit(project);
    setIsCreateUpdate(true);
  };

  //  View details handler
  const handleView = (projectId) => {
    const role = auth?.role?.toLowerCase();
    navigate(`/${role}/project-details/${projectId}`);
  };

  return (
    <div className="p-6">
      {/*  Header with Add Project button */}
      <HeaderTitle
  title="Project Details"
  buttons={[
    {
      label: "Add Project",
      onClick: () => {
        console.log("Add Project clicked ");
        setObjectToEdit(null);
        setIsCreateUpdate(true);
      },
      variant: "success",
    },
  ]}
/>


      {/*  Conditional rendering */}
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
