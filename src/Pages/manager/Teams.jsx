
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaEye, FaPlus, FaEdit } from "react-icons/fa";
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

  const { data: team = [], loading, error, refetch } = useAxios(endpoint, {}, !!endpoint, [endpoint]);

  const handleView = (empId) => {
    const role = auth?.role?.toLowerCase();
    navigate(`/${role}/team-details/${empId}`);
  };

  const handleAddClick = () => {
    setObjectToEdit(null);
    setIsCreateUpdate(true);
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
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">My Team</h2>
            <button
              onClick={handleAddClick}
              className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-medium px-4 py-2 rounded shadow-md"
            >
              <FaPlus /> Add Member
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {team.map((member) => (
              <div key={member.EmpId} className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden flex flex-col">
                <div className="flex items-center px-4 py-3 border-b">
                  <img

                    src={
                      member.Photo
                        ? `${import.meta.env.VITE_BASE_API_URL.replace('/api', '')}/uploads/${member.Photo}`
                        : "/assets/images/avatar-default.png"
                    }
                    alt={member.FirstName}
                     className="w-10 h-10 rounded-full mr-3"
                  />


                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                      {member.FirstName} {member.LastName}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-300">
                      {member.department} - {member.Designation}
                    </p>
                  </div>
                </div>

                <div className="px-4 py-3">
                  <p className="text-sm text-gray-600">Email: {member.Email}</p>
                  <p className="text-sm text-gray-600">Joining: {member.JoiningDate || "-"}</p>
                  <p className="text-sm text-gray-600">Mobile: {member.Mobile || "-"}</p>
                </div>

                <div className="px-4 py-3 border-t flex justify-between bg-gray-50 dark:bg-gray-700">
                  <button onClick={() => handleView(member.EmpId)} className="text-sm text-blue-600 flex items-center gap-1">
                    <FaEye /> View
                  </button>
                  <button onClick={() => handleEditClick(member)} className="text-sm text-purple-600 flex items-center gap-1">
                    <FaEdit /> Edit
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Team;
