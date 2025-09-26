
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
    data: team = [],
    loading,
    error,
    refetch,
  } = useAxios(endpoint, {}, !!endpoint, [endpoint]);

  // const handleView = (empId) => {
  //   const role = auth?.role?.toLowerCase();
  //   navigate(`/${role}/team-details/${empId}`);
  // };

  const handleView = (empId,showTimeSheet=false) => {
  const role = auth?.role?.toLowerCase();
  navigate(`/${role}/team-details/${empId}`, 
    { state: { isManager: role === "manager" ,
      showTimeSheet,
    } });
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
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">
              My Team
            </h2>
            {/* <button
              onClick={handleAddClick}
              className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-medium px-4 py-2 rounded shadow-md transition duration-200"
            >
              <FaPlus /> Add Member
            </button> */}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {team.map((member) => {
              const imageUrl =
                typeof member.Photo === "string" && member.Photo !== ""
                  ? `${import.meta.env.VITE_BASE_API_URL.replace(
                      "/api",
                      ""
                    )}/uploads/${member.Photo}`
                  : "/assets/images/team-1.jpg";

              return (
                <div
                  key={member.EmpId}
                  onClick={()=>handleView(member.EmpId,true)}
                  className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden flex flex-col transition hover:shadow-lg"
                >
                  {/* Card Header with Image & Name */}
                  <div className="flex items-center px-4 py-3 border-b dark:border-gray-700">
                    <img
                      src={imageUrl}
                      alt={member.FirstName}
                      className="w-12 h-12 rounded-full mr-4 object-cover border-2 border-gray-300 dark:border-gray-600"
                      loading="lazy"
                    />
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800 dark:text-white capitalize">
                        {member.FirstName} {member.LastName}
                      </h3>
                      <p className="text-sm text-gray-500 dark:text-gray-300 capitalize">
                        {member.department} - {member.Designation}
                      </p>
                    </div>
                  </div>

                  {/* Card Body with Details */}
                  <div className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300 space-y-1">
                    <p>
                      <strong>Email:</strong> {member.Email}
                    </p>
                    <p>
                      <strong>Joining:</strong>{" "}
                      {member.JoiningDate || "Not Available"}
                    </p>
                    <p>
                      <strong>Mobile:</strong> {member.Mobile || "Not Available"}
                    </p>
                  </div>

                  {/* Card Footer with Actions */}
                  <div className="px-4 py-3 border-t bg-gray-50 dark:bg-gray-700 dark:border-gray-600 flex justify-between"
                      onClick={(e) => e.stopPropagation()} >
                    <button
                      onClick={() => handleView(member.EmpId,false)}
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
        </>
      )}
    </div>
  );
};

export default Team;

