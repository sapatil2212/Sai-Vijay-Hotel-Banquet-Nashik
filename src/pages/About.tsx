import { motion } from "framer-motion";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ScrollToTop from "@/components/layout/ScrollToTop";
import { ShieldCheck, BedDouble, BellRing, Thermometer, Ruler, Wifi, Tv2, Sparkles, Landmark, Mountain, GanttChart, Plane } from "lucide-react";
import SideImage from "@/assets/hotel/hotel5.png";
import heroLobby from "@/assets/hotel/hotel3.webp";
import VisionMission from "@/components/AboutPageComp/VisionMission";
import PropertyAmenities from "@/components/AboutPageComp/PropertyAmenities";

const About = () => {
  const locations = [
    {
      icon: Landmark,
      title: "University of Pune",
      distance: "16 km"
    },
    {
      icon: Mountain,
      title: "Pataleshwar Cave Temple",
      distance: "18 km"
    },
    {
      icon: GanttChart,
      title: "Dagdusheth Ganpati Temple",
      distance: "19 km"
    },
    {
      icon: Plane,
      title: "Pune International Airport",
      distance: "25 km"
    }
  ];

  return (
    <main className="min-h-screen">
      <Navbar />
      
      {/* Hero Banner */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={heroLobby}
            alt="About Sai Vijay Hotel"
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
            Our Story
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-serif text-4xl md:text-5xl lg:text-6xl font-semibold text-primary-foreground"
          >
            About Sai Vijay
          </motion.h1>
        </div>
      </section>

      <div className="py-16 px-0 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 xl:px-32">
          <div className="grid lg:grid-cols-2 gap-12 items-start font-inter">
            <div className="order-2 lg:order-1">
              <div className="mb-12">
                <h2 className="text-2xl sm:text-3xl font-bold text-primary mb-4">About us</h2>
                <p className="text-sm sm:text-base text-gray-600 mb-6 leading-relaxed">
                  <span className="font-semibold text-gray-800">Sai Vijay Banquet – Rooms & Banquet Hall, Hinjewadi</span>
                </p>
                <p className="text-sm sm:text-base text-gray-600 mb-6 leading-relaxed">
                  Welcome to Sai Vijay Banquet, where comfort meets convenience in Pune's thriving IT corridor — Hinjewadi. Whether you're here for business, leisure, or celebration, we promise a stay that feels like home with the amenities and service of a premium hotel.
                </p>
                
                <div className="mb-8">
                  <h3 className="text-md sm:text-lg font-semibold text-gray-800 mb-4">
                    Located in the bustling Pimpri district, our hotel offers easy access to:
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {locations.map((location, index) => {
                      const IconComponent = location.icon;
                      return (
                        <div 
                          key={index} 
                          className="bg-white p-4 rounded-lg border border-gray-200 hover:border-primary transition-colors duration-200 shadow-sm hover:shadow-md"
                        >
                          <div className="flex items-start space-x-3">
                            <div className="flex-shrink-0 bg-primary/10 p-2 rounded-full">
                              <IconComponent className="w-5 h-5 text-primary" strokeWidth={1.5} />
                            </div>
                            <div>
                              <h3 className="text-xs sm:text-xs font-semibold text-gray-900">{location.title}</h3>
                              <p className="text-xs text-gray-500 mt-1">{location.distance} away</p>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>

            <div className="order-1 lg:order-2 lg:pl-8">
              <div className="relative rounded-xl overflow-hidden">
                <img
                  src={SideImage}
                  alt="Hotel amenities visual"
                  className="object-cover w-full h-full max-h-[500px] rounded-xl"
                />
              </div>
            </div>
          </div>
          <VisionMission/>
          <PropertyAmenities/>
        </div>
      </div>

      <Footer />
      <ScrollToTop />
    </main>
  );
};

export default About;
