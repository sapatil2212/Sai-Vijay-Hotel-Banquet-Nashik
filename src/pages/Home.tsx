import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Star, Crown, Sparkles, Calendar } from 'lucide-react';
import {Link} from "react-router-dom";
import RoomCard from '../components/RoomCard';
import BookingModal from '../components/BookingModal';
import BanquetSection from '../HomeComp/BanquetSection';
import Testimonial from '../HomeComp/Testimonials'

import Hero1 from "../assets/hero/hero_1.webp"
import Hero2 from "../assets/hero/hero_2.webp"
import Hero3 from "../assets/hero/hero_3.webp"
import Hero1Mobile from "../assets/hero/hero_1_mobile.png";
import Hero2Mobile from "../assets/hero/hero_2_mobile.png";
import Hero3Mobile from "../assets/hero/hero_3_mobile.png";

//rooms
import deluxe1 from "../assets/deluxe/deluxe_1.webp"
import deluxe2 from "../assets/deluxe/deluxe_2.webp"
import deluxe3 from "../assets/deluxe/deluxe_3.webp"
import deluxe4 from "../assets/deluxe/deluxe_4.webp"
import deluxe5 from "../assets/deluxe/deluxe_5.webp"

import premium1 from "../assets/premium/premium_1.webp"
import premium2 from "../assets/premium/premium_2.webp"
import premium3 from "../assets/premium/premium_3.webp"

import suite1 from "../assets/suite/suite_1.webp"
import suite2 from "../assets/suite/suite_2.webp"
import suite3 from "../assets/suite/suite_3.webp"
import suite4 from "../assets/suite/suite_4.webp"

import HomeAbout from "../assets/home_about_image.webp"
import Gallery from './Gallery';
import AmenitiesSection from '../HomeComp/Amenities';
import Restaurant from '../HomeComp/Restaurant';


const Home: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [selectedRoomType, setSelectedRoomType] = useState('');

