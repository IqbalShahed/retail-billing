import axios from "axios";

// Create axios instance with base config
const api = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
});

// Add Authorization header automatically
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// API calls
export const addUser = async (user) => {
  try {
    const res = await api.post("/api/v1/admin/register", user);
    return res.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const deleteUser = async (userId) => {
  try {
    const res = await api.delete(`/api/v1/admin/users/${userId}`);
    return res.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const fetchUsers = async () => {
  try {
    const res = await api.get("/api/v1/admin/users");
    return res.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};
