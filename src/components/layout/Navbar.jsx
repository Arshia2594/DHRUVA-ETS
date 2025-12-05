import { FiPower, FiBell, FiUser } from "react-icons/fi";
import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";
import schaefflerLogo from "../../assets/schaeffler.png";
import { motion } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";

const Navbar = ({ open }) => {
  const { logout } = useAuth();
  const [profileOpen, setProfileOpen] = useState(false);
  const profileRef = useRef(null);

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

  // Close menu if clicked outside
  useEffect(() => {
    const handler = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <header className={`fixed top-0 left-0 h-16 flex items-center justify-between px-6 backdrop-blur-xl bg-white/70 dark:bg-gray-900/60 shadow-md z-30 transition-all duration-300
     ${open ? "md:ml-[240px] md:w-[calc(100%-240px)]" : "md:ml-[64px] md:w-[calc(100%-64px)]"}
`}
    >
      {/* Logo */}
      <div className="flex items-center gap-3">
        <img src={schaefflerLogo} alt="Logo" className="h-14 w-auto" />
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-4">

        {/* Notification Icon */}
        <motion.button
          whileTap={{ scale: 0.9 }}
          className="relative p-2 rounded-full hover:bg-green-100 dark:hover:bg-gray-800 transition-all"
          title="Notifications"
        >
          <FiBell size={20} />
          <span className="absolute top-1 right-1 w-2 h-2 bg-green-500 rounded-full animate-ping"></span>
          <span className="absolute top-1 right-1 w-2 h-2 bg-green-500 rounded-full"></span>
        </motion.button>

        {/* Profile Dropdown */}
        <div className="relative" ref={profileRef}>
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => setProfileOpen(!profileOpen)}
            className="p-2 rounded-full hover:bg-green-100 dark:hover:bg-gray-800 transition-all"
            title="Profile"
          >
            <FiUser size={20} />
          </motion.button>

          {profileOpen && (
            <motion.div
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              className="absolute right-0 mt-2 w-40 bg-white dark:bg-gray-800 text-sm shadow-lg rounded-md border dark:border-gray-700 py-2 z-50"
            ><motion.div
              whileHover={{ x: 3 }}
              transition={{ type: "spring", stiffness: 300 }}
            ><Link
              to="/profile"
              className="flex items-center gap-2 px-4 py-2 rounded-md transition-all
             hover:bg-gray-100 dark:hover:bg-gray-700 group"
            >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                    strokeWidth={1.8} stroke="currentColor"
                    className="w-5 h-5 text-gray-600 group-hover:text-green-600 transition-colors">
                    <path strokeLinecap="round" strokeLinejoin="round"
                      d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0zM4.5 20.25a8.25 8.25 0 1 1 15 0v.75H4.5v-.75z" />
                  </svg>
                  <span className="text-gray-700 dark:text-gray-100 group-hover:text-green-600">
                    My Profile
                  </span>
                </Link>

              </motion.div>

            </motion.div>
          )}
        </div>

        {/* Logout */}
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
