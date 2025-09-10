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

// API calls
export const createOrder = async (order) => {
    try {
        const res = await api.post("/api/v1/orders", order);
        return res;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};

export const deleteOrder = async (orderId) => {
    try {
        const res = await api.delete(`/api/v1/orders/${orderId}`);
        return res;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};

export const fetchOrders = async () => {
    try {
        const res = await api.get("/api/v1/orders");
        return res;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};