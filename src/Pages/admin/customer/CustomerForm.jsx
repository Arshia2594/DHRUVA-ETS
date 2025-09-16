
// import { useEffect, useState } from "react";
// import { FiPlus } from "react-icons/fi";
// import avatar1 from "../../../assets/images/team-1.jpg";
// import avatar2 from "../../../assets/images/team-2.jpg";
// import axiosInstance from "../../../components/common/AxiosInstance";
// import CustomerCard from "./CustomerCard";

// export default function CustomerForm() {
//   const [customers, setCustomers] = useState([]);
//   const [isFormOpen, setIsFormOpen] = useState(false);
//   const [formData, setFormData] = useState({
//     customer_id: "",
//     customername: "",
//     email: "",
//     contact: "",
//     address: "",
//   });
//   const [searchQuery, setSearchQuery] = useState("");

//   // ✅ Fetch all customers
//   useEffect(() => {
//     const getAllCustomerDetails = async () => {
//       try {
//         const response = await axiosInstance.get(`/customer/get_allCustomerDetails`);
//         const enrichedCustomer = response?.data?.data?.map((customer, index) => ({
//           ...customer,
//           image: customer.image || (index % 2 === 0 ? avatar1 : avatar2),
//         }));
//         setCustomers(enrichedCustomer || []);
//       } catch (error) {
//         console.error("Fetching customer details failed:", error);
//         setCustomers([]);
//       }
//     };

//     getAllCustomerDetails();
//   }, []);

//   // ✅ Search logic with safety
//   const filteredCustomers = customers.filter((customer) =>
//     (customer?.customername || "")
//       .toLowerCase()
//       .includes(searchQuery.toLowerCase())
//   );

//   const handleDeleteCustomer = (id) => {
//     setCustomers((prev) => prev.filter((customer) => customer.customer_id !== id));
//   };

//   const handleEditCustomer = (customer) => {
//     setFormData({ ...customer });
//     setIsFormOpen(true);
//   };

//   const handleCloseForm = () => {
//     setIsFormOpen(false);
//     setFormData({
//       customer_id: "",
//       customername: "",
//       email: "",
//       contact: "",
//       address: "",
//     });
//   };

