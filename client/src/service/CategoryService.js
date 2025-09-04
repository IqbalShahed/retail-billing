import axios from "axios";

export const addCategory = async (category) => {
    return await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/v1/categories`, category, {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
    });
}

export const deleteCategory = async (categoryId) => {
    return await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/v1/categories/${categoryId}`, { withCredentials: true });
}

export const fetchCategories = async () => {
    return await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/v1/categories`, { withCredentials: true });
}