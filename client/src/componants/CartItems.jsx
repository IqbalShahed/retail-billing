import React, { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { Plus, Minus, Trash2 } from "lucide-react";

const CartItems = () => {
    const { cartItems, setCartItems, addToCart } = useContext(AppContext);

    const increment = (item) => {
        addToCart(item);
    };

    const decrement = (itemId) => {
        setCartItems((prev) =>
            prev
                .map((item) =>
                    item.itemId === itemId
                        ? { ...item, quantity: item.quantity - 1 }
                        : item
                )
                .filter((item) => item.quantity > 0)
        );
    };

    const removeItem = (itemId) => {
        setCartItems((prev) => prev.filter((item) => item.itemId !== itemId));
    };

    if (!cartItems || cartItems.length === 0) {
        return (
            <div>
                <p className="text-sm font-medium text-gray-600 mb-2">Cart Items</p>
                <div className="text-gray-500 text-sm">No items yet.</div>
            </div>
        );
    }

    return (
        <div>
            <p className="text-sm font-medium text-gray-600 mb-2">Cart Items</p>
            <div className="space-y-3"> {/** overflow-y-auto max-h-20 (For Scroll bar) */}
                {cartItems.map((item) => (
                    <div
                        key={item.itemId}
                        className="flex items-center justify-between rounded-lg border p-3 shadow-sm"
                    >
                        {/* Item info */}
                        <div className="flex items-center gap-3">
                            <img
                                src={item.imgUrl}
                                alt={item.name}
                                className="h-12 w-12 rounded object-contain border"
                            />
                            <div>
                                <p className="text-sm font-medium text-gray-800">{item.name}</p>
                                <p className="text-xs text-gray-500">$ {item.price}</p>
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="flex items-center gap-2">
                            <button
                                onClick={() => decrement(item.itemId)}
                                className="rounded-full p-1 hover:bg-gray-200"
                            >
                                <Minus size={16} />
                            </button>
                            <span className="text-sm font-medium">{item.quantity}</span>
                            <button
                                onClick={() => increment(item)}
                                className="rounded-full p-1 hover:bg-gray-200"
                            >
                                <Plus size={16} />
                            </button>
                            <button
                                onClick={() => removeItem(item.itemId)}
                                className="ml-2 rounded-full p-1 text-red-500 hover:bg-red-100"
                            >
                                <Trash2 size={16} />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CartItems;
