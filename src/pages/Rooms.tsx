import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ScrollToTop from "@/components/layout/ScrollToTop";
import SectionHeading from "@/components/shared/SectionHeading";
import Rooms360View from "@/components/sections/Rooms360View";
import { Button } from "@/components/ui/button";
import { BookNowButton } from "@/components/ui/book-now-button";
import { BookingDialog } from "@/components/ui/booking-dialog";
import { 
  Bed, 
  Bath, 
  Wifi, 
  Tv, 
  Coffee, 
  Wind, 
  ShieldCheck, 
  Maximize,
  X 
} from "lucide-react";
import deluxe1 from "@/assets/deluxe/1.webp";
import deluxe2 from "@/assets/deluxe/2.webp";
import deluxe3 from "@/assets/deluxe/3.webp";
import suite1 from "@/assets/suites/2.jpg";
import suite2 from "@/assets/suites/5.webp";
import suite3 from "@/assets/suites/6.webp";
import heroLobby from "@/assets/hotel/hotel1.webp";

const rooms = [
  {
    id: 1,
    name: "Deluxe Double Room",
    tagline: "Elegant Comfort",
    description: "Experience refined comfort in our individually furnished and decorated Deluxe Double Room. Featuring premium bedding, modern amenities, and thoughtful accessibility features for an exceptional stay.",
    image: deluxe1,
    images: [deluxe1, deluxe2, deluxe3],
    size: "213 sq ft",
    capacity: "Sleeps 3",
    bed: "1 Queen Bed",
    amenities: [
      "Air Conditioning",
      "Free WiFi",
      "34-inch LED TV",
      "Premium Channels",
      "City View",
      "Pillowtop Mattress",
      "Egyptian Cotton Sheets",
      "Rainfall Showerhead",
      "Free Toiletries",
      "Connecting Rooms",
      "Laptop Workspace",
      "Mobile Key Entry",
      "Daily Housekeeping",
      "Wheelchair Accessible",
      "Hypo-allergenic Bedding",
      "Pillow Menu"
    ],
  },
  {
    id: 2,
    name: "Premium Suite",
    tagline: "Ultimate Luxury",
    description: "Indulge in spacious luxury with our Premium Suite. Featuring a separate bedroom, sitting area, dining space, and full kitchen. Perfect for extended stays and families seeking the ultimate comfort.",
    image: suite1,
    images: [suite1, suite2, suite3],
    size: "300 sq ft",
    capacity: "Sleeps 4",
    bed: "1 King Bed",
    amenities: [
      "Separate Bedroom",
      "Living Room",
      "Dining Area",
      "Full Kitchen",
      "Air Conditioning",
      "Free WiFi",
      "34-inch LED TV",
      "Premium Channels",
      "City View",
      "Pillowtop Mattress",
      "Egyptian Cotton Sheets",
      "Separate Bathtub & Shower",
      "Designer Toiletries",
      "Connecting Rooms",
      "Laptop Workspace",
      "Mobile Key Entry",
      "Daily Housekeeping",
      "Wheelchair Accessible"
    ],
  },
];

const amenityIcons: Record<string, React.FC<{ className?: string }>> = {
  "King Bed": Bed,
  "Work Desk": Coffee,
  "Free WiFi": Wifi,
  "Smart TV": Tv,
  "Air Conditioning": Wind,
  "24/7 Service": ShieldCheck,
  "Bathtub": Bath,
};

