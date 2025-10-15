

import { useState, useEffect } from "react";
import axiosInstance from "./AxiosInstance";
import FilterDatePicker from "./FilterDatePicker";

const TeamForm = ({ objectToEdit, setIsCreateUpdate, refetch, onUpdateLocal }) => {
  const [formData, setFormData] = useState({
    FirstName: "",
    LastName: "",
    Email: "",
    Mobile: "",
    JoiningDate: "",
    Department: "",
    Designation: "",
    Role: "",
    UserName: "",
    Password: "",
    Status: "Active",
    Photo: null,
  });

  const [photoFile, setPhotoFile] = useState(null);
  const [isEdit, setIsEdit] = useState(false);
  const [departments, setDepartments] = useState([]); //  dynamic department list

  //  Fetch Departments from backend
  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const res = await axiosInstance.get("/department/get-departments");
        if (res.status === 200 && Array.isArray(res.data.data)) {
          setDepartments(res.data.data);
        }
      } catch (err) {
        console.error("Failed to load departments:", err);
      }
    };
    fetchDepartments();
  }, []);

  // Populate form when editing
  useEffect(() => {
    if (objectToEdit) {
      setIsEdit(true);
      setFormData({
        FirstName: objectToEdit.FirstName || "",
        LastName: objectToEdit.LastName || "",
        Email: objectToEdit.Email || "",
        Mobile: objectToEdit.Mobile || "",
        JoiningDate: objectToEdit.JoiningDate || "",
        Department: objectToEdit.Department || "",
        Designation: objectToEdit.Designation || "",
        Role: objectToEdit.Role || "",
        UserName: objectToEdit.UserName || "",
        Password: "",
        Status: objectToEdit.Status || "Active",
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
        Department: "",
        Designation: "",
        Role: "",
        UserName: "",
        Password: "",
        Status: "Active",
        Photo: null,
      });
      setPhotoFile(null);
    }
  }, [objectToEdit]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  //  Handle file selection
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setPhotoFile(file);
  };

  //  Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    const requiredFields = [
      "FirstName",
      "LastName",
      "Email",
      "Mobile",
      "JoiningDate",
      "Department",
      "Designation",
      "Role",
      "UserName",
    ];

    for (let field of requiredFields) {
      const value = formData[field];
      if (value === null || value === undefined || String(value).trim() === "") {
        alert(`The field "${field}" is required.`);
        return;
      }
    }

    if (!isEdit && (!formData.Password || formData.Password.trim() === "")) {
      alert("Password is required for new users.");
      return;
    }

    try {
      const data = new FormData();
      for (const key in formData) {
        if (formData[key] !== null && formData[key] !== undefined) {
          data.append(key, formData[key]);
        }
      }
      if (photoFile) {
        data.append("Photo", photoFile);
      }

      if (isEdit) {
        const response = await axiosInstance.put(
          `/employee/editUser/${objectToEdit.EmpId}`,
          data,
          { headers: { "Content-Type": "multipart/form-data" } }
        );

        if (response.status === 200 && response.data) {
          const updatedEmployee = { ...objectToEdit, ...formData };
          if (onUpdateLocal) onUpdateLocal(updatedEmployee);
          alert("Employee updated successfully!");
        }
      }
    } catch (err) {
      console.error("Error saving employee:", err);
      alert("Error saving employee. Check console for details.");
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 shadow-md rounded-2xl p-8 max-w-3xl mx-auto">
      <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-6 border-b pb-2">
        {isEdit ? "Edit Team Member" : "Add Team Member"}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Personal Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InputField label="First Name" name="FirstName" value={formData.FirstName} onChange={handleChange} />
          <InputField label="Last Name" name="LastName" value={formData.LastName} onChange={handleChange} />
          <InputField label="Email" name="Email" type="email" value={formData.Email} onChange={handleChange} />
          <InputField label="Mobile" name="Mobile" value={formData.Mobile} onChange={handleChange} />

          {/*  Fixed Joining Date (Now Visible) */}
          <div>
            <label className="block font-medium mb-1 text-gray-700 dark:text-gray-200">
              Joining Date
            </label>
            <FilterDatePicker
              name="JoiningDate"
              value={formData.JoiningDate ? new Date(formData.JoiningDate) : null}
              onChange={(date) =>
                setFormData((prev) => ({
                  ...prev,
                  JoiningDate: date ? date.toISOString() : "",
                }))
              }
            />
          </div>

          {/*  Employee Status */}
          <div>
            <label className="block font-medium mb-1 text-gray-700 dark:text-gray-200">
              Employee Status
            </label>
            <select
              name="Status"
              value={formData.Status}
              onChange={handleChange}
              className={`border border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-white p-2 rounded w-full font-semibold ${
                formData.Status === "Active" ? "text-green-600" : "text-yellow-600"
              }`}
            >
              <option value="Active">Active</option>
              <option value="Idle">Idle</option>
            </select>
          </div>

          {/*  Dynamic Department Dropdown */}
          <div>
            <label className="block font-medium mb-1 text-gray-700 dark:text-gray-200">
              Department
            </label>
            <select
              name="Department"
              value={formData.Department}
              onChange={handleChange}
              className="border border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-white p-2 rounded w-full"
            >
              <option value="">Select Department</option>
              {departments.length > 0 ? (
                departments.map((dept) => (
                  <option key={dept.Id} value={dept.DepartmentName}>
                    {dept.DepartmentName}
                  </option>
                ))
              ) : (
                <option disabled>Loading...</option>
              )}
            </select>
          </div>

          <SelectField
            label="Designation"
            name="Designation"
            value={formData.Designation}
            onChange={handleChange}
            options={["Project Engineer", "Software Tester", "Project Manager", "Team Lead"]}
          />

          <SelectField
            label="Role"
            name="Role"
            value={formData.Role}
            onChange={handleChange}
            options={["User", "Manager", "Admin"]}
          />

          <InputField label="Username" name="UserName" value={formData.UserName} onChange={handleChange} />
          {!isEdit && (
            <InputField
              label="Password"
              name="Password"
              type="password"
              value={formData.Password}
              onChange={handleChange}
            />
          )}
        </div>

        {/*  Photo Upload */}
        <div>
          <label className="block font-medium mb-1 text-gray-700 dark:text-gray-200">
            Profile Photo
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="border border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-white p-2 rounded w-full"
          />
          {(photoFile || formData.Photo) && (
            <img
              src={
                photoFile
                  ? URL.createObjectURL(photoFile)
                  : `${import.meta.env.VITE_BASE_API_URL.replace("/api", "")}/uploads/${formData.Photo}`
              }
              alt="Profile"
              className="w-24 h-24 mt-2 rounded-lg object-cover border border-gray-300"
            />
          )}
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-4 mt-6">
          <button
            type="button"
            onClick={() => setIsCreateUpdate(false)}
            className="bg-gray-400 hover:bg-gray-500 text-white px-5 py-2 rounded-lg"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-green-700 hover:bg-green-800 text-white px-5 py-2 rounded-lg"
          >
            {isEdit ? "Update" : "Save"}
          </button>
        </div>
      </form>
    </div>
  );
};

//  Reusable input component
const InputField = ({ label, name, value, onChange, type = "text" }) => (
  <div>
    <label className="block font-medium mb-1 text-gray-700 dark:text-gray-200">{label}</label>
    <input
      name={name}
      value={value}
      onChange={onChange}
      type={type}
      placeholder={label}
      className="border border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-white p-2 rounded w-full"
    />
  </div>
);

// Reusable select component
const SelectField = ({ label, name, value, onChange, options }) => (
  <div>
    <label className="block font-medium mb-1 text-gray-700 dark:text-gray-200">{label}</label>
    <select
      name={name}
      value={value}
      onChange={onChange}
      className="border border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-white p-2 rounded w-full"
    >
      <option value="">Select {label}</option>
      {options.map((opt) => (
        <option key={opt} value={opt}>
          {opt}
        </option>
      ))}
    </select>
  </div>
);

export default TeamForm;
