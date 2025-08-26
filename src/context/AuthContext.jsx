import { createContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

const isTokenExpired = (token) => {
  try {
    const { exp } = jwtDecode(token);
    return Date.now() >= exp * 1000; // Check if current time exceeds expiration time
  } catch (error) {
    console.error("Error decoding token:", error);
    return true; // Treat errors as token expiry
  }
};

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [auth, setAuth] = useState({
    token: localStorage.getItem("token"),
    role: localStorage.getItem("role"),
    empId: localStorage.getItem("empId"), // Include empId
  });

  const checkTokenValidity = () => {
    const savedToken = localStorage.getItem("token");
    const savedRole = localStorage.getItem("role");
    if (savedToken && savedRole) {
      if (isTokenExpired(savedToken)) {
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        navigate("/login");
      } else {
        setAuth({ token: savedToken, role: savedRole });
      }
    }
  };

  useEffect(() => {
    checkTokenValidity();
  }, []);

  const login = (token, role, empId) => {
    localStorage.setItem("token", token);
    localStorage.setItem("role", role);
    localStorage.setItem("empId", empId); // Save empId
    setAuth({ token, role, empId });
  };

  const logout = () => {
    localStorage.clear();
    setAuth({ token: null, role: null, empId: null }); // Reset empId
  };

  return (
    <AuthContext.Provider value={{ auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
