import { useRef } from "react";
import { ChevronLeft, ChevronRight, Star, Quote, Check } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

interface Testimonial {
  id: number;
  name: string;
  event: string;
  rating: number;
  text: string;
  avatar: string;
  verified?: boolean;
  imageUrl?: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Pranav Kadepurkar",
    event: "Family Function",
    rating: 5,
    text: "Excellent food quality and service by the management of hotel sai vijay. We had two big functions at this venue. Mr. Shaikh personally looks after every thing and is available round the clock. Definitely recommended for your family function.",
    avatar: "PK",
    verified: true,
  },
  {
    id: 2,
    name: "Gauri Shukla",
    event: "Vacation",
    rating: 5,
    text: "Beautiful hotel, services, cleanliness, and the location. It's located in the main city and has the best rooms. I only stayed for 1 night but had a wonderful experience. Breakfast was completely for my trip so +1 for that. Loved the stay. Whenever I will be in nashik again, I will definitely stay in sai vijay.",
    avatar: "GS",
    verified: true,
  },
  {
    id: 3,
    name: "Nikhil Supalkar",
    event: "Baby Shower",
    rating: 5,
    text: "Banquet Hall is very good for baby shower event and decoration also was outstanding. Very polite staff and service. All staff members help us throughout the event. Food quality is also extremely good.",
    avatar: "NS",
    verified: true,
  },
  {
    id: 4,
    name: "Rushikesh Vispute",
    event: "Wedding Function",
    rating: 5,
    text: "Very very very good hall and rooms and services. I will suggest all please enjoy Sai Vijay hotel all marriage all functions. And food quality is the best.",
    avatar: "RV",
    verified: true,
  },
  {
    id: 5,
    name: "Amit Kumar",
    event: "Family Stay",
    rating: 5,
    text: "Good place to stay in good locality. Staff is good and cooperative. You can add breakfast in your stay by just adding 100/- per head. Pure veg hotel only for families. No bachelors or groups allowed.",
    avatar: "AK",
    verified: true,
  },
  {
    id: 6,
    name: "Chiranjivi Pathak",
    event: "Baby Naming Ceremony",
    rating: 5,
    text: "I celebrated my baby naming ceremony in sai vijay hotel. Amazing food quality and very polite and professional staff. Thanks hotel sai vijay and team for making our day very special.",
    avatar: "CP",
    verified: true,
  },
  {
    id: 7,
    name: "Kranti Solse",
    event: "3-Day Stay",
    rating: 5,
    text: "I had a wonderful stay at Hotel Sai Vijay, Nashik! The room was spacious, clean, and well-maintained, making for a very comfortable stay. The food was absolutely excellent throughout our three days there. The Manchurian Havai dish were particularly outstanding – definitely worth trying!",
    avatar: "KS",
    verified: true,
  },
];