const Rooms = () => {
  const [selectedRoom, setSelectedRoom] = useState<typeof rooms[0] | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [bookingDialogOpen, setBookingDialogOpen] = useState(false);
  const [selectedRoomForBooking, setSelectedRoomForBooking] = useState<string>("");

  const nextImage = () => {
    if (selectedRoom) {
      setCurrentImageIndex((prev) => (prev + 1) % selectedRoom.images.length);
    }
  };

  const prevImage = () => {
    if (selectedRoom) {
      setCurrentImageIndex((prev) => (prev - 1 + selectedRoom.images.length) % selectedRoom.images.length);
    }
  };

  const handleRoomSelect = (room: typeof rooms[0]) => {
    setSelectedRoom(room);
    setCurrentImageIndex(0);
  };

  const handleCloseModal = () => {
    setSelectedRoom(null);
    setCurrentImageIndex(0);
  };

  return (
    <main className="min-h-screen">
      <Navbar />
      
      {/* Hero Banner */}
      <section className="relative h-[50vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={heroLobby}
            alt="Luxury Rooms"
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
            Accommodations
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-serif text-4xl md:text-5xl lg:text-6xl font-semibold text-primary-foreground"
          >
            Rooms & Suites
          </motion.h1>
        </div>
      </section>

      {/* Rooms Grid */}
      <section className="section-padding bg-background">
        <div className="container-luxury">
          <SectionHeading
            subtitle="Our Rooms"
            title="Choose Your Perfect Stay"
            description="Each room is a sanctuary of comfort, designed to exceed your expectations."
          />

          <div className="space-y-16">
            {rooms.map((room, index) => (
              <motion.div
                key={room.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className={`grid lg:grid-cols-2 gap-8 lg:gap-12 items-center ${
                  index % 2 === 1 ? "lg:flex-row-reverse" : ""
                }`}
              >
                {/* Image */}
                <div className={`relative overflow-hidden rounded-xl shadow-luxury ${
                  index % 2 === 1 ? "lg:order-2" : ""
                }`}>
                  <img
                    src={room.image}
                    alt={room.name}
                    className="w-full h-[400px] lg:h-[500px] object-cover hover:scale-105 transition-transform duration-700"
                  />
                </div>

                {/* Content */}
                <div className={index % 2 === 1 ? "lg:order-1" : ""}>
                  <span className="text-accent text-sm tracking-[0.2em] uppercase font-semibold">
                    {room.tagline}
                  </span>
                  <h3 className="font-serif text-3xl md:text-4xl font-semibold text-foreground mt-2 mb-4">
                    {room.name}
                  </h3>
                  <p className="text-muted-foreground text-lg mb-6">
                    {room.description}
                  </p>

                  {/* Quick Info */}
                  <div className="flex flex-wrap gap-4 mb-6">
                    <span className="flex items-center gap-2 text-sm text-foreground bg-secondary px-3 py-2 rounded-lg">
                      <Maximize className="w-4 h-4 text-accent" />
                      {room.size}
                    </span>
                    <span className="flex items-center gap-2 text-sm text-foreground bg-secondary px-3 py-2 rounded-lg">
                      <Bed className="w-4 h-4 text-accent" />
                      {room.bed}
                    </span>
                    <span className="flex items-center gap-2 text-sm text-foreground bg-secondary px-3 py-2 rounded-lg">
                      <ShieldCheck className="w-4 h-4 text-accent" />
                      {room.capacity}
                    </span>
                  </div>

                  {/* Amenities Preview */}
                  <div className="flex flex-wrap gap-2 mb-8">
                    {room.amenities.slice(0, 6).map((amenity) => (
                      <span
                        key={amenity}
                        className="text-xs text-muted-foreground border border-border px-3 py-1 rounded-full"
                      >
                        {amenity}
                      </span>
                    ))}
                    {room.amenities.length > 6 && (
                      <span className="text-xs text-accent font-semibold px-3 py-1">
                        +{room.amenities.length - 6} more
                      </span>
                    )}
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4">
                    <Button
                      variant="gold"
                      size="lg"
                      onClick={() => handleRoomSelect(room)}
                    >
                      View Details
                    </Button>
                    <BookNowButton
                      roomType={room.name}
                      variant="elegant"
                      size="lg"
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Room Modal */}
      {selectedRoom && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-foreground/80 backdrop-blur-sm"
          onClick={handleCloseModal}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-card max-w-2xl w-full max-h-[90vh] overflow-y-auto rounded-2xl shadow-luxury"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative">
              <img
                src={selectedRoom.images[currentImageIndex]}
                alt={`${selectedRoom.name} - Image ${currentImageIndex + 1}`}
                className="w-full h-64 md:h-80 object-cover"
              />
              
              {/* Navigation Arrows */}
              {selectedRoom.images.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-background/90 rounded-full flex items-center justify-center hover:bg-accent transition-colors"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-background/90 rounded-full flex items-center justify-center hover:bg-accent transition-colors"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                    </svg>
                  </button>
                  
                  {/* Image Indicators */}
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                    {selectedRoom.images.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentImageIndex(index)}
                        className={`w-2 h-2 rounded-full transition-all ${
                          currentImageIndex === index ? 'bg-accent w-6' : 'bg-white/50'
                        }`}
                      />
                    ))}
                  </div>
                </>
              )}
              
              <button
                onClick={handleCloseModal}
                className="absolute top-4 right-4 w-10 h-10 bg-background/90 rounded-full flex items-center justify-center hover:bg-accent transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 md:p-8">
              <h3 className="font-serif text-3xl font-semibold text-foreground mb-2">
                {selectedRoom.name}
              </h3>
              <p className="text-muted-foreground text-lg mb-6">
                {selectedRoom.description}
              </p>

              <h4 className="font-serif text-xl font-semibold text-foreground mb-4">
                Room Amenities
              </h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                {selectedRoom.amenities.map((amenity) => {
                  const Icon = amenityIcons[amenity] || ShieldCheck;
                  return (
                    <div
                      key={amenity}
                      className="flex items-center gap-2 text-sm text-foreground"
                    >
                      <Icon className="w-5 h-5 text-accent flex-shrink-0" />
                      {amenity}
                    </div>
                  );
                })}
              </div>

              <BookNowButton
                roomType={selectedRoom.name}
                variant="gold"
                size="lg"
                className="w-full"
              />
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* 360 Virtual Tour */}
      <Rooms360View />

      <Footer />
      <ScrollToTop />
    </main>
  );
};

export default Rooms;
