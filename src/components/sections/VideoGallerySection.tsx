import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Volume2, VolumeX, X, Maximize2 } from "lucide-react";

/* ==============================
   VIDEO CARD
================================ */
interface VideoCardProps {
  videoId: string;
  onOpenModal: (videoId: string) => void;
}

const VideoCard = ({ videoId, onOpenModal }: VideoCardProps) => {
  const [isHovering, setIsHovering] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const getEmbedUrl = (autoplay: boolean, muted: boolean) =>
    `https://www.youtube.com/embed/${videoId}?autoplay=${autoplay ? 1 : 0}&mute=${
      muted ? 1 : 0
    }&controls=0&modestbranding=1&rel=0&showinfo=0&enablejsapi=1`;

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
        {/* Video */}
        <iframe
          ref={iframeRef}
          className="absolute inset-0 w-full h-full"
          src={getEmbedUrl(false, true)}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />

        {/* Play icon overlay */}
        {!isHovering && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/50 z-10">
            <Play className="w-14 h-14 text-white opacity-80" />
          </div>
        )}

        {/* Controls */}
        <div
          className={`absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/70 to-transparent transition-opacity duration-300 z-10 ${
            isHovering ? "opacity-100" : "opacity-0"
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex justify-end gap-2">
            <button
              onClick={() => onOpenModal(videoId)}
              className="p-2 rounded-full bg-white/20 hover:bg-white/30 transition"
              aria-label="Fullscreen"
            >
              <Maximize2 className="w-4 h-4 text-white" />
            </button>

            <button
              onClick={toggleMute}
              className="p-2 rounded-full bg-white/20 hover:bg-white/30 transition"
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
    </motion.div>
  );
};

/* ==============================
   VIDEO GALLERY SECTION
================================ */
const VideoGallerySection = () => {
  const [modalVideoId, setModalVideoId] = useState<string | null>(null);

  const videos = [
    "r5WhZmRMnh4",
    "CeZe_nXlyoA",
    "T1W6mt-DlXw",
    "Y10CHZKsEZo",
  ];

  return (
    <section className="bg-muted/30 py-10 md:py-14">
      <div className="container-luxury">

        {/* ✅ SECTION TEXT (KEPT) */}
        <div className="text-center mb-8 md:mb-12">
          <span className="inline-block text-accent text-xs md:text-sm tracking-[0.2em] uppercase font-semibold mb-3">
            Virtual Experience
          </span>

          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-serif font-semibold text-foreground mb-4">
            Video Gallery
          </h2>

          <p className="text-muted-foreground max-w-3xl mx-auto text-sm md:text-base">
            Immerse yourself in the Sai Vijay experience through our collection of
            360° videos. Hover over any video to begin playing.
          </p>
        </div>

        {/* Video Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {videos.map((videoId) => (
            <VideoCard
              key={videoId}
              videoId={videoId}
              onOpenModal={setModalVideoId}
            />
          ))}
        </div>

        {/* Modal */}
        <AnimatePresence>
          {modalVideoId && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-foreground/95"
              onClick={() => setModalVideoId(null)}
            >
              <button
                onClick={() => setModalVideoId(null)}
                className="absolute top-6 right-6 w-12 h-12 bg-background/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-accent transition z-10"
                aria-label="Close"
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
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
};

export default VideoGallerySection;