const TestimonialsSection = () => {
  const swiperRef = useRef<SwiperType | null>(null);

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-3 w-3 transition-colors duration-300 ${
          i < rating ? "text-accent fill-accent" : "text-muted-foreground/30"
        }`}
      />
    ));
  };

  const GoogleLogo = () => (
    <div className="flex items-center gap-2 px-2 py-1 bg-muted/50 rounded-full opacity-80">
      <svg viewBox="0 0 24 24" width="14" height="14">
        <path
          fill="#4285F4"
          d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
        />
        <path
          fill="#34A853"
          d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
        />
        <path
          fill="#FBBC05"
          d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
        />
        <path
          fill="#EA4335"
          d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
        />
      </svg>
      <span className="text-xs font-medium text-muted-foreground">Google</span>
    </div>
  );

  const renderTestimonialCard = (testimonial: Testimonial) => (
    <div
      key={testimonial.id}
      className="relative bg-card rounded-xl p-4 mx-1 transition-all duration-700 ease-in-out cursor-pointer border border-border/50 transform hover:scale-105 mb-5"
      style={{
        animation: 'fadeInOut 0.8s ease-in-out',
        opacity: 0,
        animationFillMode: 'forwards'
      }}
    >
      {/* Quote icon */}
      <div className="absolute top-3 right-3 opacity-10">
        <Quote className="h-6 w-6 text-primary" />
      </div>

      <div className="relative z-10 animate-fadeIn">
        {/* Header */}
        <div className="flex items-start space-x-3 mb-3 animate-slideInUp">
          <div className="relative">
            {testimonial.imageUrl ? (
              <img
                src={testimonial.imageUrl}
                alt={testimonial.name}
                className="w-10 h-10 rounded-xl object-cover"
              />
            ) : (
              <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center font-bold text-primary-foreground text-sm">
                {testimonial.avatar}
              </div>
            )}
            {testimonial.verified && (
              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
                <Check className="w-2 h-2 text-white" />
              </div>
            )}
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between mb-1">
              <h3 className="font-semibold text-foreground text-sm">{testimonial.name}</h3>
              <div className="flex items-center space-x-0.5">{renderStars(testimonial.rating)}</div>
            </div>
            <p className="text-xs text-muted-foreground mb-0.5 font-medium">{testimonial.event}</p>
          </div>
        </div>

        {/* Quote text */}
        <blockquote className="text-foreground/80 leading-relaxed mb-4 text-sm relative">
          <span className="text-primary text-lg font-bold">&ldquo;</span>
          <span className="relative z-10">{testimonial.text}</span>
          <span className="text-primary text-lg font-bold relative z-10">&rdquo;</span>
          {/* Text fade overlay */}
          <div className="absolute top-0 right-0 w-40 h-full bg-gradient-to-l from-card to-transparent pointer-events-none z-5"></div>
        </blockquote>

        {/* Footer */}
        <div className="flex items-center justify-between">
          <GoogleLogo />
          <div className="text-xs text-green-600 font-medium">✓ Verified Review</div>
        </div>
      </div>
    </div>
  );

  return (
    <section className="section-padding bg-background overflow-hidden">
      <div className="container-luxury">
        <div className="bg-card border border-border rounded-3xl p-8 lg:p-12">
          {/* Modern header */}
          <div className="text-center mb-16 lg:mb-20">
            <div className="inline-flex items-center space-x-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-semibold mb-6">
              <Star className="h-4 w-4 fill-current" />
              <span>Guest Testimonials</span>
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-4 leading-tight">
              What Our{" "}
              <span className="text-primary">
                Valued Guests
              </span>{" "}
              Say About Us
            </h2>

            <p className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto mb-8 leading-relaxed">
              Real experiences from our valued guests who trust us for exceptional hospitality and unforgettable celebrations
            </p>
          </div>

          {/* Carousel */}
          <div className="relative group overflow-hidden">
            {/* Left fade gradient */}
            <div className="absolute left-0 top-0 w-20 h-full bg-gradient-to-r from-card to-transparent z-10 pointer-events-none"></div>
            {/* Right fade gradient */}
            <div className="absolute right-0 top-0 w-20 h-full bg-gradient-to-l from-card to-transparent z-10 pointer-events-none"></div>

            
            {/* Left Navigation Arrow */}
            <button
              onClick={() => swiperRef.current?.slidePrev()}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-20 flex items-center justify-center w-12 h-12 bg-card/90 backdrop-blur-sm rounded-full shadow-lg border border-border opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-card hover:shadow-xl hover:scale-110"
            >
              <ChevronLeft className="h-5 w-5 text-muted-foreground hover:text-primary transition-colors duration-300" />
            </button>
            
            {/* Right Navigation Arrow */}
            <button
              onClick={() => swiperRef.current?.slideNext()}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-20 flex items-center justify-center w-12 h-12 bg-card/90 backdrop-blur-sm rounded-full shadow-lg border border-border opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-card hover:shadow-xl hover:scale-110"
            >
              <ChevronRight className="h-5 w-5 text-muted-foreground hover:text-primary transition-colors duration-300" />
            </button>

            <Swiper
              modules={[Autoplay, Navigation, Pagination]}
              spaceBetween={16}
              slidesPerView={1}
              centeredSlides={true}
              loop={true}
              autoplay={{
                delay: 4000,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
              }}
              effect="slide"
              speed={800}
              breakpoints={{
                480: {
                  slidesPerView: 1.2,
                  spaceBetween: 16,
                },
                640: {
                  slidesPerView: 1.4,
                  spaceBetween: 20,
                },
                768: {
                  slidesPerView: 1.8,
                  spaceBetween: 24,
                },
                1024: {
                  slidesPerView: 2.2,
                  spaceBetween: 28,
                },
                1280: {
                  slidesPerView: 2.5,
                  spaceBetween: 32,
                },
              }}
              onSwiper={(swiper: SwiperType) => {
                swiperRef.current = swiper
              }}
              className="pb-12 overflow-visible"
            >
              {testimonials.map((testimonial) => (
                <SwiperSlide key={testimonial.id}>{renderTestimonialCard(testimonial)}</SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeInOut {
          0% {
            opacity: 0;
            transform: translateY(20px) scale(0.95);
          }
          50% {
            opacity: 0.8;
            transform: translateY(10px) scale(0.98);
          }
          100% {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        
        .swiper-slide {
          transition: all 0.8s ease-in-out;
          position: relative;
          overflow: visible !important;
          opacity: 0 !important;
          transform: scale(0.7) !important;
        }
        
        .swiper-slide-active {
          transform: scale(1) !important;
          opacity: 1 !important;
          z-index: 2;
          filter: blur(0px);
        }
        
        .swiper-slide-prev,
        .swiper-slide-next {
          transform: scale(0.85) !important;
          opacity: 0.5 !important;
          z-index: 1;
          filter: blur(1.5px);
        }
        
        .swiper-slide-prev {
          transform: scale(0.85) translateX(10%) !important;
        }
        
        .swiper-slide-next {
          transform: scale(0.85) translateX(-10%) !important;
        }
        
        /* Hide slides that are further away */
        .swiper-slide:not(.swiper-slide-active):not(.swiper-slide-prev):not(.swiper-slide-next) {
          opacity: 0 !important;
          visibility: hidden;
        }
        
        .swiper-slide {
          position: relative;
          overflow: visible !important;
        }
        
        .swiper-slide::before {
          content: '';
          position: absolute;
          top: 0;
          right: -40px;
          width: 150px;
          height: 100%;
          background: linear-gradient(to right, transparent, hsl(var(--card)));
          pointer-events: none;
          z-index: 25;
          border-radius: 0 12px 12px 0;
        }
        
        .swiper-slide-active::before {
          background: linear-gradient(to right, transparent, hsla(var(--card), 0.95));
        }
        
        .swiper-slide-prev::before,
        .swiper-slide-next::before {
          background: linear-gradient(to right, transparent, hsla(var(--card), 0.98));
        }
        
        @keyframes fadeIn {
          0% {
            opacity: 0;
          }
          100% {
            opacity: 1;
          }
        }
        
        @keyframes slideInUp {
          0% {
            opacity: 0;
            transform: translateY(20px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.6s ease-out 0.2s both;
        }
        
        .animate-slideInUp {
          animation: slideInUp 0.6s ease-out 0.4s both;
        }
      `}</style>
    </section>
  );
};

export default TestimonialsSection;
