import React from "react";
import { motion } from "framer-motion";
import { div } from "framer-motion/client";

const Category = ({ name, image, items, isSelected, setSelectedCategory }) => {
    return (
        <div
            onClick={setSelectedCategory}
            className={`relative flex cursor-pointer rounded-2xl shadow-md transition-all duration-300 overflow-hidden border 
                ${isSelected ? "border-gray-500 ring-2 ring-gray-300" : "border-gray-200 hover:shadow-xl scale-110 transition ease-in-out"}
            `}
        >
            {/* Image */}
            <div className="h-32 w-full flex items-center justify-center bg-gray-50">
                <img
                    src={image}
                    alt={name}
                    className="h-full object-contain p-2"
                />
            </div>

            <div>
                {/* Selected Badge */}
                {isSelected && (
                    <div className="p-4">
                        <span className="absolute top-2 right-2 bg-gray-500 text-white text-xs px-2 py-1 rounded-full">
                            Selected
                        </span>
                    </div>
                )}

                {/* Content */}
                <div className="p-4">
                    <h3 className="text-lg font-semibold text-gray-800 truncate">{name}</h3>
                    <p className="mt-2 text-sm font-medium text-gray-600">{items} Items</p>
                </div>
            </div>
        </div>
    );
};

export default Category;
