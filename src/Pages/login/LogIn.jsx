
import { useReducer } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import axiosInstance from "../../components/common/AxiosInstance";
import { FiUser, FiLock } from "react-icons/fi";
import { motion } from "framer-motion";

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
    initialValues: { username: "", password: "" },
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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-gray-100 to-white px-6">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md bg-white border border-gray-300 p-10 rounded-2xl shadow-lg"
      >
        <div className="text-center mb-8">
          <h1 className="text-3xl font-semibold text-gray-800 tracking-tight">Welcome Back 👋</h1>
          <p className="text-sm text-gray-500 mt-2">Sign in to your dashboard</p>
        </div>

        <form onSubmit={formik.handleSubmit} className="space-y-6">
          {/* Username */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Username</label>
            <div className="flex items-center border border-gray-300 rounded-md px-4 py-3 focus-within:ring-2 focus-within:ring-green-500 transition-shadow shadow-sm hover:shadow-md">
              <FiUser className="text-gray-400 mr-3 text-lg" />
              <input
                type="text"
                name="username"
                autoComplete="username"
                value={formik.values.username}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="Enter your username"
                className="w-full bg-transparent outline-none text-gray-800 placeholder-gray-400 text-base"
              />
            </div>
            {formik.touched.username && formik.errors.username && (
              <p className="text-red-500 text-xs mt-1 ml-1">{formik.errors.username}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Password</label>
            <div className="flex items-center border border-gray-300 rounded-md px-4 py-3 focus-within:ring-2 focus-within:ring-green-500 transition-shadow shadow-sm hover:shadow-md">
              <FiLock className="text-gray-400 mr-3 text-lg" />
              <input
                type="password"
                name="password"
                autoComplete="current-password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="Enter your password"
                className="w-full bg-transparent outline-none text-gray-800 placeholder-gray-400 text-base"
              />
            </div>
            {formik.touched.password && formik.errors.password && (
              <p className="text-red-500 text-xs mt-1 ml-1">{formik.errors.password}</p>
            )}
          </div>

          {/* Error Message */}
          {state.error && (
            <div className="text-red-600 text-sm text-center font-medium">{state.error}</div>
          )}

          {/* Submit */}
          <button
            type="submit"
            className="w-full py-3 bg-green-600 hover:bg-green-700 transition-all text-white rounded-lg font-semibold shadow-lg shadow-green-400/30 hover:shadow-green-600/50"
            aria-label="Log In"
          >
            Log In
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default LogIn;
