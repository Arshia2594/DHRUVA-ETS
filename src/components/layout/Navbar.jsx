
// // import React from "react";
// // import { FiMenu, FiPower, FiBell, FiSun, FiMoon } from "react-icons/fi";
// // import useAuth from "../../hooks/useAuth";

// // const Navbar = ({ open, handleDrawerToggle, darkMode, toggleDarkMode }) => {
// //   const { logout } = useAuth();

// //   return (
// //     <header
// //       className={`fixed top-0 left-0 flex items-center justify-between px-6 h-16 z-50 transition-all duration-300 shadow-2xl 
// //         ${open ? "md:ml-60 md:w-[calc(100%-15rem)]" : "ml-0 md:w-full w-full"} 
// //         ${
// //           darkMode
// //             ? "bg-gradient-to-r from-gray-800 via-gray-900 to-black text-white"
// //             : "bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 text-white"
// //         }
// //       `}
// //     >
// //       <div className="flex items-center gap-4">
// //         <button
// //           onClick={handleDrawerToggle}
// //           className="text-white focus:outline-none p-2 rounded-full hover:bg-white/20 transition-all duration-300"
// //         >
// //           <FiMenu size={24} />
// //         </button>
// //         <h1 className="text-2xl font-extrabold tracking-wider">Dhruva PMS</h1>
// //       </div>

// //       <div className="flex items-center gap-4">
// //         <button className="relative p-2 rounded-full hover:bg-white/20 transition-all duration-300">
// //           <FiBell size={20} />
// //           <span className="absolute top-1 right-1 w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></span>
// //         </button>

// //         <button
// //           onClick={toggleDarkMode}
// //           className="p-2 rounded-full hover:bg-white/20 transition-all duration-300"
// //         >
// //           {darkMode ? <FiSun size={20} /> : <FiMoon size={20} />}
// //         </button>

// //         <button
// //           onClick={logout}
// //           className="p-2 rounded-full hover:bg-red-100 hover:text-red-600 transition-all duration-300"
// //           title="Logout"
// //         >
// //           <FiPower size={20} />
// //         </button>
// //       </div>
// //     </header>
// //   );
// // };

// // export default Navbar;

// import React from "react";
// import { FiMenu, FiPower, FiBell, FiSun, FiMoon } from "react-icons/fi";
// import useAuth from "../../hooks/useAuth";
// import schaefflerLogo from "../../assets/schaeffler.png"; // Make sure logo is in your project

// const Navbar = ({ open, handleDrawerToggle, darkMode, toggleDarkMode }) => {
//   const { logout } = useAuth();

//   return (
//     <header
//       className={`fixed top-0 left-0 flex items-center justify-between px-6 h-16 z-50 transition-all duration-300 shadow-md 
//         ${open ? "md:ml-60 md:w-[calc(100%-15rem)]" : "ml-0 md:w-full w-full"} 
//         ${darkMode ? "bg-gray-900 text-white" : "bg-white text-gray-800"}
//       `}
//     >
//       <div className="flex items-center gap-4">
//         <button
//           onClick={handleDrawerToggle}
//           className="focus:outline-none p-2 rounded-full hover:bg-gray-200 transition-all duration-300"
//         >
//           <FiMenu size={24} />
//         </button>
//         <img src={schaefflerLogo} alt="Schaeffler Logo" className="h-16" />
//         {/* <h1 className="text-xl font-semibold">Dhruva PMS</h1> */}
//       </div>

//       <div className="flex items-center gap-4">
//         <button className="relative p-2 rounded-full hover:bg-gray-100 transition-all duration-300">
//           <FiBell size={20} />
//           <span className="absolute top-1 right-1 w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></span>
//         </button>

//         <button
//           onClick={toggleDarkMode}
//           className="p-2 rounded-full hover:bg-gray-100 transition-all duration-300"
//         >
//           {darkMode ? <FiSun size={20} /> : <FiMoon size={20} />}
//         </button>

//         <button
//           onClick={logout}
//           className="p-2 rounded-full hover:bg-red-100 hover:text-red-600 transition-all duration-300"
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
import { FiPower, FiBell, FiSun, FiMoon } from "react-icons/fi";
import useAuth from "../../hooks/useAuth";
import schaefflerLogo from "../../assets/schaeffler.png"; // Ensure correct path

const Navbar = ({ open, darkMode, toggleDarkMode }) => {
  const { logout } = useAuth();

  return (
    <header
      className={`fixed top-0 left-0 flex items-center justify-between px-6 h-16 z-50 transition-all duration-300 shadow-md 
        ${open ? "md:ml-60 md:w-[calc(100%-15rem)]" : "ml-0 md:w-full w-full"} 
        ${darkMode ? "bg-gray-900 text-white" : "bg-white text-gray-800"}
      `}
    >
      {/* <div className="flex items-center gap-4">
        {/* ✅ Removed toggle button */}
        {/* <img src={schaefflerLogo} alt="Schaeffler Logo" className="h-12" /> */}
        {/* <h1 className="text-xl font-semibold">Dhruva PMS</h1> */}
      
      <div className="flex items-center gap-4">
  <img
    src={schaefflerLogo}
    alt="Schaeffler Logo"
    className="h-16 w-auto"
  />
  {/* <h1 className="text-xl font-semibold">Dhruva PMS</h1> */}
</div>


      <div className="flex items-center gap-4">
        <button className="relative p-2 rounded-full hover:bg-gray-100 transition-all duration-300">
          <FiBell size={20} />
          <span className="absolute top-1 right-1 w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></span>
        </button>

        <button
          onClick={toggleDarkMode}
          className="p-2 rounded-full hover:bg-gray-100 transition-all duration-300"
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

