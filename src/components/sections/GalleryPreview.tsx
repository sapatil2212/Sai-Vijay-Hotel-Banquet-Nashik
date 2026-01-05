import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import SectionHeading from "@/components/shared/SectionHeading";
import Hotel1 from "@/assets/hotel/hotel1.webp";
import Deluxe1 from "@/assets/deluxe/1.webp";
import Suite1 from "@/assets/suites/5.webp";
import Banquet1 from "@/assets/banquet/banquet.webp";
import Restaurant1 from "@/assets/restaurant/1.webp";
import Hotel2 from "@/assets/hotel/hotel2.webp";

const images = [
  { src: Hotel1, alt: "Hotel Exterior", category: "Hotel" },
  { src: Deluxe1, alt: "Deluxe Room", category: "Rooms" },
  { src: Banquet1, alt: "Wedding Banquet", category: "Banquet" },
  { src: Restaurant1, alt: "Fine Dining", category: "Restaurant" },
  { src: Suite1, alt: "Executive Suite", category: "Rooms" },
  { src: Hotel2, alt: "Hotel Lobby", category: "Hotel" },
];

const GalleryPreview = () => {
  return (
    <section className="section-padding bg-background">
      <div className="container-luxury">
        <SectionHeading
          subtitle="Gallery"
          title="Visual Stories"
          description="Take a glimpse into the elegance and grandeur that awaits you."
        />

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {images.map((image, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`group relative overflow-hidden rounded-lg ${
                index === 0 || index === 3 ? "row-span-2" : ""
              }`}
            >
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-full object-cover min-h-[200px] transition-transform duration-700 group-hover:scale-110"
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
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-10"
        >
          <Link
            to="/gallery"
            className="inline-flex items-center gap-2 px-6 py-2.5 md:px-8 md:py-3 rounded-lg text-sm md:text-base font-medium bg-gradient-to-r from-amber-600 to-amber-700 text-white hover:shadow-lg transition-all duration-300"
          >
            View Full Gallery
            <motion.span
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              →
            </motion.span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default GalleryPreview;
