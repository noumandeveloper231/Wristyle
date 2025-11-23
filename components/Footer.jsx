import Link from "next/link";
import { Facebook, Instagram, Twitter, Linkedin } from "lucide-react";

export default function Footer() {
    return (
        <footer className="bg-secondary text-secondary-foreground pt-16 pb-8 border-t border-muted">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
                    {/* Brand Section */}
                    <div className="col-span-1 md:col-span-1">
                        <Link href="/" className="flex flex-col gap-1 mb-4">
                            <h2 className="text-2xl font-serif font-bold tracking-tighter text-primary">
                                WRISTYLE
                            </h2>
                            <span className="text-[10px] uppercase tracking-widest text-muted-foreground">
                                by Nouman Tariq
                            </span>
                        </Link>
                        <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
                            Timeless elegance for every moment. Discover our premium collection of watches and jewelry designed to make you stand out.
                        </p>
                        <div className="flex gap-4">
                            <a href="#" className="p-2 bg-background rounded-full hover:bg-accent hover:text-accent-foreground transition-colors shadow-sm">
                                <Facebook className="w-4 h-4" />
                            </a>
                            <a href="#" className="p-2 bg-background rounded-full hover:bg-accent hover:text-accent-foreground transition-colors shadow-sm">
                                <Instagram className="w-4 h-4" />
                            </a>
                            <a href="#" className="p-2 bg-background rounded-full hover:bg-accent hover:text-accent-foreground transition-colors shadow-sm">
                                <Twitter className="w-4 h-4" />
                            </a>
                        </div>
                    </div>

                    {/* Links Section 1 */}
                    <div>
                        <h3 className="font-serif font-bold text-lg mb-4">Shop</h3>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li><Link href="#" className="hover:text-accent transition-colors">For Him</Link></li>
                            <li><Link href="#" className="hover:text-accent transition-colors">For Her</Link></li>
                            <li><Link href="#" className="hover:text-accent transition-colors">New Arrivals</Link></li>
                            <li><Link href="#" className="hover:text-accent transition-colors">Best Sellers</Link></li>
                        </ul>
                    </div>

                    {/* Links Section 2 */}
                    <div>
                        <h3 className="font-serif font-bold text-lg mb-4">Support</h3>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li><Link href="#" className="hover:text-accent transition-colors">Contact Us</Link></li>
                            <li><Link href="#" className="hover:text-accent transition-colors">FAQs</Link></li>
                            <li><Link href="#" className="hover:text-accent transition-colors">Shipping & Returns</Link></li>
                            <li><Link href="#" className="hover:text-accent transition-colors">Order Tracking</Link></li>
                        </ul>
                    </div>

                    {/* Newsletter */}
                    <div>
                        <h3 className="font-serif font-bold text-lg mb-4">Newsletter</h3>
                        <p className="text-sm text-muted-foreground mb-4">
                            Subscribe to get special offers, free giveaways, and once-in-a-lifetime deals.
                        </p>
                        <form className="flex flex-col gap-2">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="px-4 py-2 rounded-md border border-muted bg-background focus:outline-none focus:ring-1 focus:ring-accent text-sm"
                            />
                            <button className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-accent hover:text-accent-foreground transition-colors text-sm font-medium">
                                Subscribe
                            </button>
                        </form>
                    </div>
                </div>

                <div className="border-t border-muted pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-muted-foreground">
                    <p>&copy; {new Date().getFullYear()} Wristyle by Nouman Tariq. All rights reserved.</p>
                    <div className="flex gap-4">
                        <Link href="#" className="hover:text-primary transition-colors">Privacy Policy</Link>
                        <Link href="#" className="hover:text-primary transition-colors">Terms of Service</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
