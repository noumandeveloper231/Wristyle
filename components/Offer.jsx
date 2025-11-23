"use client";

import Link from "next/link";

export default function Offer() {
    return (
        <section className="py-20 overflow-hidden">
            {/* Offer 1 */}
            <div className="container mx-auto px-4 mb-20">
                <div className="flex flex-col md:flex-row items-center gap-10 bg-secondary/50 rounded-2xl p-8 md:p-0 overflow-hidden">
                    <div className="w-full md:w-1/2 p-4 md:p-12 flex flex-col justify-center">
                        <h3 className="text-2xl font-bold text-primary mb-2">
                            Limited Time <span className="text-accent font-script text-3xl ml-2">Offer</span>
                        </h3>
                        <h2 className="text-4xl md:text-5xl font-serif font-bold text-primary mb-6 leading-tight">
                            Special Edition Timepieces
                        </h2>
                        <p className="text-muted-foreground mb-8 text-lg">
                            Discover our exclusive range of watches — crafted for style, built for performance.
                            Shop today and enjoy <span className="font-bold text-primary">25% off</span> on all Special Editions.
                        </p>
                        <Link
                            href="/shop"
                            className="inline-block w-fit px-8 py-3 bg-primary text-primary-foreground font-bold rounded-sm hover:bg-accent hover:text-accent-foreground transition-colors"
                        >
                            Shop Now
                        </Link>
                    </div>
                    <div className="w-full md:w-1/2 relative h-[400px] md:h-[500px] flex items-center justify-center">
                        {/* Abstract Background Shape */}
                        <div className="absolute w-[120%] h-[120%] bg-white rounded-full blur-3xl opacity-50 -z-10 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
                        <img
                            src="/images/ed (1).png"
                            alt="Special Edition Watch"
                            className="relative z-10 max-w-[80%] max-h-[90%] object-contain drop-shadow-2xl transform hover:scale-105 transition-transform duration-500"
                        />
                    </div>
                </div>
            </div>

            {/* Offer 2 */}
            <div className="container mx-auto px-4">
                <div className="flex flex-col-reverse md:flex-row items-center gap-10">
                    <div className="w-full md:w-1/2 relative h-[400px] md:h-[500px] flex items-center justify-center">
                        <div className="absolute w-[80%] h-[80%] bg-accent/10 rounded-full -z-10 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
                        <img
                            src="/images/girl edition.png"
                            alt="For Her Collection"
                            className="relative z-10 max-w-[80%] max-h-[90%] object-contain drop-shadow-2xl transform hover:scale-105 transition-transform duration-500"
                        />
                    </div>
                    <div className="w-full md:w-1/2 p-4 md:p-12 flex flex-col justify-center text-right md:text-left">
                        <h3 className="text-2xl font-bold text-primary mb-2 text-right">
                            For your loved ones <span className="text-red-500">❤️</span>
                        </h3>
                        <h2 className="text-4xl md:text-5xl font-serif font-bold text-primary mb-6 leading-tight text-right">
                            Enjoy your precious time with us
                        </h2>
                        <p className="text-muted-foreground mb-8 text-lg text-right ml-auto max-w-xl">
                            Gift something timeless. Our collection for her is designed to capture hearts and create lasting memories.
                        </p>
                        <div className="flex justify-end">
                            <Link
                                href="/shop"
                                className="inline-block px-8 py-3 bg-accent text-accent-foreground font-bold rounded-sm hover:bg-primary hover:text-primary-foreground transition-colors"
                            >
                                Get Ready
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
