import axios from "axios";

// Create axios instance with base config
const api = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL,
})

// Add Authorization header automatically
api.interceptors.request.use(config => {
    const token = localStorage.getItem("token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config;
})

// API Calls
export const fetchDashboardData = async () => {
    try {
        const res = await api.get("/api/v1/dashboard");
        return res;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};