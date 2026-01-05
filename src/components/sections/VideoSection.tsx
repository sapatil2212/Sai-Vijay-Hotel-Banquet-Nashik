import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from '@/hooks/useInView';
import { Play, Volume2, VolumeX } from 'lucide-react';
import Line from "@/assets/line.png";

const VideoSection = () => {
  const [ref, isInView] = useInView({ threshold: 0.3 });
  const [isHovering, setIsHovering] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // YouTube video ID from the URL: https://youtu.be/LIVJMgHmIcc
  const youtubeVideoId = 'LIVJMgHmIcc';
  
  // Create the embed URL with parameters
  const getEmbedUrl = (autoplay: boolean, muted: boolean) => {
    return `https://www.youtube.com/embed/${youtubeVideoId}?autoplay=${autoplay ? 1 : 0}&mute=${muted ? 1 : 0}&controls=0&modestbranding=1&rel=0&showinfo=0&enablejsapi=1`;
  };

  useEffect(() => {
    // Handle hover state to control video playback
    if (iframeRef.current) {
      const newSrc = getEmbedUrl(isHovering, isMuted);
      iframeRef.current.src = newSrc;
      setIsPlaying(isHovering);
    }
  }, [isHovering, isMuted]);

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsMuted(!isMuted);
  };

  return (
    <section className="py-2 lg:py-5 bg-background">
      <div className="container mx-auto px-6 lg:px-8 xl:px-32">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-10"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 font-serif">
            Experience Our Hospitality
          </h2>
          <div className="flex justify-center mb-4">
            <img
              src={Line}
              alt="Decorative Line"
              className="w-40 md:w-52 lg:w-64"
            />
          </div>
          <p className="text-sm sm:text-base lg:text-lg text-gray-600 max-w-3xl mx-auto">
            Take a virtual tour of our luxurious hotel and banquet facilities
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative max-w-5xl mx-auto rounded-2xl overflow-hidden "
          ref={containerRef}
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          {/* Video Container */}
          <div className="relative aspect-video bg-black">
            {/* YouTube iframe */}
            <iframe
              ref={iframeRef}
              className="w-full h-full absolute inset-0"
              src={getEmbedUrl(false, true)}
              title="Hotel Sai Vijay Video"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
            
            {/* Overlay when not hovering */}
            {!isHovering && (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/60 z-10">
                <Play className="w-16 h-16 text-white opacity-80" />
                <span className="text-white text-lg font-medium mt-4">Hover to play</span>
              </div>
            )}
            
            {/* Controls overlay */}
            <div 
              className={`absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 to-transparent transition-opacity duration-300 z-10 ${isHovering ? 'opacity-100' : 'opacity-0'}`}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center">
                <div className="text-white text-sm font-medium">Hotel Sai Vijay Experience</div>
                <button 
                  onClick={toggleMute}
                  className="p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors"
                >
                  {isMuted ? (
                    <VolumeX className="w-4 h-4 text-white" />
                  ) : (
                    <Volume2 className="w-4 h-4 text-white" />
                  )}
                </button>
              </div>
            </div>
          </div>
        </motion.div>
        
       
      </div>
    </section>
  );
};

export default VideoSection;
