import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { MapPin, Phone, Mail } from "lucide-react";
import logo from "@/assets/logo-dark.png";
import facebookIcon from "@/assets/social_icons/facebook.png";
import twitterIcon from "@/assets/social_icons/twitter.png";
import instagramIcon from "@/assets/social_icons/instagram.png";
import linkedinIcon from "@/assets/social_icons/linkedin.png";
import pinterestIcon from "@/assets/social_icons/pinterest.png";
import youtubeIcon from "@/assets/social_icons/youtube.png";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary text-primary-foreground">
      {/* Main Footer */}
      <div className="container-luxury section-padding">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center mb-6">
              <img 
                src={logo} 
                alt="Sai Vijay Hotel & Banquet Logo" 
                className="h-16 w-auto"
              />
            </div>
            <p className="text-primary-foreground/80 leading-relaxed mb-6">
              Where luxury meets timeless hospitality. Experience royal elegance and create unforgettable memories with us.
            </p>
            <div className="flex gap-3 flex-wrap">
              <a
                href="https://www.facebook.com/saivijayhotels"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:opacity-80 transition-opacity duration-200"
                aria-label="Facebook"
              >
                <img src={facebookIcon} alt="Facebook" className="h-7 w-7" />
              </a>
              <a
                href="https://x.com/hotelsaivijay1"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:opacity-80 transition-opacity duration-200"
                aria-label="Twitter"
              >
                <img src={twitterIcon} alt="Twitter" className="h-7 w-7" />
              </a>
              <a
                href="https://www.instagram.com/saivijayhotelsandbanquet"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:opacity-80 transition-opacity duration-200"
                aria-label="Instagram"
              >
                <img src={instagramIcon} alt="Instagram" className="h-7 w-7" />
              </a>
            
              <a
                href="https://in.pinterest.com/saivijaynasik/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:opacity-80 transition-opacity duration-200"
                aria-label="Pinterest"
              >
                <img src={pinterestIcon} alt="Pinterest" className="h-7 w-7" />
              </a>
              <a
                href="https://www.youtube.com/@saivijay-hotelsbanquet5348"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:opacity-80 transition-opacity duration-200"
                aria-label="YouTube"
              >
                <img src={youtubeIcon} alt="YouTube" className="h-7 w-7" />
              </a>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h4 className="font-serif text-lg font-semibold mb-6 text-accent">Quick Links</h4>
            <ul className="space-y-3">
              {["Home", "About", "Rooms", "Banquet", "Gallery", "Contact"].map((link) => (
                <li key={link}>
                  <Link
                    to={link === "Home" ? "/" : `/${link.toLowerCase()}`}
                    className="text-primary-foreground/80 hover:text-accent transition-colors duration-300"
                  >
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Services */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h4 className="font-serif text-lg font-semibold mb-6 text-accent">Our Services</h4>
            <ul className="space-y-3 text-primary-foreground/80">
              <li>Luxury Accommodations</li>
              <li>Wedding Celebrations</li>
              <li>Corporate Events</li>
              <li>Fine Dining</li>
              <li>Conference Halls</li>
              <li>24/7 Room Service</li>
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h4 className="font-serif text-lg font-semibold mb-6 text-accent">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                <span className="text-primary-foreground/80">
                  309, 1, Pathardi Phata, Near Taj Gateway,<br />
                  Next to Indoline Furniture, Ambad Link Road,<br />
                  Ambad, Nashik - 422 010
                </span>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                <div className="text-primary-foreground/80">
                  <a href="tel:+918378064999" className="hover:text-accent transition-colors block">
                    +91 83780 64999
                  </a>
                  <a href="tel:+918390633999" className="hover:text-accent transition-colors block">
                    +91 83906 33999
                  </a>
                </div>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-accent flex-shrink-0" />
                <a href="mailto:saivijaynasik@gmail.com" className="text-primary-foreground/80 hover:text-accent transition-colors">
                  saivijaynasik@gmail.com
                </a>
              </li>
            </ul>
          </motion.div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-primary-foreground/10">
        <div className="container-luxury py-6">
          <p className="text-primary-foreground/60 text-sm text-center">
            © {currentYear} Sai Vijay Hotel & Banquet. All rights reserved. | Made with ❤️ by{' '}
            <a 
              href="https://digiworldtechnologies.com/" 
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent hover:text-accent/80 transition-colors duration-200"
            >
              Digiworld Infotech
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
