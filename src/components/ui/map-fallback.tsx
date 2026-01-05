import { useState, useEffect } from 'react';
import { AlertTriangle, MapPin } from 'lucide-react';
import mapPlaceholderImage from '../../assets/map-placeholder.png';

interface MapFallbackProps {
  address: string;
  title?: string;
  className?: string;
  mapUrl?: string;
}

const MapFallback = ({
  address,
  title = "Our Location",
  className = "w-full h-[350px]",
  mapUrl = "https://www.google.com/maps/place/Sai+Vijay+Hotel+And+Banquet/@19.9621234,73.7474369,18z/data=!4m6!3m5!1s0x3bddeb578da08ac1:0xc4928f4d037426fd!8m2!3d19.9621141!4d73.7486793!16s%2Fg%2F11kxnpxtg1?entry=ttu"
}: MapFallbackProps) => {
  const [mapLoaded, setMapLoaded] = useState<boolean | null>(null);
  const [mapError, setMapError] = useState(false);
  
  // Check if map is blocked after a timeout
  useEffect(() => {
    const timer = setTimeout(() => {
      // If the map hasn't explicitly loaded after 3 seconds, consider it potentially blocked
      if (mapLoaded === null) {
        setMapLoaded(false);
      }
    }, 3000);
    
    return () => clearTimeout(timer);
  }, [mapLoaded]);

  return (
    <div className={`relative rounded-xl overflow-hidden border border-gray-100 ${className}`}>
      {/* Primary Map Component */}
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3393.6489024278667!2d73.7474368746868!3d19.962123423558484!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bddeb578da08ac1%3A0xc4928f4d037426fd!2sSai%20Vijay%20Hotel%20And%20Banquet!5e1!3m2!1sen!2sin!4v1767361920131!5m2!1sen!2sin"
        width="100%"
        height="100%"
        style={{ 
          border: 0,
          display: mapError ? 'none' : 'block'
        }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title={title}
        onLoad={() => setMapLoaded(true)}
        onError={() => {
          setMapError(true);
          setMapLoaded(false);
        }}
      />

      {/* Fallback Content - Only shown when map fails to load */}
      {(!mapLoaded || mapError) && (
        <div className="absolute inset-0 bg-gray-100 flex flex-col items-center justify-center p-4 text-center">
          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 max-w-md shadow-sm">
            <div className="flex items-center justify-center mb-4 text-amber-500">
              <AlertTriangle className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Map Preview Unavailable</h3>
            <p className="text-gray-600 mb-4">
              The map couldn't be loaded. This may be due to an ad-blocker or internet connection issue.
            </p>
            
            <div className="flex items-center justify-center gap-2 text-primary mb-4">
              <MapPin className="w-5 h-5" />
              <span className="font-medium">{address}</span>
            </div>
            
            <a 
              href={mapUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors"
            >
              Open in Google Maps
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default MapFallback;
