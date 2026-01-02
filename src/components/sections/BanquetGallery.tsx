import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from '../../hooks/useInView';
import { Users, Monitor, Music, Utensils, ChevronRight, Calendar, Projector, Building, Sparkles, Star, Coffee, Briefcase, ParkingCircle, ChevronLeft } from 'lucide-react';
import { BanquetBookNowButton } from '@/components/ui/banquet-book-now-button';
import Line from "../../assets/line.png"
import BanquetImage1 from "../../assets/wedding.png"
import BanquetImage2 from "../../assets/haldi.png"
import BanquetImage3 from "../../assets/wedding2.png"
import BanquetImage4 from "../../assets/banquet/banquet2.webp"


import ringCeremony from "../../assets/events/ring.png"
import marriage from "../../assets/events/marriage.png"
import reception from "../../assets/events/reception.png"
import haldi from "../../assets/events/haldi.png"
import babyshower from "../../assets/events/babyshower.png"
import birthday  from "../../assets/events/birthday.png"
import corporate from "../../assets/events/corporate.png"
import meeting from "../../assets/events/meeting.png"
const VenueHighlights = () => {
  const [ref, isInView] = useInView({ threshold: 0.2 });
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const banquetImages = [BanquetImage1, BanquetImage2, BanquetImage3, BanquetImage4];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % banquetImages.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handlePrevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + banquetImages.length) % banquetImages.length);
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % banquetImages.length);
  };

  const venues = [
    {
      title: 'Grand Banquet Hall',
      images: banquetImages,
      description: 'Celebrate your special moments in our magnificent banquet hall with elegant décor and professional event management.',
      capacity: '350+ Guests',
      features: [
        { icon: Users, text: '350+ Guest Capacity ' },
        { icon: Music, text: 'Audio/Visual' },
        { icon: Utensils, text: 'Premium Catering' },
        { icon: Calendar, text: 'Event Planning' },
        { icon: Building, text: 'Spacious & AC Banquet Hall' },
        { icon: Sparkles, text: 'Interactive Decorations' },
        { icon: Star, text: 'Elegant Interior Design' },
        { icon: Coffee, text: 'Catering & Dining Options' },
        { icon: Briefcase, text: 'Dedicated Event Planning Team' },
        { icon: ParkingCircle, text: 'Ample Parking Space' },
      ],
      link: '/banquet',
      buttonText: 'Plan Your Event',
      buttonIcon: Calendar
    }
  ];

  const eventTypes = [
    {
      title: 'Elegant Beginnings',
      subtitle: 'Ring Ceremony',
      description: 'A graceful setting to celebrate the first step of togetherness.',
      image: ringCeremony,
    },
    {
      title: 'A Royal Wedding Affair',
      subtitle: 'Grand Marriage',
      description: 'A majestic venue crafted for timeless wedding celebrations.',
      image: marriage,
    },
    {
      title: 'An Evening of Grandeur',
      subtitle: 'Reception',
      description: 'Celebrate love in a luxurious ambience with flawless elegance.',
      image: reception,
    },
    {
      title: 'Colours of Celebration',
      subtitle: 'Haldi Ceremony',
      description: 'A vibrant and joyful space for traditional pre-wedding rituals.',
      image: haldi,
    },
    {
      title: 'Celebrate Life in Style',
      subtitle: 'Birthday Party',
      description: 'A perfect venue for memorable and joyful birthday celebrations.',
      image: birthday,
    },
    {
      title: 'Cherished Moments Await',
      subtitle: 'Baby Shower',
      description: 'A warm and joyful space to celebrate new beginnings.',
      image: babyshower,
    },
    {
      title: 'Professional. Polished. Prestigious.',
      subtitle: 'Corporate Events',
      description: 'A refined venue for impactful corporate gatherings.',
      image: corporate,
    },
    {
      title: 'Meetings with Excellence',
      subtitle: 'Conference Meetings',
      description: 'A well-equipped space designed for focused and successful meetings.',
      image: meeting,
    },
  ];

  return (
    <section className="py-12 lg:py-20 bg-white">
      <div className="container mx-auto px-6 lg:px-8 xl:px-[200px]">
        <motion.div
          ref={ref}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 lg:mb-12"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-playfair font-bold text-primary mb-4 lg:mb-6">
            Event Venues & Facilities
          </h2>

          <p className="text-base lg:text-lg text-gray-700 font-inter max-w-3xl mx-auto leading-relaxed mb-4">
            From grand celebrations to professional meetings, our venues provide the perfect 
            setting for every occasion with world-class facilities and services.
          </p>

          <div className="flex justify-center">
            <img
              src={Line}
              alt="Decorative Line"
              className="w-40 md:w-52 lg:w-64"
            />
          </div>
        </motion.div>

        {/* Original Gallery Section */}
        <div className="mb-16 lg:mb-24">
          {venues.map((venue, index) => (
            <motion.div
              key={venue.title}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center"
            >
              {/* Image Carousel */}
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 + index * 0.2 }}
                className="relative"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              >
                <div className="relative overflow-hidden rounded-[40px]">
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={currentImageIndex}
                      src={venue.images[currentImageIndex]}
                      alt={`${venue.title} - Image ${currentImageIndex + 1}`}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.5 }}
                      className="w-full h-64 sm:h-80 lg:h-[500px] object-cover"
                    />
                  </AnimatePresence>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                  
                  {/* Capacity Badge */}
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm text-primary px-4 py-2 rounded-full font-inter font-semibold z-10">
                    {venue.capacity}
                  </div>

                  {/* Navigation Controls - Appear on Hover */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: isHovered ? 1 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="absolute inset-0 flex items-center justify-between px-4 pointer-events-none"
                  >
                    <button
                      onClick={handlePrevImage}
                      className="pointer-events-auto bg-white/90 hover:bg-white text-primary p-2 rounded-full shadow-lg transition-all duration-300 hover:scale-110"
                      aria-label="Previous image"
                    >
                      <ChevronLeft className="w-6 h-6" />
                    </button>
                    <button
                      onClick={handleNextImage}
                      className="pointer-events-auto bg-white/90 hover:bg-white text-primary p-2 rounded-full shadow-lg transition-all duration-300 hover:scale-110"
                      aria-label="Next image"
                    >
                      <ChevronRight className="w-6 h-6" />
                    </button>
                  </motion.div>

                  {/* Image Indicators */}
                  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2 z-10">
                    {venue.images.map((_, imgIndex) => (
                      <button
                        key={imgIndex}
                        onClick={() => setCurrentImageIndex(imgIndex)}
                        className={`h-2 rounded-full transition-all duration-300 ${
                          imgIndex === currentImageIndex
                            ? 'bg-accent w-8'
                            : 'bg-white/60 w-2 hover:bg-white/80'
                        }`}
                        aria-label={`Go to image ${imgIndex + 1}`}
                      />
                    ))}
                  </div>
                </div>
              </motion.div>

              {/* Content */}
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 + index * 0.2 }}
              >
                <div className="mb-6">
                  <h3 className="text-2xl sm:text-3xl lg:text-4xl font-inter font-bold text-primary mb-4">
                    {venue.title}
                  </h3>
                  
                  <p className="text-base lg:text-sm text-gray-700 font-inter leading-relaxed mb-6">
                    {venue.description}
                  </p>
                </div>

                {/* Features Grid */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  {venue.features.map((feature, featureIndex) => (
                    <motion.div
                      key={featureIndex}
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: 0.5 + index * 0.2 + featureIndex * 0.05 }}
                      className="flex items-center space-x-2 p-2 bg-gray-50 rounded-lg"
                    >
                      <div className="flex items-center justify-center w-8 h-8 bg-accent rounded-full">
                        <feature.icon className="w-4 h-4 text-charcoal" />
                      </div>
                      <span className="text-sm lg:text-xs font-inter font-medium text-gray-700">
                        {feature.text}
                      </span>
                    </motion.div>
                  ))}
                </div>

                {/* CTA Button */}
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.7 + index * 0.2 }}
                >
                  <div className="flex flex-row gap-4 pt-2">
                    <BanquetBookNowButton
                      variant="outline"
                      className="relative overflow-hidden bg-accent text-charcoal font-semibold hover:bg-gold-light hover:-translate-y-1 text-base px-8 py-3 rounded-md inline-flex items-center justify-center gap-2 transition-all duration-300 before:absolute before:inset-0 before:-translate-x-full before:animate-shimmer before:from-transparent before:via-white/30 before:to-transparent"
                    >
                      <span className="relative z-10 flex items-center justify-center space-x-2">
                        <span className='font-medium'>{venue.buttonText}</span>
                        <ChevronRight className="h-4 w-4" />
                      </span>
                    </BanquetBookNowButton>
                  </div>
                </motion.div>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Event Type Cards Grid - 4x2 Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-4 mt-12">
          {eventTypes.map((event, index) => (
            <motion.div
              key={event.subtitle}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative bg-white rounded-2xl overflow-hidden  border border-gray-200 transition-all duration-300 hover:-translate-y-2"
            >
              {/* Image */}
              <div className="relative h-64 overflow-hidden">
                <img
                  src={event.image}
                  alt={event.subtitle}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
                
                {/* Subtitle Badge */}
                <div className="absolute top-4 left-4 bg-accent text-charcoal px-3 py-1 rounded-full text-sm sm:text-[10px] font-semibold">
                  {event.subtitle}
                </div>
              </div>

              {/* Content */}
              <div className="p-5">
                <h3 className="text-lg sm:text-[15px] font-bold text-primary mb-2 font-inter line-clamp-2">
                  {event.title}
                </h3>
                <p className="text-sm sm:text-[12px] text-gray-600 font-inter leading-relaxed line-clamp-3">
                  {event.description}
                </p>
              </div>

              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-accent/0 group-hover:bg-accent/5 transition-colors duration-300 pointer-events-none" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default VenueHighlights;