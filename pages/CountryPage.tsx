import React, { useState, useEffect } from 'react';
import { 
  MapPin, Calendar, Users, Star, Info, 
  Camera, MessageSquare, BookOpen, Phone,
  ChevronRight, ArrowRight, Leaf, Wind,
  Compass, Shield, Heart, Share2, Image as ImageIcon,
  Clock, Utensils, Tent, Plane, Search, Filter,
  Activity, Award, Globe, History, Bird, Moon
} from 'lucide-react';
import { countryData } from '../data/countryData';

interface CountryPageProps {
  slug?: string;
  onTourClick?: (id: string, slug: string) => void;
}

const RotatingInfoWidget: React.FC<{ country: any }> = ({ country }) => {
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
          {slide === 0 && <Globe size={20} className="animate-in zoom-in duration-300" />}
          {slide === 1 && <Calendar size={20} className="animate-in zoom-in duration-300" />}
          {slide === 2 && <Star size={20} className="animate-in zoom-in duration-300" />}
       </div>

       <div className="mt-12 flex-1 flex flex-col justify-center">
          {slide === 0 && (
             <div className="animate-in fade-in slide-in-from-right-4 duration-500 space-y-2">
                <h3 className="text-4xl font-bold text-white tracking-tighter">{country.stats.capital}</h3>
                <div>
                    <p className="text-xl font-bold text-white">Capital City</p>
                    <p className="text-white/50 text-sm font-medium">{country.name}</p>
                </div>
             </div>
          )}

          {slide === 1 && (
             <div className="animate-in fade-in slide-in-from-right-4 duration-500 space-y-4">
                <p className="text-xs font-bold uppercase tracking-widest text-savanna-sun mb-2">Best Time to Visit</p>
                <div className="space-y-1">
                    <p className="text-white font-bold text-lg leading-tight">{country.stats.bestTime}</p>
                    <p className="text-white/50 text-xs">Peak Season</p>
                </div>
                <div className="w-full h-px bg-white/10" />
                <div className="space-y-1">
                    <p className="text-white font-bold text-lg leading-tight">Green Season</p>
                    <p className="text-white/50 text-xs">Fewer crowds, lush landscapes</p>
                </div>
             </div>
          )}

          {slide === 2 && (
             <div className="animate-in fade-in slide-in-from-right-4 duration-500 w-full">
                <div className="flex items-baseline gap-2 mb-6">
                   <span className="text-5xl font-bold text-white tracking-tighter">4.9</span>
                   <span className="text-xs text-white/50 font-bold uppercase tracking-wide">Destination Rating</span>
                </div>
                <div className="space-y-3">
                   {[
                       { label: 'Wildlife', val: 5 },
                       { label: 'Scenery', val: 5 },
                       { label: 'Culture', val: 5 },
                       { label: 'Infrastructure', val: 4 }
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

const CountryPage: React.FC<CountryPageProps> = ({ slug = 'kenya', onTourClick }) => {
  const [activeCategory, setActiveCategory] = useState('Overview');
  const [activeTab, setActiveTab] = useState('Introduction');
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const country = countryData[slug] || countryData['kenya'];

  const categoryTabs: Record<string, string[]> = {
    'Overview': ['Introduction', 'History', 'Geography'],
    'Top Parks': ['National Parks', 'Reserves'],
    'Culture': ['People', 'Traditions'],
    'Travel Guide': ['Getting There', 'Best Time', 'Practical Info'],
    'Safaris': ['Popular Tours', 'Luxury Options']
  };

  const sidebarItems = [
    { id: 'Overview', label: 'About the Country', icon: <Info size={18} /> },
    { id: 'Top Parks', label: 'Top Parks & Reserves', icon: <MapPin size={18} /> },
    { id: 'Culture', label: 'Culture & People', icon: <Users size={18} /> },
    { id: 'Travel Guide', label: 'Travel Guide', icon: <BookOpen size={18} /> },
    { id: 'Safaris', label: 'Safaris & Tours', icon: <Compass size={18} /> },
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
              <h2 className="text-4xl font-bold text-obsidian mb-6">The Essence of {country.name}</h2>
              <p className="text-xl text-obsidian/70 leading-relaxed font-light">
                {country.overview.description}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-8 rounded-[32px] border border-cloud-grey/10 shadow-sm">
                <div className="w-12 h-12 bg-acacia-green/10 rounded-2xl flex items-center justify-center text-acacia-green mb-6">
                  <History size={24} />
                </div>
                <h3 className="text-xl font-bold mb-4">History</h3>
                <p className="text-sm text-obsidian/60 leading-relaxed">
                  {country.overview.history}
                </p>
              </div>
              <div className="bg-white p-8 rounded-[32px] border border-cloud-grey/10 shadow-sm">
                <div className="w-12 h-12 bg-savanna-sun/20 rounded-2xl flex items-center justify-center text-obsidian mb-6">
                  <Globe size={24} />
                </div>
                <h3 className="text-xl font-bold mb-4">Geography</h3>
                <p className="text-sm text-obsidian/60 leading-relaxed">
                  {country.overview.geography}
                </p>
              </div>
              <div className="bg-white p-8 rounded-[32px] border border-cloud-grey/10 shadow-sm">
                <div className="w-12 h-12 bg-obsidian/5 rounded-2xl flex items-center justify-center text-obsidian mb-6">
                  <Award size={24} />
                </div>
                <h3 className="text-xl font-bold mb-4">Fun Facts</h3>
                <p className="text-sm text-obsidian/60 leading-relaxed">
                  {country.overview.funFacts}
                </p>
              </div>
            </div>

            <div className="bg-obsidian text-white p-12 rounded-[48px] relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-acacia-green/20 rounded-full -mr-32 -mt-32 blur-3xl" />
              <div className="relative z-10 flex flex-col md:flex-row items-center gap-12">
                <div className="flex-1">
                  <h3 className="text-3xl font-bold mb-6">{country.overview.mainFeature.title}</h3>
                  <p className="text-white/70 leading-relaxed mb-8 font-light">
                    {country.overview.mainFeature.description}
                  </p>
                  <button className="bg-savanna-sun text-obsidian px-8 py-4 rounded-full font-bold text-sm hover:scale-105 transition-transform">
                    Explore More
                  </button>
                </div>
                <div className="w-full md:w-1/3 aspect-square rounded-[32px] overflow-hidden border-4 border-white/10">
                  <img src={country.overview.mainFeature.image} alt="Main Feature" className="w-full h-full object-cover" />
                </div>
              </div>
            </div>
          </div>
        );
    } else if (activeCategory === 'Top Parks' && activeTab === 'National Parks') {
        return (
          <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {country.topParks.map((park, i) => (
                <div key={i} className="group relative aspect-[4/5] rounded-[32px] overflow-hidden shadow-lg">
                  <img src={park.img} alt={park.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                  <div className="absolute bottom-6 left-6 right-6">
                    <h4 className="text-2xl font-bold text-white mb-1">{park.name}</h4>
                    <p className="text-white/60 text-sm">{park.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
    } else if (activeCategory === 'Culture' && activeTab === 'People') {
        return (
          <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {country.culture.map((item, i) => (
                <div key={i} className="bg-white p-8 rounded-[32px] border border-cloud-grey/10 shadow-sm flex flex-col gap-6 group hover:border-obsidian/20 transition-colors">
                  <div className="aspect-video rounded-2xl overflow-hidden">
                    <img src={item.img} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold mb-2">{item.title}</h3>
                    <p className="text-sm text-obsidian/60 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
    } else if (activeCategory === 'Travel Guide' && activeTab === 'Getting There') {
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
                    <p className="text-xs text-obsidian/60">{country.travelGuide.gettingThere.air}</p>
                  </div>
                  <div className="p-4 bg-wilderness-white rounded-2xl">
                    <p className="font-bold text-sm mb-1">Visa Requirements</p>
                    <p className="text-xs text-obsidian/60">{country.travelGuide.gettingThere.visa}</p>
                  </div>
                </div>
              </div>
              <div className="bg-white p-8 rounded-[32px] border border-cloud-grey/10 shadow-sm">
                <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
                  <Clock size={24} className="text-savanna-sun" /> Practical Info
                </h3>
                <div className="space-y-4">
                  <div className="p-4 bg-wilderness-white rounded-2xl">
                    <p className="font-bold text-sm mb-1">Currency</p>
                    <p className="text-xs text-obsidian/60">{country.travelGuide.currency}</p>
                  </div>
                  <div className="p-4 bg-wilderness-white rounded-2xl">
                    <p className="font-bold text-sm mb-1">Language</p>
                    <p className="text-xs text-obsidian/60">{country.travelGuide.language}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
    } else if (activeCategory === 'Safaris' && activeTab === 'Popular Tours') {
        return (
          <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold">Safaris in {country.name}</h2>
              <div className="flex gap-2">
                <button className="flex items-center gap-2 px-4 py-2 rounded-full border border-cloud-grey/20 text-xs font-bold hover:bg-white transition-colors">
                  <Filter size={14} /> Filter
                </button>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {country.safaris.map((safari, i) => (
                <div key={i} className="group bg-white rounded-[40px] overflow-hidden border border-cloud-grey/10 shadow-sm hover:shadow-xl transition-all duration-500 cursor-pointer" onClick={() => onTourClick?.('1', 'sample-tour')}>
                  <div className="aspect-video overflow-hidden">
                    <img src={safari.img} alt={safari.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  </div>
                  <div className="p-8">
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="text-2xl font-bold">{safari.name}</h3>
                      <div className="flex items-center gap-1 text-savanna-sun">
                        <Star size={16} fill="currentColor" />
                        <span className="text-obsidian font-bold">{safari.rating}</span>
                      </div>
                    </div>
                    <p className="text-cloud-grey text-sm mb-6">{safari.days} Days • Guided experiences • Full Board</p>
                    <div className="flex items-center justify-between pt-6 border-t border-cloud-grey/10">
                      <div>
                        <p className="text-[10px] font-bold text-cloud-grey uppercase tracking-widest">From</p>
                        <p className="text-2xl font-bold text-obsidian">{safari.price}<span className="text-sm font-light text-cloud-grey">/person</span></p>
                      </div>
                      <button className="bg-obsidian text-white px-6 py-3 rounded-full font-bold text-xs uppercase tracking-widest hover:bg-acacia-green transition-colors">
                        View Tour
                      </button>
                    </div>
                  </div>
                </div>
              ))}
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
          src={country.heroImage} 
          alt={`${country.name} Hero`} 
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
        
        <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-savanna-sun text-obsidian text-xs font-bold uppercase tracking-widest mb-8 animate-in slide-in-from-left-4 duration-500">
              <MapPin size={14} />
              <span>{country.location}</span>
            </div>
            <h1 className="text-6xl md:text-8xl font-bold text-white tracking-tighter mb-6 animate-in slide-in-from-left-4 duration-700 delay-100">
              {country.name}<span className="text-savanna-sun">.</span>
            </h1>
            <p className="text-xl md:text-2xl text-white/80 font-light leading-relaxed mb-10 animate-in slide-in-from-left-4 duration-700 delay-200">
              {country.subtitle}
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
                { label: 'Parks & Reserves', val: country.stats.parks },
                { label: 'Best Time', val: country.stats.bestTime },
                { label: 'Vibe', val: country.stats.vibe },
                { label: 'Capital', val: country.stats.capital },
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
                <p className="text-[10px] font-bold text-cloud-grey uppercase tracking-widest mb-4 px-4">Explore Country</p>
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
                <RotatingInfoWidget country={country} />
              </div>

              {/* Newsletter / CTA */}
              <div className="bg-acacia-green text-white p-8 rounded-[32px] shadow-lg relative overflow-hidden">
                <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-white/10 rounded-full" />
                <h4 className="text-xl font-bold mb-4 relative z-10">Stay Updated</h4>
                <p className="text-xs text-white/70 mb-6 relative z-10">Get the latest travel advice and special offers for {country.name}.</p>
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

          </div>
        </div>
      </div>

    </div>
  );
};

export default CountryPage;
