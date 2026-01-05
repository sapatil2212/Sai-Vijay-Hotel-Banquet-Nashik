import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Users, Calendar as CalendarIcon, ArrowRight, Minus, Plus, Phone, ChevronLeft, ChevronRight } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import type { DateRange } from "react-day-picker";

// Desktop hero images
import heroLobby from "@/assets/hero/hero_1.png";
import heroRooms from "@/assets/hero/hero_2.png";
import heroDining from "@/assets/hero/hero_3.png";

// Mobile hero images
import heroLobbyMobile from "@/assets/hero/hero_1_mobile.png";
import heroRoomsMobile from "@/assets/hero/hero_2_mobile.png";
import heroDiningMobile from "@/assets/hero/hero_3_mobile.png";

const slides = [
  {
    desktopImage: heroLobby,
    mobileImage: heroLobbyMobile,
    title: "Where Every Door Opens to Luxury",
    subtitle: "From the moment you step inside, feel the warmth of personalized service"
  },
  {
    desktopImage: heroRooms,
    mobileImage: heroRoomsMobile,
    title: "Your dream event deserves a royal venue",
    subtitle: "Spacious and equipped with modern amenities, our banquet hall is ready to host your happiest moments"
  },
  {
    desktopImage: heroDining,
    mobileImage: heroDiningMobile,
    title: "A Regal Setting for Memorable Moments",
    subtitle: "Celebrate weddings, receptions, and corporate gatherings in an atmosphere of grace and grandeur."
  },
];

