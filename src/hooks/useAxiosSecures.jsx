import axios from "axios";
import { useEffect } from "react";

const useAxiosSecures = (navigate) => {
  const instance = axios.create({
    // baseURL:`${import.meta.env.VITE_LIVE_UR}/`
    baseURL: 'https://percel-management-app-server.vercel.app/',
  });

  useEffect(() => {
    // Request Interceptor
    const requestInterceptor = instance.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem("token");
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    // Response Interceptor
    const responseInterceptor = instance.interceptors.response.use(
      (response) => response,
      async (error) => {
        const status = error?.response?.status;
        if (status === 401 || status === 403) {
          navigate("/login"); // Use the passed navigate function
        }
        return Promise.reject(error);
      }
    );

    // Cleanup interceptors on unmount
    return () => {
      instance.interceptors.request.eject(requestInterceptor);
      instance.interceptors.response.eject(responseInterceptor);
    };
  }, [navigate]);

  return instance;
};

export default useAxiosSecures;
