import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  roomType?: string;
}

interface BookingFormData {
  name: string;
  contactNo: string;
  email: string;
  guests: string;
  kids: string;
  specialRequirements: string;
  roomType: string;
}

const BookingModal = ({ isOpen, onClose, roomType = 'Standard Room' }: BookingModalProps) => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<BookingFormData>({
    name: '',
    contactNo: '',
    email: '',
    guests: '2',
    kids: '0',
    specialRequirements: '',
    roomType: roomType,
  });

  // Update room type if prop changes
  useEffect(() => {
    setFormData(prev => ({ ...prev, roomType }));
  }, [roomType]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Send booking data to API endpoint
      const response = await fetch('/api/booking', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      
      if (data.success) {
        toast({
          title: "Booking Request Sent!",
          description: "We've received your booking request and will contact you shortly.",
          variant: "default",
        });
        
        // Reset form
        setFormData({
          name: '',
          contactNo: '',
          email: '',
          guests: '2',
          kids: '0',
          specialRequirements: '',
          roomType: roomType,
        });
        
        // Close modal
        onClose();
      } else {
        toast({
          title: "Submission Error",
          description: data.message || "There was a problem sending your booking request. Please try again.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Form submission error:", error);
      toast({
        title: "Submission Error",
        description: "There was a problem sending your booking request. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 z-50"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-md"
          >
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
              {/* Header */}
              <div className="bg-primary px-6 py-4 flex items-center justify-between">
                <h2 className="text-xl font-semibold text-primary-foreground">Book {roomType}</h2>
                <button
                  onClick={onClose}
                  className="text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                  aria-label="Close"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Form */}
              <div className="p-6">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                      Name <span className="text-red-500">*</span>
                    </label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Full Name"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="contactNo" className="block text-sm font-medium text-gray-700 mb-1">
                      Contact No. <span className="text-red-500">*</span>
                    </label>
                    <Input
                      id="contactNo"
                      name="contactNo"
                      value={formData.contactNo}
                      onChange={handleChange}
                      placeholder="+91 XXXXXXXXXX"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Email ID <span className="text-red-500">*</span>
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="your@email.com"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="guests" className="block text-sm font-medium text-gray-700 mb-1">
                        No. of Guests <span className="text-red-500">*</span>
                      </label>
                      <Input
                        id="guests"
                        name="guests"
                        type="number"
                        min="1"
                        max="10"
                        value={formData.guests}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div>
                      <label htmlFor="kids" className="block text-sm font-medium text-gray-700 mb-1">
                        No. of Kids
                      </label>
                      <Input
                        id="kids"
                        name="kids"
                        type="number"
                        min="0"
                        max="5"
                        value={formData.kids}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="specialRequirements" className="block text-sm font-medium text-gray-700 mb-1">
                      Special Requirements
                    </label>
                    <Textarea
                      id="specialRequirements"
                      name="specialRequirements"
                      value={formData.specialRequirements}
                      onChange={handleChange}
                      placeholder="Any special requests or requirements..."
                      rows={3}
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-accent hover:bg-accent/90 text-accent-foreground"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      'Book Now'
                    )}
                  </Button>
                </form>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default BookingModal;
