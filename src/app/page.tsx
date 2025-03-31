import AboutUs from "@/components/ui/AboutUs";
import ContactUs from "@/components/ui/ContactUs";
import Footer from "@/components/ui/Footer";
import GalleryCategories from "@/components/ui/GalleryCategories";
import GallerySection from "@/components/ui/GallerySection";
import HeroSection from "@/components/ui/HeroSection";
import { getCategories } from "@/lib/getCategories";
import { getGalleryImages } from "@/lib/getGalleryImages";

export default async function Home() {

  const rawImages = await getCategories();
  const galleryImages = await getGalleryImages();

  const imagesByCategory = Object.entries(rawImages).reduce((acc, [category, imageUrls]) => {
    acc[category] = imageUrls.map((url) => ({
      src: url,
      width: "1000",
      height: "100",
      alt: category,
    }));
    return acc;
  }, {} as Record<string, { src: string; width: string; height: string; alt: string }[]>);


  const orientation = ["row-span-1", "row-span-2", ""];

  const galleryPhotos = galleryImages.map(img => ({
    src: img,
    width: "1000",
    height: "100",
    alt: "",
    className: orientation[Math.floor(Math.random() * orientation.length)], // Apply random orientation
  }));


  return (
    <main className='relative w-full flex flex-col items-center'>
      <HeroSection />
      <div className='relative z-10 md:mt-[250vh] mt-[350vh] w-full'>
        <AboutUs />
        <GalleryCategories categories={imagesByCategory} />
        <GallerySection galleryPhotos={galleryPhotos} />
        <ContactUs />
        <Footer />
      </div>
    </main>
  );
}
