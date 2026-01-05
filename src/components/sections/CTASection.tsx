import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Phone, Mail } from "lucide-react";

const CTASection = () => {
  return (
    <section className="relative py-20 overflow-hidden bg-maroon-gradient">
      {/* Decorative Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23D4AF37' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      <div className="container-luxury relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-3xl mx-auto"
        >
          <span className="inline-block text-accent text-sm tracking-[0.2em] uppercase font-semibold mb-4">
            Ready to Experience Luxury?
          </span>

          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-semibold text-primary-foreground mb-6">
            Let Us Make Your Stay
            <span className="block text-accent">Unforgettable</span>
          </h2>

          <p className="text-primary-foreground/80 text-lg mb-10">
            Whether you're planning a lavish wedding, a corporate event, or a relaxing getaway,
            our team is here to curate the perfect experience for you.
          </p>

          {/* Side by side buttons for all screen sizes */}
          <div className="flex flex-row gap-4 justify-center max-w-md mx-auto">
            <Button variant="hero" size="xl" className="flex-1" asChild>
              <a href="tel:+918378064999" className="flex items-center justify-center gap-2">
                <Phone className="w-5 h-5" />
                Call Now
              </a>
            </Button>

            <Button variant="heroOutline" size="xl" className="flex-1" asChild>
              <Link to="/contact" className="flex items-center justify-center gap-2">
                <Mail className="w-5 h-5" />
                Contact Us
              </Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
