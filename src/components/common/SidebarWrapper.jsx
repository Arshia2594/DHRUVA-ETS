

import React, { useState } from "react";
import { FiChevronDown, FiChevronUp, FiLayers, FiChevronRight, FiChevronLeft } from "react-icons/fi";
import { useNavigate, useLocation } from "react-router-dom";

const SidebarWrapper = ({
  open,
  setOpen,
  darkMode,
  menuItems = [],
  teamItems = [],
  baseTeamPath = "",
}) => {
  const [dropdownOpen, setDropdownOpen] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigation = (path) => navigate(path);
  const handleDropdownToggle = () => setDropdownOpen(!dropdownOpen);

  // const hoverClass = darkMode
  //   ? "hover:bg-green-900/60 hover:shadow-md hover:shadow-black/40"
  //   : "hover:bg-green-100 hover:shadow-lg hover:shadow-green-400/40";

 
  const hoverClass = darkMode
  ? "hover:bg-gray-800 hover:shadow-sm hover:shadow-black/20"
  : "hover:bg-[#35644B] hover:shadow-sm hover:shadow-green-300/20";


  return (
  <aside
  className={`fixed top-0 left-0 h-screen z-40 transition-all duration-300 flex flex-col shadow-lg
    ${open ? "w-60" : "w-16"}
    ${
      darkMode
        ? "bg-gray-900 text-white"   
        : "bg-gradient-to-b from-[#2B7A4B] via-[#1E5F3A] to-[#144A2F] text-white"
    }`}
>


      {/* Space reserved for logo - no tag */}
      <div className="h-16 flex items-center justify-center text-sm font-bold tracking-wide">
        {open ? " " : ""}
      </div>

      {/* Toggle Button (middle center) */}
      <div className="absolute top-1/2 -right-3 transform -translate-y-1/2 z-50">
        <button
          onClick={() => setOpen(!open)}
          className={`rounded-full bg-white shadow-md border border-gray-300 w-6 h-6 flex items-center justify-center
            ${darkMode ? "text-black" : "text-green-800"}`}
        >
          {open ? <FiChevronLeft size={16} /> : <FiChevronRight size={16} />}
        </button>
      </div>

      {/* Menu Items */}
      <nav className="flex-1 px-2 py-4 text-sm font-medium overflow-y-auto scrollbar-hide">
        {menuItems.map((item) => (
          <div
            key={item.name}
            onClick={() => handleNavigation(item.path)}
            className={`group flex items-center gap-3 px-2 py-2 rounded-lg cursor-pointer transition-all duration-300 ${hoverClass}
              ${location.pathname === item.path ? "bg-white/30 font-semibold border-l-4 border-white/70 dark:border-gray-300" : ""}`}
          >
            <span className="transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6">
              {item.icon}
            </span>
            {open && <span className="whitespace-nowrap">{item.name}</span>}
          </div>
        ))}

        {/* Teams Dropdown */}
        {teamItems.length > 0 && (
          <>
            <div
              className={`group flex items-center justify-between px-2 py-2 mt-2 rounded-lg cursor-pointer transition-all duration-300 ${hoverClass}`}
              onClick={handleDropdownToggle}
            >
              <div className="flex items-center gap-3">
                <FiLayers size={18} />
                {open && "Teams"}
              </div>
              {open && (dropdownOpen ? <FiChevronUp /> : <FiChevronDown />)}
            </div>

            <div
              className={`ml-6 mt-1 flex flex-col gap-1 overflow-hidden transition-all duration-500
                ${dropdownOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}`}
            >
              {teamItems.map((team) => (
                <div
                  key={team.name}
                  onClick={() => handleNavigation(`${baseTeamPath}/${team.path}`)}
                  className={`group flex items-center gap-3 px-2 py-1.5 rounded-lg cursor-pointer transition-all duration-300 ${hoverClass}
                    ${
                      location.pathname === `${baseTeamPath}/${team.path}`
                        ? "bg-white/30 font-semibold border-l-4 border-white/70 dark:border-gray-300"
                        : ""
                    }`}
                >
                  <span className="transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6">
                    {team.icon}
                  </span>
                  {open && <span>{team.name}</span>}
                </div>
              ))}
            </div>
          </>
        )}
      </nav>
    </aside>
  );
};

export default SidebarWrapper;
