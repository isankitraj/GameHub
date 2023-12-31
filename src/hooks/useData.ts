import { AxiosRequestConfig, CanceledError } from "axios";
import { useState, useEffect } from "react";
import { axiosInstance } from "../services/api-client";
// import apiClient from "../services/api-client";

export interface FetchResponse<T> {
  count: number;
  results: T[];
  next?: string | null;
}

const useData = <T>(
  endpoint: string,
  requestConfig?: AxiosRequestConfig,
  deps?: unknown[]
) => {
  const [data, setData] = useState<T[]>([]);
  const [error, setError] = useState("");
  const [isLoading, setLoading] = useState(false);

  useEffect(
    () => {
      const controller = new AbortController();

      setLoading(true);

      axiosInstance
        .get<FetchResponse<T>>(endpoint, {
          signal: controller.signal,
          ...requestConfig,
        })
        .then((response) => {
          setData(response.data.results);
          setLoading(false);
        })
        .catch((error) => {
          if (error instanceof CanceledError) {
            return;
          }
          setError(error.message);
          setLoading(false);
        });

      return () => controller.abort();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    deps ? [...deps] : []
  );

  return { data, error, isLoading };
};

export default useData;
