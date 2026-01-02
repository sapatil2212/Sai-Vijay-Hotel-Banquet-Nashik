import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from '@/hooks/useInView';
import { Wifi, Tv, Phone, Coffee, Users, Bed, Bath, Wind, Armchair, Table, Droplets, Shield, DoorOpen, Building2 } from 'lucide-react';
import { BookNowButton } from '@/components/ui/book-now-button';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';
import deluxe1 from "@/assets/deluxe/1.webp";
import deluxe2 from "@/assets/deluxe/2.webp";
import deluxe3 from "@/assets/deluxe/3.webp";
import suite1 from "@/assets/suites/2.jpg";
import suite2 from "@/assets/suites/5.webp";
import suite3 from "@/assets/suites/6.webp";

const rooms = [
  {
    id: 1,
    slug: 'deluxe-double-room',
    name: 'Deluxe Double Room',
    images: [deluxe1, deluxe2, deluxe3],
    size: '213 sq ft',
    bed: '1 Queen Bed',
    bathroom: '20 Private Bathrooms',
    maxGuests: 'Sleeps 3',
    amenities: {
      popular: [
        { icon: Wind, text: 'Air Conditioning' },
        { icon: Wifi, text: 'Free WiFi' },
        { icon: Tv, text: '34" LED TV' }
      ],
      features: [
        { icon: Bed, text: 'Pillowtop Mattress' },
        { icon: DoorOpen, text: 'City View' },
        { icon: Users, text: 'Connecting Rooms' }
      ],
      media: [
        { icon: Tv, text: 'Premium Channels' }
      ],
      bathroom: [
        { icon: Bath, text: 'Rainfall Showerhead' },
        { icon: Droplets, text: 'Free Toiletries' }
      ]
    }
  },
  {
    id: 2,
    slug: 'premium-suite',
    name: 'Premium Suite',
    images: [suite1, suite2, suite3],
    size: '300 sq ft',
    bed: '1 King Bed',
    bathroom: '20 Private Bathrooms',
    maxGuests: 'Sleeps 4',
    amenities: {
      popular: [
        { icon: Wind, text: 'Air Conditioning' },
        { icon: Wifi, text: 'Free WiFi' },
        { icon: Building2, text: 'Separate Sitting Area' }
      ],
      features: [
        { icon: Table, text: 'Dining Area' },
        { icon: Armchair, text: 'Living Room' },
        { icon: Phone, text: 'Kitchen' }
      ],
      media: [
        { icon: Tv, text: '34" LED TV' }
      ],
      bathroom: [
        { icon: Bath, text: 'Separate Bathtub & Shower' },
        { icon: Droplets, text: 'Designer Toiletries' }
      ],
      other: [
        { icon: Bed, text: 'Separate Bedroom' }
      ]
    }
  }
];

