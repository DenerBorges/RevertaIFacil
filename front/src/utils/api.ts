import axios from "axios";

const api = axios.create({
  baseURL: "https://reverta-ifacil-back.vercel.app/api/v1/",
  // baseURL: "http://localhost:5000/api/v1/",
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("userToken");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default api;
