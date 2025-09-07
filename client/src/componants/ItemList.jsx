import React, { useContext, useEffect, useState } from "react";
import { Search, Tag, Trash2 } from "lucide-react";
import { AppContext } from "../context/AppContext";

const ItemList = () => {
    const { items, loading, handleDeleteItem } = useContext(AppContext);
    const [filteredItems, setFilteredItems] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");


    // Filter when searchTerm changes
    useEffect(() => {
        if (searchTerm.trim() === "") {
            setFilteredItems(items);
        } else {
            const lower = searchTerm.toLowerCase();
            setFilteredItems(
                items.filter(
                    (item) =>
                        item.name.toLowerCase().includes(lower) ||
                        item.description.toLowerCase().includes(lower)
                )
            );
        }
    }, [searchTerm, items]);

    return (
        <div className="flex flex-col w-full gap-4">
            {/* Search Bar */}
            <div className="flex items-center w-full border border-gray-300 rounded-xl px-3 py-2 bg-white">
                <Search className="w-5 h-5 text-gray-400" />
                <input
                    type="text"
                    placeholder="Search items..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full ml-2 outline-none text-gray-700"
                />
            </div>

            {/* Category List */}
            <div className="bg-white shadow-md rounded-2xl p-4 max-h-[70vh] overflow-y-auto">
                {loading ? (
                    <p className="text-center text-gray-500">Loading items...</p>
                ) : filteredItems.length === 0 ? (
                    <p className="text-center text-gray-500">No items found.</p>
                ) : (
                    <ul className="flex flex-col gap-3">
                        {filteredItems.map((item) => (
                            <li
                                key={item.itemId}
                                className="flex items-center justify-between gap-3 p-3 border border-gray-200 rounded-xl hover:shadow-sm transition"
                            >
                                {/* Left: Item image + info */}
                                <div className="flex items-center gap-3">
                                    <div
                                        className="w-12 h-12 flex-shrink-0 rounded-lg border border-gray-200 overflow-hidden flex items-center justify-center"
                                        style={{ backgroundColor: "#f5f5f5" }}
                                    >
                                        {item.imgUrl ? (
                                            <img
                                                src={item.imgUrl}
                                                alt={item.name}
                                                className="w-full h-full object-cover"
                                            />
                                        ) : (
                                            <span className="text-xs text-gray-500">No Img</span>
                                        )}
                                    </div>
                                    <div>
                                        <div className="flex flex-col">
                                            <span className="font-medium text-gray-800">{item.name}</span>
                                            <span className="text-sm text-gray-500 line-clamp-1">
                                                {item.description}
                                            </span>
                                        </div>
                                        {/* Price + Category */}
                                        <div className="flex justify-between items-center mt-auto">
                                            <span className="text-green-600 font-semibold">
                                                ${item.price.toFixed(2)}
                                            </span>
                                            <span className="flex items-center text-xs bg-gray-100 px-2 py-1 rounded-full text-gray-700">
                                                <Tag className="w-3 h-3 mr-1" />
                                                {item.categoryName}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                {/* Right: Delete Icon */}
                                <button
                                    onClick={() => handleDeleteItem(item.itemId)}
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

export default ItemList;
