


// import React from "react";
// import { FiPower, FiBell } from "react-icons/fi";
// import Swal from "sweetalert2";
// import useAuth from "../../hooks/useAuth";
// import schaefflerLogo from "../../assets/schaeffler.png"; // Ensure correct path

// const Navbar = ({ open }) => {
//   const { logout } = useAuth();

//   const handleLogout = () => {
//     Swal.fire({
//       title: 'Are you sure?',
//       text: 'You will be logged out!',
//       icon: 'warning',
//       showCancelButton: true,
//       confirmButtonColor: '#d33',
//       cancelButtonColor: '#3085d6',
//       confirmButtonText: 'Yes, logout',
//     }).then((result) => {
//       if (result.isConfirmed) {
//         logout();
//       }
//     });
//   };

//   return (
//     <header
//       className={`fixed top-0 left-0 flex items-center justify-between px-6 h-16 z-50 transition-all duration-300 shadow-md 
//         ${open ? "md:ml-60 md:w-[calc(100%-15rem)]" : "ml-0 md:w-full w-full"} 
//         bg-white text-gray-800
//       `}
//     >
//       <div className="flex items-center gap-4">
//         <img
//           src={schaefflerLogo}
//           alt="Schaeffler Logo"
//           className="h-16 w-auto"
//         />
//       </div>

//       <div className="flex items-center gap-4">
//         <button
//           className="relative p-2 rounded-full hover:bg-gray-100 transition-all duration-300"
//           title="Notifications"
//         >
//           <FiBell size={20} />
//           <span className="absolute top-1 right-1 w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></span>
//         </button>

//         <button
//           onClick={handleLogout}
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

import { FiPower, FiBell, FiUser } from "react-icons/fi";
import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";
import schaefflerLogo from "../../assets/schaeffler.png";
import { motion } from "framer-motion";

const Navbar = ({ open }) => {
  const { logout } = useAuth();

  const handleLogout = () => {
    Swal.fire({
      title: 'Logout?',
      text: 'You will be logged out.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#16a34a',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, logout',
    }).then((result) => {
      if (result.isConfirmed) logout();
    });
  };

  return (
 <header
  className={`fixed top-0 left-0 h-16 flex items-center justify-between px-6 backdrop-blur-xl bg-white/70 dark:bg-gray-900/60 shadow-md z-30 transition-all duration-300
    ${open ? "md:ml-60 md:w-[calc(100%-15rem)]" : "md:ml-20 md:w-[calc(100%-5rem)]"}`}
>

      {/* Logo */}
      <div className="flex items-center gap-3">
           <img src={schaefflerLogo} alt="Logo" className="h-14 w-auto" />
        {/* <span className="font-semibold text-green-600 text-lg hidden sm:block">
          Schaeffler
        </span> */}
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-4">
        <motion.button
          whileTap={{ scale: 0.9 }}
          className="relative p-2 rounded-full hover:bg-green-100 dark:hover:bg-gray-800 transition-all"
          title="Notifications"
        >
          <FiBell size={20} />
          <span className="absolute top-1 right-1 w-2 h-2 bg-green-500 rounded-full animate-ping"></span>
          <span className="absolute top-1 right-1 w-2 h-2 bg-green-500 rounded-full"></span>
        </motion.button>

        <motion.button
          whileTap={{ scale: 0.9 }}
          className="p-2 rounded-full hover:bg-green-100 dark:hover:bg-gray-800 transition-all"
          title="Profile"
        >
          <FiUser size={20} />
        </motion.button>

        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={handleLogout}
          className="p-2 rounded-full hover:bg-red-100 text-red-500 hover:text-red-600 transition-all"
          title="Logout"
        >
          <FiPower size={20} />
        </motion.button>
      </div>
    </header>
  );
};

export default Navbar;
