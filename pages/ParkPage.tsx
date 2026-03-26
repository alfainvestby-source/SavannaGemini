
import React, { useState, useEffect } from 'react';
import { 
  MapPin, Calendar, Users, Star, Info, 
  Camera, MessageSquare, BookOpen, Phone,
  ChevronRight, ArrowRight, Leaf, Wind,
  Compass, Shield, Heart, Share2, Image as ImageIcon,
  Clock, Utensils, Tent, Plane, Search, Filter,
  Activity, Award, Globe, History, Bird, Moon
} from 'lucide-react';
import { parkData } from '../data/parkData';

interface ParkPageProps {
  slug?: string;
}

const RotatingInfoWidget: React.FC = () => {
  const [slide, setSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setSlide((prev) => (prev + 1) % 3);
    }, 5000); 
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="bg-gradient-to-br from-[#2A2A2A] to-black rounded-[32px] p-6 flex flex-col justify-between relative overflow-hidden shadow-2xl border border-white/10 group h-full min-h-[320px]">
       <div className="absolute top-6 right-6 w-12 h-12 rounded-full bg-savanna-sun flex items-center justify-center text-obsidian shadow-lg z-10 transition-transform duration-500 group-hover:rotate-12">
          {slide === 0 && <Leaf size={20} className="animate-in zoom-in duration-300" />}
          {slide === 1 && <Calendar size={20} className="animate-in zoom-in duration-300" />}
          {slide === 2 && <Star size={20} className="animate-in zoom-in duration-300" />}
       </div>

       <div className="mt-12 flex-1 flex flex-col justify-center">
          {slide === 0 && (
             <div className="animate-in fade-in slide-in-from-right-4 duration-500 space-y-2">
                <h3 className="text-6xl font-bold text-white tracking-tighter">26<span className="text-3xl align-top text-white/60">°c</span></h3>
                <div>
                    <p className="text-2xl font-bold text-white">Peak Season</p>
                    <p className="text-white/50 text-sm font-medium">Masai Mara, Kenya</p>
                </div>
             </div>
          )}

          {slide === 1 && (
             <div className="animate-in fade-in slide-in-from-right-4 duration-500 space-y-4">
                <p className="text-xs font-bold uppercase tracking-widest text-savanna-sun mb-2">Migration Watch</p>
                <div className="space-y-1">
                    <p className="text-white font-bold text-lg leading-tight">Jul — Oct</p>
                    <p className="text-white/50 text-xs">River Crossings active</p>
                </div>
                <div className="w-full h-px bg-white/10" />
                <div className="space-y-1">
                    <p className="text-white font-bold text-lg leading-tight">Dec — Mar</p>
                    <p className="text-white/50 text-xs">Calving season</p>
                </div>
             </div>
          )}

          {slide === 2 && (
             <div className="animate-in fade-in slide-in-from-right-4 duration-500 w-full">
                <div className="flex items-baseline gap-2 mb-6">
                   <span className="text-5xl font-bold text-white tracking-tighter">4.9</span>
                   <span className="text-xs text-white/50 font-bold uppercase tracking-wide">12k+ Reviews</span>
                </div>
                <div className="space-y-3">
                   {[
                       { label: 'Wildlife', val: 5 },
                       { label: 'Scenery', val: 5 },
                       { label: 'Migration', val: 5 },
                       { label: 'Culture', val: 4 }
                   ].map((item, i) => (
                      <div key={i} className="flex items-center justify-between">
                         <span className="text-xs text-white/70 font-medium">{item.label}</span>
                         <div className="flex gap-1">
                            {[1,2,3,4,5].map(s => (
                                <div key={s} className={`w-1.5 h-1.5 rounded-full ${s <= item.val ? 'bg-savanna-sun' : 'bg-white/10'}`} />
                            ))}
                         </div>
                      </div>
                   ))}
                </div>
             </div>
          )}
       </div>

       <div className="flex gap-2 pt-6">
          {[0, 1, 2].map(i => (
             <div 
               key={i} 
               className={`h-1 rounded-full transition-all duration-500 ${slide === i ? 'bg-white w-8' : 'bg-white/20 flex-1'}`} 
             />
          ))}
       </div>
    </div>
  );
};

