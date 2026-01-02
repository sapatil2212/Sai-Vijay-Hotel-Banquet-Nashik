import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Volume2, VolumeX, X, Maximize2 } from 'lucide-react';

interface VideoCardProps {
  videoId: string;
  title: string;
  description: string;
  onOpenModal: (videoId: string, title: string) => void;
}

const VideoCard = ({ videoId, title, description, onOpenModal }: VideoCardProps) => {
  const [isHovering, setIsHovering] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  
  // Create the embed URL with parameters
  const getEmbedUrl = (autoplay: boolean, muted: boolean) => {
    return `https://www.youtube.com/embed/${videoId}?autoplay=${autoplay ? 1 : 0}&mute=${muted ? 1 : 0}&controls=0&modestbranding=1&rel=0&showinfo=0&enablejsapi=1`;
  };
  
  // Handle hover state to control video playback
  const handleMouseEnter = () => {
    setIsHovering(true);
    if (iframeRef.current) {
      iframeRef.current.src = getEmbedUrl(true, isMuted);
    }
  };
  
  const handleMouseLeave = () => {
    setIsHovering(false);
    if (iframeRef.current) {
      iframeRef.current.src = getEmbedUrl(false, true);
    }
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsMuted(!isMuted);
    if (iframeRef.current && isHovering) {
      iframeRef.current.src = getEmbedUrl(true, !isMuted);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="relative rounded-2xl overflow-hidden group"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="relative aspect-video bg-black">
        {/* YouTube iframe */}
        <iframe
          ref={iframeRef}
          className="w-full h-full absolute inset-0"
          src={getEmbedUrl(false, true)}
          title={title}
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
            <div className="text-white text-sm font-medium line-clamp-1">{title}</div>
            <div className="flex items-center gap-2">
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  onOpenModal(videoId, title);
                }}
                className="p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors"
                aria-label="Open in fullscreen"
              >
                <Maximize2 className="w-4 h-4 text-white" />
              </button>
              <button 
                onClick={toggleMute}
                className="p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors"
                aria-label={isMuted ? "Unmute" : "Mute"}
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
      </div>
      
      <div className="p-4 bg-background">
        <h3 className="text-lg font-semibold text-foreground mb-2">{title}</h3>
        <p className="text-sm text-muted-foreground line-clamp-2">{description}</p>
      </div>
    </motion.div>
  );
};

const VideoGallerySection = () => {
  const [modalVideoId, setModalVideoId] = useState<string | null>(null);
  const [modalTitle, setModalTitle] = useState("");

  const openVideoModal = (videoId: string, title: string) => {
    setModalVideoId(videoId);
    setModalTitle(title);
  };

  const closeVideoModal = () => {
    setModalVideoId(null);
  };
  const videos = [
    {
      videoId: "r5WhZmRMnh4",
      title: "Hotel Lobby Tour",
      description: "Take a virtual tour of our elegant hotel lobby and reception area."
    },
    {
      videoId: "CeZe_nXlyoA",
      title: "Luxury Suite Experience",
      description: "Experience the comfort and luxury of our premium suites."
    },
    {
      videoId: "T1W6mt-DlXw",
      title: "Banquet Hall Showcase",
      description: "Explore our magnificent banquet hall perfect for weddings and events."
    },
    {
      videoId: "Y10CHZKsEZo",
      title: "Restaurant & Dining",
      description: "Discover our exquisite dining experience and culinary delights."
    }
  ];

  return (
    <section className="section-padding bg-muted/30">
      <div className="container-luxury">
        <div className="text-center mb-12">
          <span className="inline-block text-accent text-sm tracking-[0.2em] uppercase font-semibold mb-3">
            Virtual Experience
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-foreground mb-4">
            Video Gallery
          </h2>
          <p className="text-muted-foreground max-w-3xl mx-auto">
            Immerse yourself in the Sai Vijay experience through our collection of 360° videos. 
            Hover over any video to begin playing.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {videos.map((video, index) => (
            <VideoCard
              key={video.videoId}
              videoId={video.videoId}
              title={video.title}
              description={video.description}
              onOpenModal={openVideoModal}
            />
          ))}
        </div>

        {/* Video Modal */}
        <AnimatePresence>
          {modalVideoId && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-foreground/95"
              onClick={closeVideoModal}
            >
              <button
                onClick={closeVideoModal}
                className="absolute top-6 right-6 w-12 h-12 bg-background/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-accent transition-colors z-10"
                aria-label="Close modal"
              >
                <X className="w-6 h-6 text-primary-foreground" />
              </button>
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                className="relative w-full max-w-5xl aspect-video"
                onClick={(e) => e.stopPropagation()}
              >
                <iframe
                  className="w-full h-full rounded-lg shadow-2xl"
                  src={`https://www.youtube.com/embed/${modalVideoId}?autoplay=1&controls=1&modestbranding=1&rel=0&showinfo=0`}
                  title={modalTitle}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default VideoGallerySection;
