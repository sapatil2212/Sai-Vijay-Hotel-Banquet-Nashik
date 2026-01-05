import React from "react";
import {
  ShieldCheck,
  Landmark,
  Mountain,
  GanttChart,
  Plane,
  ChevronRight,
  Phone,
  CalendarCheck,
} from "lucide-react";
import { GiPartyFlags, GiPartyPopper } from "react-icons/gi";
import { FaGlassCheers, FaParking } from "react-icons/fa";
import { MdRestaurant } from "react-icons/md";
import { motion } from "framer-motion";
import SideImage from "../../assets/banquet/banquet-page.png";
import { BanquetBookNowButton } from "@/components/ui/banquet-book-now-button";

export default function BanquetAbout() {
  const locations = [
    {
      icon: Landmark,
      title: "University of Pune",
      distance: "16 km",
    },
    {
      icon: Mountain,
      title: "Pataleshwar Cave Temple",
      distance: "18 km",
    },
    {
      icon: GanttChart,
      title: "Dagdusheth Ganpati Temple",
      distance: "19 km",
    },
    {
      icon: Plane,
      title: "Pune International Airport",
      distance: "25 km",
    },
  ];

  const banquetFeatures = [
    {
      icon: GiPartyFlags,
      title: "Elegant Interiors",
      description:
        "Beautifully designed hall with premium chandeliers and ambient lighting",
    },
    {
      icon: GiPartyFlags,
      title: "Spacious Venue",
      description: "Accommodates both intimate gatherings and grand celebrations",
    },
    {
      icon: GiPartyPopper,
      title: "Personalized Decor",
      description: "Customized themes for all types of celebrations",
    },
    {
      icon: ShieldCheck,
      title: "Premium Hospitality",
      description: "Impeccable service by our experienced team",
    },
    {
      icon: MdRestaurant,
      title: "Multi-Cuisine Catering",
      description: "Delicious vegetarian and non-vegetarian food options",
    },
    {
      icon: FaParking,
      title: "Central Location",
      description: "Conveniently located with ample parking",
    },
  ];

  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8 mt-[30px] sm:mt-[30px]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 xl:px-32">
        <div className="grid lg:grid-cols-2 gap-12 items-start font-inter">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="order-2 lg:order-1"
          >
            <div className="mb-12">
              <h2 className="text-2xl sm:text-3xl font-bold text-primary mb-2 font-playfair">
                Sai Vijay Banquet Hall
              </h2>
             
              <p className="text-sm sm:text-base text-gray-600 mb-2 leading-relaxed">
                <span className="font-semibold text-gray-800">
                  Where Celebrations Turn Into Lifetime Memories
                </span>
              </p>
              <p className="text-sm sm:text-md text-gray-600 mb-6 leading-relaxed">
                Step into a world of timeless elegance and unforgettable experiences at
                Sai Vijay Banquet Hall — a venue crafted to transform your special
                occasions into cherished memories. Nestled in a prime location, our banquet
                hall is a harmonious blend of luxury, warmth, and sophistication, tailored
                to make every celebration extraordinary.
              </p>
              <p className="text-sm sm:text-md text-gray-600 mb-6 leading-relaxed">
                Whether you're planning a grand engagement ceremony, a vibrant birthday
                party, a graceful baby shower, or a professional corporate gathering, our
                versatile space adapts beautifully to your vision. With stunning interiors,
                exquisite décor, personalized themes, and impeccable hospitality, every
                corner of the hall radiates celebration and joy.
              </p>
              <p className="text-sm sm:text-md text-gray-600 mb-6 leading-relaxed">
                At Sai Vijay Banquet, we don't just host events — we curate experiences filled
                with emotion, joy, and elegance, ensuring you and your guests carry the
                moments in your hearts forever.
              </p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <div className="flex flex-row gap-4 pt-2">
                 
                  
                  <BanquetBookNowButton>
                    <span className="relative z-10 flex items-center justify-center space-x-2">
                      <CalendarCheck className="h-5 w-5" />
                      <span className="font-medium text-sm sm:text-base">
                        Plan Your Event
                      </span>
                      <ChevronRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                  </BanquetBookNowButton>
                </div>
              </motion.div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="order-1 lg:order-2 lg:pl-8"
          >
            <div className="relative rounded-xl overflow-hidden">
              <img
                src={SideImage}
                alt="Hotel amenities visual"
                className="object-cover w-full h-full max-h-[500px] rounded-xl"
              />
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-16"
        >
          <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center font-inter">
            <FaGlassCheers className="text-primary mr-2" />
            Why Choose Us?
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {banquetFeatures.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-gray-50 p-3 rounded-lg border border-gray-100"
                >
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0 bg-primary/5 p-2 rounded-full">
                      <IconComponent className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="text-xs sm:text-sm font-semibold text-gray-800 font-inter">
                        {feature.title}
                      </h4>
                      <p className="text-xs text-gray-600 mt-1 font-inter">{feature.description}</p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
