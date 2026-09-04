"use client";

import { Send } from "lucide-react";

export default function Newsletter() {
    return (
        <section className="py-20 bg-primary text-primary-foreground">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row items-center justify-between gap-10">
                    <div className="w-full md:w-1/2">
                        <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">
                            Subscribe to our <span className="text-accent font-script text-4xl ml-2">Newsletter</span>
                        </h2>
                        <p className="text-gray-300 text-lg max-w-lg">
                            Stay updated with our latest collections, exclusive offers, and style tips. Join our community today.
                        </p>
                    </div>
                    <div className="w-full md:w-1/2">
                        <form className="flex flex-col sm:flex-row flex-wrap gap-4">
                            <input
                                type="email"
                                placeholder="Enter your Email"
                                className="grow px-6 py-4 rounded-md bg-white/10 border border-white/20 text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-accent"
                            />
                            <input
                                type="text"
                                placeholder="Enter your Name"
                                className="grow px-6 py-4 rounded-md bg-white/10 border border-white/20 text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-accent"
                            />
                            <button
                                type="submit"
                                className="px-8 py-4 bg-accent text-accent-foreground font-bold rounded-md hover:bg-white hover:text-primary transition-colors flex items-center justify-center gap-2"
                            >
                                Subscribe <Send className="w-4 h-4" />
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}
