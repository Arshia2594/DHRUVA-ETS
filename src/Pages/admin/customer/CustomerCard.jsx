
// // src/Pages/admin/customer/CustomerCard.jsx
// export default function CustomerCard({ customer, onEdit, onDelete }) {
//   return (
//     <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
//       <img
//         src={customer.image}
//         alt="customer"
//         className="w-20 h-20 rounded-full mx-auto"
//       />
//       <h3 className="text-lg font-semibold text-center mt-2">{customer.customername}</h3>
//       <p className="text-sm text-center text-gray-600 dark:text-gray-300">{customer.email}</p>
//       <p className="text-sm text-center text-gray-600 dark:text-gray-300">{customer.contact}</p>
//       <p className="text-xs text-center text-gray-500 dark:text-gray-400">{customer.address}</p>
//       <div className="flex justify-center gap-3 mt-3">
//         <button
//           onClick={() => onEdit(customer)}
//           className="text-blue-600 hover:underline text-sm"
//         >
//           Edit
//         </button>
//         <button
//           onClick={() => onDelete(customer.customer_id)}
//           className="text-red-600 hover:underline text-sm"
//         >
//           Delete
//         </button>
//       </div>
//     </div>
//   );
// }




export default function CustomerCard({ customer, onEdit, onDelete }) {
  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md text-center">
      <img
        src={customer.image}
        alt={customer.customername}
        className="w-20 h-20 rounded-full object-cover mx-auto"
        onError={(e) => {
          e.target.src = "/default-avatar.jpg"; // optional fallback
        }}
      />
      <h3 className="mt-2 font-semibold text-gray-800 dark:text-white">
        {customer.customername}
      </h3>
      <p className="text-sm text-gray-500 dark:text-gray-400">{customer.email}</p>
      <p className="text-sm text-gray-500 dark:text-gray-400">{customer.contact}</p>
      <p className="text-sm text-gray-500 dark:text-gray-400">{customer.address}</p>

      <div className="flex justify-center gap-4 mt-3 text-sm">
        <button
          onClick={() => onEdit(customer)}
          className="text-blue-600 hover:underline"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(customer.customer_id)}
          className="text-red-600 hover:underline"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
