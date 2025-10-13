
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEdit } from "react-icons/fa";
import useAxios from "../../hooks/useAxios";
import useAuth from "../../hooks/useAuth";
import TeamForm from "../../components/common/TeamForm";

const Team = () => {
  const { auth } = useAuth();
  const navigate = useNavigate();
  const [isCreateUpdate, setIsCreateUpdate] = useState(false);
  const [objectToEdit, setObjectToEdit] = useState(null);
  const [endpoint, setEndpoint] = useState(null);

  useEffect(() => {
    if (auth?.empId) {
      setEndpoint(`/employee/manager/team/${auth.empId}`);
    }
  }, [auth?.empId]);

  const {
    data: apiResponse,
    loading,
    error,
    refetch,
  } = useAxios(endpoint, {}, !!endpoint, [endpoint]);

  const team = Array.isArray(apiResponse?.data)
    ? apiResponse.data
    : Array.isArray(apiResponse)
    ? apiResponse
    : [];

  const handleView = (empId, showTimeSheet = false) => {
    const role = auth?.role?.toLowerCase();
    navigate(`/${role}/team-details/${empId}`, {
      state: { isManager: role === "manager", showTimeSheet },
    });
  };

  const handleEditClick = (member) => {
    setObjectToEdit(member);
    setIsCreateUpdate(true);
  };

  if (loading) return <div className="p-6">Loading...</div>;
  if (error) return <div className="p-6 text-red-500">Error loading team</div>;

  return (
    <div className="p-6">
      {isCreateUpdate ? (
        <TeamForm
          objectToEdit={objectToEdit}
          setIsCreateUpdate={setIsCreateUpdate}
          refetch={refetch}
        />
      ) : (
        <>
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">
              My Team{" "}
              <span className="text-gray-500 text-base ml-2">
                ({team.length})
              </span>
            </h2>
          </div>

          {/* If team empty */}
          {team.length === 0 ? (
            <p className="text-gray-500 text-center mt-10">
              No team members assigned yet.
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {team.map((member) => {
                const imageUrl =
                  typeof member.Photo === "string" && member.Photo !== ""
                    ? `${import.meta.env.VITE_BASE_API_URL.replace(
                        "/api",
                        ""
                      )}/uploads/${member.Photo}`
                    : "/assets/images/team-1.jpg";

                // Define status colors & dot
                const statusColor =
                  member.Status === "Active"
                    ? "bg-green-500"
                    : member.Status === "Idle"
                    ? "bg-yellow-500"
                    : "bg-gray-400";

                return (
                  <div
                    key={member.EmpId}
                    onClick={() => handleView(member.EmpId, true)}
                    className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden flex flex-col transition transform hover:scale-105 hover:shadow-lg cursor-pointer"
                  >
                    {/* Header with Image & Status */}
                    <div className="flex items-center justify-between px-4 py-3 border-b dark:border-gray-700">
                      <div className="flex items-center">
                        <img
                          src={imageUrl}
                          alt={member.FirstName}
                          className="w-12 h-12 rounded-full mr-4 object-cover border-2 border-gray-300 dark:border-gray-600"
                        />
                        <div>
                          <h3 className="text-lg font-semibold text-gray-800 dark:text-white capitalize">
                            {member.FirstName} {member.LastName}
                          </h3>
                          <p className="text-sm text-gray-500 dark:text-gray-300 capitalize">
                            {member.department || "Department"} -{" "}
                            {member.Designation || "Designation"}
                          </p>
                        </div>
                      </div>

                      {/* Status Badge with Dot */}
                      <div className="flex items-center gap-1">
                        <span
                          className={`w-2.5 h-2.5 rounded-full ${statusColor}`}
                        ></span>
                        <span
                          className={`px-2 py-0.5 text-xs font-medium rounded-full ${
                            member.Status === "Active"
                              ? "bg-green-100 text-green-700"
                              : member.Status === "Idle"
                              ? "bg-yellow-100 text-yellow-700"
                              : "bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300"
                          }`}
                        >
                          {member.Status || "Unknown"}
                        </span>
                      </div>
                    </div>

                    {/* Card Body */}
                    <div className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300 space-y-1">
                      <p>
                        <strong>Email:</strong>{" "}
                        {member.Email || "Not Available"}
                      </p>
                      <p>
                        <strong>Joining:</strong>{" "}
                        {member.JoiningDate || "Not Available"}
                      </p>
                      <p>
                        <strong>Mobile:</strong>{" "}
                        {member.Mobile || "Not Available"}
                      </p>
                      <p>
                        <strong>Role:</strong>{" "}
                        {member.RoleInProject || "Not Assigned"}
                      </p>
                    </div>

                    {/* Footer Buttons */}
                    <div
                      className="px-4 py-3 border-t bg-gray-50 dark:bg-gray-700 dark:border-gray-600 flex justify-between"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <button
                        onClick={() => handleView(member.EmpId, false)}
                        className="text-sm text-blue-600 hover:text-blue-800 flex items-center gap-1 transition"
                      >
                        <FaEye /> View
                      </button>
                      <button
                        onClick={() => handleEditClick(member)}
                        className="text-sm text-purple-600 hover:text-purple-800 flex items-center gap-1 transition"
                      >
                        <FaEdit /> Edit
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Team;

