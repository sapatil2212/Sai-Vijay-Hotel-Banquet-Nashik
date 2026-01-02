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

  return (
    <>
      <Button 
        variant={variant} 
        size={size} 
        onClick={() => setOpen(true)} 
        className={className}
      >
        <BookOpen className="mr-2 h-4 w-4" />
        Book Now
      </Button>
      <BookingDialog 
        open={open} 
        onOpenChange={setOpen} 
        roomType={roomType} 
      />
    </>
  );
}
