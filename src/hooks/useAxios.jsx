
// // import { useState, useEffect, useCallback, useMemo } from "react";
// // import axiosInstance from "../components/common/AxiosInstance";

// // const useAxios = (endpoint, config = {}, fetchOnMount = true, dependency = []) => {
// //   const [data, setData] = useState(null);
// //   const [loading, setLoading] = useState(fetchOnMount);
// //   const [error, setError] = useState(null);

// //   const memoizedConfig = useMemo(() => config, [JSON.stringify(config)]);

// //   const fetchData = useCallback(async (overrideConfig = {}) => {
// //     setLoading(true);
// //     setError(null);
// //     try {
// //       const response = await axiosInstance({
// //         url: endpoint,
// //         method: memoizedConfig.method || "GET",
// //         ...memoizedConfig,
// //         ...overrideConfig,
// //       });
// //       setData(response.data);
// //     } catch (err) {
// //       setError(err);
// //     } finally {
// //       setLoading(false);
// //     }
// //   }, [endpoint, memoizedConfig]);

// //   useEffect(() => {
// //     if (fetchOnMount) fetchData();
// //   }, [fetchData, ...dependency]);

// //   return { data, loading, error, refetch: fetchData };
// // };

// // export default useAxios;



// import { useState, useEffect, useCallback, useMemo } from "react";
// import axiosInstance from "../components/common/AxiosInstance";

// const useAxios = (endpoint, config = {}, fetchOnMount = true, dependency = []) => {
//   const [data, setData] = useState([]);
//   const [loading, setLoading] = useState(fetchOnMount);
//   const [error, setError] = useState(null);

//   // Memoize config to avoid unnecessary re-renders
//   const memoizedConfig = useMemo(() => config, [JSON.stringify(config)]);

//   const fetchData = useCallback(async (overrideConfig = {}) => {
//     setLoading(true);
//     setError(null);
//     try {
//       const response = await axiosInstance({
//         url: endpoint,
//         method: memoizedConfig.method || "GET",
//         ...memoizedConfig,
//         ...overrideConfig,
//       });
//       // If API returns { data: [...] } then setData(response.data.data)
//       // Otherwise, use response.data directly
//       setData(response.data?.data || response.data);
//     } catch (err) {
//       setError(err);
//       console.error("API Fetch Error:", err);
//     } finally {
//       setLoading(false);
//     }
//   }, [endpoint, memoizedConfig]);

//   useEffect(() => {
//     if (fetchOnMount) fetchData();
//   }, [fetchData, ...dependency]);

//   return { data, loading, error, refetch: fetchData };
// };

// export default useAxios;
import { useState, useEffect, useCallback, useMemo } from "react";
import axiosInstance from "../components/common/AxiosInstance";

const useAxios = (endpoint, config = {}, fetchOnMount = true, dependency = []) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(fetchOnMount);
  const [error, setError] = useState(null);

  const memoizedConfig = useMemo(() => config, [JSON.stringify(config)]);

  const fetchData = useCallback(async (overrideConfig = {}) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axiosInstance({
        url: endpoint,
        method: memoizedConfig.method || "GET",
        ...memoizedConfig,
        ...overrideConfig,
      });
      setData(response.data?.data || response.data);
    } catch (err) {
      setError(err);
      console.error("API Fetch Error:", err);
    } finally {
      setLoading(false);
    }
  }, [endpoint, memoizedConfig]);

  useEffect(() => {
    if (fetchOnMount) fetchData();
  }, [fetchData, ...(Array.isArray(dependency) ? dependency : [])]);

  return { data, loading, error, refetch: fetchData };
};

export default useAxios;

