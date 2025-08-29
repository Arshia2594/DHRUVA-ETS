

// import { useReducer } from "react";
// import { useFormik } from "formik";
// import * as Yup from "yup";
// import { useNavigate } from "react-router-dom";
// import useAuth from "../../hooks/useAuth";
// import axiosInstance from "../../components/common/AxiosInstance";
// import { FiUser, FiLock } from "react-icons/fi";

// const loginReducer = (state, action) => {
//   switch (action.type) {
//     case "SET_ERROR":
//       return { ...state, error: action.payload };
//     default:
//       return state;
//   }
// };

// const LogIn = () => {
//   const [state, dispatch] = useReducer(loginReducer, { error: "" });
//   const { login } = useAuth();
//   const navigate = useNavigate();

//   const formik = useFormik({
//     initialValues: {
//       username: "",
//       password: "",
//     },
//     validationSchema: Yup.object({
//       username: Yup.string().required("Username is required"),
//       password: Yup.string().required("Password is required"),
//     }),
//     onSubmit: async (values) => {
//       try {
//         const response = await axiosInstance.post("/auth/login", values);
//         const { token, role, EmpId } = response.data;
//         login(token, role, EmpId);

//         if (role === "Admin") navigate("/admin/dashboard");
//         else if (role === "Manager") navigate("/manager/dashboard");
//         else if (role === "User") navigate("/user/dashboard");
//         else navigate("/login");
//       } catch (error) {
//         dispatch({ type: "SET_ERROR", payload: "Invalid username or password." });
//       }
//     },
//   });

//   return (
//     <div className="min-h-screen flex">
//       {/* Left Panel */}
//       <div className="hidden md:flex w-1/2 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 items-center justify-center text-white p-10">
//         <div className="text-center">
//           <h1 className="text-4xl font-extrabold mb-4">Welcome Back!</h1>
//           <p className="text-lg">Login to access your dashboard</p>
//         </div>
//       </div>

//       {/* Right Panel */}
//       <div className="w-full md:w-1/2 flex items-center justify-center bg-gray-100 dark:bg-gray-900 p-8 transition-colors duration-300">
//         <div
//           className="w-full max-w-md bg-white dark:bg-gray-800 shadow-2xl rounded-xl p-8 transition-colors duration-300"
//         >
//           <h2 className="text-2xl font-bold text-center mb-6 text-gray-800 dark:text-white">
//             Login
//           </h2>

//           <form onSubmit={formik.handleSubmit} className="space-y-5">
//             {/* Username */}
//             <div>
//               <label className="block text-gray-700 dark:text-gray-300 mb-1">Username</label>
//               <div className="flex items-center border border-gray-300 dark:border-gray-600 rounded px-3 py-2 bg-white dark:bg-gray-700 transition-colors duration-300">
//                 <FiUser className="text-gray-400 dark:text-gray-300 mr-2" />
//                 <input
//                   type="text"
//                   name="username"
//                   placeholder="Enter username"
//                   value={formik.values.username}
//                   onChange={formik.handleChange}
//                   onBlur={formik.handleBlur}
//                   className="w-full outline-none bg-transparent text-gray-800 dark:text-white"
//                 />
//               </div>
//               {formik.touched.username && formik.errors.username && (
//                 <div className="text-red-500 text-sm mt-1">{formik.errors.username}</div>
//               )}
//             </div>

//             {/* Password */}
//             <div>
//               <label className="block text-gray-700 dark:text-gray-300 mb-1">Password</label>
//               <div className="flex items-center border border-gray-300 dark:border-gray-600 rounded px-3 py-2 bg-white dark:bg-gray-700 transition-colors duration-300">
//                 <FiLock className="text-gray-400 dark:text-gray-300 mr-2" />
//                 <input
//                   type="password"
//                   name="password"
//                   placeholder="Enter password"
//                   value={formik.values.password}
//                   onChange={formik.handleChange}
//                   onBlur={formik.handleBlur}
//                   className="w-full outline-none bg-transparent text-gray-800 dark:text-white"
//                 />
//               </div>
//               {formik.touched.password && formik.errors.password && (
//                 <div className="text-red-500 text-sm mt-1">{formik.errors.password}</div>
//               )}
//             </div>

//             {/* Error Message */}
//             {state.error && (
//               <div className="text-red-500 text-sm text-center">{state.error}</div>
//             )}

