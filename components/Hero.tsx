
import React, { useState, useRef } from 'react';
import { ChevronRight, Play, X, Pause } from 'lucide-react';
import AssistantCard from './AssistantCard';

interface HeroProps {
  onStart: () => void;
}

const Hero: React.FC<HeroProps> = ({ onStart }) => {
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleOpenVideo = () => {
    setIsVideoOpen(true);
    // Auto-play when opened with a slight delay to allow rendering
    setTimeout(() => {
      if (videoRef.current) {
        videoRef.current.play().then(() => {
          setIsPlaying(true);
        }).catch(err => console.log("Autoplay prevented:", err));
      }
    }, 100);
  };

  const handleCloseVideo = () => {
    setIsVideoOpen(false);
    setIsPlaying(false);
  };

  const togglePlay = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <section className="relative min-h-[auto] lg:min-h-[92vh] flex items-center bg-wilderness-white pb-24 lg:pb-0 z-0">
      {/* Background Image with Blur Overlay */}
      <div className="absolute inset-0 overflow-hidden lg:rounded-b-[80px]">
        <img 
          src="https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&q=80&w=2000" 
          alt="African Savanna"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 w-full pt-32 lg:pt-20">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-8">
          {/* Left Column: Text Content */}
          <div className="lg:w-1/2 space-y-8 lg:space-y-10 animate-in fade-in slide-in-from-left-8 duration-1000 z-10 w-full">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-4 py-1.5 text-white text-sm font-medium">
              <span className="w-2 h-2 bg-savanna-sun rounded-full animate-pulse" />
              Next-Gen Safari Platform
            </div>
            
            <h1 className="text-5xl md:text-8xl font-bold text-white leading-[1.05] tracking-tight">
              Redefining <br /> the Wild.
            </h1>
            
            <p className="text-lg md:text-xl text-white/80 max-w-lg leading-relaxed font-light">
              Savanna bridges the gap between luxury travelers and local operators with AI-driven planning and seamless logistics.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-6 pt-2 md:pt-4">
              <button 
                onClick={onStart}
                className="w-full sm:w-auto bg-savanna-sun text-obsidian font-bold px-10 py-5 md:px-12 md:py-6 rounded-full hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-3 shadow-2xl"
              >
                Plan Your Safari <ChevronRight size={20} />
              </button>
              <button 
                onClick={handleOpenVideo}
                className="flex items-center gap-4 text-white font-semibold group w-full sm:w-auto justify-center sm:justify-start"
              >
                <div className="w-12 h-12 md:w-14 md:h-14 rounded-full border border-white/30 flex items-center justify-center group-hover:bg-white group-hover:text-obsidian transition-all">
                  <Play size={20} fill="currentColor" />
                </div>
                See How it Works
              </button>
            </div>
          </div>

          {/* Right Column: AI Assistant (Yellow Card) - Overlapping positioning */}
          <div className="lg:w-1/2 w-full flex justify-center lg:justify-end animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-300 z-20">
            <div className="translate-y-12 md:translate-y-24 lg:translate-y-36 w-full">
              <AssistantCard 
                options={[
                  'Find luxury lodges', 
                  '7-day Maasai Mara', 
                  'Family expeditions', 
                  'Vehicle tracking'
                ]} 
              />
            </div>
          </div>
        </div>
      </div>

      {/* Video Modal Overlay */}
      {isVideoOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-4 md:px-8">
            <div 
                className="absolute inset-0 bg-black/90 backdrop-blur-xl animate-in fade-in duration-500"
                onClick={handleCloseVideo}
            />
            <div className="relative w-full max-w-6xl aspect-video bg-black rounded-[32px] md:rounded-[48px] overflow-hidden shadow-2xl animate-in zoom-in-95 slide-in-from-bottom-4 duration-500 border border-white/10 group">
                <video 
                    ref={videoRef}
                    className="w-full h-full object-cover"
                    poster="https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&q=80&w=2000"
                    onClick={togglePlay}
                    loop
                >
                    {/* Using a reliable stock video source for the demo */}
                    <source src="https://assets.mixkit.co/videos/preview/mixkit-lion-walking-in-the-savanna-4340-large.mp4" type="video/mp4" />
                </video>
                
                {/* Center Play/Pause Button */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                     <button 
                        onClick={togglePlay}
                        className={`pointer-events-auto w-20 h-20 md:w-28 md:h-28 bg-savanna-sun text-obsidian rounded-full flex items-center justify-center hover:scale-110 active:scale-95 transition-all shadow-xl ${isPlaying ? 'opacity-0 group-hover:opacity-100' : 'opacity-100'}`}
                    >
                        {isPlaying ? (
                            <Pause size={32} fill="currentColor" className="md:w-10 md:h-10" />
                        ) : (
                            <Play size={32} fill="currentColor" className="ml-2 md:ml-3 md:w-10 md:h-10" />
                        )}
                    </button>
                </div>

                {/* Top Bar Actions */}
                <div className="absolute top-0 left-0 right-0 p-6 md:p-8 flex justify-between items-start pointer-events-none">
                    <div className="bg-black/40 backdrop-blur-md px-4 py-2 rounded-full border border-white/10 flex items-center gap-2">
                         <div className="w-2 h-2 bg-acacia-green rounded-full animate-pulse" />
                         <span className="text-white/90 text-xs font-bold uppercase tracking-widest">Live Preview</span>
                    </div>
                    
                    <button 
                        onClick={handleCloseVideo}
                        className="pointer-events-auto w-12 h-12 md:w-14 md:h-14 bg-white/10 backdrop-blur-md border border-white/20 text-white rounded-full flex items-center justify-center hover:bg-white hover:text-obsidian transition-colors shadow-lg"
                    >
                        <X size={24} />
                    </button>
                </div>
            </div>
        </div>
      )}
    </section>
  );
};

export default Hero;
