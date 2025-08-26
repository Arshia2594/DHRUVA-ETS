// import React, { useState } from "react";
// import {
//   FiChevronLeft,
//   FiChevronRight,
//   FiUsers,
//   FiBarChart2,
//   FiBriefcase,
//   FiUser,
//   FiLayers,
//   FiMonitor,
//   FiSettings,
//   FiChevronDown,
//   FiChevronUp,
// } from "react-icons/fi";
// import { useNavigate } from "react-router-dom";
// import controlIcon from "../../../assets/icons/control.png";

// const drawerWidth = 240;

// const AdminSidebar = ({ open, handleDrawerClose }) => {
//   const [dropdownOpen, setDropdownOpen] = useState(false);
//   const navigate = useNavigate();

//   const handleNavigation = (path) => {
//     navigate(path);
//   };

//   const handleDropdownToggle = () => {
//     setDropdownOpen(!dropdownOpen);
//   };

//   return (
//     <aside
//       className={`fixed top-0 left-0 h-screen bg-white shadow-lg z-40 transition-all duration-300
//         ${open ? 'w-[240px]' : 'w-0 overflow-hidden'}
//        `}
      
//     >
      
//       {/* Close Button */}
//       <div className="flex items-center justify-end h-16 px-4 border-b">
//         <button onClick={handleDrawerClose} className="text-gray-600 hover:text-black">
//           {open ? <FiChevronLeft size={22} /> : <FiChevronRight size={22} />}
//         </button>
//       </div>

//       {/* Navigation List */}
//       <nav className="px-3 py-4 text-sm font-medium text-gray-800">
//         <div
//           className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-gray-100 cursor-pointer"
//           onClick={() => handleNavigation("/admin/dashboard")}
//         >
//           <FiBarChart2 size={18} />
//           Dashboard
//         </div>
//         <div
//           className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-gray-100 cursor-pointer"
//           onClick={() => handleNavigation("/admin/report")}
//         >
//           <FiMonitor size={18} />
//           Report
//         </div>
//         <div
//           className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-gray-100 cursor-pointer"
//           onClick={() => handleNavigation("/admin/employees")}
//         >
//           <FiUsers size={18} />
//           Employees
//         </div>
//         <div
//           className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-gray-100 cursor-pointer"
//           onClick={() => handleNavigation("/admin/customers")}
//         >
//           <FiUser size={18} />
//           Customers
//         </div>
//         <div
//           className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-gray-100 cursor-pointer"
//           onClick={() => handleNavigation("/admin/projects")}
//         >
//           <FiBriefcase size={18} />
//           Projects
//         </div>

//         {/* Dropdown: Teams */}
//         <div
//           className="flex items-center justify-between px-4 py-2 rounded-lg hover:bg-gray-100 cursor-pointer"
//           onClick={() => {
//             handleDropdownToggle();
//             handleNavigation("/admin/teams/");
//           }}
//         >
//           <div className="flex items-center gap-3">
//             <FiLayers size={18} />
//             Teams
//           </div>
//           {dropdownOpen ? <FiChevronUp /> : <FiChevronDown />}
//         </div>

//         {/* Submenu */}
//         {dropdownOpen && (
//           <div className="ml-6 mt-1 space-y-2 text-gray-600">
//             <div
//               className="flex items-center gap-2 px-4 py-1.5 rounded hover:bg-gray-100 cursor-pointer"
//               onClick={() => handleNavigation("/admin/teams/sales")}
//             >
//               <FiUser size={16} /> Sales
//             </div>
//             <div
//               className="flex items-center gap-2 px-4 py-1.5 rounded hover:bg-gray-100 cursor-pointer"
//               onClick={() => handleNavigation("/admin/teams/project")}
//             >
//               <FiBriefcase size={16} /> Project
//             </div>
//             <div
//               className="flex items-center gap-2 px-4 py-1.5 rounded hover:bg-gray-100 cursor-pointer"
//               onClick={() => handleNavigation("/admin/teams/design")}
//             >
//               <FiSettings size={16} /> Design
//             </div>
//             <div
//               className="flex items-center gap-2 px-4 py-1.5 rounded hover:bg-gray-100 cursor-pointer"
//               onClick={() => handleNavigation("/admin/teams/IT")}
//             >
//               <FiMonitor size={16} /> IT
//             </div>
//             <div
//               className="flex items-center gap-2 px-4 py-1.5 rounded hover:bg-gray-100 cursor-pointer"
//               onClick={() => handleNavigation("/admin/teams/other")}
//             >
//               <FiLayers size={16} /> Other
//             </div>
//           </div>
//         )}
//       </nav>
//     </aside>
//   );
// };

// export default AdminSidebar;

import React, { useState } from "react";
import {
  FiUsers,
  FiBarChart2,
  FiBriefcase,
  FiUser,
  FiLayers,
  FiMonitor,
  FiSettings,
  FiChevronDown,
  FiChevronUp,
} from "react-icons/fi";
import { useNavigate, useLocation } from "react-router-dom";

const AdminSidebar = ({ open, darkMode }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigation = (path) => navigate(path);
  const handleDropdownToggle = () => setDropdownOpen(!dropdownOpen);

  const menuItems = [
    { name: "Dashboard", icon: <FiBarChart2 size={18} />, path: "/admin/dashboard" },
    { name: "Report", icon: <FiMonitor size={18} />, path: "/admin/report" },
    { name: "Employees", icon: <FiUsers size={18} />, path: "/admin/employees" },
    { name: "Customers", icon: <FiUser size={18} />, path: "/admin/customers" },
    { name: "Projects", icon: <FiBriefcase size={18} />, path: "/admin/projects" },
  ];

  const teams = [
    { name: "Sales", icon: <FiUser size={16} />, path: "/admin/teams/sales" },
    { name: "Project", icon: <FiBriefcase size={16} />, path: "/admin/teams/project" },
    { name: "Design", icon: <FiSettings size={16} />, path: "/admin/teams/design" },
    { name: "IT", icon: <FiMonitor size={16} />, path: "/admin/teams/IT" },
    { name: "Other", icon: <FiLayers size={16} />, path: "/admin/teams/other" },
  ];

  // Hover / Shadow classes based on dark/light mode
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
        {/* Menu Items */}
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

        {/* Teams Dropdown */}
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

        {/* Dropdown Items */}
        <div
          className={`ml-6 mt-1 flex flex-col gap-1 overflow-hidden transition-all duration-500 ${
            dropdownOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          {teams.map((team) => (
            <div
              key={team.name}
              onClick={() => handleNavigation(team.path)}
              className={`group flex items-center gap-2 px-4 py-1.5 rounded-lg cursor-pointer transition-all duration-300 ${
                hoverClass
              } ${
                location.pathname === team.path
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
      </nav>
    </aside>
  );
};

export default AdminSidebar;
