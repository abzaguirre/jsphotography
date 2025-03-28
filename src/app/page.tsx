import AboutUs from "@/components/ui/AboutUs";
import ContactUs from "@/components/ui/ContactUs";
import Footer from "@/components/ui/Footer";
import GalleryCategories from "@/components/ui/GalleryCategories";
import GallerySection from "@/components/ui/GallerySection";
import HeroSection from "@/components/ui/HeroSection";

export default function Home() {
  return (
    <main className='relative w-full flex flex-col items-center'>
      <HeroSection />
      <div className='relative z-10 md:mt-[250vh] mt-[350vh] w-full'>
        <AboutUs />
        <GalleryCategories />
        <GallerySection />
        <ContactUs />
        <Footer />
      </div>
    </main>
  );
}
