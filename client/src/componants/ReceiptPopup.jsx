import React from "react";

const ReceiptPopup = ({ orderDetails, onClose, onPrint }) => {
    console.log("Recipt", orderDetails)
    if (!orderDetails) return null;

    const {
        customerName,
        customerPhone,
        items,
        subtotal,
        tax,
        grandTotal,
        paymentMethod,
    } = orderDetails;

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white w-full max-w-md rounded-xl shadow-lg p-6 relative print:w-full print:max-w-full">
                {/* Header */}
                <div className="text-center border-b pb-3 mb-4">
                    <h2 className="text-2xl font-bold text-gray-800">Sales Receipt</h2>
                    <p className="text-xs text-gray-500">Thank you for your purchase!</p>
                </div>

                {/* Customer Info */}
                <div className="mb-4 text-sm space-y-1">
                    <p><span className="font-medium">Customer:</span> {customerName}</p>
                    <p><span className="font-medium">Phone:</span> {customerPhone}</p>
                    <p><span className="font-medium">Payment Method:</span> {paymentMethod}</p>
                </div>

                {/* Items Table */}
                <div className="mb-4 overflow-x-auto">
                    <table className="w-full text-sm border border-gray-300">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="border px-2 py-1 text-left w-1/2">Item</th>
                                <th className="border px-2 py-1 text-center w-1/6">Qty</th>
                                <th className="border px-2 py-1 text-right w-1/6">Price</th>
                                <th className="border px-2 py-1 text-right w-1/6">Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            {items.map((item) => (
                                <tr key={item.itemId}>
                                    <td className="border px-2 py-1">{item.name}</td>
                                    <td className="border px-2 py-1 text-center">{item.quantity}</td>
                                    <td className="border px-2 py-1 text-right">${item.price.toFixed(2)}</td>
                                    <td className="border px-2 py-1 text-right">
                                        ${(item.price * item.quantity).toFixed(2)}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Summary */}
                <div className="space-y-1 text-sm mb-4">
                    <div className="flex justify-between">
                        <span>Subtotal:</span>
                        <span>${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                        <span>Tax (15%):</span>
                        <span>${tax.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between font-bold text-base border-t pt-2">
                        <span>Total:</span>
                        <span>${grandTotal.toFixed(2)}</span>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="mt-4 flex justify-end gap-2 print:hidden">
                    <button
                        onClick={onPrint}
                        className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800"
                    >
                        Print
                    </button>
                    <button
                        onClick={onClose}
                        className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ReceiptPopup;
