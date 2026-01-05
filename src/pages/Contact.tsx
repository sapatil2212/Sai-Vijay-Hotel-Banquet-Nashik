import { useState } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ScrollToTop from "@/components/layout/ScrollToTop";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { MapPin, Phone, Mail, Send, Loader2 } from "lucide-react";
import MapFallback from "@/components/ui/map-fallback";
import { FaWhatsapp } from "react-icons/fa";
import heroLobby from "@/assets/hotel/hotel1.webp";
import { submitContactForm } from "@/lib/api/formService";
import { directContactSubmit } from "@/lib/api/direct-submit";

const eventTypes = [
  "Wedding",
  "Reception",
  "Engagement",
  "Birthday Party",
  "Baby Shower",
  "Corporate Meeting",
  "Conference",
  "Haldi Ceremony",
  "Ring Ceremony",
  "Other"
];

const roomTypes = [
  "Deluxe Room",
  "Executive",
  "Suite"
];

const occupancyTypes = [
  "Single",
  "Double"
];

const contactInfo = [
  {
    icon: Phone,
    title: "Phone",
    details: ["+91 83780 64999", "+91 83906 33999"],
  },
  {
    icon: FaWhatsapp,
    title: "WhatsApp",
    details: ["+91 83780 64999"],
  },
  {
    icon: Mail,
    title: "Email",
    details: ["saivijaynasik@gmail.com"],
  },
  {
    icon: MapPin,
    title: "Address",
    details: ["309, 1, Pathardi Phata, Near Taj Gateway,", "Next to Indoline Furniture, Ambad Link Road,", "Ambad, Nashik - 422 010"],
  },
];

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    enquiryType: "",
    eventType: "",
    roomType: "",
    occupancyType: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData({ ...formData, [name]: value });
    
    // Handle enquiry type changes
    if (name === "enquiryType") {
      if (value === "Banquet") {
        // Reset room-related fields if Banquet is selected
        setFormData(prev => ({ 
          ...prev, 
          enquiryType: value, 
          eventType: "",
          roomType: "",
          occupancyType: ""
        }));
      } else if (value === "Rooms") {
        // Reset event type if Rooms is selected
        setFormData(prev => ({ 
          ...prev, 
          enquiryType: value, 
          eventType: "",
          roomType: "",
          occupancyType: ""
        }));
      } else {
        // Reset all conditional fields for other enquiry types
        setFormData(prev => ({ 
          ...prev, 
          enquiryType: value, 
          eventType: "",
          roomType: "",
          occupancyType: ""
        }));
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Add timestamp to track when the submission was made
      const enhancedFormData = {
        ...formData,
        timestamp: new Date().toISOString()
      };
      
      // ONLY use direct submission to prevent duplicate entries
      const directResponse = await directContactSubmit(enhancedFormData);
      
      if (directResponse.success) {
        toast({
          title: "Message Sent!",
          description: "Thank you for contacting us. We'll get back to you within 24 hours.",
          variant: "default",
        });
        
        // Reset form
        setFormData({ 
          name: "", 
          email: "", 
          mobile: "", 
          enquiryType: "", 
          eventType: "", 
          roomType: "", 
          occupancyType: "", 
          message: "" 
        });
      } else {
        toast({
          title: "Submission Error",
          description: directResponse.message || "There was a problem sending your message. Please try again.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Form submission error:", error);
      toast({
        title: "Submission Error",
        description: "There was a problem sending your message. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen">
      <Navbar />
      
      {/* Hero Banner */}
      <section className="relative h-[40vh] md:h-[50vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={heroLobby}
            alt="Contact Us"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-hero-overlay" />
        </div>
        <div className="container-luxury relative z-10 text-center pt-16 md:pt-20">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-block text-accent text-xs md:text-sm tracking-[0.2em] md:tracking-[0.3em] uppercase font-semibold mb-2 md:mb-4"
          >
            Get in Touch
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-serif text-4xl md:text-5xl lg:text-6xl font-semibold text-primary-foreground"
          >
            Contact Us
          </motion.h1>
        </div>
      </section>

      {/* Contact Section */}
      <section className="section-padding bg-background">
        <div className="container-luxury">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="bg-white rounded-2xl border border-gray-100 p-8"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Send us a Message</h2>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    Name <span className="text-red-500">*</span>
                  </label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Full Name"
                    className="border-gray-300 focus:border-primary focus:ring-primary"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="abc@example.com"
                    className="border-gray-300 focus:border-primary focus:ring-primary"
                  />
                </div>

                <div>
                  <label htmlFor="mobile" className="block text-sm font-medium text-gray-700 mb-2">
                    Mobile No. <span className="text-red-500">*</span>
                  </label>
                  <Input
                    id="mobile"
                    name="mobile"
                    type="tel"
                    required
                    value={formData.mobile}
                    onChange={handleChange}
                    placeholder="+91 **********"
                    className="border-gray-300 focus:border-primary focus:ring-primary"
                  />
                </div>

                <div>
                  <label htmlFor="enquiryType" className="block text-sm font-medium text-gray-700 mb-2">
                    Enquiry Type <span className="text-red-500">*</span>
                  </label>
                  <Select
                    value={formData.enquiryType}
                    onValueChange={(value) => handleSelectChange("enquiryType", value)}
                    required
                  >
                    <SelectTrigger className="border-gray-300 focus:border-primary focus:ring-primary">
                      <SelectValue placeholder="Select enquiry type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Rooms">Rooms</SelectItem>
                      <SelectItem value="Banquet">Banquet</SelectItem>
                      <SelectItem value="Restaurant">Restaurant</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {formData.enquiryType === "Banquet" && (
                  <div>
                    <label htmlFor="eventType" className="block text-sm font-medium text-gray-700 mb-2">
                      Event Type <span className="text-red-500">*</span>
                    </label>
                    <Select
                      value={formData.eventType}
                      onValueChange={(value) => handleSelectChange("eventType", value)}
                      required
                    >
                      <SelectTrigger className="border-gray-300 focus:border-primary focus:ring-primary">
                        <SelectValue placeholder="Select event type" />
                      </SelectTrigger>
                      <SelectContent>
                        {eventTypes.map((event) => (
                          <SelectItem key={event} value={event}>
                            {event}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}
                
                {formData.enquiryType === "Rooms" && (
                  <>
                    <div>
                      <label htmlFor="roomType" className="block text-sm font-medium text-gray-700 mb-2">
                        Room Type <span className="text-red-500">*</span>
                      </label>
                      <Select
                        value={formData.roomType}
                        onValueChange={(value) => handleSelectChange("roomType", value)}
                        required
                      >
                        <SelectTrigger className="border-gray-300 focus:border-primary focus:ring-primary">
                          <SelectValue placeholder="Select room type" />
                        </SelectTrigger>
                        <SelectContent>
                          {roomTypes.map((room) => (
                            <SelectItem key={room} value={room}>
                              {room}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <label htmlFor="occupancyType" className="block text-sm font-medium text-gray-700 mb-2">
                        Occupancy Type <span className="text-red-500">*</span>
                      </label>
                      <Select
                        value={formData.occupancyType}
                        onValueChange={(value) => handleSelectChange("occupancyType", value)}
                        required
                      >
                        <SelectTrigger className="border-gray-300 focus:border-primary focus:ring-primary">
                          <SelectValue placeholder="Select occupancy type" />
                        </SelectTrigger>
                        <SelectContent>
                          {occupancyTypes.map((occupancy) => (
                            <SelectItem key={occupancy} value={occupancy}>
                              {occupancy}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </>
                )}

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    Message
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us about your requirements..."
                    rows={4}
                    className="border-gray-300 focus:border-primary focus:ring-primary resize-none"
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-3 rounded-lg flex items-center justify-center gap-2"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      Send Message
                    </>
                  )}
                </Button>
              </form>
            </motion.div>

            {/* Contact Info & Map */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="space-y-6"
            >
              {/* Map with Fallback */}
              <MapFallback 
                address="309, 1, Pathardi Phata, Near Taj Gateway, Next to Indoline Furniture, Ambad Link Road, Ambad, Nashik - 422 010"
                title="Sai Vijay Hotel And Banquet Location"
                className="rounded-2xl h-[350px]"
              />

              {/* Contact Card - Combined */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="bg-white rounded-xl p-6 border border-gray-100 mt-6"
              >
                <h3 className="font-semibold text-gray-900 mb-4 text-lg">
                  Contact Information
                </h3>
                <div className="space-y-5">
                  {contactInfo.map((info, index) => (
                    <div key={info.title} className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center flex-shrink-0">
                        <info.icon className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-1 text-sm">
                          {info.title}
                        </h4>
                        {info.details.map((detail, idx) => (
                          <p key={idx} className="text-gray-600 text-sm leading-relaxed">
                            {detail}
                          </p>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
      <ScrollToTop />
    </main>
  );
};

export default Contact;
