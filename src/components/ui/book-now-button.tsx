import { useState } from 'react';
import { BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { BookingDialog } from '@/components/ui/booking-dialog';

interface BookNowButtonProps {
  roomType?: string;
  variant?: 'default' | 'outline' | 'secondary' | 'ghost' | 'link' | 'destructive';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  className?: string;
}

export function BookNowButton({
  roomType = 'Standard Room',
  variant = 'default',
  size = 'default',
  className = '',
}: BookNowButtonProps) {
  const [open, setOpen] = useState(false);

  const defaultClassName = "bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white relative overflow-hidden group transition-all duration-300";
  const shimmerSpan = <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white to-transparent opacity-20 group-hover:animate-shimmer"></span>;

  return (
    <>
      <Button 
        variant={variant} 
        size={size} 
        onClick={() => setOpen(true)} 
        className={className || defaultClassName}
      >
        {!className && shimmerSpan}
        <BookOpen className="mr-2 h-4 w-4 relative z-10" />
        <span className="relative z-10">Book Now</span>
      </Button>
      <BookingDialog 
        open={open} 
        onOpenChange={setOpen} 
        roomType={roomType} 
      />
    </>
  );
}
