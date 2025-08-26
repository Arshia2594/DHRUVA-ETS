

// import React from 'react';
// import { FiMenu, FiPower } from 'react-icons/fi';
// import useAuth from '../../hooks/useAuth';

// const Navbar = ({ open, handleDrawerOpen }) => {
//   const { logout } = useAuth();

//   return (
//     <header
//       className={`fixed top-0 left-0 w-full h-16 flex items-center justify-between px-4 shadow-md bg-white z-50 transition-all duration-300
//         ${open ? 'md:ml-[240px] md:w-[calc(100%-240px)]' : 'w-full ml-0'}
//       `}
//     >
//       {/* Left - Menu button + Title */}
//       <div className="flex items-center gap-4">
//         {/* Menu toggle button */}
//         <button
//           onClick={handleDrawerOpen}
//           className="text-gray-600 hover:text-black focus:outline-none md:hidden"
//         >
//           <FiMenu size={22} />
//         </button>

//         {/* Optional: always show menu toggle on desktop too */}
//         <button
//           onClick={handleDrawerOpen}
//           className="hidden md:flex text-gray-600 hover:text-black focus:outline-none"
//         >
//           <FiMenu size={22} />
//         </button>

//         <h1 className="text-lg font-semibold text-gray-800 tracking-wide whitespace-nowrap">
//           Dhruva PMS
//         </h1>
//       </div>

//       {/* Right - Logout */}
//       <button
//         onClick={logout}
//         className="text-gray-600 hover:text-red-600 transition-colors duration-200"
//         title="Logout"
//       >
//         <FiPower size={22} />
//       </button>
//     </header>
//   );
// };

// export default Navbar;


// import React, { useState } from 'react';
// import { FiMenu, FiPower, FiBell, FiSun, FiMoon } from 'react-icons/fi';
// import useAuth from '../../hooks/useAuth';

// const Navbar = ({ open, handleDrawerOpen }) => {
//   const { logout } = useAuth();
//   const [darkMode, setDarkMode] = useState(false);

//   const toggleTheme = () => setDarkMode(!darkMode);

//   return (
//    <header
//   className={`fixed top-0 left-0 w-full flex items-center justify-between px-6 h-16 shadow-md z-50 transition-all duration-300
//     ${open ? 'md:ml-[240px] md:w-[calc(100%-240px)]' : 'w-full ml-0'}
//     ${darkMode 
//       ? 'bg-gray-800 text-white'  // dark mode solid
//       : 'bg-blue-600 text-white'  // light mode solid
//     }
//   `}
// >
    
//       {/* Left - Menu + Title */}
//       <div className="flex items-center gap-4">
//         {/* Mobile sidebar toggle */}
//         <button
//           onClick={handleDrawerOpen}
//           className="text-white md:hidden focus:outline-none p-2 rounded-full hover:bg-white/20 transition-colors"
//         >
//           <FiMenu size={24} />
//         </button>

//         {/* Desktop sidebar toggle */}
//         <button
//           onClick={handleDrawerOpen}
//           className="hidden md:flex text-white focus:outline-none p-2 rounded-full hover:bg-white/20 transition-colors"
//         >
//           <FiMenu size={24} />
//         </button>

//         {/* Title */}
//         <h1 className="text-2xl font-extrabold tracking-wider">
//           Dhruva PMS
//         </h1>
//       </div>

//       {/* Right - Actions */}
//       <div className="flex items-center gap-4">
//         {/* Notifications */}
//         <button className="relative p-2 rounded-full hover:bg-white/20 transition-colors">
//           <FiBell size={20} />
//           <span className="absolute top-1 right-1 w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></span>
//         </button>

//         {/* Theme Toggle */}
//         <button
//           onClick={toggleTheme}
//           className="p-2 rounded-full hover:bg-white/20 transition-colors"
//         >
//           {darkMode ? <FiSun size={20} /> : <FiMoon size={20} />}
//         </button>

//         {/* Logout */}
//         <button
//           onClick={logout}
//           className="p-2 rounded-full hover:bg-red-100 hover:text-red-600 transition-colors"
//           title="Logout"
//         >
//           <FiPower size={20} />
//         </button>
//       </div>
//     </header>
//   );
// };

