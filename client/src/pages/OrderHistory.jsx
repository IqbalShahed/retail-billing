import React, { useEffect, useState } from "react";
import { fetchOrders } from "../service/OrderService";

const OrderHistory = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const loadData = async () => {
            try {
                setLoading(true);
                const res = await fetchOrders();
                setOrders(res.data || []);
            } catch (error) {
                console.error("Fetch Orders Error:", error);
            } finally {
                setLoading(false);
            }
        };
        loadData();
    }, []);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-40">
                <p className="text-gray-500 animate-pulse">Loading orders...</p>
            </div>
        );
    }

    if (orders.length === 0) {
        return (
            <div className="text-center text-gray-500 py-10">
                <p>No orders found.</p>
            </div>
        );
    }

    return (
        <div className="max-w-full mx-auto p-4">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 text-left">
                All Orders
            </h2>

            <div className="space-y-4">
                {orders.map((order) => (
                    <div
                        key={order.orderId}
                        className="bg-white rounded-xl shadow-md p-4 border hover:shadow-lg transition"
                    >
                        {/* Order Header */}
                        <div className="flex justify-between items-center border-b pb-2 mb-3">
                            <p className="text-sm text-gray-600">
                                <span className="font-medium">Order ID:</span>{" "}
                                {order.orderId}
                            </p>
                            <span
                                className={`px-2 py-1 text-xs rounded-full font-medium ${order.status === "COMPLETED"
                                        ? "bg-green-100 text-green-700"
                                        : "bg-yellow-100 text-yellow-700"
                                    }`}
                            >
                                {order.status}
                            </span>
                        </div>

                        {/* Customer Info */}
                        <div className="text-sm mb-3 space-y-1">
                            <p>
                                <span className="font-medium">Customer:</span>{" "}
                                {order.customerName}
                            </p>
                            <p>
                                <span className="font-medium">Phone:</span>{" "}
                                {order.customerPhone}
                            </p>
                            <p>
                                <span className="font-medium">Date:</span>{" "}
                                {new Date(order.createdAt).toLocaleString()}
                            </p>
                        </div>

                        {/* Items */}
                        <div className="mb-3 overflow-x-auto">
                            <table className="w-full text-sm border border-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="border px-2 py-1 text-left">Item</th>
                                        <th className="border px-2 py-1 text-center">Qty</th>
                                        <th className="border px-2 py-1 text-right">Price</th>
                                        <th className="border px-2 py-1 text-right">Total</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {order.items?.map((item) => (
                                        <tr key={item.itemId}>
                                            <td className="border px-2 py-1">{item.name}</td>
                                            <td className="border px-2 py-1 text-center">
                                                {item.quantity}
                                            </td>
                                            <td className="border px-2 py-1 text-right">
                                                ${item.price.toFixed(2)}
                                            </td>
                                            <td className="border px-2 py-1 text-right">
                                                ${(item.price * item.quantity).toFixed(2)}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* Summary */}
                        <div className="flex justify-between text-sm border-t pt-2">
                            <div>
                                <p>Subtotal: ${order.subtotal.toFixed(2)}</p>
                                <p>Tax (15%): ${order.tax.toFixed(2)}</p>
                                <p className="font-medium">
                                    Payment: {order.paymentMethod}
                                </p>
                            </div>
                            <div className="text-right font-bold text-lg">
                                Total: ${order.grandTotal.toFixed(2)}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default OrderHistory;
