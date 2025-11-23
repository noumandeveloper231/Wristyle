"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { Quote } from "lucide-react";

const testimonials = [
    {
        id: 1,
        name: "Haider",
        location: "Lahore",
        text: "Absolutely stunning collection! The watch I bought is even better in person. Great service and fast delivery.",
        image: "/images/sample/profile1.jpeg",
    },
    {
        id: 2,
        name: "Usman",
        location: "Lahore",
        text: "I was looking for a gift for my wife and found the perfect necklace here. She loves it! Highly recommended.",
        image: "/images/sample/profile2.jpg",
    },
    {
        id: 3,
        name: "Ali",
        location: "Lahore",
        text: "Premium quality products at reasonable prices. The customer support team was very helpful in guiding me.",
        image: "/images/sample/profile3.jpeg",
    },
    {
        id: 4,
        name: "Omar",
        location: "Lahore",
        text: "The packaging was exquisite, and the product quality is top-notch. Will definitely shop again.",
        image: "/images/sample/profile3.jpeg",
    },
    {
        id: 5,
        name: "Taha",
        location: "Lahore",
        text: "A seamless shopping experience from start to finish. The website is easy to use and the products are amazing.",
        image: "/images/sample/profile5.jpg",
    },
];

export default function Testimonials() {
    return (
        <section className="py-20 bg-background">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl md:text-5xl font-serif font-bold text-center mb-16 text-primary">
                    Our Testimonials
                </h2>

                <Swiper
                    modules={[Autoplay, Pagination]}
                    spaceBetween={30}
                    slidesPerView={1}
                    loop={true}
                    autoplay={{
                        delay: 3000,
                        disableOnInteraction: false,
                    }}
                    pagination={{ clickable: true }}
                    breakpoints={{
                        640: { slidesPerView: 1 },
                        768: { slidesPerView: 2 },
                        1024: { slidesPerView: 3 },
                    }}
                    className="pb-12"
                >
                    {testimonials.map((testimonial) => (
                        <SwiperSlide key={testimonial.id}>
                            <div className="bg-secondary p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 h-full flex flex-col">
                                <div className="flex items-center gap-4 mb-6">
                                    <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-accent">
                                        <img
                                            src={testimonial.image}
                                            alt={testimonial.name}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-lg text-primary">{testimonial.name}</h4>
                                        <p className="text-sm text-muted-foreground">{testimonial.location}</p>
                                    </div>
                                    <Quote className="ml-auto w-8 h-8 text-accent/20" />
                                </div>
                                <p className="text-muted-foreground italic leading-relaxed grow">
                                    "{testimonial.text}"
                                </p>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </section>
    );
}
