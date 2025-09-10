import React, { useContext, useMemo, useState } from "react";
import { AppContext } from "../context/AppContext";
import { createOrder } from "../service/OrderService";
import { toast } from "react-toastify";
import ReceiptPopup from "./ReceiptPopup";
import { Flashlight, ShipWheel } from "lucide-react";

const CartSummary = ({ customerName, setCustomerName, customerPhone, setCustomerPhone }) => {
    const { cartItems, clearCart } = useContext(AppContext);
    const [isProcessing, setIsProcessing] = useState(false);
    const [orderDetails, setOrderDetails] = useState(null);
    const [showPopup, setShowPopup] = useState(false);

    // Subtotal
    const subtotal = useMemo(
        () => cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0),
        [cartItems]
    );

    // Tax (15%)
    const tax = useMemo(() => subtotal * 0.15, [subtotal]);

    // Final total
    const total = useMemo(() => subtotal + tax, [subtotal, tax]);

    const completePayment = async (paymentMethod) => {
        if (!customerName || !customerPhone) {
            toast.error("Please enter customer details");
            return false;
        }
        if (cartItems.length === 0) {
            toast.error("Your cart is empty");
            return false;
        }

        const orderData = {
            customerName,
            customerPhone,
            cartItems,
            subtotal,
            tax,
            grandTotal: total,
            paymentMethod: paymentMethod.toUpperCase(),
        };

        setIsProcessing(true);
        try {
            const res = await createOrder(orderData);
            if (res.status === 201 && paymentMethod === "cash") {
                setOrderDetails(res.data);
                toast.success("Payment successful");
                setShowPopup(true);
                clearAll()
            } else {
                toast.error("Failed to create order");
            }
        } catch (error) {
            console.error(error);
            toast.error("Payment processing failed");
        } finally {
            setIsProcessing(false);
        }
    };


    const clearAll = () => {
        setCustomerName("");
        setCustomerPhone("");
        clearCart();
    };

    const handlePrintReceipt = () => {
        window.print();
    }

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

            <button className="flex-1 w-full py-3 mt-4 bg-black text-white rounded-lg cursor-pointer" onClick={() => completePayment("cash")} disabled={isProcessing}>
                {isProcessing ? "Processing...." : "CASH"}
            </button>
            {/* Receipt Popup */}
            {showPopup && (
                <ReceiptPopup
                    orderDetails={orderDetails}
                    onClose={() => { setShowPopup(false) }}
                    onPrint={handlePrintReceipt}
                />
            )}
        </div>
    );
};

export default CartSummary;
