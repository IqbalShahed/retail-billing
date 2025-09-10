import React, { useEffect, useState, useMemo } from "react";
import Item from "./Item";
import { Search } from "lucide-react";

const DisplayItems = ({ items, selectedCategory }) => {
    const [searchText, setSearchText] = useState("");
    const [filteredItems, setFilteredItems] = useState([]);

    // Filter items whenever category or search changes
    useEffect(() => {
        let updated = items;

        // Category filter
        if (selectedCategory) {
            updated = updated.filter((item) => item.categoryId === selectedCategory);
        }

        // Search filter
        if (searchText.trim() !== "") {
            const lower = searchText.toLowerCase();
            updated = updated.filter(
                (item) =>
                    item.name.toLowerCase().includes(lower) ||
                    item.description.toLowerCase().includes(lower)
            );
        }

        setFilteredItems(updated);
    }, [searchText, selectedCategory, items]);

    return (
        <div className="flex flex-col gap-4">
            {/* Search Bar */}
            <div className="flex items-center w-full border border-gray-300 rounded-xl px-3 py-2 bg-white">
                <Search className="w-5 h-5 text-gray-400" />
                <input
                    type="text"
                    placeholder="Search items..."
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                    className="w-full ml-2 outline-none text-gray-700"
                />
            </div>

            {/* Items */}
            <div>
                {filteredItems.length > 0 ? (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                        {filteredItems.map((item) => (
                            <Item
                                key={item.itemId}
                                itemImg={item.imgUrl}
                                itemName={item.name}
                                itemPrice={item.price}
                                itemId={item.itemId}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="text-center text-gray-600 py-10">
                        No items found.
                    </div>
                )}
            </div>
        </div>
    );
};

export default DisplayItems;
