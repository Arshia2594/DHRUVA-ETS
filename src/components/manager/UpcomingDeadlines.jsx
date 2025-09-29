import React from "react";
import {
  MdEventAvailable,
  MdError,
  MdAccessTime,
  MdCheckCircle,
} from "react-icons/md";

export default function UpcomingDeadlines({ projects }) {
  if (!projects || projects.length === 0) {
    return (
      <div className="p-4 border rounded-lg shadow-sm text-center text-gray-500 flex items-center justify-center space-x-2">
        <MdCheckCircle className="text-green-500" size={20} />
        <span>No upcoming deadlines</span>
      </div>
    );
  }

  return (
    <div className="p-4 border rounded-lg shadow-sm bg-white">
      {/* Header */}
      <h3 className="font-bold text-lg mb-3 flex items-center space-x-2">
        <MdEventAvailable className="text-green-600" size={22} />
        <span>Upcoming Deadlines</span>
      </h3>

      {/* Deadlines List */}
      <div className="space-y-3">
        {projects.map((p) => (
          <div
            key={p.ProjectId || p.id || `${p.name}-${p.endDate}`}
            className="p-3 border rounded-md bg-gray-50 hover:bg-gray-100 transition shadow-sm"
          >
            <p className="font-semibold text-gray-800">{p.name}</p>
            <p className="text-sm text-gray-600">
              End Date: {p.endDate}
            </p>

            {/* Badge */}
            <span
              className={`inline-flex items-center mt-2 px-3 py-1 text-xs rounded-full font-medium space-x-1 ${
                p.daysLeft <= 0
                  ? "bg-red-100 text-red-700"
                  : p.daysLeft <= 7
                  ? "bg-orange-100 text-orange-700"
                  : "bg-green-100 text-green-700"
              }`}
            >
              {p.daysLeft <= 0 ? (
                <>
                  <MdError size={14} />
                  <span>Overdue</span>
                </>
              ) : p.daysLeft <= 7 ? (
                <>
                  <MdAccessTime size={14} />
                  <span>Due in {p.daysLeft} days</span>
                </>
              ) : (
                <>
                  <MdCheckCircle size={14} />
                  <span>Due in {p.daysLeft} days</span>
                </>
              )}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
