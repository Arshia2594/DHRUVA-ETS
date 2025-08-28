


import React from "react";
import { Outlet } from "react-router-dom";

const MainContent = ({ open, darkMode, children }) => {
  return (
    <main
      className={`min-h-screen transition-all duration-300 px-6 py-4 ${
        open ? "ml-[240px]" : "ml-0"
      } ${darkMode ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-800"}`}
    >
      <div className="h-16" />
      <div className="w-full max-w-7xl mx-auto">
        <Outlet />
        {children}
      </div>
    </main>
  );
};

export default MainContent;
