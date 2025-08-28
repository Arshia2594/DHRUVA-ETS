
import React, { useState } from "react";
import {
  FiChevronDown,
  FiChevronUp,
  FiLayers,
} from "react-icons/fi";
import { useNavigate, useLocation } from "react-router-dom";

const SidebarWrapper = ({
  open,
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

  const hoverClass = darkMode
    ? "hover:bg-gray-700 hover:shadow-lg hover:shadow-black/50"
    : "hover:bg-white/20 hover:shadow-lg hover:shadow-purple-300/50";

  return (
    <aside
      className={`fixed top-0 left-0 h-screen z-40 transition-all duration-300 ${
        open ? "w-60" : "w-0 overflow-hidden"
      } ${
        darkMode
          ? "bg-gradient-to-b from-gray-800 via-gray-900 to-black text-white"
          : "bg-gradient-to-b from-indigo-600 via-purple-600 to-pink-500 text-white"
      } shadow-2xl`}
    >
      <nav className="px-3 py-6 text-sm font-medium flex flex-col gap-1 h-full overflow-y-auto scrollbar-hide">
        {menuItems.map((item) => (
          <div
            key={item.name}
            onClick={() => handleNavigation(item.path)}
            className={`group flex items-center gap-3 px-4 py-2 rounded-lg cursor-pointer transition-all duration-300 ${hoverClass} ${
              location.pathname === item.path
                ? "bg-white/30 font-semibold border-l-4 border-white/70 dark:border-gray-300"
                : ""
            }`}
          >
            <span className="transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6">
              {item.icon}
            </span>
            <span className="whitespace-nowrap">{item.name}</span>
          </div>
        ))}

        {teamItems.length > 0 && (
          <>
            <div
              className={`group flex items-center justify-between px-4 py-2 mt-2 rounded-lg cursor-pointer transition-all duration-300 ${hoverClass}`}
              onClick={handleDropdownToggle}
            >
              <div className="flex items-center gap-3">
                <FiLayers size={18} />
                Teams
              </div>
              {dropdownOpen ? <FiChevronUp /> : <FiChevronDown />}
            </div>

            <div
              className={`ml-6 mt-1 flex flex-col gap-1 overflow-hidden transition-all duration-500 ${
                dropdownOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
              }`}
            >
              {teamItems.map((team) => (
                <div
                  key={team.name}
                  onClick={() => handleNavigation(`${baseTeamPath}/${team.path}`)}
                  className={`group flex items-center gap-2 px-4 py-1.5 rounded-lg cursor-pointer transition-all duration-300 ${hoverClass} ${
                    location.pathname === `${baseTeamPath}/${team.path}`
                      ? "bg-white/30 font-semibold border-l-4 border-white/70 dark:border-gray-300"
                      : ""
                  }`}
                >
                  <span className="transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6">
                    {team.icon}
                  </span>
                  <span>{team.name}</span>
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

