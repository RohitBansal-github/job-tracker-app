// src/api/axios.js
import axios from "axios";

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,// ✅ Use env variable instead of hardcoded localhost
  withCredentials: true, 
});

instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      console.log("🔗 API Base URL:", import.meta.env.VITE_API_URL);
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default instance;
