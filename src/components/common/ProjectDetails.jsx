// import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import axiosInstance from "../../components/common/AxiosInstance";

// const ProjectDetails = () => {
//   const { id } = useParams();
//   const [project, setProject] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchProject = async () => {
//       try {
//         const res = await axiosInstance.get(`/projects/${id}`);
//         setProject(res.data?.data || res.data);
//       } catch (err) {
//         console.error(err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProject();
//   }, [id]);

//   if (loading) return <p>Loading...</p>;
//   if (!project) return <p>Project not found.</p>;

//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4">{project.name}</h1>
//       <p><strong>Description:</strong> {project.description}</p>
//       <p><strong>Start Date:</strong> {project.startDate}</p>
//       <p><strong>End Date:</strong> {project.endDate}</p>
//       <p><strong>Status:</strong> {project.status}</p>
//       {/* Add more fields as needed */}
//     </div>
//   );
// };

// export default ProjectDetails;

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../../components/common/AxiosInstance";
import dayjs from "dayjs";

const ProjectDetails = () => {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!id) {
      setError("Invalid project ID.");
      setLoading(false);
      return;
    }

    const fetchProject = async () => {
      try {
        const res = await axiosInstance.get(`/projects/${id}`);
        // Ensure data exists
        if (res.data?.data || res.data) {
          setProject(res.data?.data || res.data);
        } else {
          setError("Project not found.");
        }
      } catch (err) {
        console.error("API Error:", err);
        setError(
          err.response?.data?.message ||
            "Failed to fetch project details. Please try again."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [id]);

  if (loading)
    return <p className="p-6 text-gray-500">Loading project details...</p>;

  if (error)
    return (
      <p className="p-6 text-red-600 font-semibold">{error}</p>
    );

  return (
    <div className="p-6 bg-white dark:bg-gray-800 rounded shadow-md">
      <h1 className="text-3xl font-bold mb-4 text-gray-900 dark:text-gray-100">
        {project.name || "No Name"}
      </h1>

      <div className="space-y-2 text-gray-700 dark:text-gray-200">
        <p>
          <strong>Description:</strong> {project.description || "N/A"}
        </p>
        <p>
          <strong>Start Date:</strong>{" "}
          {project.startDate ? dayjs(project.startDate).format("DD MMM YYYY") : "N/A"}
        </p>
        <p>
          <strong>End Date:</strong>{" "}
          {project.endDate ? dayjs(project.endDate).format("DD MMM YYYY") : "N/A"}
        </p>
        <p>
          <strong>Status:</strong> {project.status || "N/A"}
        </p>

        {/* Example additional fields */}
        {project.manager && (
          <p>
            <strong>Project Manager:</strong> {project.manager}
          </p>
        )}
        {project.team && (
          <p>
            <strong>Team:</strong> {project.team.join(", ")}
          </p>
        )}
      </div>
    </div>
  );
};

export default ProjectDetails;

