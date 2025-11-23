"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { ShoppingCart, Search, Menu, X, User, LogOut } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/context/CartContext";
import { useRouter } from "next/navigation";
import { UserButton, useUser, SignOutButton } from "@clerk/nextjs";

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const { cart } = useCart();
    const { user, isSignedIn } = useUser();
    const router = useRouter();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <nav
            className={`fixed w-full z-999 transition-all duration-300 ${isScrolled
                ? "bg-secondary/80 backdrop-blur-md shadow-md py-2"
                : "bg-white py-1"
                }`}
        >
            <div className="container mx-auto px-4 flex justify-between items-center">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-3">
                    <Image
                        src="/logo.png"
                        alt="Wristyle Logo"
                        width={70}
                        height={70}
                        className="object-cover bg-whiet"
                    />
                    <span className="block text-[8px] font-sans font-normal tracking-[0.3em] text-accent">
                        BY NOUMAN TARIQ
                    </span>
                </Link>

                {/* Desktop Menu */}
                <div className="hidden md:flex items-center gap-8 font-medium text-primary">
                    <Link href="/" className="hover:text-accent transition-colors">Home</Link>
                    <Link href="/shop" className="hover:text-accent transition-colors">Shop</Link>
                    <Link href="/about" className="hover:text-accent transition-colors">About</Link>
                    <Link href="/contact" className="hover:text-accent transition-colors">Contact</Link>
                </div>

                {/* Icons */}
                <div className="hidden md:flex items-center gap-6 text-primary">
                    <button className="hover:text-accent transition-colors">
                        <Search className="w-5 h-5" />
                    </button>

                    <Link href="/cart" className="relative hover:text-accent transition-colors">
                        <ShoppingCart className="w-5 h-5" />
                        {cart.length > 0 && (
                            <span className="absolute -top-2 -right-2 bg-accent text-accent-foreground text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
                                {cart.reduce((total, item) => total + item.quantity, 0)}
                            </span>
                        )}
                    </Link>

                    {isSignedIn ? (
                        <div className="relative flex items-center gap-4">
                            <UserButton userProfileUrl="/profile" userProfileMode="modal" appearance={{ elements: { avatarBox: { width: "40px", height: "40px" } } }} afterSignOutUrl="/">
                                <UserButton.MenuItems>
                                    <UserButton.Link
                                        label="Admin Panel"
                                        href="/admin"
                                        labelIcon={<User className="w-4 h-4" />}
                                    />
                                </UserButton.MenuItems>
                            </UserButton>
                        </div>
                    ) : (
                        <Link href="/login" className="hover:text-accent transition-colors">
                            <button onClick={() => router.push('/login')} className="cursor-pointer bg-accent text-accent-foreground px-4 py-2 rounded-xl font-medium">
                                Log In
                            </button>
                        </Link>
                    )}
                </div>

                {/* Mobile Menu Button */}
                <button
                    className="md:hidden text-primary"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden bg-secondary border-t border-muted"
                    >
                        <div className="flex flex-col p-4 gap-4 font-medium text-primary">
                            <Link href="/" onClick={() => setIsOpen(false)}>Home</Link>
                            <Link href="/shop" onClick={() => setIsOpen(false)}>Shop</Link>
                            <Link href="/about" onClick={() => setIsOpen(false)}>About</Link>
                            <Link href="/contact" onClick={() => setIsOpen(false)}>Contact</Link>
                            <div className="border-t border-muted pt-4 flex flex-col gap-4">
                                {isSignedIn ? (
                                    <>
                                        <span className="text-sm text-muted-foreground">
                                            {user?.primaryEmailAddress?.emailAddress}
                                        </span>
                                        <Link href="/profile" onClick={() => setIsOpen(false)} className="flex items-center gap-2">
                                            <User className="w-4 h-4" /> My Profile
                                        </Link>
                                        <Link href="/admin" onClick={() => setIsOpen(false)} className="flex items-center gap-2">
                                            <User className="w-4 h-4" /> Admin Panel
                                        </Link>
                                        <SignOutButton>
                                            <button className="flex items-center gap-2 text-red-600">
                                                <LogOut className="w-4 h-4" /> Sign Out
                                            </button>
                                        </SignOutButton>
                                    </>
                                ) : (
                                    <Link href="/login" onClick={() => setIsOpen(false)} className="flex items-center gap-2">
                                        <User className="w-4 h-4" /> Sign In
                                    </Link>
                                )}
                                <Link href="/cart" onClick={() => setIsOpen(false)} className="flex items-center gap-2">
                                    <ShoppingCart className="w-4 h-4" /> Cart ({cart.length})
                                </Link>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}
