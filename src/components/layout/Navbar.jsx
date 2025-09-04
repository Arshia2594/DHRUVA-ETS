


import React from "react";
import { FiPower, FiBell } from "react-icons/fi";
import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";
import schaefflerLogo from "../../assets/schaeffler.png"; // Ensure correct path

const Navbar = ({ open }) => {
  const { logout } = useAuth();

  const handleLogout = () => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will be logged out!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, logout',
    }).then((result) => {
      if (result.isConfirmed) {
        logout();
      }
    });
  };

  return (
    <header
      className={`fixed top-0 left-0 flex items-center justify-between px-6 h-16 z-50 transition-all duration-300 shadow-md 
        ${open ? "md:ml-60 md:w-[calc(100%-15rem)]" : "ml-0 md:w-full w-full"} 
        bg-white text-gray-800
      `}
    >
      <div className="flex items-center gap-4">
        <img
          src={schaefflerLogo}
          alt="Schaeffler Logo"
          className="h-16 w-auto"
        />
      </div>

      <div className="flex items-center gap-4">
        <button
          className="relative p-2 rounded-full hover:bg-gray-100 transition-all duration-300"
          title="Notifications"
        >
          <FiBell size={20} />
          <span className="absolute top-1 right-1 w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></span>
        </button>

        <button
          onClick={handleLogout}
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