//             {/* Submit Button */}
//             <button
//               type="submit"
//               className="w-full bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 hover:from-indigo-700 hover:via-purple-700 hover:to-pink-600 text-white font-semibold py-2 rounded transition-all duration-300 shadow-lg"
//             >
//               Login
//             </button>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default LogIn;

import { useReducer } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import axiosInstance from "../../components/common/AxiosInstance";
import { FiUser, FiLock } from "react-icons/fi";

const loginReducer = (state, action) => {
  switch (action.type) {
    case "SET_ERROR":
      return { ...state, error: action.payload };
    default:
      return state;
  }
};

const LogIn = () => {
  const [state, dispatch] = useReducer(loginReducer, { error: "" });
  const { login } = useAuth();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: Yup.object({
      username: Yup.string().required("Username is required"),
      password: Yup.string().required("Password is required"),
    }),
    onSubmit: async (values) => {
      try {
        const response = await axiosInstance.post("/auth/login", values);
        const { token, role, EmpId } = response.data;
        login(token, role, EmpId);

        if (role === "Admin") navigate("/admin/dashboard");
        else if (role === "Manager") navigate("/manager/dashboard");
        else if (role === "User") navigate("/user/dashboard");
        else navigate("/login");
      } catch (error) {
        dispatch({ type: "SET_ERROR", payload: "Invalid username or password." });
      }
    },
  });

  return (
    <div className="min-h-screen flex">
      {/* ✅ Left Panel with Full Gradient */}
      <div className="hidden md:flex w-1/2 bg-gradient-to-br from-[#2B7A4B] via-[#1E5F3A] to-[#144A2F] items-center justify-center text-white p-10">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold mb-4">Welcome Back!</h1>
          <p className="text-lg">Login to access your dashboard</p>
        </div>
      </div>

      {/* ✅ Right Panel with Login Form */}
      <div className="w-full md:w-1/2 flex items-center justify-center bg-gray-100 dark:bg-gray-900 p-8 transition-colors duration-300">
        <div className="w-full max-w-md bg-white dark:bg-gray-800 shadow-2xl rounded-xl p-8 transition-colors duration-300">
          <h2 className="text-2xl font-bold text-center mb-6 text-gray-800 dark:text-white">
            Login
          </h2>

          <form onSubmit={formik.handleSubmit} className="space-y-5">
            {/* Username */}
            <div>
              <label className="block text-gray-700 dark:text-gray-300 mb-1">Username</label>
              <div className="flex items-center border border-gray-300 dark:border-gray-600 rounded px-3 py-2 bg-white dark:bg-gray-700 transition-colors duration-300">
                <FiUser className="text-gray-400 dark:text-gray-300 mr-2" />
                <input
                  type="text"
                  name="username"
                  placeholder="Enter username"
                  value={formik.values.username}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="w-full outline-none bg-transparent text-gray-800 dark:text-white"
                />
              </div>
              {formik.touched.username && formik.errors.username && (
                <div className="text-red-500 text-sm mt-1">{formik.errors.username}</div>
              )}
            </div>

            {/* Password */}
            <div>
              <label className="block text-gray-700 dark:text-gray-300 mb-1">Password</label>
              <div className="flex items-center border border-gray-300 dark:border-gray-600 rounded px-3 py-2 bg-white dark:bg-gray-700 transition-colors duration-300">
                <FiLock className="text-gray-400 dark:text-gray-300 mr-2" />
                <input
                  type="password"
                  name="password"
                  placeholder="Enter password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="w-full outline-none bg-transparent text-gray-800 dark:text-white"
                />
              </div>
              {formik.touched.password && formik.errors.password && (
                <div className="text-red-500 text-sm mt-1">{formik.errors.password}</div>
              )}
            </div>

            {/* Error Message */}
            {state.error && (
              <div className="text-red-500 text-sm text-center">{state.error}</div>
            )}

            {/* ✅ Submit Button with Full Schaeffler Gradient */}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-[#2B7A4B] via-[#1E5F3A] to-[#144A2F] hover:from-[#2B7A4B]/90 hover:via-[#1E5F3A]/90 hover:to-[#144A2F]/90 text-white font-semibold py-2 rounded transition-all duration-300 shadow-lg"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LogIn;
