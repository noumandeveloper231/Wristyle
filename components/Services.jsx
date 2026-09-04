"use client";

import { Truck, ShieldCheck, Tag } from "lucide-react";

const services = [
    {
        id: 1,
        icon: <Truck className="w-12 h-12 text-white" />,
        title: "Global Shipping",
        description: "We deliver to your doorstep, anywhere in the world. Fast and reliable shipping partners.",
        buttonText: "Shop Now",
    },
    {
        id: 2,
        icon: <ShieldCheck className="w-12 h-12 text-white" />,
        title: "Secure Payments",
        description: "Your security is our priority. We use encrypted payment gateways for safe transactions.",
        buttonText: "Learn More",
    },
    {
        id: 3,
        icon: <Tag className="w-12 h-12 text-white" />,
        title: "Best Offers",
        description: "Get the best deals on premium products. Join our membership for exclusive discounts.",
        buttonText: "Claim",
    },
];

export default function Services() {
    return (
        <section className="py-20 relative bg-cover bg-center bg-fixed" style={{ backgroundImage: "url('/images/primary-bg.jpg')" }}>
            <div className="absolute inset-0 bg-blue-900/30 backdrop-blur-sm"></div>
            <div className="container mx-auto px-4 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {services.map((service) => (
                        <div
                            key={service.id}
                            className="bg-white/10 backdrop-blur-md border border-white/20 p-8 rounded-xl text-center text-white hover:transform hover:-translate-y-2 transition-all duration-300 shadow-lg hover:shadow-2xl group"
                        >
                            <div className="bg-white/20 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                                {service.icon}
                            </div>
                            <h3 className="text-2xl font-serif font-bold mb-4">{service.title}</h3>
                            <p className="text-gray-200 mb-8 leading-relaxed">
                                {service.description}
                            </p>
                            <button className="px-6 py-2 border border-white rounded-full hover:bg-white hover:text-primary transition-colors font-medium">
                                {service.buttonText}
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
