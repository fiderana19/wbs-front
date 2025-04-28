import axios from "axios";

const axiosAuthInstance = axios.create({
  baseURL: import.meta.env.BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosAuthInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

export const axiosInstance = axios.create({
  baseURL: import.meta.env.BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosAuthInstance;