const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [dateRange, setDateRange] = useState<DateRange | undefined>();
  const [guests, setGuests] = useState(2);
  const [rooms, setRooms] = useState(1);
  const [guestPopoverOpen, setGuestPopoverOpen] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const handleExploreRooms = () => {
    if (!dateRange?.from || !dateRange?.to) {
      toast({
        title: "Please select dates",
        description: "Choose your check-in and check-out dates to continue.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Great choice!",
      description: `Searching rooms for ${guests} guest${guests > 1 ? 's' : ''}, ${rooms} room${rooms > 1 ? 's' : ''} from ${format(dateRange.from, "MMM d")} to ${format(dateRange.to, "MMM d, yyyy")}.`,
    });
    navigate("/rooms");
  };

  return (
    <section className="relative overflow-x-hidden w-full">
      {/* Hero Content Area */}
      <div className="relative h-[100vh] min-h-[600px] w-full flex items-center overflow-hidden bg-black max-w-[100vw]">
        {/* Background Images with Black Fade Transition */}
        <AnimatePresence mode="wait">

          <motion.div
            key={currentSlide}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2 }}
            className="absolute inset-0 w-full h-full"
          >
            {/* Mobile Image (hidden on desktop) */}
            <div className="md:hidden w-full h-full">
              <img
                src={slides[currentSlide].mobileImage}
                alt={slides[currentSlide].title}
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Desktop Image (hidden on mobile) */}
            <div className="hidden md:block w-full h-full">
              <img
                src={slides[currentSlide].desktopImage}
                alt={slides[currentSlide].title}
                className="w-full h-full object-cover"
              />
            </div>
              
          </motion.div>
        </AnimatePresence>

        {/* Content */}
        <div className="relative z-20 flex items-center justify-center md:justify-start h-full w-full max-w-full">
   <div className="max-w-3xl w-full px-6 md:px-10 lg:px-16 text-center md:text-left mt-[-35vh] md:mt-0">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mb-3"
            >
              <span className="inline-block text-accent text-xs md:text-sm tracking-wide uppercase font-medium bg-black/30 px-4 py-1 rounded-full mx-auto md:mx-0">
                Welcome to Sai Vijay
              </span>
            </motion.div>

            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide}
                initial={{ opacity: 0, y: -30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 30 }}
                transition={{ duration: 0.6 }}
              >
                <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold text-primary-foreground leading-tight mb-3 md:mb-5 mx-auto md:mx-0 drop-shadow-lg break-words max-w-full font-serif">
                  {slides[currentSlide].title}
                </h1>

                <p className="text-sm md:text-lg text-primary-foreground/90 max-w-2xl leading-relaxed mb-6 md:mb-8 mx-auto md:mx-0 drop-shadow-md break-words">
                  {slides[currentSlide].subtitle}
                </p>
              </motion.div>
            </AnimatePresence>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <Button size="lg" asChild className="max-w-full mx-auto md:mx-0 bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white relative overflow-hidden group transition-all duration-300">
                <Link to="/contact" className="inline-flex items-center gap-2">
                  <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white to-transparent opacity-20 group-hover:animate-shimmer"></span>
                  <span className="relative z-10">Book Now</span>
                  <ArrowRight className="w-4 h-4 relative z-10" />
                </Link>
              </Button>
            </motion.div>

            {/* Slide Indicators - Hidden on mobile */}
            <div className="hidden md:flex items-center justify-center md:justify-start gap-3 mt-10 max-w-full flex-wrap">
              {slides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    index === currentSlide
                      ? "bg-accent w-10 shadow-glow"
                      : "bg-primary-foreground/40 w-2 hover:bg-primary-foreground/60"
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Quick Booking Form - Overlapping - HIDDEN FOR NOW */}
      {/* <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="relative z-30 -mt-16"
      >
        <div className="container-luxury">
          <div className="bg-background rounded-2xl shadow-elegant p-6 md:p-8 border border-border/50">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 items-end">
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Guests and Rooms</label>
                <Popover open={guestPopoverOpen} onOpenChange={setGuestPopoverOpen}>
                  <PopoverTrigger asChild>
                    <button className="flex items-center gap-3 border border-border rounded-lg px-4 py-3 bg-background hover:border-accent/50 transition-colors w-full text-left">
                      <Users className="w-5 h-5 text-muted-foreground" />
                      <span className="text-sm text-foreground">
                        {guests} Guest{guests > 1 ? 's' : ''}, {rooms} Room{rooms > 1 ? 's' : ''}
                      </span>
                    </button>
                  </PopoverTrigger>
                  <PopoverContent className="w-72 bg-background border border-border" align="start">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-foreground">Guests</span>
                        <div className="flex items-center gap-3">
                          <button
                            onClick={() => setGuests(Math.max(1, guests - 1))}
                            className="w-8 h-8 rounded-full border border-border flex items-center justify-center hover:bg-accent/10 transition-colors"
                          >
                            <Minus className="w-4 h-4 text-muted-foreground" />
                          </button>
                          <span className="w-6 text-center text-sm font-medium">{guests}</span>
                          <button
                            onClick={() => setGuests(Math.min(10, guests + 1))}
                            className="w-8 h-8 rounded-full border border-border flex items-center justify-center hover:bg-accent/10 transition-colors"
                          >
                            <Plus className="w-4 h-4 text-muted-foreground" />
                          </button>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-foreground">Rooms</span>
                        <div className="flex items-center gap-3">
                          <button
                            onClick={() => setRooms(Math.max(1, rooms - 1))}
                            className="w-8 h-8 rounded-full border border-border flex items-center justify-center hover:bg-accent/10 transition-colors"
                          >
                            <Minus className="w-4 h-4 text-muted-foreground" />
                          </button>
                          <span className="w-6 text-center text-sm font-medium">{rooms}</span>
                          <button
                            onClick={() => setRooms(Math.min(5, rooms + 1))}
                            className="w-8 h-8 rounded-full border border-border flex items-center justify-center hover:bg-accent/10 transition-colors"
                          >
                            <Plus className="w-4 h-4 text-muted-foreground" />
                          </button>
                        </div>
                      </div>
                      <Button 
                        size="sm" 
                        className="w-full mt-2 bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white relative overflow-hidden group transition-all duration-300"
                        onClick={() => setGuestPopoverOpen(false)}
                      >
                        <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white to-transparent opacity-20 group-hover:animate-shimmer"></span>
                        <span className="relative z-10">Done</span>
                      </Button>
                    </div>
                  </PopoverContent>
                </Popover>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Check In - Check Out Date</label>
                <Popover>
                  <PopoverTrigger asChild>
                    <button className={cn(
                      "flex items-center gap-3 border border-border rounded-lg px-4 py-3 bg-background hover:border-accent/50 transition-colors w-full text-left",
                      !dateRange && "text-muted-foreground"
                    )}>
                      <CalendarIcon className="w-5 h-5 text-muted-foreground" />
                      <span className="text-sm">
                        {dateRange?.from ? (
                          dateRange.to ? (
                            <>
                              {format(dateRange.from, "MMM d")} - {format(dateRange.to, "MMM d, yyyy")}
                            </>
                          ) : (
                            format(dateRange.from, "MMM d, yyyy")
                          )
                        ) : (
                          "Add Date"
                        )}
                      </span>
                    </button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0 bg-background border border-border" align="start">
                    <Calendar
                      mode="range"
                      selected={dateRange}
                      onSelect={setDateRange}
                      numberOfMonths={2}
                      disabled={(date) => date < new Date()}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <Button size="lg" className="w-full h-[50px] bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white relative overflow-hidden group transition-all duration-300" onClick={handleExploreRooms}>
                <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white to-transparent opacity-20 group-hover:animate-shimmer"></span>
                <span className="relative z-10">Explore Rooms</span>
                <ArrowRight className="w-4 h-4 ml-2 relative z-10" />
              </Button>
            </div>
          </div>
        </div>
      </motion.div> */}
    </section>
  );
};

export default HeroSection;