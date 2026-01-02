import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Heart, Users, Briefcase, Sparkles } from "lucide-react";
import banquetImage from "@/assets/banquet-wedding.jpg";

const BanquetHighlight = () => {
  const features = [
    { icon: Heart, label: "Weddings" },
    { icon: Sparkles, label: "Receptions" },
    { icon: Briefcase, label: "Corporate" },
    { icon: Users, label: "Social Events" },
  ];

  return (
    <section className="relative min-h-[80vh] flex items-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <img
          src={banquetImage}
          alt="Grand Banquet Hall"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-luxury-gradient opacity-85" />
      </div>

      <div className="container-luxury relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block text-accent text-sm tracking-[0.2em] uppercase font-semibold mb-4">
              Royal Celebrations
            </span>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-semibold text-primary-foreground leading-tight mb-6">
              Grand Banquet Halls for
              <span className="block text-accent">Unforgettable Events</span>
            </h2>
            <p className="text-primary-foreground/80 text-lg leading-relaxed mb-8">
              Transform your special occasions into legendary celebrations. Our 
              magnificent banquet halls, with their regal decor and impeccable 
              service, provide the perfect canvas for weddings, receptions, 
              corporate gatherings, and milestone celebrations.
            </p>

            {/* Features Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="glass-card rounded-lg p-4 text-center"
                >
                  <feature.icon className="w-8 h-8 text-accent mx-auto mb-2" />
                  <span className="text-primary-foreground text-sm font-medium">
                    {feature.label}
                  </span>
                </motion.div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button variant="hero" size="lg" asChild>
                <Link to="/banquet">Plan Your Event</Link>
              </Button>
              <Button variant="heroOutline" size="lg" asChild>
                <Link to="/contact">Get Quote</Link>
              </Button>
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="hidden lg:grid grid-cols-2 gap-6"
          >
            {[
              { number: "500+", label: "Guests Capacity" },
              { number: "1000+", label: "Events Hosted" },
              { number: "5", label: "Banquet Halls" },
              { number: "100%", label: "Client Satisfaction" },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                className="glass-card rounded-xl p-6 text-center"
              >
                <p className="font-serif text-4xl font-bold text-accent mb-2">
                  {stat.number}
                </p>
                <p className="text-primary-foreground/80 text-sm">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default BanquetHighlight;