const ParkPage: React.FC<ParkPageProps> = ({ slug = 'masai-mara' }) => {
  const [activeCategory, setActiveCategory] = useState('Overview');
  const [activeTab, setActiveTab] = useState('Introduction');
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const park = parkData[slug] || parkData['masai-mara'];

  const categoryTabs: Record<string, string[]> = {
    'Overview': ['Introduction', 'History', 'Geography'],
    'Wildlife': ['Big Five', 'Migration', 'Conservation'],
    'Activities': ['Game Drives', 'Hot Air Balloon', 'Cultural Tours'],
    'Lodges': ['Luxury Camps', 'Safari Lodges', 'Budget Options'],
    'Logistics': ['Best Time', 'Getting There', 'Park Fees'],
    'Gallery': ['Photos', 'Videos'],
    'Reviews': ['Visitor Stories', 'Write a Review'],
    'Resources': ['Guides', 'Maps']
  };

  const sidebarItems = [
    { id: 'Overview', label: 'About the Park', icon: <Info size={18} /> },
    { id: 'Wildlife', label: 'Wildlife & Nature', icon: <Leaf size={18} /> },
    { id: 'Activities', label: 'Things to Do', icon: <Activity size={18} /> },
    { id: 'Lodges', label: 'Lodges & Camps', icon: <Tent size={18} /> },
    { id: 'Logistics', label: 'Plan Your Visit', icon: <Calendar size={18} /> },
    { id: 'Gallery', label: 'Gallery & Media', icon: <ImageIcon size={18} /> },
    { id: 'Reviews', label: 'Reviews', icon: <MessageSquare size={18} /> },
    { id: 'Resources', label: 'Resources', icon: <BookOpen size={18} /> },
  ];

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
    setActiveTab(categoryTabs[category][0]);
  };

  const renderTabContent = () => {
    if (activeCategory === 'Overview' && activeTab === 'Introduction') {
        return (
          <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="prose prose-lg max-w-none">
              <h2 className="text-4xl font-bold text-obsidian mb-6">The Essence of {park.name}</h2>
              <p className="text-xl text-obsidian/70 leading-relaxed font-light">
                {park.overview.description}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-8 rounded-[32px] border border-cloud-grey/10 shadow-sm">
                <div className="w-12 h-12 bg-acacia-green/10 rounded-2xl flex items-center justify-center text-acacia-green mb-6">
                  <History size={24} />
                </div>
                <h3 className="text-xl font-bold mb-4">History</h3>
                <p className="text-sm text-obsidian/60 leading-relaxed">
                  {park.overview.history}
                </p>
              </div>
              <div className="bg-white p-8 rounded-[32px] border border-cloud-grey/10 shadow-sm">
                <div className="w-12 h-12 bg-savanna-sun/20 rounded-2xl flex items-center justify-center text-obsidian mb-6">
                  <Globe size={24} />
                </div>
                <h3 className="text-xl font-bold mb-4">Geography</h3>
                <p className="text-sm text-obsidian/60 leading-relaxed">
                  {park.overview.geography}
                </p>
              </div>
              <div className="bg-white p-8 rounded-[32px] border border-cloud-grey/10 shadow-sm">
                <div className="w-12 h-12 bg-obsidian/5 rounded-2xl flex items-center justify-center text-obsidian mb-6">
                  <Award size={24} />
                </div>
                <h3 className="text-xl font-bold mb-4">Fun Facts</h3>
                <p className="text-sm text-obsidian/60 leading-relaxed">
                  {park.overview.funFacts}
                </p>
              </div>
            </div>

            <div className="bg-obsidian text-white p-12 rounded-[48px] relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-acacia-green/20 rounded-full -mr-32 -mt-32 blur-3xl" />
              <div className="relative z-10 flex flex-col md:flex-row items-center gap-12">
                <div className="flex-1">
                  <h3 className="text-3xl font-bold mb-6">{park.overview.mainFeature.title}</h3>
                  <p className="text-white/70 leading-relaxed mb-8 font-light">
                    {park.overview.mainFeature.description}
                  </p>
                  <button className="bg-savanna-sun text-obsidian px-8 py-4 rounded-full font-bold text-sm hover:scale-105 transition-transform">
                    View Interactive Map
                  </button>
                </div>
                <div className="w-full md:w-1/3 aspect-square rounded-[32px] overflow-hidden border-4 border-white/10">
                  <img src={park.overview.mainFeature.image} alt="Main Feature" className="w-full h-full object-cover" />
                </div>
              </div>
            </div>
          </div>
        );
    } else if (activeCategory === 'Wildlife' && activeTab === 'Big Five') {
        return (
          <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {park.wildlife.map((animal, i) => (
                <div key={i} className="group relative aspect-[4/5] rounded-[32px] overflow-hidden shadow-lg">
                  <img src={animal.img} alt={animal.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                  <div className="absolute bottom-6 left-6 right-6">
                    <h4 className="text-2xl font-bold text-white mb-1">{animal.name}</h4>
                    <p className="text-white/60 text-sm">{animal.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-acacia-green/5 p-10 rounded-[40px] border border-acacia-green/10">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 bg-acacia-green rounded-full flex items-center justify-center text-white">
                  <Shield size={24} />
                </div>
                <h3 className="text-2xl font-bold text-obsidian">Conservation Efforts</h3>
              </div>
              <p className="text-obsidian/70 leading-relaxed mb-8 font-light">
                Managed by Narok County and Mara Conservancy, with initiatives like anti-poaching patrols arresting 4,500 offenders, dog vaccinations, and community conservancies like Mara North and Ol Kinyei providing income and education.
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-white p-4 rounded-2xl text-center">
                  <p className="text-2xl font-bold text-acacia-green">4.5k</p>
                  <p className="text-[10px] font-bold uppercase text-cloud-grey">Arrests made</p>
                </div>
                <div className="bg-white p-4 rounded-2xl text-center">
                  <p className="text-2xl font-bold text-acacia-green">15+</p>
                  <p className="text-[10px] font-bold uppercase text-cloud-grey">Conservancies</p>
                </div>
                <div className="bg-white p-4 rounded-2xl text-center">
                  <p className="text-2xl font-bold text-acacia-green">500+</p>
                  <p className="text-[10px] font-bold uppercase text-cloud-grey">Bird Species</p>
                </div>
                <div className="bg-white p-4 rounded-2xl text-center">
                  <p className="text-2xl font-bold text-acacia-green">95+</p>
                  <p className="text-[10px] font-bold uppercase text-cloud-grey">Mammal Species</p>
                </div>
              </div>
            </div>
          </div>
        );
    } else if (activeCategory === 'Activities' && activeTab === 'Game Drives') {
        return (
          <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {park.activities.map((act, i) => {
                const IconComponent = {
                  Compass, Wind, Users, Leaf, Activity, Moon, Bird
                }[act.iconName] || Compass;
                return (
                  <div key={i} className="bg-white p-8 rounded-[32px] border border-cloud-grey/10 shadow-sm flex gap-6 group hover:border-obsidian/20 transition-colors">
                    <div className="w-16 h-16 bg-wilderness-white rounded-2xl flex items-center justify-center text-obsidian shrink-0 group-hover:bg-savanna-sun transition-colors">
                      <IconComponent size={24} />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-2">{act.title}</h3>
                      <p className="text-sm text-obsidian/60 leading-relaxed">{act.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        );
    } else if (activeCategory === 'Lodges' && activeTab === 'Luxury Camps') {
        return (
          <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold">Lodges in {park.name}</h2>
              <div className="flex gap-2">
                <button className="flex items-center gap-2 px-4 py-2 rounded-full border border-cloud-grey/20 text-xs font-bold hover:bg-white transition-colors">
                  <Filter size={14} /> Filter
                </button>
                <button className="flex items-center gap-2 px-4 py-2 rounded-full border border-cloud-grey/20 text-xs font-bold hover:bg-white transition-colors">
                  <Search size={14} /> Search
                </button>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {park.lodges.map((lodge, i) => (
                <div key={i} className="group bg-white rounded-[40px] overflow-hidden border border-cloud-grey/10 shadow-sm hover:shadow-xl transition-all duration-500">
                  <div className="aspect-video overflow-hidden">
                    <img src={lodge.img} alt={lodge.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  </div>
                  <div className="p-8">
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="text-2xl font-bold">{lodge.name}</h3>
                      <div className="flex items-center gap-1 text-savanna-sun">
                        <Star size={16} fill="currentColor" />
                        <span className="text-obsidian font-bold">{lodge.rating}</span>
                      </div>
                    </div>
                    <p className="text-cloud-grey text-sm mb-6">Luxury Tents • Guided experiences • Private Deck</p>
                    <div className="flex items-center justify-between pt-6 border-t border-cloud-grey/10">
                      <div>
                        <p className="text-[10px] font-bold text-cloud-grey uppercase tracking-widest">From</p>
                        <p className="text-2xl font-bold text-obsidian">{lodge.price}<span className="text-sm font-light text-cloud-grey">/night</span></p>
                      </div>
                      <button className="bg-obsidian text-white px-6 py-3 rounded-full font-bold text-xs uppercase tracking-widest hover:bg-acacia-green transition-colors">
                        Book Now
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
    } else if (activeCategory === 'Logistics' && activeTab === 'Best Time') {
        return (
          <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white p-8 rounded-[32px] border border-cloud-grey/10 shadow-sm">
                <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
                  <Plane size={24} className="text-acacia-green" /> Getting There
                </h3>
                <div className="space-y-4">
                  <div className="p-4 bg-wilderness-white rounded-2xl">
                    <p className="font-bold text-sm mb-1">By Air</p>
                    <p className="text-xs text-obsidian/60">{park.logistics.gettingThere.air}</p>
                  </div>
                  <div className="p-4 bg-wilderness-white rounded-2xl">
                    <p className="font-bold text-sm mb-1">By Road</p>
                    <p className="text-xs text-obsidian/60">{park.logistics.gettingThere.road}</p>
                  </div>
                </div>
              </div>
              <div className="bg-white p-8 rounded-[32px] border border-cloud-grey/10 shadow-sm">
                <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
                  <Clock size={24} className="text-savanna-sun" /> Best Time to Visit
                </h3>
                <div className="space-y-4">
                  <div className="p-4 bg-wilderness-white rounded-2xl">
                    <p className="font-bold text-sm mb-1">{park.logistics.bestTime.peak.label}</p>
                    <p className="text-xs text-obsidian/60">{park.logistics.bestTime.peak.desc}</p>
                  </div>
                  <div className="p-4 bg-wilderness-white rounded-2xl">
                    <p className="font-bold text-sm mb-1">{park.logistics.bestTime.offPeak.label}</p>
                    <p className="text-xs text-obsidian/60">{park.logistics.bestTime.offPeak.desc}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-obsidian text-white p-10 rounded-[40px]">
              <h3 className="text-2xl font-bold mb-6">Entry Fees & Permits</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div>
                  <div className="flex justify-between items-center py-3 border-b border-white/10">
                    <span className="text-white/60">Adult</span>
                    <span className="font-bold">{park.logistics.fees.adult}</span>
                  </div>
                  <div className="flex justify-between items-center py-3 border-b border-white/10">
                    <span className="text-white/60">Child</span>
                    <span className="font-bold">{park.logistics.fees.child}</span>
                  </div>
                </div>
                <div className="flex flex-col justify-center">
                  <p className="text-sm text-white/40 mb-6">
                    {park.logistics.fees.note}
                  </p>
                  <button className="bg-white text-obsidian px-6 py-3 rounded-full font-bold text-sm hover:bg-savanna-sun transition-colors self-start">
                    Download Official Guide
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
    }
    
    return (
      <div className="py-20 text-center text-cloud-grey animate-in fade-in duration-500">
        <p className="text-xl font-light">Content for {activeTab} coming soon...</p>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-wilderness-white font-sans">
      
      {/* Hero Section */}
      <section className="relative h-[85vh] min-h-[700px] flex items-center overflow-hidden">
        <img 
          src={park.heroImage} 
          alt={`${park.name} Hero`} 
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
        
        <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-savanna-sun text-obsidian text-xs font-bold uppercase tracking-widest mb-8 animate-in slide-in-from-left-4 duration-500">
              <MapPin size={14} />
              <span>{park.location}</span>
            </div>
            <h1 className="text-6xl md:text-8xl font-bold text-white tracking-tighter mb-6 animate-in slide-in-from-left-4 duration-700 delay-100">
              {park.name}<span className="text-savanna-sun">.</span>
            </h1>
            <p className="text-xl md:text-2xl text-white/80 font-light leading-relaxed mb-10 animate-in slide-in-from-left-4 duration-700 delay-200">
              {park.subtitle}
            </p>
            
            <div className="flex flex-wrap gap-4 animate-in slide-in-from-left-4 duration-700 delay-300">
              <button className="bg-white text-obsidian px-10 py-5 rounded-full font-bold text-sm hover:bg-savanna-sun transition-all shadow-xl">
                Plan Your Trip
              </button>
              <button className="bg-white/10 backdrop-blur-md border border-white/20 text-white px-10 py-5 rounded-full font-bold text-sm hover:bg-white/20 transition-all flex items-center gap-2">
                Watch Video <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </div>

        {/* Hero Stats */}
        <div className="absolute bottom-12 left-0 right-0 z-10">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { label: 'Area Size', val: park.stats.area },
                { label: 'Established', val: park.stats.established },
                { label: 'Big Five', val: park.stats.bigFive },
                { label: 'UNESCO', val: park.stats.unesco },
              ].map((stat, i) => (
                <div key={i} className="border-l border-white/20 pl-6">
                  <p className="text-white/40 text-[10px] font-bold uppercase tracking-widest mb-1">{stat.label}</p>
                  <p className="text-2xl font-bold text-white tracking-tight">{stat.val}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Area with Sidebar */}
      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="flex flex-col lg:flex-row gap-12">
          
          {/* Vertical Sidebar Menu */}
          <aside className={`lg:w-72 shrink-0 transition-all duration-500 ${sidebarOpen ? 'opacity-100' : 'opacity-0 -translate-x-10'}`}>
            <div className="sticky top-24 space-y-8">
              <div className="bg-white rounded-[32px] border border-cloud-grey/10 p-4 shadow-sm">
                <p className="text-[10px] font-bold text-cloud-grey uppercase tracking-widest mb-4 px-4">Explore Park</p>
                <nav className="space-y-1">
                  {sidebarItems.map((item) => (
                    <button 
                      key={item.id}
                      onClick={() => handleCategoryChange(item.id)}
                      className={`w-full flex items-center gap-4 px-4 py-3.5 rounded-2xl text-sm font-bold transition-all text-left group ${activeCategory === item.id ? 'bg-savanna-sun text-obsidian' : 'text-obsidian/60 hover:bg-wilderness-white hover:text-obsidian'}`}
                    >
                      <span className={`${activeCategory === item.id ? 'text-obsidian' : 'text-cloud-grey group-hover:text-acacia-green'} transition-colors`}>{item.icon}</span>
                      {item.label}
                      <ChevronRight size={14} className={`ml-auto transition-all ${activeCategory === item.id ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0'}`} />
                    </button>
                  ))}
                </nav>
              </div>

              {/* Rotating Widget in Sidebar */}
              <div className="hidden lg:block">
                <RotatingInfoWidget />
              </div>

              {/* Newsletter / CTA */}
              <div className="bg-acacia-green text-white p-8 rounded-[32px] shadow-lg relative overflow-hidden">
                <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-white/10 rounded-full" />
                <h4 className="text-xl font-bold mb-4 relative z-10">Stay Updated</h4>
                <p className="text-xs text-white/70 mb-6 relative z-10">Get the latest migration timings and special offers.</p>
                <div className="relative z-10 space-y-3">
                  <input type="email" placeholder="Email address" className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-sm outline-none placeholder:text-white/40" />
                  <button className="w-full bg-savanna-sun text-obsidian py-3 rounded-xl font-bold text-xs uppercase tracking-widest">Subscribe</button>
                </div>
              </div>
            </div>
          </aside>

          {/* Main Content Column */}
          <div className="flex-1 min-w-0">
            
            {/* Horizontal Tabs */}
            <div className="mb-12 flex justify-center lg:justify-start overflow-x-auto pb-4 custom-scrollbar">
              <div className="bg-white p-1.5 rounded-full inline-flex gap-1 shadow-sm border border-cloud-grey/10 whitespace-nowrap">
                {categoryTabs[activeCategory]?.map((tab) => (
                  <button 
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-6 py-3 rounded-full text-xs font-bold uppercase tracking-widest transition-all ${activeTab === tab ? 'bg-obsidian text-white shadow-lg' : 'text-obsidian/40 hover:bg-wilderness-white'}`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>

            {/* Dynamic Content */}
            <div className="min-h-[600px]">
              {renderTabContent()}
            </div>

            {/* Related Lodges Section (Preview) */}
            <section className="mt-32 pt-20 border-t border-cloud-grey/10">
              <div className="flex justify-between items-end mb-12">
                <div>
                  <h2 className="text-4xl font-bold text-obsidian mb-4">Lodges in Masai Mara</h2>
                  <p className="text-obsidian/60 font-light">Hand-picked luxury camps and eco-lodges.</p>
                </div>
                <button className="flex items-center gap-2 text-sm font-bold text-obsidian border-b-2 border-savanna-sun pb-1">
                  View All Lodges <ArrowRight size={16} />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {[
                  { name: 'Kichwa Tembo Tented Camp', price: '$785', img: 'https://images.unsplash.com/photo-1493246507139-91e8fad9978e?auto=format&fit=crop&q=80&w=800' },
                  { name: 'Cottars 1920s Safari Camp', price: '$1,144', img: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=800' },
                ].map((lodge, i) => (
                  <div key={i} className="group bg-white rounded-[40px] overflow-hidden border border-cloud-grey/10 shadow-sm hover:shadow-xl transition-all duration-500">
                    <div className="aspect-video overflow-hidden">
                      <img src={lodge.img} alt={lodge.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                    </div>
                    <div className="p-8">
                      <div className="flex justify-between items-start mb-4">
                        <h3 className="text-2xl font-bold">{lodge.name}</h3>
                        <div className="flex items-center gap-1 text-savanna-sun">
                          <Star size={16} fill="currentColor" />
                          <span className="text-obsidian font-bold">5.0</span>
                        </div>
                      </div>
                      <p className="text-cloud-grey text-sm mb-6">Luxury Tents • Maasai-guided experiences • Private Deck</p>
                      <div className="flex items-center justify-between pt-6 border-t border-cloud-grey/10">
                        <div>
                          <p className="text-[10px] font-bold text-cloud-grey uppercase tracking-widest">From</p>
                          <p className="text-2xl font-bold text-obsidian">{lodge.price}<span className="text-sm font-light text-cloud-grey">/night</span></p>
                        </div>
                        <button className="bg-obsidian text-white px-6 py-3 rounded-full font-bold text-xs uppercase tracking-widest hover:bg-acacia-green transition-colors">
                          Check Availability
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Reviews Section Preview */}
            <section className="mt-32 pt-20 border-t border-cloud-grey/10">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                <div className="lg:col-span-1">
                  <h2 className="text-4xl font-bold text-obsidian mb-6">Visitor Stories</h2>
                  <div className="flex items-center gap-4 mb-8">
                    <div className="text-5xl font-bold text-obsidian tracking-tighter">4.8</div>
                    <div>
                      <div className="flex text-savanna-sun mb-1">
                        {[1,2,3,4,5].map(i => <Star key={i} size={16} fill={i <= 4 ? "currentColor" : "none"} />)}
                      </div>
                      <p className="text-xs text-cloud-grey font-bold uppercase tracking-widest">214 TripAdvisor Reviews</p>
                    </div>
                  </div>
                  <button className="w-full bg-obsidian text-white py-4 rounded-2xl font-bold text-sm hover:bg-acacia-green transition-colors">
                    Write a Review
                  </button>
                </div>
                <div className="lg:col-span-2 space-y-6">
                  {[
                    { user: 'Sarah M.', date: 'Oct 2025', text: 'Unforgettable experience seeing the Big Five and migration. The river crossing was intense and beautiful.', rating: 5 },
                    { user: 'David K.', date: 'Dec 2025', text: 'Amazing sunsets and abundant animals. Our guide was incredibly knowledgeable about bird species.', rating: 5 },
                  ].map((rev, i) => (
                    <div key={i} className="bg-white p-8 rounded-[32px] border border-cloud-grey/10 shadow-sm">
                      <div className="flex justify-between items-center mb-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-savanna-sun flex items-center justify-center font-bold text-obsidian">
                            {rev.user[0]}
                          </div>
                          <div>
                            <p className="font-bold text-sm">{rev.user}</p>
                            <p className="text-[10px] text-cloud-grey font-bold uppercase">{rev.date}</p>
                          </div>
                        </div>
                        <div className="flex text-savanna-sun">
                          {[1,2,3,4,5].map(i => <Star key={i} size={12} fill={i <= rev.rating ? "currentColor" : "none"} />)}
                        </div>
                      </div>
                      <p className="text-obsidian/70 leading-relaxed italic">"{rev.text}"</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>

          </div>
        </div>
      </div>

      {/* Footer / Contact Section */}
      <footer className="bg-obsidian text-white py-20 mt-32">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center gap-2 mb-8">
                <div className="relative w-10 h-10 bg-savanna-sun rounded-full flex items-center justify-center">
                  <div className="w-2 h-2 bg-black rounded-full absolute top-2 left-3" />
                  <div className="w-2 h-2 bg-black rounded-full" />
                </div>
                <span className="text-2xl font-bold text-white">Savanna</span>
              </div>
              <p className="text-white/40 max-w-md leading-relaxed mb-8 font-light">
                The Masai Mara National Reserve is part of the Greater Mara ecosystem, contiguous with Tanzania's Serengeti National Park. We are dedicated to sustainable tourism and conservation.
              </p>
              <div className="flex gap-4">
                <button className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-savanna-sun hover:text-obsidian transition-all">
                  <Share2 size={18} />
                </button>
                <button className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-savanna-sun hover:text-obsidian transition-all">
                  <Heart size={18} />
                </button>
              </div>
            </div>
            <div>
              <h4 className="font-bold text-sm uppercase tracking-widest mb-8 text-savanna-sun">Contact Us</h4>
              <ul className="space-y-4 text-sm text-white/60">
                <li className="flex items-center gap-3"><Phone size={16} /> +254 700 000 000</li>
                <li className="flex items-center gap-3"><Globe size={16} /> safari@masaimara.travel</li>
                <li className="flex items-center gap-3"><MapPin size={16} /> Narok County, Kenya</li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-sm uppercase tracking-widest mb-8 text-savanna-sun">Resources</h4>
              <ul className="space-y-4 text-sm text-white/60">
                <li className="hover:text-white cursor-pointer transition-colors">Migration Calendar</li>
                <li className="hover:text-white cursor-pointer transition-colors">Park Entry Fees</li>
                <li className="hover:text-white cursor-pointer transition-colors">Conservation Projects</li>
                <li className="hover:text-white cursor-pointer transition-colors">Photography Tips</li>
              </ul>
            </div>
          </div>
          <div className="mt-20 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-xs text-white/20">© 2026 Savanna Modern Safari. All rights reserved.</p>
            <div className="flex gap-8 text-xs text-white/20">
              <span className="hover:text-white cursor-pointer transition-colors">Privacy Policy</span>
              <span className="hover:text-white cursor-pointer transition-colors">Terms of Use</span>
              <span className="hover:text-white cursor-pointer transition-colors">FAQ</span>
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
};

export default ParkPage;
