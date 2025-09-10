import React, { useEffect, useState } from "react";
import { fetchDashboardData } from "../service/DashboardService";
import { toast } from "react-toastify";

const Dashboard = () => {
    const [dashboardData, setDashboardData] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const loadData = async () => {
            try {
                setLoading(true);
                const res = await fetchDashboardData();
                setDashboardData(res.data);
            } catch (error) {
                console.error("Failed to fetch dashboard data", error);
                toast.error("Unable to load dashboard data");
            } finally {
                setLoading(false);
            }
        };
        loadData();
    }, []);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-40">
                <p className="text-gray-500 animate-pulse text-lg">
                    Loading dashboard...
                </p>
            </div>
        );
    }

    if (!dashboardData) {
        return (
            <div className="text-center text-gray-500 py-10">
                <p>No data available.</p>
            </div>
        );
    }

    const { todayOrderCount, todaySales, recentOrders } = dashboardData;

    return (
        <div className="max-w-full mx-auto p-4 space-y-10">
            {/* Summary Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-white rounded-xl shadow-md p-5 flex flex-col items-center justify-center hover:shadow-lg transition">
                    <p className="text-gray-500 text-xl">Today’s Orders</p>
                    <p className="text-3xl font-bold text-gray-800">
                        {todayOrderCount}
                    </p>
                </div>
                <div className="bg-white rounded-xl shadow-md p-5 flex flex-col items-center justify-center hover:shadow-lg transition">
                    <p className="text-gray-500 text-xl">Today’s Sales</p>
                    <p className="text-3xl font-bold text-gray-600">
                        ${todaySales.toFixed(2)}
                    </p>
                </div>
            </div>

            {/* Recent Orders */}
            <div className="bg-white rounded-xl shadow-md p-4">
                <h3 className="text-xl font-semibold text-gray-800 mb-3">
                    Recent Orders
                </h3>

                {recentOrders?.length === 0 ? (
                    <p className="text-gray-500 text-sm text-center py-6">
                        No recent orders found.
                    </p>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm border border-gray-200">
                            <thead className="bg-gray-100">
                                <tr>
                                    <th className="border px-3 py-2 text-left">Order ID</th>
                                    <th className="border px-3 py-2 text-left">Customer</th>
                                    <th className="border px-3 py-2 text-left">Phone</th>
                                    <th className="border px-3 py-2 text-right">Total</th>
                                    <th className="border px-3 py-2 text-center">Status</th>
                                    <th className="border px-3 py-2 text-right">Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                {recentOrders.map((order) => (
                                    <tr
                                        key={order.orderId}
                                        className="hover:bg-gray-50 transition"
                                    >
                                        <td className="border px-3 py-2 font-mono">
                                            {order.orderId}
                                        </td>
                                        <td className="border px-3 py-2">
                                            {order.customerName}
                                        </td>
                                        <td className="border px-3 py-2">
                                            {order.customerPhone}
                                        </td>
                                        <td className="border px-3 py-2 text-right font-medium">
                                            ${order.grandTotal.toFixed(2)}
                                        </td>
                                        <td className="border px-3 py-2 text-center">
                                            <span
                                                className={`px-2 py-1 text-xs rounded-full font-medium ${order.paymentDetails?.status === "COMPLETED"
                                                        ? "bg-gray-100 text-gray-700"
                                                        : "bg-gray-100 text-gray-700"
                                                    }`}
                                            >
                                                {order.paymentDetails?.status}
                                            </span>
                                        </td>
                                        <td className="border px-3 py-2 text-right text-gray-500">
                                            {new Date(order.createdAt).toLocaleString()}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Dashboard;
