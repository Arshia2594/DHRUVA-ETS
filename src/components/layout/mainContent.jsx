


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
      <div className="w-full ">
        <Outlet />
        {children}
      </div>
    </main>
  );
};

export default MainContent;


// import React from "react";
// import { Outlet, useLocation } from "react-router-dom";
// import { AnimatePresence, motion } from "framer-motion";

// const MainContent = ({ open, darkMode, children }) => {
//   const location = useLocation();

//   return (
//     <main
//       className={`min-h-screen transition-all duration-300 py-4 ${
//         open ? "ml-[240px]" : "ml-0"
//       } ${darkMode ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-800"}`}
//     >
//       {/* Top spacing for fixed header */}
//       <div className="h-16" />

//       {/* Page Container */}
//       <div className="w-full px-6 overflow-hidden">
//         {/* AnimatePresence will animate route transitions */}
//         <AnimatePresence mode="wait">
//           <motion.div
//             key={location.pathname}
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             exit={{ opacity: 0, y: -10 }}
//             transition={{
//               duration: 0.4,
//               ease: [0.25, 0.1, 0.25, 1],
//             }}
//             className="space-y-6"
//           >
//             <Outlet />
//             {children}
//           </motion.div>
//         </AnimatePresence>
//       </div>
//     </main>
//   );
// };

// export default MainContent;
