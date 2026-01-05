import { motion } from "framer-motion";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ScrollToTop from "@/components/layout/ScrollToTop";
import banquetWedding from "@/assets/banquet/banquet.webp";
import BanquetAbout from "@/components/sections/BanquetAbout";
import BanquetHalls from "@/components/sections/BanquetHalls";
import BanquetImageGallery from "@/components/sections/BanquetImageGallery";
import Banquet360View from "@/components/sections/Banquet360View";

const Banquet = () => {
  return (
    <main className="min-h-screen">
      <Navbar />
      
      {/* Hero Banner */}
      <section className="relative h-[40vh] md:h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={banquetWedding}
            alt="Banquet Hall"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-hero-overlay" />
        </div>
        <div className="container-luxury relative z-10 text-center pt-16 md:pt-20">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-block text-accent text-xs md:text-sm tracking-[0.2em] md:tracking-[0.3em] uppercase font-semibold mb-2 md:mb-4"
          >
            Royal Celebrations
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-serif text-2xl md:text-4xl lg:text-6xl font-semibold text-primary-foreground mb-3 md:mb-6"
          >
            Banquet & Events
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-primary-foreground/90 text-sm md:text-lg max-w-2xl mx-auto"
          >
            Transform your special occasions into legendary celebrations
          </motion.p>
        </div>
      </section>

      {/* About Section */}
      <BanquetAbout />

      {/* Banquet Halls */}
      <BanquetHalls />

      {/* Image Gallery */}
      <BanquetImageGallery />

      {/* 360 Virtual Tour */}
      <Banquet360View />

      <Footer />
      <ScrollToTop />
    </main>
  );
};

export default Banquet;