//   const handleSearchChange = (e) => {
//     setSearchQuery(e.target.value);
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleOpenForm = () => {
//     setFormData({
//       customer_id: "",
//       customername: "",
//       email: "",
//       contact: "",
//       address: "",
//     });
//     setIsFormOpen(true);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (formData.customername && formData.email && formData.contact && formData.address) {
//       if (formData.customer_id) {
//         // ✅ Update customer
//         try {
//           await axiosInstance.put(
//             `/customer/updatedCustomerDetails?customer_id=${formData.customer_id}`,
//             formData
//           );
//           setCustomers((prev) =>
//             prev.map((customer) =>
//               customer.customer_id === formData.customer_id
//                 ? { ...customer, ...formData }
//                 : customer
//             )
//           );
//         } catch (error) {
//           console.error("Error updating customer:", error);
//         }
//       } else {
//         // ✅ Add new customer
//         try {
//           const { customer_id, ...newCustomerData } = formData;
//           const response = await axiosInstance.post(
//             `/customer/create-customerDetails`,
//             newCustomerData
//           );
//           const newCustomer = {
//             ...response?.data?.data,
//             image: customers.length % 2 === 0 ? avatar1 : avatar2,
//           };
//           setCustomers((prev) => [...prev, newCustomer]);
//         } catch (error) {
//           console.error("Error creating new customer:", error);
//         }
//       }
//       handleCloseForm();
//     }
//   };

//   return (
//     <div className="p-6">
//       <h2 className="text-2xl font-semibold text-gray-700 dark:text-white mb-4">
//         Customer Details
//       </h2>

//       <div className="flex justify-between items-center mb-4">
//         <input
//           type="text"
//           placeholder="Search"
//           className="w-52 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-800 dark:text-white"
//           onChange={handleSearchChange}
//         />
//         <button
//           onClick={handleOpenForm}
//           className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
//         >
//           <FiPlus /> New Customer
//         </button>
//       </div>

//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
//         {filteredCustomers.length > 0 ? (
//           filteredCustomers.map((customer) => (
//             <CustomerCard
//               key={customer.customer_id}
//               customer={customer}
//               onEdit={handleEditCustomer}
//               onDelete={handleDeleteCustomer}
//             />
//           ))
//         ) : (
//           <p className="col-span-full text-center text-gray-500">No Customer Found</p>
//         )}
//       </div>

//       {/* ✅ Modal Form */}
//       {isFormOpen && (
//         <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
//           <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md">
//             <h3 className="text-xl font-bold mb-4 text-center">
//               {formData.customer_id ? "Edit Customer Details" : "Add Customer Details"}
//             </h3>
//             <form onSubmit={handleSubmit} className="space-y-4">
//               <input
//                 type="text"
//                 name="customername"
//                 value={formData.customername}
//                 onChange={handleChange}
//                 placeholder="Customer Name"
//                 className="w-full px-4 py-2 border rounded-md dark:bg-gray-700 dark:text-white"
//                 required
//               />
//               <input
//                 type="text"
//                 name="address"
//                 value={formData.address}
//                 onChange={handleChange}
//                 placeholder="Address"
//                 className="w-full px-4 py-2 border rounded-md dark:bg-gray-700 dark:text-white"
//                 required
//               />
//               <div className="flex gap-4">
//                 <input
//                   type="text"
//                   name="contact"
//                   value={formData.contact}
//                   onChange={handleChange}
//                   placeholder="Mobile"
//                   className="w-full px-4 py-2 border rounded-md dark:bg-gray-700 dark:text-white"
//                   required
//                 />
//                 <input
//                   type="email"
//                   name="email"
//                   value={formData.email}
//                   onChange={handleChange}
//                   placeholder="Email"
//                   className="w-full px-4 py-2 border rounded-md dark:bg-gray-700 dark:text-white"
//                   required
//                 />
//               </div>
//               <div className="flex justify-end gap-3 mt-4">
//                 <button
//                   type="button"
//                   onClick={handleCloseForm}
//                   className="px-4 py-2 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-100 dark:text-white dark:border-gray-600"
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   type="submit"
//                   className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
//                 >
//                   {formData.customer_id ? "UPDATE" : "ADD"}
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }
// src/Pages/admin/customer/CustomerFormModal.jsx
import { useState, useEffect } from "react";
 import axiosInstance from "../../../components/common/AxiosInstance";
// import axiosInstance from "../../../components/common/AxiosInstance";


export default function CustomerFormModal({ onClose, onSave, editData }) {
  const [form, setForm] = useState({
    customername: "",
    email: "",
    contact: "",
    address: "",
  });

  useEffect(() => {
    if (editData) {
      setForm(editData);
    }
  }, [editData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editData) {
        const res = await axiosInstance.put(
          `/customer/updatedCustomerDetails?customer_id=${editData.customer_id}`,
          form
        );
        onSave(res.data.data);
      } else {
        const res = await axiosInstance.post(`/customer/create-customerDetails`, form);
        onSave(res.data.data);
      }
    } catch (err) {
      console.error("Error saving customer:", err);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white dark:bg-gray-900 rounded-lg p-6 w-full max-w-md">
        <h3 className="text-xl font-bold mb-4 text-center">
          {editData ? "Edit Customer" : "Add New Customer"}
        </h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="customername"
            placeholder="Customer Name"
            value={form.customername}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md dark:bg-gray-800 dark:text-white"
            required
          />
          <input
            name="address"
            placeholder="Address"
            value={form.address}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md dark:bg-gray-800 dark:text-white"
            required
          />
         
            <input
              name="contact"
              placeholder="Mobile"
              value={form.contact}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md dark:bg-gray-800 dark:text-white"
              required
            />
            <input
              name="email"
              type="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md dark:bg-gray-800 dark:text-white"
              required
            />
         
          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border rounded-md text-gray-700 hover:bg-gray-100 dark:text-white dark:border-gray-600"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
            >
              {editData ? "Update" : "Add"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
