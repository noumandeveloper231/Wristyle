"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function Hero() {
    return (
        <section className="relative h-[90vh] w-full overflow-hidden flex items-center justify-center">
            {/* Background Image with Overlay */}
            <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat z-0"
                style={{ backgroundImage: "url('/images/main-bg.jpg')" }}
            >
                <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]"></div>
            </div>

            {/* Content */}
            <div className="container mx-auto px-4 relative z-10 text-center text-white">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                >
                    <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl font-bold mb-6 tracking-tight">
                        <span className="block text-accent font-script text-3xl md:text-4xl mb-4">Ready to be Unique</span>
                        Timeless Elegance
                    </h1>
                </motion.div>

                <motion.p
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                    className="text-lg md:text-2xl mb-10 max-w-2xl mx-auto font-light text-gray-200"
                >
                    Discover Premium Watches & Exquisite Jewelry. <br />
                    <span className="text-accent font-medium">Up to 25% Off</span> - Limited Time Only!
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.8 }}
                >
                    <Link
                        href="/shop"
                        className="inline-block px-8 py-4 bg-white text-primary font-bold text-lg rounded-sm hover:bg-accent hover:text-white transition-all duration-300 transform hover:-translate-y-1 shadow-lg"
                    >
                        Shop Collection
                    </Link>
                </motion.div>
            </div>
        </section>
    );
}
