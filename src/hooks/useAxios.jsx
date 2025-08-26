
import { useState, useEffect, useCallback, useMemo } from "react";
import axiosInstance from "../components/common/AxiosInstance";

const useAxios = (endpoint, config = {}, fetchOnMount = true, dependency = []) => {
  const [data, setData] = useState(null);
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
      setData(response.data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, [endpoint, memoizedConfig]);

  useEffect(() => {
    if (fetchOnMount) fetchData();
  }, [fetchData, ...dependency]);

  return { data, loading, error, refetch: fetchData };
};

export default useAxios;


