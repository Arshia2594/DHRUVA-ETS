

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

  // const projects = useAxios(
  //   API,
  //   { params: { _limit: 5 } },
  //   true,
  //   [isCreateUpdate]
  // );

  const projects = useAxios(
  API,
  {
    params:
      auth.role === "Admin"
        ? {} // Don't send department if admin
        : { department: auth?.department }, // Only for manager/user
  },
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
