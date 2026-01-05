import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ScrollToTop from "@/components/layout/ScrollToTop";
import HeroSection from "@/components/sections/HeroSection";
import AboutPreview from "@/components/sections/AboutPreview";
import VideoSection from "@/components/sections/VideoSection";
import RoomsPreview from "@/components/sections/RoomsPreview";
import BanquetHighlight from "@/components/sections/BanquetHighlight";
import BanquetHalls from "@/components/sections/BanquetHalls";
import BanquetGallery from "@/components/sections/BanquetGallery";
import AmenitiesSection from "@/components/sections/AmenitiesSection";
import GalleryPreview from "@/components/sections/GalleryPreview";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import CTASection from "@/components/sections/CTASection";

const Index = () => {
  return (
    <main className="min-h-screen">
      <Navbar />
      <HeroSection />
      <AboutPreview />
      <VideoSection />
      <RoomsPreview />
      <AmenitiesSection />
      <BanquetHalls />
      <BanquetGallery />
      <GalleryPreview />
      <TestimonialsSection />
      <CTASection />
      <Footer />
      <ScrollToTop />
    </main>
  );
};

export default Index;
