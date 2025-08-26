// import { useState } from "react";
// import Navbar from "./Navbar";
// import MainContent from "./mainContent";
// import AdminSidebar from "./sidebar/AdminSidebar";

// const AdminDashboardLayout = () => {
//   const [open, setOpen] = useState(false);

//   const handleDrawerOpen = () => {
//     setOpen(true);
//   };

//   const handleDrawerClose = () => {
//     setOpen(false);
//   };

//   return (
//     <div className="flex min-h-screen bg-gray-100">
//       {/* Sidebar */}
//       <AdminSidebar open={open} handleDrawerClose={handleDrawerClose} />

//       <div className="flex-1 flex flex-col">
//         {/* Navbar */}
//         <Navbar open={open} handleDrawerOpen={handleDrawerOpen} />

//         {/* Main content */}
//         <MainContent open={open} />
//       </div>
//     </div>
//   );
// };

// export default AdminDashboardLayout;
// import { useState } from "react";
// import Navbar from "./Navbar";
// import MainContent from "./mainContent";
// import AdminSidebar from "./sidebar/AdminSidebar";

// const AdminDashboardLayout = () => {
//   const [open, setOpen] = useState(false);

//   const handleDrawerToggle = () => setOpen(!open); // toggle sidebar

//   return (
//     <div className="flex min-h-screen bg-gray-100">
//       <AdminSidebar open={open} />
//       <div className="flex-1 flex flex-col">
//         <Navbar open={open} handleDrawerToggle={handleDrawerToggle} />
//         <MainContent open={open} />
//       </div>
//     </div>
//   );
// };

// export default AdminDashboardLayout;


// import { useState } from "react";
// import Navbar from "./Navbar";
// import MainContent from "./MainContent";
// import AdminSidebar from "./sidebar/AdminSidebar";

// const AdminDashboardLayout = () => {
//   const [open, setOpen] = useState(false);
//   const [darkMode, setDarkMode] = useState(false); // dark mode state

//   const handleDrawerToggle = () => setOpen(!open);
//   const toggleDarkMode = () => setDarkMode(!darkMode);

//   return (
//     <div className={`flex min-h-screen ${darkMode ? "bg-gray-900" : "bg-gray-100"}`}>
//       {/* Sidebar */}
//       <AdminSidebar open={open} darkMode={darkMode} />

//       <div className="flex-1 flex flex-col">
//         {/* Navbar */}
//         <Navbar
//           open={open}
//           handleDrawerToggle={handleDrawerToggle}
//           darkMode={darkMode}
//           toggleDarkMode={toggleDarkMode}
//         />
//         {/* Main content */}
//         <MainContent open={open} darkMode={darkMode} />
//       </div>
//     </div>
//   );
// };

// export default AdminDashboardLayout;


import { useState } from "react";
import Navbar from "./Navbar";
import MainContent from "./MainContent";
import AdminSidebar from "./sidebar/AdminSidebar";

const AdminDashboardLayout = () => {
  const [open, setOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const handleDrawerToggle = () => setOpen(!open);
  const toggleDarkMode = () => setDarkMode(!darkMode);

  return (
    <div className={`flex min-h-screen ${darkMode ? "bg-gray-900" : "bg-gray-100"}`}>
      <AdminSidebar open={open} darkMode={darkMode} />
      <div className="flex-1 flex flex-col">
        <Navbar
          open={open}
          handleDrawerToggle={handleDrawerToggle}
          darkMode={darkMode}
          toggleDarkMode={toggleDarkMode} // Pass toggle function
        />
        <MainContent open={open} darkMode={darkMode} />
      </div>
    </div>
  );
};

export default AdminDashboardLayout;
