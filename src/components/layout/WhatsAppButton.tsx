import { motion } from "framer-motion";
import { Phone } from "lucide-react";
import whatsappIcon from "@/assets/social_icons/whatsapp.png";

const WhatsAppButton = () => {
  const phoneNumber = "918378064999";
  const callNumber = "+918378064999";
  const message = encodeURIComponent("Hello! I would like to inquire about rooms and banquet services at Sai Vijay Hotel.");
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3">
      {/* WhatsApp Button */}
      <motion.a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1, duration: 0.4, type: "spring", stiffness: 200 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="w-14 h-14 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow relative"
        aria-label="Chat on WhatsApp"
      >
        <img src={whatsappIcon} alt="WhatsApp" className="w-14 h-14 rounded-full" />
        <span className="absolute -top-1 -right-1 w-4 h-4 bg-accent rounded-full animate-ping" />
        <span className="absolute -top-1 -right-1 w-4 h-4 bg-accent rounded-full" />
      </motion.a>

      {/* Phone Call Button */}
      <motion.a
        href={`tel:${callNumber}`}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.4, type: "spring", stiffness: 200 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="w-14 h-14 bg-accent rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow relative"
        aria-label="Call Us"
      >
        <Phone className="w-7 h-7 text-white" />
        <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#25D366] rounded-full animate-ping" />
        <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#25D366] rounded-full" />
      </motion.a>
    </div>
  );
};

export default WhatsAppButton;
