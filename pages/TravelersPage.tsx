
import React, { useState, useEffect } from 'react';
import { Binoculars, MapPin, ArrowUpRight, Sparkles, Compass, Zap, ChevronRight, ArrowRight, MessageSquare, FileText, Plane, Star, Shield, Cloud, HeartHandshake, Mic, X, Play } from 'lucide-react';
import Hero from '../components/Hero';
import Features from '../components/Features';
import AssistantCard from '../components/AssistantCard';
import { SafariCategory } from '../data/safariContent';

interface TravelersPageProps {
  onStart: () => void;
  onNavigate: (category: SafariCategory, slug: string) => void;
  onTourClick: (id: string, slug: string) => void;
}

const TravelersPage: React.FC<TravelersPageProps> = ({ onStart, onNavigate, onTourClick }) => {
  const [locationIndex, setLocationIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isKiboActive, setIsKiboActive] = useState(false);
  
  const locations = [
    "Serengeti",
    "Okavango",
    "Maasai Mara",
    "Kruger",
    "Zambezi"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => {
        setLocationIndex((prev) => (prev + 1) % locations.length);
        setIsAnimating(false);
      }, 500);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="animate-in fade-in duration-700">
      <Hero onStart={onStart} />
      
      {/* AI Discovery Section */}
      <section id="travelers" className="py-40 px-6 max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-24 items-center">
          <div className="lg:w-1/2 space-y-10">
            <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-savanna-sun/30 border border-savanna-sun text-obsidian font-bold text-xs uppercase tracking-widest">
              <Sparkles size={14} className="animate-pulse" />
              <span>AI-Driven Discovery</span>
            </div>
            <h2 className="text-5xl md:text-7xl font-bold leading-[1.05] tracking-tight text-obsidian">
              Your <span className="relative inline-block px-1">
                <span className={`absolute inset-0 bg-savanna-sun -skew-x-3 rounded-lg transition-all duration-500 ease-out ${isAnimating ? 'scale-90 opacity-0' : 'scale-100 opacity-100'}`} />
                <span className={`relative z-10 inline-block transition-all duration-500 ease-out ${isAnimating ? 'opacity-0 translate-y-4 blur-sm' : 'opacity-100 translate-y-0 blur-0'}`}>
                  {locations[locationIndex]}
                </span>
              </span> adventure is <br className="hidden md:block" /> <span className="text-acacia-green">just a tap away.</span>
            </h2>
            <p className="text-xl text-obsidian/60 leading-relaxed max-w-xl">
              Savanna uses advanced data modeling to match your unique travel profile 
              with the perfect lodges, guides, and itineraries. No more manual searching.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 pt-6">
              <FeatureMini 
                icon={<Binoculars size={24} />} 
                title="Precision Scouting" 
                description="Real-time sightings data to plan your migration route."
              />
              <FeatureMini 
                icon={<MapPin size={24} />} 
                title="Verified Operators" 
                description="Every guide is vetted for 124 safety checkpoints."
              />
            </div>

            <div className="pt-8">
              <button 
                onClick={onStart}
                className="flex items-center gap-2 font-bold group border-b-2 border-obsidian pb-1 hover:text-acacia-green hover:border-acacia-green transition-all text-lg"
              >
                Start your custom plan <ArrowUpRight size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </button>
            </div>
          </div>
          
          <div className="lg:w-1/2 grid grid-cols-2 gap-6 w-full">
             <div className="space-y-6 pt-12">
                <div className="aspect-[4/5] rounded-[40px] overflow-hidden bg-white shadow-xl relative group">
                   <img src="https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&q=80&w=800" alt="Wildlife" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                   <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-8">
                      <span className="text-white font-bold text-xl">Serengeti Migration</span>
                   </div>
                </div>
             </div>
             <div className="space-y-6">
                <div className="bg-savanna-sun p-8 rounded-[40px] shadow-lg flex flex-col justify-center gap-4">
                   <Compass size={32} className="text-obsidian" />
                   <p className="font-bold text-xl leading-snug text-obsidian">Navigate the bush with confidence.</p>
                </div>
                <div className="aspect-[4/5] rounded-[40px] overflow-hidden bg-white shadow-xl relative group">
                   <img src="https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&q=80&w=800" alt="Safari Lodge" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                   <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-8">
                      <span className="text-white font-bold text-xl">Luxury Camps</span>
                   </div>
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* Kibo Voice Agent Section */}
      <section className="px-6 max-w-7xl mx-auto mb-40">
        <div className="bg-[#F9F9F9] text-obsidian rounded-[48px] overflow-hidden flex flex-col md:flex-row shadow-2xl border border-black/5">
          
          {/* Left: Interactive Mic/Waveform (Picture Style) */}
          <div className="md:w-1/2 min-h-[400px] md:min-h-[500px] bg-white flex items-center justify-center p-8 md:p-12 relative overflow-hidden group">
            <div className="flex items-center gap-6 w-full max-w-md cursor-pointer group" onClick={() => setIsKiboActive(true)}>
              {/* Brand Play Button */}
              <div className="relative w-24 h-24 md:w-32 md:h-32 shrink-0">
                <div className="absolute inset-0 bg-savanna-sun rounded-full shadow-2xl transition-transform group-hover:scale-110 duration-500" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <Play size={40} className="md:w-14 md:h-14 fill-obsidian text-obsidian translate-x-1" />
                </div>
                {/* Ping pulse for interactivity */}
                <div className="absolute inset-0 bg-savanna-sun rounded-full animate-ping opacity-20" />
              </div>
              
              {/* Waveform Graphic (Matches Uploaded Image Style) */}
              <div className="flex-1 flex items-center gap-1.5 h-16">
                {[12, 28, 18, 45, 12, 32, 55, 12, 24, 48, 12, 36, 12, 42, 22, 12, 38, 52, 12, 28, 12, 45, 12, 24, 18, 12, 32, 12].map((h, i) => (
                  <div 
                    key={i} 
                    className="w-1 rounded-full bg-cloud-grey/40 group-hover:bg-acacia-green/40 transition-all duration-300"
                    style={{ 
                      height: `${h}%`,
                      animationDelay: `${i * 100}ms`
                    }}
                  />
                ))}
              </div>
            </div>

            <div className="absolute bottom-10 left-12">
               <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-acacia-green rounded-full animate-pulse" />
                  <span className="text-[10px] font-bold uppercase tracking-widest text-cloud-grey">Satellite Link Operational</span>
               </div>
            </div>
          </div>

          {/* Right: Text Content */}
          <div className="md:w-1/2 p-12 md:p-24 flex flex-col justify-center space-y-10 bg-white md:bg-transparent">
            <div className="inline-flex items-center gap-3">
              <div className="w-2 h-2 bg-acacia-green rounded-full" />
              <span className="text-xs font-bold uppercase tracking-[0.3em] text-cloud-grey">Always Alive</span>
            </div>
            
            <div className="space-y-6">
              <h2 className="text-4xl md:text-7xl font-bold leading-[0.95] tracking-tight text-obsidian">
                Meet Kibo, <br/> your <span className="text-cloud-grey">24/7 travel agent.</span>
              </h2>
              <p className="text-lg md:text-xl text-obsidian/60 leading-relaxed font-light">
                Forget waiting for office hours. Kibo is always alive monitoring your itinerary, weather patterns, and local logistics in real-time via satellite link. Just tap to talk.
              </p>
            </div>

            <div className="pt-4">
              <button 
                onClick={() => setIsKiboActive(true)}
                className="bg-obsidian text-white px-12 py-6 rounded-full font-bold text-lg hover:bg-acacia-green hover:scale-105 transition-all shadow-xl flex items-center gap-3"
              >
                Initiate Radio Call <ChevronRight size={20} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Destinations Section */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="flex justify-between items-end mb-12">
          <div>
            <p className="text-acacia-green font-bold text-xs uppercase tracking-widest mb-4">Popular Destinations</p>
            <h2 className="text-5xl md:text-6xl font-bold text-obsidian tracking-tight">Where will you go?</h2>
          </div>
          <button 
            onClick={() => onNavigate('all', 'default')}
            className="hidden md:flex items-center gap-2 font-bold text-obsidian hover:gap-4 transition-all"
          >
            View all <ArrowRight size={20} />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              title: "Serengeti",
              location: "Tanzania",
              price: "From $2,800",
              badge: "Great Migration",
              category: "park",
              slug: "serengeti",
              image: "https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&q=80&w=800",
              isTour: false
            },
            {
              title: "Okavango Delta",
              location: "Botswana",
              price: "From $4,500",
              badge: "Water Safari",
              category: "park",
              slug: "okavango",
              image: "https://images.unsplash.com/photo-1549366021-9f761d450615?auto=format&fit=crop&q=80&w=800",
              isTour: false
            },
            {
              title: "3-Day Arusha Parks",
              location: "Tanzania",
              price: "$650",
              badge: "Budget Camping",
              category: "tour",
              slug: "3-day-arusha-parks",
              image: "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?auto=format&fit=crop&q=80&w=800",
              isTour: true
            }
          ].map((dest, i) => (
            <div 
              key={i} 
              onClick={() => dest.isTour ? onTourClick('suricata-3-day', dest.slug) : onNavigate(dest.category as SafariCategory, dest.slug)}
              className="relative h-[500px] rounded-[32px] overflow-hidden group cursor-pointer shadow-lg"
            >
              <img 
                src={dest.image} 
                alt={dest.title} 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-90" />
              <div className="absolute bottom-0 left-0 p-8 w-full">
                <div className="bg-acacia-green text-white px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest inline-block mb-4 shadow-lg">
                  {dest.badge}
                </div>
                <h3 className="text-3xl font-bold text-white mb-2">{dest.title}</h3>
                <p className="text-white/80 font-medium">{dest.location} · <span className="text-white/60 font-normal">{dest.price}</span></p>
              </div>
            </div>
          ))}
        </div>
        
         <button 
           onClick={() => onNavigate('all', 'default')}
           className="md:hidden w-full mt-8 flex items-center justify-center gap-2 font-bold text-obsidian border border-obsidian/10 py-4 rounded-full"
          >
            View all <ArrowRight size={20} />
          </button>
      </section>

      {/* Safari Styles Section */}
      <section className="py-32 px-6 bg-wilderness-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-24 space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-savanna-sun/20 border border-savanna-sun/30 text-obsidian font-bold text-[10px] uppercase tracking-[0.3em] animate-in fade-in slide-in-from-bottom-4 duration-700">
              <Sparkles size={12} className="fill-savanna-sun" />
              <span>Curated Collections</span>
            </div>
            <h2 className="text-5xl md:text-7xl font-bold text-obsidian tracking-tighter animate-in fade-in slide-in-from-bottom-6 duration-1000">
              Safari Styles for Every Traveller
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Classic Big Five Luxury",
                description: "The quintessential African safari in Kruger, Mara, or Serengeti"
              },
              {
                title: "Great Migration Safaris",
                description: "Follow the wildebeest from Serengeti to Masai Mara"
              },
              {
                title: "Gorilla & Primate Luxury",
                description: "Intimate gorilla trekking in Rwanda and Uganda"
              },
              {
                title: "Multi-Country Combos",
                description: "Kenya + Tanzania + Zanzibar beach — the ultimate itinerary"
              },
              {
                title: "Honeymoon & Anniversary",
                description: "Romantic bush dinners, champagne game drives, private villas"
              },
              {
                title: "Photographic Safaris",
                description: "Specialist hides, camera vehicles, and pro photography guides"
              }
            ].map((style, i) => (
              <div 
                key={i} 
                className="bg-white p-10 rounded-[32px] border border-black/5 hover:border-savanna-sun/50 hover:shadow-2xl hover:shadow-savanna-sun/10 transition-all duration-500 group flex gap-8 items-start animate-in fade-in slide-in-from-bottom-8 duration-1000"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <div className="shrink-0 mt-2">
                  <div className="w-3 h-3 bg-savanna-sun rotate-45 shadow-[0_0_15px_rgba(250,255,127,0.8)] group-hover:scale-125 transition-transform duration-500" />
                </div>
                <div className="space-y-3">
                  <h3 className="text-2xl font-bold text-obsidian tracking-tight">{style.title}</h3>
                  <p className="text-obsidian/60 font-light leading-relaxed text-lg">{style.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Features 
        title={<>Designed for explorers. <br /> Loved by locals.</>}
        subtitle="We've built Savanna to be as robust as a 4x4 and as intuitive as your favorite social app."
        features={[
          {
            icon: <Shield className="text-savanna-sun" />,
            title: "Secure Escrow",
            description: "Escrow-based booking ensures funds are only released after guide verification."
          },
          {
            icon: <Cloud className="text-savanna-sun" />,
            title: "Offline Sync",
            description: "Access your itinerary, maps, and tickets even in the deepest corners of the bush."
          },
          {
            icon: <Zap className="text-savanna-sun" />,
            title: "AI Planning",
            description: "Generate complete 14-day routes in seconds based on animal migration patterns."
          },
          {
            icon: <MapPin className="text-savanna-sun" />,
            title: "Verified Guides",
            description: "Every operator is vetted for safety, insurance, and eco-compliance."
          },
          {
            icon: <MessageSquare className="text-savanna-sun" />,
            title: "Direct Chat",
            description: "Bridge the gap. Communicate directly with your ground team via satellite link."
          },
          {
            icon: <HeartHandshake className="text-savanna-sun" />,
            title: "24/7 Support",
            description: "Flying doctors evacuation coverage and round-the-clock emergency assistance."
          }
        ]}
      />

      {/* Kibo Voice Call Modal */}
      {isKiboActive && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-2xl animate-in fade-in duration-500 px-6">
          <button 
            onClick={() => setIsKiboActive(false)}
            className="absolute top-8 right-8 text-white/50 hover:text-white transition-colors"
          >
            <X size={40} />
          </button>
          <div className="w-full max-w-2xl">
             <AssistantCard options={[]} initialMode="voice" />
          </div>
        </div>
      )}
    </div>
  );
};

const FeatureMini: React.FC<{icon: React.ReactNode, title: string, description: string}> = ({ icon, title, description }) => (
  <div className="flex flex-col gap-4 group">
    <div className="w-14 h-14 rounded-2xl bg-white flex items-center justify-center shadow-md border border-cloud-grey/10 group-hover:bg-savanna-sun transition-colors">
      {icon}
    </div>
    <h4 className="font-bold text-2xl text-obsidian">{title}</h4>
    <p className="text-lg text-cloud-grey leading-relaxed">{description}</p>
  </div>
);

export default TravelersPage;
