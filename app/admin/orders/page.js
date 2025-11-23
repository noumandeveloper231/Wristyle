"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Eye, Search } from "lucide-react";
import DataTable from "@/components/admin/DataTable";
import StatusBadge from "@/components/admin/StatusBadge";

export default function OrdersPage() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");
    const [selectedOrder, setSelectedOrder] = useState(null);

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
            const response = await fetch('/api/orders?admin=true');
            if (response.ok) {
                const data = await response.json();
                setOrders(data);
            }
        } catch (error) {
            console.error('Error fetching orders:', error);
            toast.error('Failed to load orders');
        } finally {
            setLoading(false);
        }
    };

    const handleStatusUpdate = async (orderId, newStatus) => {
        try {
            const response = await fetch(`/api/orders/${orderId}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status: newStatus }),
            });

            if (response.ok) {
                toast.success('Order status updated');
                fetchOrders();
                setSelectedOrder(null);
            } else {
                toast.error('Failed to update order status');
            }
        } catch (error) {
            console.error('Error updating order:', error);
            toast.error('Failed to update order status');
        }
    };

    const filteredOrders = orders.filter(order => {
        const matchesSearch = order._id.toString().includes(searchTerm) ||
            order.shippingAddress?.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = statusFilter === "all" || order.status === statusFilter;
        return matchesSearch && matchesStatus;
    });

    const columns = [
        {
            header: "Order ID",
            render: (row) => `#${row._id.toString().slice(-6).toUpperCase()}`,
        },
        {
            header: "Customer",
            render: (row) => row.user?.name || row.user?.email || "Unknown",
        },
        {
            header: "Items",
            render: (row) => row.items?.length || 0,
        },
        {
            header: "Total",
            render: (row) => `$${row.totalAmount?.toFixed(2) || '0.00'}`,
        },
        {
            header: "Status",
            render: (row) => <StatusBadge status={row.status} />,
        },
        {
            header: "Date",
            render: (row) => new Date(row.createdAt).toLocaleDateString(),
        },
        {
            header: "Actions",
            render: (row) => (
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        setSelectedOrder(row);
                    }}
                    className="p-2 text-amber-600 hover:bg-amber-50 rounded transition-colors"
                    title="View Details"
                >
                    <Eye className="w-4 h-4" />
                </button>
            ),
        },
    ];

    return (
        <div>
            <div className="mb-8">
                <h1 className="text-4xl font-serif font-bold text-gray-900">Orders</h1>
                <p className="text-gray-600 mt-2">Manage customer orders and fulfillment</p>
            </div>

            <div className="mb-6 flex flex-col sm:flex-row gap-4">
                <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                        type="text"
                        placeholder="Search orders..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-amber-600"
                    />
                </div>
                <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-amber-600"
                >
                    <option value="all">All Status</option>
                    <option value="pending">Pending</option>
                    <option value="processing">Processing</option>
                    <option value="completed">Completed</option>
                    <option value="cancelled">Cancelled</option>
                </select>
            </div>

            {loading ? (
                <div className="text-center py-12">
                    <p className="text-gray-500">Loading orders...</p>
                </div>
            ) : (
                <DataTable
                    columns={columns}
                    data={filteredOrders}
                    onRowClick={(row) => setSelectedOrder(row)}
                />
            )}

            {/* Order Details Modal */}
            {selectedOrder && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                        <div className="p-6 border-b border-gray-200 flex items-center justify-between">
                            <h2 className="text-2xl font-bold text-gray-900">Order Details</h2>
                            <button
                                onClick={() => setSelectedOrder(null)}
                                className="text-gray-500 hover:text-gray-700 text-2xl"
                            >
                                ×
                            </button>
                        </div>

                        <div className="p-6 space-y-6">
                            <div>
                                <h3 className="text-sm font-medium text-gray-500 mb-2">Order ID</h3>
                                <p className="text-lg font-semibold">#{selectedOrder._id.toString().slice(-6).toUpperCase()}</p>
                            </div>

                            <div>
                                <h3 className="text-sm font-medium text-gray-500 mb-2">Status</h3>
                                <select
                                    value={selectedOrder.status}
                                    onChange={(e) => handleStatusUpdate(selectedOrder._id, e.target.value)}
                                    className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-amber-600"
                                >
                                    <option value="pending">Pending</option>
                                    <option value="processing">Processing</option>
                                    <option value="completed">Completed</option>
                                    <option value="cancelled">Cancelled</option>
                                </select>
                            </div>

                            <div>
                                <h3 className="text-sm font-medium text-gray-500 mb-2">Shipping Address</h3>
                                <p className="text-gray-900">{selectedOrder.shippingAddress}</p>
                            </div>

                            <div>
                                <h3 className="text-sm font-medium text-gray-500 mb-2">Items</h3>
                                <div className="space-y-2">
                                    {selectedOrder.items?.map((item, index) => (
                                        <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded">
                                            <div>
                                                <p className="font-medium">{item.product?.name || 'Product'}</p>
                                                <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                                            </div>
                                            <p className="font-semibold">${item.price?.toFixed(2)}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="border-t pt-4">
                                <div className="flex justify-between items-center text-lg font-bold">
                                    <span>Total Amount</span>
                                    <span>${selectedOrder.totalAmount?.toFixed(2)}</span>
                                </div>
                            </div>

                            <div className="text-sm text-gray-500">
                                <p>Created: {new Date(selectedOrder.createdAt).toLocaleString()}</p>
                                <p>Updated: {new Date(selectedOrder.updatedAt).toLocaleString()}</p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
