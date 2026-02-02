import React from "react";

export const teamColumns = [
  {
    headerName: "Employee",
    render: (row) => (
      <div className="flex items-center gap-3">
        <img
          src={row.avatar || "https://i.pravatar.cc/40"}
          alt={row.name}
          className="h-9 w-9 rounded-full object-cover"
        />
        <div>
          <p className="font-medium text-gray-900">{row.name}</p>
          <p className="text-xs text-gray-500">
            Joined {row.joinedDate}
          </p>
        </div>
      </div>
    ),
  },
  { headerName: "Email", field: "email" },
  { headerName: "Designation", field: "designation" },
  { headerName: "Phone", field: "phone" },
  {
    headerName: "Status",
    field: "status",
  },
];
