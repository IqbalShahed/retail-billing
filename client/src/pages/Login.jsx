import React, { useContext, useState } from "react";
import { toast } from "react-toastify";
import { AppContext } from "../context/AppContext";
import { login } from "../service/LoginService";
import { useNavigate } from "react-router";

const Login = () => {
    const {loading, setAuthData, setLoading} = useContext(AppContext);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const data = {
        email,
        password
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await login(data);
            if(response.status === 200){
                toast.success("Login Successfull");
                localStorage.setItem("token", response.data.token);
                localStorage.setItem("role", response.data.role);
                setAuthData(response.data.token, response.data.role);
                navigate("/");
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.message || "Login failed. Try again.");
        } finally{
            setLoading(false);
        }
    };


    return (
        <div className="min-h-screen flex items-center justify-center w-full">
            <div className="bg-white shadow-md rounded-lg px-8 py-6 max-w-md">
                <div className="flex flex-col items-center justify-center mb-8">
                    <h1 className="text-2xl font-bold mb-4">Login Now!</h1>
                    <p>Login below to access your account</p>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3 min-w-72">
                        <p className="text-sm font-medium text-gray-700 mb-2">Email Address</p>
                        <input
                            type="email"
                            className="rounded-md w-full px-3 py-2 border border-gray-300 outline-none"
                            placeholder="Email"
                            required
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="mb-3 min-w-72">
                        <p className="text-sm font-medium text-gray-700 mb-2">Password</p>
                        <input
                            type="password"
                            className="rounded-md w-full px-3 py-2 border border-gray-300 outline-none"
                            placeholder="Password"
                            required
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <button disabled={loading} type="submit" className="mt-2 w-full py-2 px-4 rounded-md text-white bg-black cursor-pointer">
                        {loading ? "Login..." : "Login"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;