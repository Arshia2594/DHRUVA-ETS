
import { createContext, useState, useEffect, useContext } from "react";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

const isTokenExpired = (token) => {
  try {
    const { exp } = jwtDecode(token);
    return Date.now() >= exp * 1000;
  } catch (error) {
    console.error("Error decoding token:", error);
    return true;
  }
};

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();

  const [auth, setAuth] = useState(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    const empId = localStorage.getItem("empId");
    return { token, role, empId };
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token && isTokenExpired(token)) {
      logout();
      navigate("/login");
    }
  }, []);

  const login = (token, role, empId) => {
    const formattedRole =
      role.charAt(0).toUpperCase() + role.slice(1).toLowerCase();
    localStorage.setItem("token", token);
    localStorage.setItem("role", formattedRole);
    localStorage.setItem("empId", empId);
    setAuth({ token, role: formattedRole, empId });
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("empId");
    setAuth({ token: null, role: null, empId: null });
  };

  return (
    <AuthContext.Provider value={{ auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// 👇 यही hook आपको import करना है ProjectSummary.jsx में
export const useAuth = () => useContext(AuthContext);

export default AuthContext;
