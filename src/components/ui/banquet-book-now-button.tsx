import { useState } from 'react';
import { CalendarCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { BanquetBookingDialog } from '@/components/ui/banquet-booking-dialog';

interface BanquetBookNowButtonProps {
  variant?: 'default' | 'outline' | 'secondary' | 'ghost' | 'link' | 'destructive' | 'gold' | 'elegant';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  className?: string;
  children?: React.ReactNode;
  eventType?: string;
}

export function BanquetBookNowButton({
  variant = 'default',
  size = 'default',
  className = '',
  children,
  eventType,
}: BanquetBookNowButtonProps) {
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
        {children || (
          <>
            <CalendarCheck className="mr-2 h-5 w-5 relative z-10" />
            <span className="text-base font-medium relative z-10">Book Banquet Hall</span>
          </>
        )}
      </Button>
      <BanquetBookingDialog 
        open={open} 
        onOpenChange={setOpen} 
      />
    </>
  );
}