const heroSlides = [
  {
    desktopImage: Hero1,
    mobileImage: Hero1Mobile,
    title: 'Where Every Door Opens to Luxury.',
    subtitle: 'From the moment you step inside, feel the warmth of personalized service',
    cta: 'Explore Rooms',
    link: '/rooms'
  },
  {
    desktopImage: Hero2,
    mobileImage: Hero2Mobile,
    title: 'Your dream event deserves a royal venue',
    subtitle: 'Spacious and equipped with modern amenities, our banquet hall is ready to host your happiest moments',
    cta: 'View Banquet',
    link: '/banquet' 
  },
  {
    desktopImage: Hero3,
    mobileImage: Hero3Mobile,
    title: 'Exceptional Dining Experience',
    subtitle: 'Taste the finest cuisine at Maharana Thal',
    cta: 'Explore Now',
    link: '/maharana-thal' 
  },
];
  const rooms = [
  {
    title: 'Deluxe AC',
    images: [
      deluxe1,
      deluxe2,deluxe3, deluxe4,deluxe5
    ],
    area: '300 sq ft',
    bedType: 'Queen Bed',
    capacity: '2 Guests',
    amenities: ['WiFi', 'AC', 'TV', 'Room Service'],
   
  },
  {
    title: 'Premium Room',
    images: [
     premium1, premium2, premium3
    ],
    area: '450 sq ft',
    bedType: 'King Bed',
    capacity: '3 Guests',
    amenities: ['WiFi', 'AC', 'TV', 'Mini Bar', 'Balcony'],
  
  },
  {
    title: 'Suite Room',
    images: [
       suite1, suite2, suite3, suite4,
    ],
    area: '700 sq ft',
    bedType: 'King Bed + Sofa',
    capacity: '4 Guests',
    amenities: ['WiFi', 'AC', 'TV', 'Mini Bar', 'Living Area', 'Jacuzzi'],
  
  },
];
  const testimonials = [
    {
      name: 'Rajesh Kumar',
      rating: 5,
      text: 'Exceptional service and luxurious rooms. SK Inn exceeded all our expectations!',
    },
    {
      name: 'Priya Sharma',
      rating: 5,
      text: 'The banquet hall was perfect for our wedding. Beautiful venue and great staff.',
    },
    {
      name: 'Amit Patel',
      rating: 5,
      text: 'Maharana Thal served the most delicious food. Highly recommend this place!',
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
  };

  const handleBookNow = (roomType: string) => {
    setSelectedRoomType(roomType);
    setIsBookingModalOpen(true);
  };

  return (
    <div className='bg-primary'>
      {/* Hero Section with Rounded Corners and Padding */}
<section className="relative px-4 sm:px-6 lg:px-8 pt-0 pb-8 group "> 
  <div className="relative h-[60vh] md:h-[85vh] overflow-hidden rounded-3xl ">
    {/* Navigation Arrows */}
    <div className="absolute inset-y-0 left-0 z-30 flex items-center justify-center w-12 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
      <button 
        onClick={prevSlide}
        className="p-2 rounded-full bg-black bg-opacity-40 text-white hover:bg-opacity-60 transition-all"
        aria-label="Previous slide"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>
    </div>
    <div className="absolute inset-y-0 right-0 z-30 flex items-center justify-center w-12 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
      <button 
        onClick={nextSlide}
        className="p-2 rounded-full bg-black bg-opacity-40 text-white hover:bg-opacity-60 transition-all"
        aria-label="Next slide"
      >
        <ChevronRight className="h-6 w-6" />
      </button>
    </div>

    {heroSlides.map((slide, index) => (
      <div
        key={index}
        className={`absolute inset-0 transition-opacity duration-1000 ${
          index === currentSlide ? 'opacity-100' : 'opacity-0'
        }`}
      >
        {/* Mobile Image (hidden on desktop) */}
        <div className="md:hidden">
          <div className="absolute inset-0 bg-black bg-opacity-40 z-10 rounded-3xl" />
          <img
            src={slide.mobileImage}
            alt={slide.title}
            className="w-full h-full object-cover object-center rounded-3xl"
          />
        </div>
        
        {/* Desktop Image (hidden on mobile) */}
        <div className="hidden md:block">
          <div className="absolute inset-0 bg-black bg-opacity-40 z-10 rounded-3xl" />
          <img
            src={slide.desktopImage}
            alt={slide.title}
            className="w-full h-full object-cover object-center rounded-3xl"
          />
        </div>
        
        {/* Content - Mobile optimized with smaller font sizes and centered alignment */}
        <div className="absolute inset-0 z-20 flex items-start md:items-center justify-center md:justify-start">
          <div className={`text-center md:text-left text-white max-w-4xl px-6 lg:px-[60px] pt-16 md:pt-0 transform transition-all duration-1000 ease-out ${
            index === currentSlide 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 -translate-y-8'
          }`}
          style={{ 
            transitionDelay: index === currentSlide ? '500ms' : '0ms' 
          }}>
            <h1 className="text-2xl md:text-5xl lg:text-6xl font-bold mb-2 md:mb-6 font-luxury">
              {slide.title}
            </h1>
            <p className="text-sm md:text-xl lg:text-2xl mb-4 md:mb-8">
              {slide.subtitle}
            </p>
            <Link
              to={slide.link}
              className="inline-block px-5 py-2 md:px-8 md:py-3 rounded-lg text-sm md:text-lg font-medium transition-all duration-200 transform hover:scale-105 text-white bg-gradient-to-r from-amber-600 to-amber-700"
            >
              {slide.cta}
            </Link>
          </div>
        </div>
      </div>
    ))}

    {/* Slide Indicators - Always visible */}
    <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-30 flex space-x-2">
      {heroSlides.map((_, index) => (
        <button
          key={index}
          onClick={() => setCurrentSlide(index)}
          className={`w-3 h-3 rounded-full transition-all duration-200 ${
            index === currentSlide ? 'bg-dark' : 'bg-white bg-opacity-30'
          }`}
          aria-label={`Go to slide ${index + 1}`}
        />
      ))}
    </div>
  </div>
</section>

      {/* Other sections would go here */}
    </div>
  );
};

export default Home;
