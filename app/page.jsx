import Hero from "@/components/Hero";
import Collection from "@/components/Collection";
import FeaturedProducts from "@/components/FeaturedProducts";
import Offer from "@/components/Offer";
import Services from "@/components/Services";
import Testimonials from "@/components/Testimonials";
import Newsletter from "@/components/Newsletter";

export default function Home() {
  return (
    <>
      <Hero />
      <Collection />
      <FeaturedProducts />
      <Offer />
      <Services />
      <Testimonials />
      <Newsletter />
    </>
  );
}
