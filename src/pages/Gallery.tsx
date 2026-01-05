import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ScrollToTop from "@/components/layout/ScrollToTop";
import SectionHeading from "@/components/shared/SectionHeading";
import VideoGallerySection from "@/components/sections/VideoGallerySection";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

// Hero
import heroLobby from "@/assets/hotel/hotel1.webp";

// Banquet
import Banquet1 from "@/assets/banquet/banquet.webp";
import Banquet2 from "@/assets/banquet/banquet2.webp";
import Banquet3 from "@/assets/banquet/banquet3.webp";
import Banquet4 from "@/assets/banquet/banquet4.webp";
import Banquet5 from "@/assets/banquet/banquet5.webp";

// Hotel
import Hotel1 from "@/assets/hotel/hotel1.webp";
import Hotel2 from "@/assets/hotel/hotel2.webp";
import Hotel3 from "@/assets/hotel/hotel3.webp";
import Hotel4 from "@/assets/hotel/hotel4.webp";

// Restaurant
import Restaurant1 from "@/assets/restaurant/1.webp";
import Restaurant2 from "@/assets/restaurant/2.webp";
import Restaurant3 from "@/assets/restaurant/3.webp";
import Restaurant4 from "@/assets/restaurant/4.webp";
import Restaurant5 from "@/assets/restaurant/5.webp";

// Rooms
import Suite1 from "@/assets/suites/5.webp";
import Suite2 from "@/assets/suites/6.webp";
import Suite3 from "@/assets/suites/7.webp";
import Deluxe1 from "@/assets/deluxe/1.webp";
import Deluxe2 from "@/assets/deluxe/2.webp";
import Deluxe3 from "@/assets/deluxe/3.webp";

/* ==============================
   GALLERY IMAGES (FINAL)
================================ */
const images = [
  { src: Hotel1, alt: "Hotel Exterior View", category: "Hotel" },
  { src: Deluxe1, alt: "Deluxe Room", category: "Rooms" },
  { src: Banquet1, alt: "Banquet Hall Setup", category: "Banquet" },
  { src: Restaurant1, alt: "Fine Dining", category: "Restaurant" },

  { src: Suite1, alt: "Executive Suite", category: "Rooms" },
  { src: Hotel2, alt: "Hotel Lobby", category: "Hotel" },
  { src: Deluxe2, alt: "Premium Deluxe Room", category: "Rooms" },
  { src: Hotel3, alt: "Hotel Reception", category: "Hotel" },

  // ✅ All Events merged into Banquet
  { src: Banquet2, alt: "Wedding Reception Hall", category: "Banquet" },
  { src: Banquet3, alt: "Royal Wedding Setup", category: "Banquet" },
  { src: Banquet4, alt: "Grand Banquet Celebration", category: "Banquet" },
  { src: Banquet5, alt: "Luxury Event Decor", category: "Banquet" },

  { src: Restaurant2, alt: "Restaurant Interior", category: "Restaurant" },
  { src: Suite2, alt: "Luxury Suite", category: "Rooms" },
  { src: Hotel4, alt: "Hotel Facilities", category: "Hotel" },
  { src: Restaurant3, alt: "Restaurant Ambience", category: "Restaurant" },
  { src: Deluxe3, alt: "Deluxe Room View", category: "Rooms" },
  { src: Restaurant4, alt: "Dining Area", category: "Restaurant" },
    { src: Restaurant5, alt: "Dining Area", category: "Restaurant" },
  { src: Suite3, alt: "Premium Suite", category: "Rooms" },
];

/* ==============================
   FILTER CATEGORIES (FINAL)
================================ */
const categories = ["All", "Hotel", "Rooms", "Banquet", "Restaurant"];

