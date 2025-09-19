
import { useState, useEffect } from "react";
import axiosInstance from "./AxiosInstance";

const TeamForm = ({ objectToEdit, setIsCreateUpdate, refetch }) => {
  const [formData, setFormData] = useState({
    FirstName: "",
    LastName: "",
    Email: "",
    Mobile: "",
    JoiningDate: "",
    department: "",
    Designation: "",
    Role: "",
    UserName: "",
    Password: "",
    Photo: null,
  });

  const [photoFile, setPhotoFile] = useState(null);
  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    if (objectToEdit) {
      setIsEdit(true);
      setFormData({
        ...objectToEdit,
        Photo: objectToEdit.Photo || null,
      });
    } else {
      setIsEdit(false);
      setFormData({
        FirstName: "",
        LastName: "",
        Email: "",
        Mobile: "",
        JoiningDate: "",
        department: "",
        Designation: "",
        Role: "",
        UserName: "",
        Password: "",
        Photo: null,
      });
      setPhotoFile(null);
    }
  }, [objectToEdit]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setPhotoFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    //  Validation
    const requiredFields = [
      "FirstName",
      "LastName",
      "Email",
      "Mobile",
      "JoiningDate",
      "department",
      "Designation",
      "Role",
      "UserName",
    ];

    for (let field of requiredFields) {
      if (!formData[field] || formData[field].toString().trim() === "") {
        alert(`The field "${field}" is necessary.`);
        return;
      }
    }

    if (!isEdit && (!formData.Password || formData.Password.trim() === "")) {
      alert("Password is necessary for new user.");
      return;
    }

    //  FormData setup
    try {
      const data = new FormData();
      for (const key in formData) {
        if (formData[key] !== null) {
          data.append(key, formData[key].toString());
        }
      }

      if (photoFile) {
        data.append("Photo", photoFile);
      } else if (formData.Photo) {
        data.append("Photo", formData.Photo); // existing filename
      }

      //  API call
      if (isEdit) {
        await axiosInstance.put(
          `/employee/editUser/${objectToEdit.EmpId}`,
          data,
          { headers: { "Content-Type": "multipart/form-data" } }
        );
      } else {
        await axiosInstance.post("/employee/addUser", data, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }

      refetch();
      setIsCreateUpdate(false);
    } catch (err) {
      console.error("❌ Error saving employee:", err);
    }
  };

  return (
    <div className="bg-white shadow-md rounded-xl p-6 max-w-2xl mx-auto">
      <h2 className="text-xl font-semibold mb-4">
        {isEdit ? "Edit Team Member" : "Add Team Member"}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <input
            name="FirstName"
            value={formData.FirstName}
            onChange={handleChange}
            placeholder="First Name"
            className="border p-2 rounded"
          />
          <input
            name="LastName"
            value={formData.LastName}
            onChange={handleChange}
            placeholder="Last Name"
            className="border p-2 rounded"
          />
          <input
            name="Email"
            type="email"
            value={formData.Email}
            onChange={handleChange}
            placeholder="Email"
            className="border p-2 rounded"
          />
          <input
            name="Mobile"
            value={formData.Mobile}
            onChange={handleChange}
            placeholder="Mobile"
            className="border p-2 rounded"
          />
          <input
            name="JoiningDate"
            type="date"
            value={formData.JoiningDate || ""}
            onChange={handleChange}
            className="border p-2 rounded"
          />
          <input
            name="department"
            value={formData.department}
            onChange={handleChange}
            placeholder="Department"
            className="border p-2 rounded"
          />
          <input
            name="Designation"
            value={formData.Designation}
            onChange={handleChange}
            placeholder="Designation"
            className="border p-2 rounded"
          />
          <select
            name="Role"
            value={formData.Role}
            onChange={handleChange}
            className="border p-2 rounded"
          >
            <option value="">Select Role</option>
            <option value="User">User</option>
            <option value="Admin">Admin</option>
            <option value="Manager">Manager</option>
          </select>
          <input
            name="UserName"
            value={formData.UserName}
            onChange={handleChange}
            placeholder="Username"
            className="border p-2 rounded"
          />
          {!isEdit && (
            <input
              name="Password"
              type="password"
              value={formData.Password}
              onChange={handleChange}
              placeholder="Password"
              className="border p-2 rounded"
            />
          )}
        </div>

        <div>
          <label className="block font-medium">Photo</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="mt-1"
          />

          {formData.Photo && typeof formData.Photo === "string" && (
            <img
              src={`${import.meta.env.VITE_BASE_API_URL.replace(
                "/api",
                ""
              )}/uploads/${formData.Photo}`}
              alt="Current"
              className="w-24 h-24 mt-2 rounded-lg object-cover"
            />
          )}
        </div>

        <div className="flex gap-4 mt-4">
          <button
            type="submit"
            className="bg-green-700 text-white px-4 py-2 rounded hover:bg-green-800"
          >
            {isEdit ? "Update" : "Save"}
          </button>
          <button
            type="button"
            onClick={() => setIsCreateUpdate(false)}
            className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default TeamForm;
