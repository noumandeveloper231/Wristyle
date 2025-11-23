"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Users, ShoppingBag, LayoutDashboard, PlusCircle, BarChart2, Package2 } from "lucide-react";
import { UserButton } from "@clerk/nextjs";

export default function AdminLayout({ children }) {
    const pathname = usePathname();

    const isActive = (path) => {
        return pathname === path;
    };

    const navItems = [
        { href: "/admin", icon: LayoutDashboard, label: "Dashboard" },
        { href: "/admin/products", icon: Package2, label: "Products" },
        { href: "/admin/add-product", icon: PlusCircle, label: "Add Product" },
        { href: "/admin/orders", icon: ShoppingBag, label: "Orders" },
        { href: "/admin/users", icon: Users, label: "Users" },
        { href: "/admin/analytics", icon: BarChart2, label: "Analytics" },
    ];

    return (
        <div className="flex min-h-screen bg-gray-100">
            {/* Sidebar */}
            <aside className="w-64 bg-white shadow-md p-6 flex flex-col">
                <div className="mb-8">
                    <h2 className="text-2xl font-serif font-bold text-amber-600">Admin Panel</h2>
                </div>
                <nav className="flex-1">
                    <ul>
                        {navItems.map((item) => {
                            const Icon = item.icon;
                            const active = isActive(item.href);

                            return (
                                <li key={item.href} className="mb-4">
                                    <Link
                                        href={item.href}
                                        className={`flex items-center px-3 py-2 rounded-lg transition-colors ${active
                                                ? 'bg-amber-50 text-amber-600 font-medium'
                                                : 'text-gray-600 hover:text-amber-600 hover:bg-gray-50'
                                            }`}
                                    >
                                        <Icon className="w-5 h-5 mr-3" />
                                        {item.label}
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>
                </nav>
                <div className="mt-auto">
                    <UserButton afterSignOutUrl="/" />
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-8">
                {children}
            </main>
        </div>
    );
}

