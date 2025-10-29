

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

  const API =
    auth.role === "Manager"
      ? GET_PROJECTS_BY_MANAGER_ID
      : auth.role === "User"
      ? GET_PROJECTS_BY_USER_ID
      : GET_ALL_PROJECTS_DETAILS;

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

  const handleAddClick = () => {
    setObjectToEdit(null);
    setIsCreateUpdate(true);
  };

  const handleEditClick = (project) => {
    setObjectToEdit(project);
    setIsCreateUpdate(true);
  };

  const handleView = (projectId) => {
    const role = auth?.role?.toLowerCase();
    navigate(`/${role}/project-details/${projectId}`);
  };

  return (
    <div className="p-6 min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-950 transition-colors duration-500">
      <div className="max-w-7xl mx-auto">
        {/* Page Header */}
        <HeaderTitle
          title="Projects Overview"
          subtitle="View, manage, and track all active projects"
          buttons={[
            {
              label: "Add New Project",
              onClick: handleAddClick,
              variant: "success",
            },
          ]}
        />

        {/* Content */}
        <div className="mt-8">
          {isCreateUpdate ? (
            <ProjectForm
              isCreateUpdate={isCreateUpdate}
              setIsCreateUpdate={setIsCreateUpdate}
              objectToEdit={objectToEdit}
            />
          ) : (
            <div className="animate-fadeIn">
              <ProjectCard
                projects={Array.isArray(projects?.data) ? projects.data : []}
                onEdit={handleEditClick}
                onView={handleView}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Projects;

