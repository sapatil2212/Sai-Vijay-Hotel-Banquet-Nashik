import { useState } from 'react';
import { motion } from 'framer-motion';
import { BookOpen } from 'lucide-react';
import BookingModal from './BookingModal';

interface BookNowButtonProps {
  roomType?: string;
  className?: string;
}

const BookNowButton = ({ roomType = 'Standard Room', className = '' }: BookNowButtonProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      <motion.button
        onClick={openModal}
        className={`relative group p-2 md:p-4 bg-accent rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 ${className}`}
        title="Book Now"
        aria-label="Book Now"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <BookOpen className="h-4 w-4 md:h-6 md:w-6 text-white" />
        <span className="absolute right-full top-1/2 transform -translate-y-1/2 mr-3 px-2 py-1 bg-gray-800 text-white text-xs rounded-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
          Book Now
        </span>
      </motion.button>

      <BookingModal 
        isOpen={isModalOpen} 
        onClose={closeModal} 
        roomType={roomType} 
      />
    </>
  );
};

export default BookNowButton;
