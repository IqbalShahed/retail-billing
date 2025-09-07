import axios from "axios";

export const addCategory = async (category) => {
    return await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/v1/admin/categories`, category, 
        {headers: {'Authorization': `Bearer ${localStorage.getItem('token')}`}}
    );
}

export const deleteCategory = async (categoryId) => {
    return await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/v1/admin/categories/${categoryId}`, 
        {headers: {'Authorization': `Bearer ${localStorage.getItem('token')}`}}
    );
}

export const fetchCategories = async () => {
    return await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/v1/categories`, 
        {headers: {'Authorization': `Bearer ${localStorage.getItem('token')}`}}
    );
}