// export default Navbar;


// import React, { useState } from "react";
// import { FiMenu, FiPower, FiBell, FiSun, FiMoon } from "react-icons/fi";
// import useAuth from "../../hooks/useAuth";

// const Navbar = ({ open, handleDrawerToggle }) => {
//   const { logout } = useAuth();
//   const [darkMode, setDarkMode] = useState(false);

//   const toggleTheme = () => setDarkMode(!darkMode);

//   return (
//     <header
//       className={`fixed top-0 left-0 w-full flex items-center justify-between px-6 h-16 z-50 transition-all duration-300 shadow-2xl ${
//         open ? "md:ml-60 md:w-[calc(100%-15rem)]" : "w-full ml-0"
//       } ${
//         darkMode
//           ? "bg-gradient-to-r from-indigo-700 via-purple-700 to-pink-700 text-white"
//           : "bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 text-white"
//       }`}
//     >
//       {/* Left side: Toggle + Title */}
//       <div className="flex items-center gap-4">
//         <button
//           onClick={handleDrawerToggle}
//           className="text-white focus:outline-none p-2 rounded-full hover:bg-white/20 transition-all duration-300 hover:shadow-lg hover:shadow-purple-300/50"
//         >
//           <FiMenu size={24} />
//         </button>
//         <h1 className="text-2xl font-extrabold tracking-wider">Dhruva PMS</h1>
//       </div>

//       {/* Right side: Notifications, Theme, Logout */}
//       <div className="flex items-center gap-4">
//         <button className="relative p-2 rounded-full hover:bg-white/20 transition-all duration-300 hover:shadow-lg hover:shadow-purple-300/50">
//           <FiBell size={20} />
//           <span className="absolute top-1 right-1 w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></span>
//         </button>

//         <button
//           onClick={toggleTheme}
//           className="p-2 rounded-full hover:bg-white/20 transition-all duration-300 hover:shadow-lg hover:shadow-purple-300/50"
//         >
//           {darkMode ? <FiSun size={20} /> : <FiMoon size={20} />}
//         </button>

//         <button
//           onClick={logout}
//           className="p-2 rounded-full hover:bg-red-100 hover:text-red-600 transition-all duration-300 hover:shadow-lg hover:shadow-red-300/50"
//           title="Logout"
//         >
//           <FiPower size={20} />
//         </button>
//       </div>
//     </header>
//   );
// };

// export default Navbar;


import React from "react";
import { FiMenu, FiPower, FiBell, FiSun, FiMoon } from "react-icons/fi";
import useAuth from "../../hooks/useAuth";

const Navbar = ({ open, handleDrawerToggle, darkMode, toggleDarkMode }) => {
  const { logout } = useAuth();

  return (
    <header
      className={`fixed top-0 left-0 w-full flex items-center justify-between px-6 h-16 z-50 transition-all duration-300 shadow-2xl ${
        open ? "md:ml-60 md:w-[calc(100%-15rem)]" : "w-full ml-0"
      } ${
        darkMode
          ? "bg-gradient-to-r from-gray-800 via-gray-900 to-black text-white"
          : "bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 text-white"
      }`}
    >
      <div className="flex items-center gap-4">
        <button
          onClick={handleDrawerToggle}
          className="text-white focus:outline-none p-2 rounded-full hover:bg-white/20 transition-all duration-300"
        >
          <FiMenu size={24} />
        </button>
        <h1 className="text-2xl font-extrabold tracking-wider">Dhruva PMS</h1>
      </div>

      <div className="flex items-center gap-4">
        <button className="relative p-2 rounded-full hover:bg-white/20 transition-all duration-300">
          <FiBell size={20} />
          <span className="absolute top-1 right-1 w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></span>
        </button>

        <button
          onClick={toggleDarkMode} // Properly called
          className="p-2 rounded-full hover:bg-white/20 transition-all duration-300"
        >
          {darkMode ? <FiSun size={20} /> : <FiMoon size={20} />}
        </button>

        <button
          onClick={logout}
          className="p-2 rounded-full hover:bg-red-100 hover:text-red-600 transition-all duration-300"
          title="Logout"
        >
          <FiPower size={20} />
        </button>
      </div>
    </header>
  );
};

export default Navbar;
