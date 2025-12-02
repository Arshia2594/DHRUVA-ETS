


import { useAuth } from "../../context/AuthContext";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

// Icons from react-icons
import { HiArrowLeft, HiPencil, HiLockClosed } from "react-icons/hi";

const baseURL = import.meta.env.VITE_BASE_API_URL.replace("/api", "");

const ProfilePage = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  if (loading || !user) {
    return (
      <div className="flex justify-center items-center h-[60vh] text-gray-500 text-lg">
        Loading profile...
      </div>
    );
  }

  const fullName = `${user.FirstName || ""} ${user.LastName || ""}`.trim();

  // ------- BUTTON HANDLERS --------
  const handleBack = () => navigate(-1);
  const handleEditProfile = () => navigate("/edit-profile");
  const handleChangePassword = () => navigate("/change-password");

  return (
    <div className="flex justify-center items-start md:items-center min-h-[90vh] p-6 md:p-10 bg-gray-50">

      {/* Back Button */}
      <button
        onClick={handleBack}
        className="absolute top-6 left-6 flex items-center gap-2 text-gray-600 hover:text-gray-900 transition"
      >
        <HiArrowLeft size={22} />
        <span className="font-medium text-sm md:text-base">Back</span>
      </button>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-3xl w-full bg-white shadow-lg rounded-2xl p-10 border border-gray-100"
      >
        {/* Top Profile Section */}
        <div className="flex items-center gap-6">
          <motion.img
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
            src={
              user.Photo
                ? `${baseURL}/uploads/${user.Photo}`
                : `https://ui-avatars.com/api/?name=${user.FirstName}+${user.LastName}`
            }
            alt="Profile"
            className="w-28 h-28 rounded-full object-cover border border-gray-300 shadow-sm"
          />

          <div>
            <h2 className="text-3xl font-bold text-gray-800">{fullName}</h2>
            <p className="text-green-700 text-sm mt-1">
              {user.Designation || "Employee"}
            </p>
            <p className="text-gray-500 text-sm">{user.Email}</p>
          </div>
        </div>

        <hr className="my-8" />

        {/* Info Grid */}
        <div className="grid md:grid-cols-2 gap-8 text-sm">
          <div>
            <p className="font-semibold text-gray-700">Email</p>
            <p className="text-gray-600">{user.Email}</p>
          </div>

          <div>
            <p className="font-semibold text-gray-700">Mobile</p>
            <p className="text-gray-600">{user.Mobile || "-"}</p>
          </div>

          <div>
            <p className="font-semibold text-gray-700">Role</p>
            <p className="text-gray-600 capitalize">{user.Role}</p>
          </div>

          <div>
            <p className="font-semibold text-gray-700">Joining Date</p>
            <p className="text-gray-600">{user.JoiningDate || "-"}</p>
          </div>
        </div>

        <hr className="my-8" />

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-4">
          <button
            onClick={handleEditProfile}
            className="px-5 py-2.5 bg-green-600 hover:bg-green-700 text-white rounded-xl shadow-sm transition-all flex items-center gap-2"
          >
            <HiPencil size={18} />
            Edit Profile
          </button>

          <button
            onClick={handleChangePassword}
            className="px-5 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl shadow-sm transition-all flex items-center gap-2"
          >
            <HiLockClosed size={18} />
            Change Password
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default ProfilePage;
