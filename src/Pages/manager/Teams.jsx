
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEdit, FaSearch } from "react-icons/fa";
import useAxios from "../../hooks/useAxios";
import useAuth from "../../hooks/useAuth";
import TeamForm from "../../components/common/TeamForm";

const Team = () => {
  const { auth } = useAuth();
  const navigate = useNavigate();
  const [isCreateUpdate, setIsCreateUpdate] = useState(false);
  const [objectToEdit, setObjectToEdit] = useState(null);
  const [endpoint, setEndpoint] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  useEffect(() => {
    if (auth?.empId) {
      setEndpoint(`/employee/manager/team/${auth.empId}`);
    }
  }, [auth?.empId]);

  const { data: apiResponse, loading, error, refetch } = useAxios(endpoint, {}, !!endpoint, [endpoint]);
  const [teamData, setTeamData] = useState([]);

  useEffect(() => {
    if (Array.isArray(apiResponse?.data)) {
      setTeamData(apiResponse.data);
    }
  }, [apiResponse]);

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

  // Filter logic (Search + Status)
  const filteredTeam = teamData.filter((member) => {
    const matchesSearch =
      member.FirstName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.LastName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.Email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.department?.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = statusFilter === "All" || member.Status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  if (loading) return <div className="p-6">Loading...</div>;
  if (error) return <div className="p-6 text-red-500">Error loading team</div>;

  return (
    <div className="p-6">
      {isCreateUpdate ? (
       <TeamForm
  objectToEdit={objectToEdit}
  setIsCreateUpdate={setIsCreateUpdate}
  refetch={refetch}
  onUpdateLocal={(updatedEmp) => {
    setTeamData((prev) =>
      prev.map((emp) =>
        emp.EmpId === updatedEmp.EmpId ? { ...emp, ...updatedEmp } : emp
      )
    );
  }}
/>

      ) : (
        <>
          {/* Header Section */}
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">My Team</h2>

            {/* Search + Filter */}
            <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
              <div className="relative">
                <FaSearch className="absolute left-3 top-3 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by name, email..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white dark:border-gray-700"
                />
              </div>

              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white dark:border-gray-700"
              >
                <option value="All">All Status</option>
                <option value="Active">Active</option>
                <option value="Idle">Idle</option>
              </select>
            </div>
          </div>

          {/* Team Cards */}
          {filteredTeam.length === 0 ? (
            <p className="text-gray-500 dark:text-gray-300 text-center py-8">
              No team members found.
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredTeam.map((member) => {
                const imageUrl =
                  typeof member.Photo === "string" && member.Photo !== ""
                    ? `${import.meta.env.VITE_BASE_API_URL.replace("/api", "")}/uploads/${member.Photo}`
                    : "/assets/images/team-1.jpg";

                const statusColor =
                  member.Status === "Active"
                    ? "bg-green-100 text-green-700"
                    : "bg-yellow-100 text-yellow-700";

                return (
                  <div
                    key={member.EmpId}
                    onClick={() => handleView(member.EmpId, true)}
                    className="bg-white dark:bg-gray-800 rounded-2xl shadow-md overflow-hidden flex flex-col h-full transition-transform duration-200 hover:scale-[1.03] hover:shadow-xl cursor-pointer"
                  >
                    {/* Card Header */}
                    <div className="flex items-center justify-between px-4 pt-4">
                      <div className="flex items-center gap-3">
                        <div className="relative">
                          <img
                            src={imageUrl}
                            alt={member.FirstName}
                            className="w-14 h-14 rounded-full object-cover border-2 border-gray-200 dark:border-gray-700"
                          />
                        </div>
                        <div>
                          <h3 className="text-base font-semibold text-gray-800 dark:text-white capitalize">
                            {member.FirstName} {member.LastName}
                          </h3>
                          <p className="text-sm text-gray-500 dark:text-gray-300 capitalize">
                            {member.department} - {member.Designation}
                          </p>
                        </div>
                      </div>

                      {/* Status Badge */}
                      <span
                        className={`px-3 py-1 text-xs font-medium rounded-full ${statusColor}`}
                      >
                        {member.Status || "Unknown"}
                      </span>
                    </div>

                    {/* Card Body */}
                    <div className="px-4 py-3 mt-1 text-sm text-gray-700 dark:text-gray-300 space-y-1">
                      <p><strong>Email:</strong> {member.Email}</p>
                      <p><strong>Joining:</strong> {member.JoiningDate || "Not Available"}</p>
                      <p><strong>Mobile:</strong> {member.Mobile || "Not Available"}</p>
                    </div>

                    {/* Footer */}
                    <div
                      className="mt-auto px-4 py-3 border-t bg-gray-50 dark:bg-gray-700 dark:border-gray-600 flex justify-between"
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

