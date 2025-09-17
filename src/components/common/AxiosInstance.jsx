
// import axios from "axios";

// const BASE_API = import.meta.env.VITE_BASE_API_URL;

// const axiosInstance = axios.create({
//   baseURL: BASE_API, 
//   timeout: 10000,
//   headers: {
//     "Content-Type": "application/json",
//   },
// });

// axiosInstance.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem("token");
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => Promise.reject(error)
// );

// axiosInstance.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     console.error("API error:", error.response || error.message);
//     return Promise.reject(error);
//   }
// );

// export default axiosInstance;
// import axios from "axios";

// const BASE_API = import.meta.env.VITE_BASE_API_URL;

// const axiosInstance = axios.create({
//   baseURL: BASE_API,
//   timeout: 10000,
//   headers: {
//     "Content-Type": "application/json",
//   },
// });

// // Add token to all requests
// axiosInstance.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem("token");
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`; //  fixed template literal
//     }
//     return config;
//   },
//   (error) => Promise.reject(error)
// );

// // Response interceptor for logging
// axiosInstance.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     console.error("API error:", error.response?.data || error.message);
//     return Promise.reject(error);
//   }
// );

// export default axiosInstance;
// // 

import axios from "axios";
import { loader } from "../../context/LoaderContext"; // adjust path as needed

const BASE_API = import.meta.env.VITE_BASE_API_URL;

const axiosInstance = axios.create({
  baseURL: BASE_API,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add token + loader to all requests
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    console.log(token);

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }


    //  Show global loader before request
    loader?.showLoader?.();

    return config;
  },
  (error) => {
    loader?.hideLoader?.(); // Hide loader on request error
    return Promise.reject(error);
  }
);

// Hide loader on response
axiosInstance.interceptors.response.use(
  (response) => {
    loader?.hideLoader?.();
    return response;
  },
  (error) => {
    loader?.hideLoader?.();
    console.error("API error:", error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export default axiosInstance;
