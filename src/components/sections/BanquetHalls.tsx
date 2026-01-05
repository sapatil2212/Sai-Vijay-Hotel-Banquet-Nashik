import { motion } from 'framer-motion';
import { Users, Sparkles, Calendar } from 'lucide-react';
import { BanquetBookNowButton } from '@/components/ui/banquet-book-now-button';
import banquet1 from "@/assets/banquet/1.webp";
import banquet2 from "@/assets/banquet/2.webp";
import banquet3 from "@/assets/banquet/3.webp";

const banquetHalls = [
  {
    id: 1,
    name: 'The Crown by Sai Vijay',
    icon: '👑',
    capacity: 'Up to 250 Guests',
    description: 'A grand and elegant banquet hall designed for large-scale celebrations. The Crown is perfect for weddings, receptions, and prestigious events that demand space, style, and flawless execution.',
    idealFor: ['Weddings', 'Grand Receptions', 'Corporate Events', 'Social Gatherings'],
    highlights: [
      'Spacious royal interiors',
      'Elegant lighting & décor',
      'Comfortable seating layout',
      'Professional event support'
    ],
    ctaText: 'Enquire for Grand Events',
    image: banquet1
  },
  {
    id: 2,
    name: 'Sai Vijay Pearl Hall',
    icon: '✨',
    capacity: '75 – 100 Guests',
    description: 'A refined and versatile banquet space offering a perfect balance of elegance and intimacy. Pearl Hall is ideal for medium-sized celebrations with a touch of sophistication.',
    idealFor: ['Engagements', 'Birthday Parties', 'Corporate Meetings', 'Family Functions'],
    highlights: [
      'Elegant interiors',
      'Flexible seating arrangements',
      'Calm & comfortable ambiance',
      'Dedicated service team'
    ],
    ctaText: 'Plan Your Celebration',
    image: banquet2
  },
  {
    id: 3,
    name: 'The Lotus Lounge',
    icon: '🌸',
    capacity: '50 – 75 Guests',
    description: 'An intimate and graceful venue crafted for close-knit gatherings. The Lotus Lounge offers a warm and stylish setting for meaningful celebrations and professional meet-ups.',
    idealFor: ['Small Receptions', 'Private Parties', 'Meetings', 'Get-Togethers'],
    highlights: [
      'Cozy yet elegant design',
      'Peaceful ambiance',
      'Ideal for private events',
      'Personalized service'
    ],
    ctaText: 'Book an Intimate Event',
    image: banquet3
  }
];

const BanquetHalls = () => {
  return (
    <section className="py-12 lg:py-20 bg-gradient-to-b from-cream to-white">
      <div className="container mx-auto px-6 lg:px-8 xl:px-32">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 font-serif">
            Our Banquet Halls
          </h2>
          <p className="text-base lg:text-lg text-gray-600 max-w-3xl mx-auto">
            Choose the perfect venue for your celebration, from grand events to intimate gatherings
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {banquetHalls.map((hall, index) => (
            <motion.div
              key={hall.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100"
            >
              {/* Image */}
              <div className="relative h-56 overflow-hidden group">
                <img
                  src={hall.image}
                  alt={hall.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full">
                  <span className="flex items-center text-sm font-semibold text-gray-800">
                    <Users className="w-4 h-4 mr-1.5 text-amber-600" />
                    {hall.capacity}
                  </span>
                </div>
                <div className="absolute bottom-4 left-4">
                  <span className="text-4xl">{hall.icon}</span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2 font-serif">
                  {hall.name}
                </h3>
                
                <p className="text-sm text-gray-600 mb-4 leading-relaxed line-clamp-3">
                  {hall.description}
                </p>

                {/* Ideal For */}
                <div className="mb-4">
                  <h4 className="text-xs font-semibold text-gray-700 mb-2 uppercase tracking-wide">
                    Ideal For:
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {hall.idealFor.map((item, idx) => (
                      <span
                        key={idx}
                        className="text-xs bg-amber-50 text-amber-700 px-2.5 py-1 rounded-full font-medium"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Highlights */}
                <div className="mb-5">
                  <h4 className="text-xs font-semibold text-gray-700 mb-2 uppercase tracking-wide">
                    Highlights:
                  </h4>
                  <ul className="space-y-1.5">
                    {hall.highlights.map((highlight, idx) => (
                      <li key={idx} className="flex items-start text-xs text-gray-600">
                        <Sparkles className="w-3 h-3 mr-2 text-amber-500 flex-shrink-0 mt-0.5" />
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* CTA Button */}
                <BanquetBookNowButton
                  eventType={hall.name}
                  className="w-full bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white px-4 py-2.5 rounded-lg font-medium transition-all duration-300 flex items-center justify-center gap-2 relative overflow-hidden group"
                >
                  <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white to-transparent opacity-20 group-hover:animate-shimmer"></span>
                  <Calendar className="w-4 h-4 relative z-10" />
                  <span className="relative z-10">{hall.ctaText}</span>
                </BanquetBookNowButton>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BanquetHalls;
