import { useAuth } from "../../context/AuthContext";


const ProfilePage = () => {
  const { user } = useAuth(); 
  // Make sure your auth hook returns user details

  return (
    <div className="p-6 md:p-10">
      <div className="max-w-4xl mx-auto bg-white shadow-sm rounded-xl p-8">

        {/* Top Profile Section */}
        <div className="flex items-center gap-6">
          <img
            src={user?.photo || "https://ui-avatars.com/api/?name=" + user?.name}
            alt="Profile"
            className="w-24 h-24 rounded-full object-cover border"
          />
          <div>
            <h2 className="text-2xl font-semibold text-gray-800">{user?.name}</h2>
            <p className="text-green-600 text-sm">{user?.designation || "Employee"}</p>
            <p className="text-gray-500 text-sm">{user?.email}</p>
          </div>
        </div>

        <hr className="my-6" />

        {/* Info Grid */}
        <div className="grid md:grid-cols-2 gap-6 text-sm">
          <div>
            <p className="font-semibold text-gray-700">Email</p>
            <p className="text-gray-600">{user?.email}</p>
          </div>

          <div>
            <p className="font-semibold text-gray-700">Mobile</p>
            <p className="text-gray-600">{user?.mobile || "-"}</p>
          </div>

          <div>
            <p className="font-semibold text-gray-700">Role</p>
            <p className="text-gray-600 capitalize">{user?.role}</p>
          </div>

          <div>
            <p className="font-semibold text-gray-700">Joining Date</p>
            <p className="text-gray-600">{user?.joiningDate || "-"}</p>
          </div>
        </div>

        <hr className="my-6" />

        {/* Bottom Actions */}
        <div className="flex gap-4">
          <button className="px-4 py-2 bg-green-600 text-white rounded-lg">
            Edit Profile
          </button>
          <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg">
            Change Password
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