const Gallery = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState<number>(0);

  const filteredImages =
    selectedCategory === "All"
      ? images
      : images.filter((img) => img.category === selectedCategory);

  const handleImageClick = (src: string, index: number) => {
    setSelectedImage(src);
    setSelectedImageIndex(index);
  };

  const handlePrevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    const newIndex = selectedImageIndex > 0 ? selectedImageIndex - 1 : filteredImages.length - 1;
    setSelectedImageIndex(newIndex);
    setSelectedImage(filteredImages[newIndex].src);
  };

  const handleNextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    const newIndex = selectedImageIndex < filteredImages.length - 1 ? selectedImageIndex + 1 : 0;
    setSelectedImageIndex(newIndex);
    setSelectedImage(filteredImages[newIndex].src);
  };

  return (
    <main className="min-h-screen">
      <Navbar />

      {/* ================= HERO ================= */}
      <section className="relative h-[50vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={heroLobby}
            alt="Gallery"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-hero-overlay" />
        </div>

        <div className="container-luxury relative z-10 text-center pt-20">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-block text-accent text-sm tracking-[0.3em] uppercase font-semibold mb-4"
          >
            Visual Journey
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-serif text-4xl md:text-5xl lg:text-6xl font-semibold text-primary-foreground"
          >
            Our Gallery
          </motion.h1>
        </div>
      </section>

      {/* ================= GALLERY ================= */}
      <section className="bg-background py-10 md:py-14">
        <div className="container-luxury">
          <SectionHeading
            subtitle="Explore"
            title="Visual Stories"
            description="Discover the elegance and grandeur through our curated gallery."
          />

          {/* Filters */}
          <div className="flex flex-wrap justify-center gap-3 mb-10">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
              className={`px-5 py-2 rounded-full font-medium transition-all duration-300 ${
  selectedCategory === category
    ? "bg-accent text-charcoal"
    : "bg-secondary text-foreground hover:bg-primary hover:text-primary-foreground"
}`}

              >
                {category}
              </button>
            ))}
          </div>

          {/* Masonry Grid */}
          <motion.div
            layout
            className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4"
          >
            <AnimatePresence>
              {filteredImages.map((image, index) => (
                <motion.div
                  key={index}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.5 }}
                  className="break-inside-avoid mb-4 cursor-pointer group relative overflow-hidden rounded-xl shadow-luxury"
                  onClick={() => handleImageClick(image.src, index)}
                >
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="w-full object-cover transition-transform duration-700 group-hover:scale-110"
                    style={{
                      height:
                        index % 3 === 0
                          ? "400px"
                          : index % 2 === 0
                          ? "300px"
                          : "250px",
                    }}
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                    <span className="inline-block px-3 py-1 bg-accent text-charcoal text-xs font-semibold rounded-full mb-2">
                      {image.category}
                    </span>
                    <p className="text-primary-foreground font-serif text-lg">
                      {image.alt}
                    </p>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* ================= LIGHTBOX ================= */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[150] flex items-center justify-center p-4 bg-foreground/95"
            onClick={() => setSelectedImage(null)}
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-6 right-6 w-12 h-12 bg-background/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-accent transition-colors z-10"
            >
              <X className="w-6 h-6 text-primary-foreground" />
            </button>

            {/* Previous Button */}
            <button
              onClick={handlePrevImage}
              className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 w-12 h-12 bg-background/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-accent transition-colors z-10"
            >
              <ChevronLeft className="w-6 h-6 text-primary-foreground" />
            </button>

            {/* Next Button */}
            <button
              onClick={handleNextImage}
              className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 w-12 h-12 bg-background/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-accent transition-colors z-10"
            >
              <ChevronRight className="w-6 h-6 text-primary-foreground" />
            </button>

            {/* Image Counter */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 px-4 py-2 bg-background/20 backdrop-blur-sm rounded-full text-primary-foreground text-sm font-medium">
              {selectedImageIndex + 1} / {filteredImages.length}
            </div>

            <motion.img
              key={selectedImage}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3 }}
              src={selectedImage}
              alt="Gallery Image"
              className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-luxury"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <VideoGallerySection />
      <Footer />
      <ScrollToTop />
    </main>
  );
};

export default Gallery;