const RoomsPreview = () => {
  const [ref, isInView] = useInView({ threshold: 0.3 });
  const [selectedImageIndex, setSelectedImageIndex] = useState<{ [key: number]: number }>({});
  const [modalImage, setModalImage] = useState<string | null>(null);

  const nextImage = (roomId: number) => {
    const room = rooms.find(r => r.id === roomId);
    if (!room) return;
    
    setSelectedImageIndex(prev => ({
      ...prev,
      [roomId]: ((prev[roomId] || 0) + 1) % room.images.length
    }));
  };

  const prevImage = (roomId: number) => {
    const room = rooms.find(r => r.id === roomId);
    if (!room) return;
    
    setSelectedImageIndex(prev => ({
      ...prev,
      [roomId]: ((prev[roomId] || 0) - 1 + room.images.length) % room.images.length
    }));
  };

  const openModal = (imageSrc: string) => {
    setModalImage(imageSrc);
  };

  const closeModal = () => {
    setModalImage(null);
  };

  return (
    <>
      <section className="py-8 lg:py-16 bg-cream">
        <div className="container mx-auto px-6 lg:px-8 xl:px-32">
          <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-5 lg:mb-8"
          >
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-2 lg:mb-6 font-serif">
              Luxurious Rooms & Suites
            </h2>
            <p className="text-sm sm:text-md lg:text-base text-gray-600 max-w-3xl mx-auto">
              Experience comfort and elegance in our thoughtfully designed rooms, each crafted to provide a memorable stay.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10 max-w-5xl mx-auto">
            {rooms.map((room, index) => (
              <motion.div
                key={room.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                className="bg-white rounded-xl hover:shadow-md transition-shadow duration-300 overflow-hidden border border-gray-200"
              >
                <div className="relative h-64 overflow-hidden group">
                  <img
                    src={room.images[selectedImageIndex[room.id] || 0]}
                    alt={room.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 cursor-pointer"
                    onClick={() => openModal(room.images[selectedImageIndex[room.id] || 0])}
                  />
                  
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent flex flex-col justify-between p-4">
                    <div className="flex justify-between items-start">
                      <div className="flex space-x-1">
                        {room.images.map((_, imgIndex) => (
                          <button
                            key={imgIndex}
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedImageIndex(prev => ({ ...prev, [room.id]: imgIndex }));
                            }}
                            className={`w-2 h-2 rounded-full transition-all ${
                              (selectedImageIndex[room.id] || 0) === imgIndex ? 'bg-white' : 'bg-white/50'
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                   
                    <div className="flex justify-between items-center">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          prevImage(room.id);
                        }}
                        className="bg-white/30 hover:bg-white/50 backdrop-blur-sm p-2 rounded-full text-white transition-all opacity-0 group-hover:opacity-100"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </button>
                      
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          nextImage(room.id);
                        }}
                        className="bg-white/30 hover:bg-white/50 backdrop-blur-sm p-2 rounded-full text-white transition-all opacity-0 group-hover:opacity-100"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="mb-4">
                    <h3 className="text-xl font-bold text-gray-900 mb-1">{room.name}</h3>
                    <div className="flex items-center space-x-2 text-sm text-gray-600 mb-2">
                      <span>{room.size}</span>
                    </div>
                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                      <span className="flex items-center">
                        <Bed className="w-4 h-4 mr-1 text-accent" />
                        {room.bed}
                      </span>
                      <span className="flex items-center">
                        <Bath className="w-4 h-4 mr-1 text-accent" />
                        {room.bathroom}
                      </span>
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Key Amenities</h4>
                    <div className="flex flex-wrap gap-2">
                      {Object.values(room.amenities)[0].slice(0, 3).map((item: any, index: number) => (
                        <span key={index} className="flex items-center bg-gray-50 px-2 py-1 rounded-full text-xs">
                          <item.icon className="w-3 h-3 mr-1 text-accent" />
                          {item.text.split('(')[0]}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex space-x-2 sm:space-x-3">
                    <Link 
                      to={`/rooms`}
                      className="flex-1 text-center bg-transparent border border-accent text-accent hover:bg-accent/5 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full font-medium transition-colors text-xs sm:text-sm"
                    >
                      View Details
                    </Link>
                    <BookNowButton
                      roomType={room.name}
                      className="flex-1 text-center justify-center bg-accent hover:bg-accent/90 text-white px-3 py-1.5 sm:px-4 sm:py-2 rounded-full font-medium transition-colors text-xs sm:text-sm"
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Image Modal */}
      <AnimatePresence>
        {modalImage && (
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
              className="relative max-w-4xl w-full max-h-[90vh]"
              onClick={(e) => e.stopPropagation()}
            >
              <TransformWrapper
                initialScale={1}
                minScale={0.5}
                maxScale={3}
                wheel={{ step: 0.1 }}
              >
                {({ zoomIn, zoomOut, resetTransform }) => (
                  <>
                    <div className="absolute top-4 right-4 z-10 flex space-x-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          zoomIn();
                        }}
                        className="bg-white/90 hover:bg-white p-2 rounded-full transition-colors"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
                        </svg>
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          zoomOut();
                        }}
                        className="bg-white/90 hover:bg-white p-2 rounded-full transition-colors"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M5 10a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1z" clipRule="evenodd" />
                        </svg>
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          resetTransform();
                        }}
                        className="bg-white/90 hover:bg-white p-2 rounded-full transition-colors"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
                        </svg>
                      </button>
                      <button
                        onClick={closeModal}
                        className="bg-white/90 hover:bg-white p-2 rounded-full transition-colors"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                    <TransformComponent>
                      <img
                        src={modalImage}
                        alt="Room"
                        className="w-full h-full object-contain rounded-lg"
                      />
                    </TransformComponent>
                  </>
                )}
              </TransformWrapper>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default RoomsPreview;
