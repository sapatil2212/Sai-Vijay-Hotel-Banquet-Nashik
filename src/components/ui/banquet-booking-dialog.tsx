import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { format } from "date-fns";
import { Calendar as CalendarIcon, Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  contactNo: z.string().min(10, {
    message: "Contact number must be at least 10 digits.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  eventType: z.string({
    required_error: "Please select an event type.",
  }),
  fromDate: z.date({
    required_error: "Please select a start date.",
  }),
  toDate: z.date({
    required_error: "Please select an end date.",
  }),
  guests: z.string().min(1, {
    message: "Please enter number of guests.",
  }),
  specialRequirements: z.string().optional(),
});

// Event types for dropdown
const eventTypes = [
  "Wedding",
  "Reception",
  "Engagement",
  "Birthday Party",
  "Anniversary",
  "Corporate Meeting",
  "Conference",
  "Seminar",
  "Product Launch",
  "Haldi Ceremony",
  "Mehendi Ceremony",
  "Baby Shower",
  "Retirement Party",
  "Graduation Party",
  "Other"
];

interface BanquetBookingDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function BanquetBookingDialog({
  open,
  onOpenChange,
}: BanquetBookingDialogProps) {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  // Simplified form with fewer required fields
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      contactNo: "",
      email: "",
      eventType: "",
      fromDate: undefined,
      toDate: undefined,
      guests: "",
      specialRequirements: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    
    try {
      // Add banquet hall info to the form data
      const banquetData = {
        ...values,
        bookingType: "Banquet Hall",
      };
      
      // Send booking data to API endpoint
      const response = await fetch('/api/banquet-booking', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(banquetData),
      });

      const data = await response.json();
      
      if (data.success) {
        toast({
          title: "Event Booking Request Sent!",
          description: "We've received your event booking request and will contact you shortly to confirm details.",
        });
        
        // Reset form and close dialog
        form.reset({
          name: "",
          contactNo: "",
          email: "",
          eventType: "",
          guests: "",
          specialRequirements: "",
        });
        
        onOpenChange(false);
      } else {
        toast({
          title: "Submission Error",
          description: data.message || "There was a problem sending your event booking request. Please try again.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Form submission error:", error);
      toast({
        title: "Submission Error",
        description: "There was a problem sending your event booking request. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] md:max-w-[600px]">
        <DialogHeader className="pb-2">
          <DialogTitle className="text-lg font-medium">Book Banquet Hall</DialogTitle>
          <DialogDescription className="text-xs">
            Fill in your details to request a booking
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
            {/* Row 1: Name and Contact */}
            <div className="grid grid-cols-2 gap-3">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs">Name <span className="text-red-500">*</span></FormLabel>
                    <FormControl>
                      <Input className="h-8 text-sm" placeholder="Full Name" {...field} />
                    </FormControl>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="contactNo"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs">Contact <span className="text-red-500">*</span></FormLabel>
                    <FormControl>
                      <Input className="h-8 text-sm" placeholder="+91 XXXXXXXXXX" {...field} />
                    </FormControl>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />
            </div>
            
            {/* Row 2: Email and Event Type */}
            <div className="grid grid-cols-2 gap-3">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs">Email <span className="text-red-500">*</span></FormLabel>
                    <FormControl>
                      <Input className="h-8 text-sm" type="email" placeholder="your@email.com" {...field} />
                    </FormControl>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="eventType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs">Event Type <span className="text-red-500">*</span></FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="h-8 text-sm">
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {eventTypes.map((type) => (
                          <SelectItem key={type} value={type} className="text-sm">
                            {type}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />
            </div>
            
            {/* Row 3: From Date and To Date */}
            <div className="grid grid-cols-2 gap-3">
              <FormField
                control={form.control}
                name="fromDate"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel className="text-xs">From Date <span className="text-red-500">*</span></FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "h-8 text-xs w-full pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              format(field.value, "PPP")
                            ) : (
                              <span>Select date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) =>
                            date < new Date()
                          }
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="toDate"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel className="text-xs">To Date <span className="text-red-500">*</span></FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "h-8 text-xs w-full pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              format(field.value, "PPP")
                            ) : (
                              <span>Select date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) =>
                            date < form.getValues().fromDate || date < new Date()
                          }
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />
            </div>
            
            {/* Row 4: Guests and Special Requirements */}
            <div className="grid grid-cols-2 gap-3">
              <FormField
                control={form.control}
                name="guests"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs">Guests <span className="text-red-500">*</span></FormLabel>
                    <FormControl>
                      <Input className="h-8 text-sm" type="number" min="1" max="500" placeholder="Number of guests" {...field} />
                    </FormControl>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="specialRequirements"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs">Special Requirements</FormLabel>
                    <FormControl>
                      <Input 
                        className="h-8 text-sm" 
                        placeholder="Any special requests or preferences" 
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />
            </div>
            
            <DialogFooter className="pt-2">
              <Button type="submit" disabled={isSubmitting} className="w-full h-8 text-sm">
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-3 w-3 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  "Book Banquet Hall"
                )}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
