"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import { useRouter } from "next/navigation";
import "swiper/css";
import "swiper/css/pagination";
import Link from "next/link";

const brands = [
    "/images/cartiew.jpg",
    "/images/casio.jpg",
    "/images/franck muller.jpg",
    "/images/ga.jpg",
    "/images/rolex.jpg",
    "/images/tag heuer.jpg",
    "/images/tissiot.png",
    "/images/tomi.jpg",
];

const categories = [
    {
        id: 1,
        title: "Exclusive Watch Collection",
        description: "Timeless designs crafted for your style.",
        image: "/images/c1.jpg",
        category: "Watches",
    },
    {
        id: 2,
        title: "Premium Jewelry",
        description: "Elegant pieces that shine with you.",
        image: "/images/c2.png",
        category: "Jewelry",
    },
    {
        id: 3,
        title: "Luxury Accessories",
        description: "The perfect finishing touch.",
        image: "/images/c3.jpg",
        category: "Accessories",
    },
];

export default function Collection() {
    const router = useRouter();
    return (
        <section className="py-20 bg-background overflow-hidden">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl md:text-5xl font-serif font-bold text-center mb-12" data-aos="fade-up">
                    Our Luxury Collection
                </h2>

                {/* Brand Carousel */}
                <div className="mb-20">
                    <Swiper
                        modules={[Autoplay]}
                        spaceBetween={30}
                        slidesPerView={2}
                        loop={true}
                        autoplay={{
                            delay: 2500,
                            disableOnInteraction: false,
                        }}
                        breakpoints={{
                            640: { slidesPerView: 3 },
                            768: { slidesPerView: 4 },
                            1024: { slidesPerView: 5 },
                        }}
                        className="w-full"
                    >
                        {brands.map((brand, index) => (
                            <SwiperSlide key={index} className="flex items-center justify-center">
                                <div className="h-24 w-full flex items-center justify-center grayscale hover:grayscale-0 transition-all duration-300 opacity-60 hover:opacity-100">
                                    <img src={brand} alt={`Brand ${index}`} className="max-h-full max-w-full object-contain" />
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>

                {/* Category Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {categories.map((cat) => (
                        <div
                            onClick={() => router.push(`shop?category=${cat.category}`)}
                            key={cat.id}
                            className="group relative h-[400px] rounded-lg overflow-hidden shadow-lg cursor-pointer"
                        >
                            {/* Background Image */}
                            <div
                                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                                style={{ backgroundImage: `url('${cat.image}')` }}
                            ></div>

                            {/* Overlay */}
                            <div className="absolute inset-0 bg-black/30 group-hover:bg-black/50 transition-colors duration-300"></div>

                            {/* Content */}
                            <div className="absolute inset-0 flex flex-col justify-end p-8 text-white translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                                <h3 className="text-2xl font-serif font-bold mb-2">{cat.title}</h3>
                                <p className="text-gray-200 mb-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
                                    {cat.description}
                                </p>
                                <button className="w-fit px-6 py-2 bg-white text-black font-bold rounded-sm opacity-0 group-hover:opacity-100 transition-all duration-300 delay-200 hover:bg-accent hover:text-white">
                                    Shop Now
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
