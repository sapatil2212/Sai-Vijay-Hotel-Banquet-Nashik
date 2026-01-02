import { useState } from 'react';
import { CalendarCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { BanquetBookingDialog } from '@/components/ui/banquet-booking-dialog';

interface BanquetBookNowButtonProps {
  variant?: 'default' | 'outline' | 'secondary' | 'ghost' | 'link' | 'destructive' | 'gold' | 'elegant';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  className?: string;
  children?: React.ReactNode;
}

export function BanquetBookNowButton({
  variant = 'default',
  size = 'default',
  className = '',
  children,
}: BanquetBookNowButtonProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button 
        variant={variant} 
        size={size} 
        onClick={() => setOpen(true)} 
        className={className}
      >
        {children || (
          <>
            <CalendarCheck className="mr-2 h-5 w-5" />
            <span className="text-base font-medium">Book Banquet Hall</span>
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
