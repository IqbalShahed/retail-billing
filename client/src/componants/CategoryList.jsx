import React, { useContext, useEffect, useState } from "react";
import { Search, Trash2 } from "lucide-react";
import { AppContext } from "../context/AppContext";

const CategoryList = () => {
    const {categories, loading, handleDelete} = useContext(AppContext);
    const [filteredCategories, setFilteredCategories] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");


    // Filter when searchTerm changes
    useEffect(() => {
        if (searchTerm.trim() === "") {
            setFilteredCategories(categories);
        } else {
            const lower = searchTerm.toLowerCase();
            setFilteredCategories(
                categories.filter(
                    (cat) =>
                        cat.name.toLowerCase().includes(lower) ||
                        cat.description.toLowerCase().includes(lower)
                )
            );
        }
    }, [searchTerm, categories]);

    return (
        <div className="flex flex-col w-full gap-4">
            {/* Search Bar */}
            <div className="flex items-center w-full border border-gray-300 rounded-xl px-3 py-2 bg-white">
                <Search className="w-5 h-5 text-gray-400" />
                <input
                    type="text"
                    placeholder="Search categories..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full ml-2 outline-none text-gray-700"
                />
            </div>

            {/* Category List */}
            <div className="bg-white shadow-md rounded-2xl p-4 max-h-[70vh] overflow-y-auto">
                {loading ? (
                    <p className="text-center text-gray-500">Loading categories...</p>
                ) : filteredCategories.length === 0 ? (
                    <p className="text-center text-gray-500">No categories found.</p>
                ) : (
                    <ul className="flex flex-col gap-3">
                        {filteredCategories.map((cat) => (
                            <li
                                key={cat.categoryId}
                                className="flex items-center justify-between gap-3 p-3 border border-gray-200 rounded-xl hover:shadow-sm transition"
                            >
                                {/* Left: Category image + info */}
                                <div className="flex items-center gap-3">
                                    <div
                                        className="w-12 h-12 flex-shrink-0 rounded-lg border border-gray-200 overflow-hidden flex items-center justify-center"
                                        style={{ backgroundColor: cat.bgColor || "#f5f5f5" }}
                                    >
                                        {cat.imgUrl ? (
                                            <img
                                                src={cat.imgUrl}
                                                alt={cat.name}
                                                className="w-full h-full object-cover"
                                            />
                                        ) : (
                                            <span className="text-xs text-gray-500">No Img</span>
                                        )}
                                    </div>

                                    <div className="flex flex-col">
                                        <span className="font-medium text-gray-800">{cat.name}</span>
                                        <span className="text-sm text-gray-500 line-clamp-1">
                                            {cat.description}
                                        </span>
                                    </div>
                                </div>

                                {/* Right: Delete Icon */}
                                <button
                                    onClick={() => handleDelete(cat.categoryId)}
                                    className="p-2 rounded-full hover:bg-red-100 text-red-500 transition"
                                >
                                    <Trash2 className="w-5 h-5" />
                                </button>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default CategoryList;
