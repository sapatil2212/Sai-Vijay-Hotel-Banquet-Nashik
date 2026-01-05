import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import logoDark from "@/assets/logo-light.png";
import logoLight from "@/assets/logo-dark.png";

const navLinks = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  { name: "Rooms", path: "/rooms" },
  { name: "Banquet", path: "/banquet" },
  { name: "Gallery", path: "/gallery" },
  { name: "Contact", path: "/contact" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  
  // Check if we're on the home/hero page
  const isHomePage = location.pathname === "/" || location.pathname === "/home";

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 w-full ${
        isScrolled
          ? "bg-background/95 backdrop-blur-md shadow-elegant border-b border-border/50"
          : "bg-transparent"
      }`}
    >
      <nav className={`mx-auto transition-all duration-500 w-full ${
        isScrolled 
          ? "container-luxury" 
          : "max-w-[95%] mx-auto mt-4"
      }`}>
        <div className={`flex items-center justify-between transition-all duration-500 w-full ${
          isScrolled 
            ? "h-20 lg:h-24" 
            : "h-14 lg:h-16 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-6 lg:px-8"
        }`}>
          {/* Logo */}
          <Link to="/" className="flex items-center group">
            <img 
              src={isScrolled ? logoDark : logoLight}
              alt="Sai Vijay Hotel"
              className={`transition-all duration-500 ${
                isScrolled ? "h-16 lg:h-20" : "h-12 lg:h-14"
              }`}
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`relative font-medium text-sm tracking-wide transition-colors duration-300 hover:text-accent ${
                  location.pathname === link.path
                    ? "text-accent"
                    : isScrolled ? "text-foreground" : "text-white"
                }`}
              >
                {link.name}
                {location.pathname === link.path && (
                  <motion.span
                    layoutId="activeNav"
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-accent rounded-full"
                  />
                )}
              </Link>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="hidden lg:flex items-center gap-4">
            <Button 
              variant="goldShimmer" 
              size="default" 
              asChild
            >
              <a href="tel:+918378064999" className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                <span>+91 83780 64999</span>
              </a>
            </Button>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`lg:hidden p-2 transition-all duration-300 z-[110] relative ${isScrolled ? "text-foreground hover:text-accent bg-accent/10 rounded-full" : "text-white hover:text-amber-400"}`}
            aria-label="Toggle menu"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden fixed inset-0 z-[101] bg-black flex flex-col justify-center overflow-y-auto top-0 left-0 right-0 bottom-0 h-[100vh] w-[100vw]"
          >
            {/* Close Button */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-6 right-6 p-2 rounded-full bg-accent text-charcoal hover:bg-accent/90 transition-colors z-[110]"
              aria-label="Close menu"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="container-luxury py-20 space-y-6 w-full max-w-full">
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.path}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Link
                    to={link.path}
                    className={`block py-4 text-xl md:text-2xl font-medium transition-colors text-center ${
                      location.pathname === link.path
                        ? "text-accent"
                        : "text-white hover:text-accent"
                    }`}
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="pt-8 flex flex-col items-center gap-3 w-full"
              >
                <a 
                  href="tel:+918378064999"
                  className="relative overflow-hidden flex items-center justify-center gap-2 max-w-[250px] w-full mx-auto bg-gold-gradient text-charcoal font-medium px-6 py-3 rounded-full transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-0.5 before:absolute before:inset-0 before:-translate-x-full before:animate-shimmer before:bg-gradient-to-r before:from-transparent before:via-white/30 before:to-transparent"
                >
                  <Phone className="w-5 h-5" />
                  <span>+91 83780 64999</span>
                </a>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Navbar;
