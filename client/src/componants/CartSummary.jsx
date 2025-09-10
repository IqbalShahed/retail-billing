import React, { useContext, useMemo } from "react";
import { AppContext } from "../context/AppContext";

const CartSummary = () => {
    const { cartItems } = useContext(AppContext);

    // Calculate subtotal
    const subtotal = useMemo(() => {
        return cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
    }, [cartItems]);

    // 15% tax
    const tax = useMemo(() => subtotal * 0.15, [subtotal]);

    // Final total
    const total = useMemo(() => subtotal + tax, [subtotal, tax]);

    return (
        <div className="space-y-2 p-4 bg-white rounded-xl shadow-md">
            <div className="flex justify-between text-sm text-gray-700">
                <p>Items:</p>
                <p className="font-semibold">${subtotal.toFixed(2)}</p>
            </div>
            <div className="flex justify-between text-sm text-gray-700">
                <p>Tax (15%):</p>
                <p className="font-semibold">${tax.toFixed(2)}</p>
            </div>
            <hr />
            <div className="flex justify-between text-base font-bold text-gray-800">
                <p>Total:</p>
                <p>${total.toFixed(2)}</p>
            </div>
        </div>
    );
};

export default CartSummary;
