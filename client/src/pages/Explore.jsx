import React, { useContext, useState, useMemo } from "react";
import DisplayCategories from "../componants/DisplayCategories";
import DisplayItems from "../componants/DisplayItems";
import { AppContext } from "../context/AppContext";
import CustomerForm from "../componants/CustomerForm";
import CartItems from "../componants/CartItems";
import CartSummary from "../componants/CartSummary";

const Explore = () => {
    const { categories, items } = useContext(AppContext);
    const [selectedCategory, setSelectedCategory] = useState("");
    const [customerName, setCustomerName] = useState("");
    const [customerPhone, setCustomerPhone] = useState("");

    // Filter items by selected category
    const filteredItems = useMemo(() => {
        if (!selectedCategory) return items;
        return items.filter((item) => item.categoryId === selectedCategory);
    }, [items, selectedCategory]);

    return (
        <div className="flex flex-col gap-6 sm:flex-row pt-8 border-t-2 border-gray-200">
            {/* Left Section */}
            <div className="flex-1 flex flex-col gap-6">
                {/* Categories */}
                <div>
                    <h2 className="text-lg font-semibold text-gray-700 mb-3">Browse Categories</h2>
                    <DisplayCategories
                        categories={categories}
                        selectedCategory={selectedCategory}
                        setSelectedCategory={setSelectedCategory}
                    />
                </div>

                <hr className="border-gray-300" />

                {/* Items */}
                <div>
                    <h2 className="text-lg font-semibold text-gray-700 mb-3">
                        {selectedCategory
                            ? `Items in ${categories.find(c => c.categoryId === selectedCategory)?.name || "Category"}`
                            : "All Items"}
                    </h2>
                    <DisplayItems
                        items={filteredItems}
                        selectedCategory={selectedCategory}
                    />
                </div>
            </div>

            {/* Right Section: Cart / Customer Info */}
            <div className="w-full sm:w-[300px] lg:w-[350px] bg-white shadow-lg rounded-xl p-4 flex flex-col gap-4">
                <h2 className="text-lg font-semibold text-gray-700">Your Cart</h2>
                <hr />

                {/* Customer Info */}
                <div>
                    <CustomerForm
                        customerName={customerName}
                        setCustomerName={setCustomerName}
                        customerPhone={customerPhone}
                        setCustomerPhone={setCustomerPhone}
                    />
                </div>

                {/* Cart Items */}
                <div className="flex-1 overflow-y-auto">
                    <CartItems />
                </div>

                <hr />

                {/* Cart Summary */}
                <div>
                    <CartSummary
                        customerName={customerName}
                        setCustomerName={setCustomerName}
                        customerPhone={customerPhone}
                        setCustomerPhone={setCustomerPhone}
                    />
                </div>
            </div>
        </div>
    );
};

export default Explore;
