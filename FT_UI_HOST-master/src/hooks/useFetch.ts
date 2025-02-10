import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiService } from "../services/ApiService";
import useStore from "./useStore";

type methods = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";

type FetchState<T> = {
  data: T | null;
  loading: boolean;
  error: string | null;
};

const useFetch = <T>(
  method: methods,
  url: string,
  body?: any
): {
  fetchData: () => Promise<void>;
  data: T | null;
  loading: boolean;
  error: string | null;
} => {
  // stablish my state
  const [state, setState] = useState<FetchState<T>>({
    data: null,
    loading: false,
    error: null,
  });
  const navigate = useNavigate();
  const { setLoggedInContainer } = useStore();

  useEffect(() => {
    if (state.error === "Unauthorized") {
      setLoggedInContainer(false);
      localStorage.removeItem("authToken");
      navigate(`/auth/login`);
    }
  }, [state]);

  const fetchData: () => Promise<void> = useCallback(async () => {
    setState((prevState): FetchState<T> => ({ ...prevState, loading: true }));
    try {
      let data: T;
      switch (method) {
        case "GET":
          data = await apiService.get(url);
          break;
        case "POST":
          data = await apiService.post(url, body);
          break;
        case "PUT":
          data = await apiService.put(url, body);
          break;
        case "DELETE":
          data = await apiService.delete(url);
          break;
        case "PATCH":
          data = await apiService.patch(url, body);
          break;
        default:
          throw new Error("Invalid HTTP method");
      }

      setState((prevState: FetchState<T>) => ({
        data,
        loading: false,
        error: null,
      }));
    } catch (error: any) {
      setState((prevState: FetchState<T>) => ({
        data: null,
        loading: false,
        error: error?.message || "Unable to make your call",
      }));
    }
  }, [body, method, url]);

  return { ...state, fetchData };
};

export default useFetch;
