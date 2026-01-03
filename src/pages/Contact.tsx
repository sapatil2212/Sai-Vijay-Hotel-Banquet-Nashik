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
import { FaWhatsapp } from "react-icons/fa";
import heroLobby from "@/assets/hotel/hotel1.webp";
import { submitContactForm } from "@/lib/api/contactService";

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

const contactInfo = [
  {
    icon: Phone,
    title: "Phone",
    details: ["+91 91300 70701"],
  },
  {
    icon: FaWhatsapp,
    title: "WhatsApp",
    details: ["+91 91300 70701"],
  },
  {
    icon: Mail,
    title: "Email",
    details: ["pyramidagroexports@gmail.com"],
  },
  {
    icon: MapPin,
    title: "Address",
    details: ["Office, Ground Floor, Shree Hari Plaza,", "Abhang Nagar, New Adgaon Naka,", "Panchavati, Nashik, Maharashtra 422003"],
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
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData({ ...formData, [name]: value });
    // Reset event type if enquiry type changes and is not Banquet
    if (name === "enquiryType" && value !== "Banquet") {
      setFormData(prev => ({ ...prev, enquiryType: value, eventType: "" }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Submit form data for email and Google Sheets
      const response = await submitContactForm(formData);
      
      if (response.success) {
        toast({
          title: "Message Sent!",
          description: "Thank you for contacting us. We'll get back to you within 24 hours.",
          variant: "default",
        });
        
        // Reset form
        setFormData({ name: "", email: "", mobile: "", enquiryType: "", eventType: "", message: "" });
      } else {
        toast({
          title: "Submission Error",
          description: response.message || "There was a problem sending your message. Please try again.",
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
      <section className="relative h-[50vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={heroLobby}
            alt="Contact Us"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-hero-overlay" />
        </div>
        <div className="container-luxury relative z-10 text-center pt-20">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-block text-accent text-sm tracking-[0.3em] uppercase font-semibold mb-4"
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

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    Message <span className="text-red-500">*</span>
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us about your requirements..."
                    rows={4}
                    required
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
              {/* Map */}
              <div className="rounded-2xl overflow-hidden border border-gray-100 h-[350px]">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3393.6489024278667!2d73.7474368746868!3d19.962123423558484!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bddeb578da08ac1%3A0xc4928f4d037426fd!2sSai%20Vijay%20Hotel%20And%20Banquet!5e1!3m2!1sen!2sin!4v1767361920131!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Sai Vijay Hotel And Banquet Location"
                />
              </div>

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
