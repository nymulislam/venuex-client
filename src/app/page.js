import FeaturedFacilities from "@/components/home/Featured";
import Hero from "@/components/home/Hero";
import HowItWorks from "@/components/home/HowItWorks";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans">
      <Hero />
      <FeaturedFacilities />
      <HowItWorks />
      <WhyChooseUs />
    </div>
  );
}
