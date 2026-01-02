import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from '../../hooks/useInView';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import Line from "../../assets/line.png";

import Image1 from "../../assets/banquet/banquet.webp";
import Image2 from "../../assets/banquet/banquet2.webp";
import Image3 from "../../assets/hotel/hotel1.webp";
import Image4 from "../../assets/hotel/hotel2.webp";
import Image5 from "../../assets/hotel/hotel3.webp";
import Image6 from "../../assets/hotel/hotel4.webp";
import Image7 from "../../assets/restaurant/1.webp";
import Image8 from "../../assets/restaurant/2.webp";
import Image9 from "../../assets/restaurant/3.webp";
import Image10 from "../../assets/restaurant/4.webp";
import Image11 from "../../assets/suites/5.webp";
import Image12 from "../../assets/suites/6.webp";
import Image13 from "../../assets/suites/7.webp";

const BanquetImageGallery = () => {
  const [ref, isInView] = useInView({ threshold: 0.3 });
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const images = [
    { src: Image1, alt: "Banquet Hall View 1", category: "Banquet" },
    { src: Image2, alt: "Banquet Hall View 2", category: "Banquet" },
    { src: Image3, alt: "Hotel Exterior", category: "Hotel" },
    { src: Image4, alt: "Hotel Lobby", category: "Hotel" },
    { src: Image5, alt: "Hotel Reception", category: "Hotel" },
    { src: Image6, alt: "Hotel Facilities", category: "Hotel" },
    { src: Image7, alt: "Restaurant Dining", category: "Restaurant" },
    { src: Image8, alt: "Restaurant Interior", category: "Restaurant" },
    { src: Image9, alt: "Restaurant Ambience", category: "Restaurant" },
    { src: Image10, alt: "Restaurant Setup", category: "Restaurant" },
    { src: Image11, alt: "Suite Room", category: "Rooms" },
    { src: Image12, alt: "Deluxe Suite", category: "Rooms" },
    { src: Image13, alt: "Premium Suite", category: "Rooms" },
  ];

  const startAutoScroll = () => {
    stopAutoScroll();
    intervalRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % Math.max(1, images.length - 3));
    }, 3000);
  };

  const stopAutoScroll = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  useEffect(() => {
    if (!isInView) {
      stopAutoScroll();
      return;
    }

    if (!isHovered) {
      startAutoScroll();
    }

    return () => {
      stopAutoScroll();
    };
  }, [isInView, isHovered, images.length]);

  const handleMouseEnter = () => {
    setIsHovered(true);
    stopAutoScroll();
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (isInView) {
      startAutoScroll();
    }
  };

  const openModal = (imageSrc: string) => {
    setSelectedImage(imageSrc);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  const nextImage = () => {
    const currentImageIndex = images.findIndex(img => img.src === selectedImage);
    const nextIndex = (currentImageIndex + 1) % images.length;
    setSelectedImage(images[nextIndex].src);
  };

  const prevImage = () => {
    const currentImageIndex = images.findIndex(img => img.src === selectedImage);
    const prevIndex = currentImageIndex === 0 ? images.length - 1 : currentImageIndex - 1;
    setSelectedImage(images[prevIndex].src);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % Math.max(1, images.length - 3));
    stopAutoScroll();
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? Math.max(0, images.length - 4) : prev - 1));
    stopAutoScroll();
  };

  return (
    <section className="py-2 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 xl:px-32">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-8 lg:mb-8"
        >
          <h2 className="text-xl sm:text-4xl lg:text-4xl font-playfair font-bold text-primary mb-1 lg:mb-2">
            Experience Our Luxury
          </h2>
          <p className="text-xs lg:text-lg text-gray-700 font-inter max-w-3xl mx-auto leading-relaxed mb-2">
            Take a glimpse into the world of elegance and comfort that awaits you at Sai Vijay Banquet
          </p>
          <div className="flex justify-center">
            <img
              src={Line}
              alt="Decorative Line"
              className="w-40 md:w-52 lg:w-64"
            />
          </div>
        </motion.div>

        <div className="relative">
          <button 
            onClick={handlePrev}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-white/90 hover:bg-white p-2 lg:p-3 rounded-full shadow-lg transition-colors duration-300 group -ml-4"
          >
            <ChevronLeft className="w-5 h-5 lg:w-6 lg:h-6 text-primary group-hover:text-accent transition-colors duration-300" />
          </button>
          
          <button 
            onClick={handleNext}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-white/90 hover:bg-white p-2 lg:p-3 rounded-full shadow-lg transition-colors duration-300 group -mr-4"
          >
            <ChevronRight className="w-5 h-5 lg:w-6 lg:h-6 text-primary group-hover:text-accent transition-colors duration-300" />
          </button>

          <div 
            className="relative overflow-hidden"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <motion.div
              className="flex gap-4 lg:gap-6"
              animate={{ x: -currentIndex * (320 + 24) }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
            >
              {images.map((image, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="relative flex-shrink-0 w-80 h-64 overflow-hidden rounded-lg shadow-lg cursor-pointer group"
                  onClick={() => openModal(image.src)}
                >
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute bottom-0 left-0 right-0 p-4 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    <div className="text-sm font-inter font-medium mb-1">{image.category}</div>
                    <div className="text-lg font-playfair font-semibold">{image.alt}</div>
                  </div>
                  <div className="absolute top-4 right-4 bg-primary/80 text-white px-3 py-1 rounded-full text-sm font-inter">
                    {image.category}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
            onClick={closeModal}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative max-w-4xl max-h-full"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={selectedImage}
                alt="Gallery Image"
                className="w-full h-full object-contain rounded-lg max-h-[90vh]"
              />
              
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 bg-white/90 hover:bg-white p-2 lg:p-3 rounded-full transition-colors duration-300 group"
              >
                <X className="w-5 h-5 lg:w-6 lg:h-6 text-primary group-hover:text-accent transition-colors duration-300" />
              </button>

              <button
                onClick={prevImage}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white p-2 lg:p-3 rounded-full transition-colors duration-300 group"
              >
                <ChevronLeft className="w-5 h-5 lg:w-6 lg:h-6 text-primary group-hover:text-accent transition-colors duration-300" />
              </button>

              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white p-2 lg:p-3 rounded-full transition-colors duration-300 group"
              >
                <ChevronRight className="w-5 h-5 lg:w-6 lg:h-6 text-primary group-hover:text-accent transition-colors duration-300" />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default BanquetImageGallery;
