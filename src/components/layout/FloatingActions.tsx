import React from 'react';
import { Phone } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';

const FloatingActions: React.FC = () => {
  const handleWhatsApp = () => {
    const phoneNumber = '919130070701';
    const message = 'Hello! I would like to inquire about Hotel Sai Vijay services.';
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleCall = () => {
    window.location.href = 'tel:+919130070701';
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-4">
      {/* WhatsApp Button */}
      <button
        onClick={handleWhatsApp}
        className="relative group p-2 md:p-4 bg-[#25D366] rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
        title="Chat on WhatsApp"
        aria-label="Chat on WhatsApp"
      >
        <FaWhatsapp className="h-4 w-4 md:h-6 md:w-6 text-white" />
        <span className="absolute right-full top-1/2 transform -translate-y-1/2 mr-3 px-2 py-1 bg-gray-800 text-white text-xs rounded-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
          WhatsApp Us
        </span>
      </button>

      {/* Call Button */}
      <button
        onClick={handleCall}
        className="relative group p-2 md:p-4 bg-accent rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
        title="Call Us"
        aria-label="Call Us"
      >
        <Phone className="h-4 w-4 md:h-6 md:w-6 text-white" />
        <span className="absolute right-full top-1/2 transform -translate-y-1/2 mr-3 px-2 py-1 bg-gray-800 text-white text-xs rounded-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
          Call Now
        </span>
      </button>
    </div>
  );
};

export default FloatingActions;
