import React from "react";

const CustomerForm = ({ customerName, setCustomerName, customerPhone, setCustomerPhone }) => {
    return (
        <div className="space-y-3">
            <p className="text-sm font-medium text-gray-600">Customer Info</p>

            {/* Name Input */}
            <input
                type="text"
                placeholder="Enter name"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                className="w-full rounded-lg border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-500"
            />

            {/* Phone Input */}
            <input
                type="tel"
                placeholder="Enter phone number"
                value={customerPhone}
                onChange={(e) => setCustomerPhone(e.target.value)}
                className="w-full rounded-lg border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-500"
            />
        </div>
    );
};

export default CustomerForm;
