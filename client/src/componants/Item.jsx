import React, { useContext } from "react";
import { Plus, Minus } from "lucide-react";
import { AppContext } from "../context/AppContext";

const Item = ({ itemName, itemPrice, itemImg, itemId }) => {
    const { cartItems, setCartItems, addToCart } = useContext(AppContext);

    // find current quantity from global cart
    const cartItem = cartItems.find((ci) => ci.itemId === itemId);
    const quantity = cartItem ? cartItem.quantity : 0;

    const increment = () => {
        addToCart({ itemId, name: itemName, price: itemPrice, imgUrl: itemImg });
    };

    const decrement = () => {
        setCartItems((prev) =>
            prev
                .map((ci) =>
                    ci.itemId === itemId
                        ? { ...ci, quantity: ci.quantity - 1 }
                        : ci
                )
                .filter((ci) => ci.quantity > 0) // auto-remove if 0
        );
    };

    return (
        <div className="relative flex flex-col rounded-2xl shadow-md transition-all duration-300 overflow-hidden border border-gray-200 hover:shadow-lg bg-white">
            {/* Image */}
            <div className="h-32 w-full flex items-center justify-center bg-gray-50">
                <img
                    src={itemImg}
                    alt={itemName}
                    className="h-full object-contain p-2"
                />
            </div>

            {/* Content */}
            <div className="p-4 flex flex-col gap-2">
                <h3 className="text-lg font-semibold text-gray-800 truncate">
                    {itemName}
                </h3>
                <p className="text-sm font-medium text-gray-600">$ {itemPrice}</p>

                {/* Quantity Controller */}
                <div className="mt-2 flex items-center justify-between">
                    <button
                        onClick={decrement}
                        className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 transition"
                        disabled={quantity === 0}
                    >
                        <Minus className="w-4 h-4" />
                    </button>

                    <span className="text-base font-semibold">{quantity}</span>

                    <button
                        onClick={increment}
                        className="p-2 rounded-full bg-gray-500 hover:bg-gray-600 text-white transition"
                    >
                        <Plus className="w-4 h-4" />
                    </button>
                </div>  
            </div>
        </div>
    );
};

export default Item;
