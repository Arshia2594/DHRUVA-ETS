
import axios from "axios";

const BASE_API = import.meta.env.VITE_BASE_API_URL;

const axiosInstance = axios.create({
  baseURL: BASE_API, 
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API error:", error.response || error.message);
    return Promise.reject(error);
  }
);

export default axiosInstance;
// AxiosInstance.jsx
// import axios from "axios";

// const BASE_URL = import.meta.env.VITE_BASE_API_URL || "http://localhost:9000/api";

// const axiosInstance = axios.create({
//   baseURL: BASE_URL,
//   headers: {
//     "Content-Type": "application/json",
//   },
// });

// axiosInstance.interceptors.response.use(
//   (res) => res.data,
//   (err) => {
//     console.error("API error: ", err.response || err);
//     return Promise.reject(err);
//   }
// );

// export default axiosInstance;

