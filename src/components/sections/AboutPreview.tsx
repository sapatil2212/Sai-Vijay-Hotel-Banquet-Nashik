import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import banquetWedding from "@/assets/banquet/banquet.webp";
import roomDeluxe from "@/assets/deluxe/1.webp";
import roomExecutive from "@/assets/suites/5.webp";
import Line from "@/assets/line.png";

const images = [
  { src: banquetWedding, alt: "Banquet Hall" },
  { src: roomDeluxe, alt: "Deluxe Room" },
  { src: roomExecutive, alt: "Executive Room" },
];

const AboutPreview = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [direction, setDirection] = useState(1);

  useEffect(() => {
    const timer = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  const previousImage = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const nextImage = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  
  const getVisibleCards = () => {
    // For mobile, show only current card
    if (typeof window !== 'undefined' && window.innerWidth < 1024) {
      return [currentIndex];
    }
    // For desktop, show 3 cards
    return [
      currentIndex,
      (currentIndex + 1) % images.length,
      (currentIndex + 2) % images.length,
    ];
  };

  return (
<section className="bg-background py-10 md:py-12">
      <div className="container-luxury">
        <div className="grid lg:grid-cols-[1fr_1.8fr] gap-12 lg:gap-16 items-center">
          {/* Content - Left Side - Reduced Width */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="order-1 lg:order-1"
          >
          
            <h2 className="font-serif text-4xl md:text-4xl lg:text-5xl font-semibold text-foreground mb-4 leading-tight">
              A Legacy of Royal
              <span className="block">Hospitality</span>
            </h2>
            
            <p className="text-muted-foreground text-sm md:text-md leading-relaxed mb-8">
              Nestled in the heart of the city, Sai Vijay Hotel & Banquet has been the epitome of luxury hospitality for over two decades. Our commitment to excellence, attention to detail, and warm Indian hospitality makes every stay an unforgettable experience.
            </p>
            <Button variant="gold" size="lg" asChild className="group">
              <Link to="/about" className="inline-flex items-center gap-2">
                MORE ABOUT US
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </motion.div>

          {/* Image Carousel - Right Side */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative order-2 lg:order-2 min-h-[400px]"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <div className="relative">
              {/* Navigation Arrows - Hidden by default, visible on hover */}
              <button
                onClick={previousImage}
                className={`absolute left-4 top-1/2 -translate-y-1/2 z-30 flex items-center justify-center w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full border border-gray-200 transition-all duration-300 hover:bg-accent hover:border-accent hover:scale-110 ${
                  isHovered ? 'opacity-100' : 'opacity-0'
                }`}
                aria-label="Previous image"
              >
                <ChevronLeft className="h-6 w-6 text-foreground" />
              </button>
              
              <button
                onClick={nextImage}
                className={`absolute right-4 top-1/2 -translate-y-1/2 z-30 flex items-center justify-center w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full border border-gray-200 transition-all duration-300 hover:bg-accent hover:border-accent hover:scale-110 ${
                  isHovered ? 'opacity-100' : 'opacity-0'
                }`}
                aria-label="Next image"
              >
                <ChevronRight className="h-6 w-6 text-foreground" />
              </button>

              {/* Train Coach Style - Cards sliding one by one in continuous loop */}
              <div className="relative w-full overflow-hidden py-4">
                <div className="flex gap-4 px-2">
                  <AnimatePresence initial={false} mode="popLayout">
                    {getVisibleCards().map((imageIndex, position) => (
                      <motion.div
                        key={`${imageIndex}-${currentIndex}`}
                        layout
                        initial={{ 
                          x: direction === 1 ? 400 : -400,
                          opacity: 0
                        }}
                        animate={{ 
                          x: 0,
                          opacity: 1
                        }}
                        exit={{ 
                          x: direction === 1 ? -400 : 400,
                          opacity: 0
                        }}
                        transition={{ 
                          duration: 0.9,
                          ease: [0.25, 0.46, 0.45, 0.94],
                          layout: { duration: 0.9 }
                        }}
                        className="flex-shrink-0 w-full lg:w-[calc(33.333%-10.67px)]"
                      >
                        <div className="relative w-full h-80 rounded-3xl overflow-hidden">
                          <img
                            src={images[imageIndex].src}
                            alt={images[imageIndex].alt}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutPreview;