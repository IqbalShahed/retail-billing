import React from "react";
import { useNavigate } from "react-router";

const NotFound = () => {
    const navigate = useNavigate();

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-white text-center p-6">
            {/* 404 Text */}
            <h1 className="text-9xl font-extrabold text-gray-800">404</h1>
            <h2 className="text-2xl md:text-3xl font-semibold text-gray-700 mt-4">
                Oops! Page Not Found
            </h2>
            <p className="text-gray-500 mt-2 max-w-md">
                The page you are looking for might have been removed, had its name
                changed, or is temporarily unavailable.
            </p>

            {/* Back to Home Button */}
            <button
                onClick={() => navigate("/")}
                className="mt-6 px-6 py-3 bg-black text-white cursor-pointer rounded-2xl shadow-md hover:shadow-lg transition transform hover:scale-105"
            >
                Go Back Home
            </button>

            {/* Decorative illustration */}
            <div className="mt-10">
                <svg
                    className="w-64 h-64 mx-auto text-gray-300"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9.75 17L8.5 21l3.5-2.25L15.5 21l-1.25-4M4 4v16c0 .55.45 1 1 1h14a1 1 0 001-1V4a1 1 0 00-1-1H5a1 1 0 00-1 1z"
                    />
                </svg>
            </div>
        </div>
    );
};

export default NotFound;
