"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Edit, Trash2, Search, Plus } from "lucide-react";
import Link from "next/link";
import DataTable from "@/components/admin/DataTable";
import StatusBadge from "@/components/admin/StatusBadge";

export default function ProductsPage() {
    const router = useRouter();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [categoryFilter, setCategoryFilter] = useState("all");

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const response = await fetch('/api/products');
            if (response.ok) {
                const data = await response.json();
                setProducts(data);
            }
        } catch (error) {
            console.error('Error fetching products:', error);
            toast.error('Failed to load products');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (!confirm('Are you sure you want to delete this product?')) return;

        try {
            const response = await fetch(`/api/products/${id}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                toast.success('Product deleted successfully');
                fetchProducts();
            } else {
                toast.error('Failed to delete product');
            }
        } catch (error) {
            console.error('Error deleting product:', error);
            toast.error('Failed to delete product');
        }
    };

    const filteredProducts = products.filter(product => {
        const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            product.description.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = categoryFilter === "all" || product.category === categoryFilter;
        return matchesSearch && matchesCategory;
    });

    const columns = [
        {
            header: "Image",
            render: (row) => {
                const imageSrc = row.images && row.images.length > 0 ? row.images[0] : row.imageUrl;
                return (
                    <img src={imageSrc} alt={row.name} className="w-12 h-12 object-cover rounded" />
                );
            },
        },
        { header: "Name", accessor: "name" },
        { header: "Category", accessor: "category" },
        {
            header: "Price",
            render: (row) => `$${row.price.toFixed(2)}`,
        },
        {
            header: "Stock",
            render: (row) => (
                <span className={row.stock > 0 ? 'text-green-600 font-medium' : 'text-red-600 font-medium'}>
                    {row.stock}
                </span>
            ),
        },
        {
            header: "Status",
            render: (row) => <StatusBadge status={row.stock > 0 ? 'active' : 'inactive'} />,
        },
        {
            header: "Actions",
            render: (row) => (
                <div className="flex gap-2">
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            router.push(`/admin/edit-product/${row._id}`);
                        }}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded transition-colors"
                        title="Edit"
                    >
                        <Edit className="w-4 h-4" />
                    </button>
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            handleDelete(row._id);
                        }}
                        className="p-2 text-red-600 hover:bg-red-50 rounded transition-colors"
                        title="Delete"
                    >
                        <Trash2 className="w-4 h-4" />
                    </button>
                </div>
            ),
        },
    ];

    return (
        <div>
            <div className="mb-8 flex items-center justify-between">
                <div>
                    <h1 className="text-4xl font-serif font-bold text-gray-900">Products</h1>
                    <p className="text-gray-600 mt-2">Manage your product inventory</p>
                </div>
                <Link
                    href="/admin/add-product"
                    className="flex items-center gap-2 bg-amber-600 text-white px-6 py-3 rounded-lg hover:bg-amber-700 transition-colors font-medium"
                >
                    <Plus className="w-5 h-5" />
                    Add Product
                </Link>
            </div>

            <div className="mb-6 flex flex-col sm:flex-row gap-4">
                <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                        type="text"
                        placeholder="Search products..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-amber-600"
                    />
                </div>
                <select
                    value={categoryFilter}
                    onChange={(e) => setCategoryFilter(e.target.value)}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-amber-600"
                >
                    <option value="all">All Categories</option>
                    <option value="Watches">Watches</option>
                    <option value="Jewelry">Jewelry</option>
                    <option value="Accessories">Accessories</option>
                </select>
            </div>

            {loading ? (
                <div className="text-center py-12">
                    <p className="text-gray-500">Loading products...</p>
                </div>
            ) : (
                <DataTable
                    columns={columns}
                    data={filteredProducts}
                    onRowClick={(row) => router.push(`/admin/edit-product/${row._id}`)}
                />
            )}
        </div>
    );
}
