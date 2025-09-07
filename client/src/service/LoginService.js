import axios from "axios";

export const login = async (data)=>{
    return await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/v1/login`, data ,{ withCredentials: true });
}