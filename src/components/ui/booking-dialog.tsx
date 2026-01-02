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
  checkInDate: z.date({
    required_error: "Please select a check-in date.",
  }),
  checkOutDate: z.date({
    required_error: "Please select a check-out date.",
  }),
  guests: z.string().min(1, {
    message: "Please enter number of guests.",
  }),
  kids: z.string().optional(),
  specialRequirements: z.string().optional(),
  roomType: z.string(),
});

interface BookingDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  roomType?: string;
}

export function BookingDialog({
  open,
  onOpenChange,
  roomType = "Standard Room",
}: BookingDialogProps) {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      contactNo: "",
      email: "",
      checkInDate: undefined,
      checkOutDate: undefined,
      guests: "2",
      kids: "0",
      specialRequirements: "",
      roomType: roomType,
    },
  });

  React.useEffect(() => {
    form.setValue("roomType", roomType);
  }, [roomType, form]);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    
    try {
      // Send booking data to API endpoint with .js extension
      const response = await fetch('/api/booking.js', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        // Handle non-200 responses
        const errorText = await response.text();
        console.error(`API error (${response.status}):`, errorText);
        throw new Error(`Server error (${response.status}). Please try again later.`);
      }

      let data;
      try {
        data = await response.json();
      } catch (jsonError) {
        console.error('Error parsing JSON response:', jsonError);
        throw new Error('Invalid response from server. Please try again later.');
      }
      
      if (data.success) {
        toast({
          title: "Booking Request Sent!",
          description: "We've received your booking request and will contact you shortly.",
        });
        
        // Reset form and close dialog
        form.reset({
          name: "",
          contactNo: "",
          email: "",
          checkInDate: undefined,
          checkOutDate: undefined,
          guests: "2",
          kids: "0",
          specialRequirements: "",
          roomType: roomType,
        });
        
        onOpenChange(false);
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
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] md:max-w-[600px]">
        <DialogHeader className="pb-2">
          <DialogTitle className="text-lg font-medium">Book {roomType}</DialogTitle>
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
            
            {/* Row 2: Email */}
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
            
            {/* Row 3: Check-in and Check-out Date Fields */}
            <div className="grid grid-cols-2 gap-3">
              <FormField
                control={form.control}
                name="checkInDate"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel className="text-xs">Check-in <span className="text-red-500">*</span></FormLabel>
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
                name="checkOutDate"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel className="text-xs">Check-out <span className="text-red-500">*</span></FormLabel>
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
                            date < form.getValues().checkInDate || date < new Date()
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
            {/* Row 4: Guests and Kids */}
            <div className="grid grid-cols-2 gap-3">
              <FormField
                control={form.control}
                name="guests"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs">Guests <span className="text-red-500">*</span></FormLabel>
                    <FormControl>
                      <Input className="h-8 text-sm" type="number" min="1" max="10" {...field} />
                    </FormControl>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="kids"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs">Kids</FormLabel>
                    <FormControl>
                      <Input className="h-8 text-sm" type="number" min="0" max="5" {...field} />
                    </FormControl>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />
            </div>
            
            {/* Row 5: Special Requirements */}
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
            <DialogFooter className="pt-2">
              <Button type="submit" disabled={isSubmitting} className="w-full h-8 text-sm">
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-3 w-3 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  "Book Now"
                )}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
