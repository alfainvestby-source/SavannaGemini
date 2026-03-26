
import React, { useState, useEffect } from 'react';
import { 
  MapPin, Calendar, Users, Star, Info, 
  Camera, MessageSquare, BookOpen, Phone,
  ChevronRight, ArrowRight, Leaf, Wind, Cloud,
  Compass, Shield, Heart, Share2, Image as ImageIcon,
  Clock, Utensils, Tent, Plane, Search, Filter,
  Activity, Award, Globe, History, Sparkles,
  Gem, Layout, DollarSign, HeartHandshake, UserCheck, PenTool,
  CheckCircle2
} from 'lucide-react';

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
          {slide === 0 && <Gem size={20} className="animate-in zoom-in duration-300" />}
          {slide === 1 && <Sparkles size={20} className="animate-in zoom-in duration-300" />}
          {slide === 2 && <Award size={20} className="animate-in zoom-in duration-300" />}
       </div>

       <div className="mt-12 flex-1 flex flex-col justify-center">
          {slide === 0 && (
             <div className="animate-in fade-in slide-in-from-right-4 duration-500 space-y-2">
                <p className="text-xs font-bold uppercase tracking-widest text-savanna-sun mb-2">Exclusivity Level</p>
                <h3 className="text-5xl font-bold text-white tracking-tighter">Ultra<span className="text-2xl align-top text-white/60"> Luxe</span></h3>
                <div>
                    <p className="text-white/50 text-sm font-medium">Private Concessions Only</p>
                </div>
             </div>
          )}

          {slide === 1 && (
             <div className="animate-in fade-in slide-in-from-right-4 duration-500 space-y-4">
                <p className="text-xs font-bold uppercase tracking-widest text-savanna-sun mb-2">Signature Services</p>
                <div className="space-y-1">
                    <p className="text-white font-bold text-lg leading-tight">Private Chef</p>
                    <p className="text-white/50 text-xs">Gourmet Bush Dining</p>
                </div>
                <div className="w-full h-px bg-white/10" />
                <div className="space-y-1">
                    <p className="text-white font-bold text-lg leading-tight">Butler Service</p>
                    <p className="text-white/50 text-xs">24/7 Personalized Care</p>
                </div>
             </div>
          )}

          {slide === 2 && (
             <div className="animate-in fade-in slide-in-from-right-4 duration-500 w-full">
                <div className="flex items-baseline gap-2 mb-6">
                   <span className="text-5xl font-bold text-white tracking-tighter">5.0</span>
                   <span className="text-xs text-white/50 font-bold uppercase tracking-wide">Elite Member Rating</span>
                </div>
                <div className="space-y-3">
                   {[
                       { label: 'Privacy', val: 5 },
                       { label: 'Comfort', val: 5 },
                       { label: 'Dining', val: 5 },
                       { label: 'Guiding', val: 5 }
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

const LuxurySafariPage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('Luxury Experiences');
  const [activeTab, setActiveTab] = useState('Overview');
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const categoryTabs: Record<string, string[]> = {
    'Luxury Experiences': ['Overview', 'Accommodation Standards', 'Private Game Drives', 'Dining & Wellness', 'Seamless Logistics'],
    'Destinations': ['Overview', 'East Africa', 'Southern Africa'],
    'Signature Lodges': ['Overview', 'Tented Camps', 'Safari Lodges', 'Private Villas'],
    'Tour Styles': ['Overview', 'Classic Big Five', 'Migration-focused', 'Gorilla extensions', 'Multi-country combinations', 'Honeymoon & anniversary', 'Photographic specialist safaris'],
    'Bespoke Itineraries': ['Overview', 'Sample Routes', 'Planning Process'],
    'Pricing': ['Overview', 'Inclusions', 'Terms'],
    'Seasons & Planning': ['Overview', 'Best Time', 'Packing List'],
    'Responsible Luxury': ['Overview', 'Conservation Partnerships', 'Community Investment', 'Anti-poaching', 'Carbon-conscious Travel'],
    'Client Stories': ['Overview', 'Testimonials', 'Photo Gallery'],
    'Design Your Safari': ['Overview', 'Consultation', 'Customizer']
  };

  const sidebarItems = [
    { id: 'Luxury Experiences', label: 'Luxury Experiences', icon: <Sparkles size={18} /> },
    { id: 'Destinations', label: 'Destinations', icon: <MapPin size={18} /> },
    { id: 'Signature Lodges', label: 'Signature Lodges', icon: <Tent size={18} /> },
    { id: 'Tour Styles', label: 'Tour Styles', icon: <Layout size={18} /> },
    { id: 'Bespoke Itineraries', label: 'Bespoke Itineraries', icon: <Compass size={18} /> },
    { id: 'Pricing', label: 'Pricing', icon: <DollarSign size={18} /> },
    { id: 'Seasons & Planning', label: 'Seasons & Planning', icon: <Calendar size={18} /> },
    { id: 'Responsible Luxury', label: 'Responsible Luxury', icon: <HeartHandshake size={18} /> },
    { id: 'Client Stories', label: 'Client Stories', icon: <UserCheck size={18} /> },
    { id: 'Design Your Safari', label: 'Design Your Safari', icon: <PenTool size={18} /> },
  ];

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
    setActiveTab(categoryTabs[category][0]);
  };

  const renderTabContent = () => {
    if (activeCategory === 'Luxury Experiences') {
      switch (activeTab) {
        case 'Overview':
          return (
            <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="prose prose-lg max-w-none">
                <h2 className="text-4xl font-bold text-obsidian mb-6">What Defines Luxury in 2026</h2>
                <p className="text-xl text-obsidian/70 leading-relaxed font-light mb-8">
                  The modern luxury safari has evolved beyond thread counts and fine dining. Today, true luxury is defined by space, time, and the depth of connection to the wild.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                  {[
                    'Exclusivity & low guest density',
                    'Private vehicles & guides',
                    'Seamless charter logistics',
                    'Conservation-driven ownership models',
                    'Ultra-prime wildlife locations'
                  ].map((point, i) => (
                    <div key={i} className="flex items-center gap-4 p-4 bg-white rounded-2xl border border-cloud-grey/10 shadow-sm">
                      <div className="w-2 h-2 bg-savanna-sun rounded-full shrink-0" />
                      <span className="text-sm font-bold text-obsidian">{point}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-white p-8 rounded-[32px] border border-cloud-grey/10 shadow-sm">
                  <div className="w-12 h-12 bg-savanna-sun/20 rounded-2xl flex items-center justify-center text-obsidian mb-6">
                    <Gem size={24} />
                  </div>
                  <h3 className="text-xl font-bold mb-4">Unmatched Exclusivity</h3>
                  <p className="text-sm text-obsidian/60 leading-relaxed">
                    Access private concessions where crowds don't exist, and wildlife encounters are personal and profound.
                  </p>
                </div>
                <div className="bg-white p-8 rounded-[32px] border border-cloud-grey/10 shadow-sm">
                  <div className="w-12 h-12 bg-acacia-green/10 rounded-2xl flex items-center justify-center text-acacia-green mb-6">
                    <Sparkles size={24} />
                  </div>
                  <h3 className="text-xl font-bold mb-4">Tailored Perfection</h3>
                  <p className="text-sm text-obsidian/60 leading-relaxed">
                    From private chefs to custom flight paths, every detail of your journey is crafted to your exact preferences.
                  </p>
                </div>
              </div>

              <div className="bg-obsidian text-white p-12 rounded-[48px] relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-savanna-sun/10 rounded-full -mr-32 -mt-32 blur-3xl" />
                <div className="relative z-10 flex flex-col md:flex-row items-center gap-12">
                  <div className="flex-1">
                    <h3 className="text-3xl font-bold mb-6">Private Jet Safaris</h3>
                    <p className="text-white/70 leading-relaxed mb-8 font-light">
                      Soar above the savannah in your own private aircraft, connecting Africa's most iconic landscapes with seamless elegance and speed.
                    </p>
                    <button className="bg-savanna-sun text-obsidian px-8 py-4 rounded-full font-bold text-sm hover:scale-105 transition-transform">
                      Explore Jet Collection
                    </button>
                  </div>
                  <div className="w-full md:w-1/3 aspect-video rounded-[32px] overflow-hidden border-4 border-white/10">
                    <img src="https://images.unsplash.com/photo-1540306346395-50e50f384a3c?auto=format&fit=crop&q=80&w=600" alt="Private Jet" className="w-full h-full object-cover" />
                  </div>
                </div>
              </div>

              {/* Gallery Section */}
              <div className="mt-24 -mx-6 px-6 py-24 bg-obsidian rounded-[64px] relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-5" />
                
                <div className="relative z-10">
                  <div className="text-center mb-16 space-y-4">
                    <p className="text-[10px] font-bold text-savanna-sun uppercase tracking-[0.5em] animate-in fade-in slide-in-from-bottom-4 duration-700">Visual Journey</p>
                    <h2 className="text-5xl md:text-7xl font-bold text-white tracking-tighter animate-in fade-in slide-in-from-bottom-6 duration-1000">Safari Inspiration</h2>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-6 auto-rows-[300px] md:auto-rows-[350px]">
                    {/* Large Vertical - Leopard */}
                    <div className="md:col-span-2 md:row-span-2 rounded-[32px] overflow-hidden group relative shadow-2xl">
                      <img 
                        src="https://images.unsplash.com/photo-1575550959106-5a7defe28b56?auto=format&fit=crop&q=80&w=1200" 
                        alt="Leopard" 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    </div>

                    {/* Middle Top - Balloon */}
                    <div className="md:col-span-1 md:row-span-1 rounded-[32px] overflow-hidden group relative shadow-xl">
                      <img 
                        src="https://images.unsplash.com/photo-1534171472159-edb6d1e0b63c?auto=format&fit=crop&q=80&w=800" 
                        alt="Hot Air Balloon" 
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                      />
                    </div>

                    {/* Right Top - Spa */}
                    <div className="md:col-span-1 md:row-span-1 rounded-[32px] overflow-hidden group relative shadow-xl">
                      <img 
                        src="https://images.unsplash.com/photo-1544124499-58912cbddaad?auto=format&fit=crop&q=80&w=800" 
                        alt="Safari Spa" 
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                      />
                    </div>

                    {/* Middle Bottom - Elephant */}
                    <div className="md:col-span-1 md:row-span-1 rounded-[32px] overflow-hidden group relative shadow-xl">
                      <img 
                        src="https://images.unsplash.com/photo-1557050543-4d5f4e07ef46?auto=format&fit=crop&q=80&w=800" 
                        alt="Elephant" 
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                      />
                    </div>

                    {/* Right Bottom - Dinner */}
                    <div className="md:col-span-1 md:row-span-1 rounded-[32px] overflow-hidden group relative shadow-xl">
                      <img 
                        src="https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&q=80&w=800" 
                        alt="Bush Dinner" 
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                      />
                    </div>

                    {/* Bottom Wide - Tent Interior */}
                    <div className="md:col-span-2 md:row-span-1 rounded-[32px] overflow-hidden group relative shadow-2xl">
                      <img 
                        src="https://images.unsplash.com/photo-1493246507139-91e8fad9978e?auto=format&fit=crop&q=80&w=1200" 
                        alt="Tent Interior" 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        case 'Accommodation Standards':
          return (
            <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="prose prose-lg max-w-none">
                <h2 className="text-4xl font-bold text-obsidian mb-6">Redefining the Safari Suite</h2>
                <p className="text-xl text-obsidian/70 leading-relaxed font-light mb-12">
                  Our signature lodges set the global benchmark for remote luxury, blending sophisticated architectural design with the raw textures of the African landscape.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[
                    { title: 'Private plunge pools & decks', icon: <Wind size={20} /> },
                    { title: 'Indoor/outdoor showers', icon: <Cloud size={20} /> },
                    { title: 'Butler service', icon: <UserCheck size={20} /> },
                    { title: 'Spa & wellness in the bush', icon: <Heart size={20} /> },
                    { title: 'Architectural design integration', icon: <Layout size={20} /> }
                  ].map((item, i) => (
                    <div key={i} className="bg-white p-6 rounded-[32px] border border-cloud-grey/10 shadow-sm flex flex-col gap-4 hover:border-savanna-sun transition-colors group">
                      <div className="w-10 h-10 bg-wilderness-white rounded-xl flex items-center justify-center text-cloud-grey group-hover:bg-savanna-sun group-hover:text-obsidian transition-colors">
                        {item.icon}
                      </div>
                      <h3 className="font-bold text-obsidian leading-tight">{item.title}</h3>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );
        case 'Private Game Drives':
          return (
            <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="prose prose-lg max-w-none">
                <h2 className="text-4xl font-bold text-obsidian mb-6">Your Private Wilderness</h2>
                <p className="text-xl text-obsidian/70 leading-relaxed font-light mb-12">
                  Experience the bush on your terms. No shared vehicles, no fixed schedules—just you, your expert guide, and the untamed wild.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[
                    { title: 'Off-road driving in private concessions', icon: <Compass size={20} />, desc: 'Go where the wildlife is, unrestricted by public park roads.' },
                    { title: 'Night drives', icon: <Clock size={20} />, desc: 'Witness the thrill of the nocturnal hunt with high-powered spotlights.' },
                    { title: 'Walking safaris', icon: <Activity size={20} />, desc: 'Connect with the earth on foot, guided by expert trackers.' },
                    { title: 'Specialist tracking experiences', icon: <Search size={20} />, desc: 'Deep-dive into the art of tracking rare and elusive species.' }
                  ].map((item, i) => (
                    <div key={i} className="bg-white p-8 rounded-[32px] border border-cloud-grey/10 shadow-sm flex gap-6 group hover:border-savanna-sun transition-colors">
                      <div className="w-14 h-14 bg-wilderness-white rounded-2xl flex items-center justify-center text-cloud-grey group-hover:bg-savanna-sun group-hover:text-obsidian transition-colors shrink-0">
                        {item.icon}
                      </div>
                      <div>
                        <h3 className="font-bold text-obsidian mb-2">{item.title}</h3>
                        <p className="text-sm text-obsidian/60 leading-relaxed">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );
        case 'Dining & Wellness':
          return (
            <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="prose prose-lg max-w-none">
                <h2 className="text-4xl font-bold text-obsidian mb-6">Nourishment for the Soul</h2>
                <p className="text-xl text-obsidian/70 leading-relaxed font-light mb-12">
                  Gourmet dining in the heart of the bush and world-class spa treatments inspired by African traditions.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[
                    { title: 'Bush dinners under the stars', icon: <Utensils size={20} />, desc: 'Multi-course gourmet meals served in secluded, scenic wilderness locations.' },
                    { title: 'Private chefs & wine pairings', icon: <Sparkles size={20} />, desc: 'Personalized menus crafted by elite chefs, paired with the finest vintage wines.' },
                    { title: 'Farm-to-table sourcing', icon: <Leaf size={20} />, desc: 'Fresh, organic ingredients sourced from local communities and lodge gardens.' },
                    { title: 'Yoga decks & bush spa rituals', icon: <Heart size={20} />, desc: 'Holistic wellness treatments and yoga sessions overlooking the vast savannah.' }
                  ].map((item, i) => (
                    <div key={i} className="bg-white p-8 rounded-[32px] border border-cloud-grey/10 shadow-sm flex gap-6 group hover:border-savanna-sun transition-colors">
                      <div className="w-14 h-14 bg-wilderness-white rounded-2xl flex items-center justify-center text-cloud-grey group-hover:bg-savanna-sun group-hover:text-obsidian transition-colors shrink-0">
                        {item.icon}
                      </div>
                      <div>
                        <h3 className="font-bold text-obsidian mb-2">{item.title}</h3>
                        <p className="text-sm text-obsidian/60 leading-relaxed">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );
        case 'Seamless Logistics':
          return (
            <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="prose prose-lg max-w-none">
                <h2 className="text-4xl font-bold text-obsidian mb-6">Seamless Travel Logistics</h2>
                <p className="text-xl text-obsidian/70 leading-relaxed font-light mb-12">
                  We handle the complexities of African travel so you can focus on the journey. Our logistics team ensures every transition is smooth, private, and efficient.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[
                    { title: 'Helicopter transfers', icon: <Wind size={20} />, desc: 'Direct, scenic transfers to the most remote camps and lodges.' },
                    { title: 'Charter flights', icon: <Plane size={20} />, desc: 'Private light aircraft charters tailored to your specific itinerary.' },
                    { title: 'VIP airport handling', icon: <Shield size={20} />, desc: 'Fast-track immigration and personalized meet-and-greet services.' },
                    { title: 'Cross-border coordination', icon: <Globe size={20} />, desc: 'Expert management of multi-country permits and logistics.' }
                  ].map((item, i) => (
                    <div key={i} className="bg-white p-8 rounded-[32px] border border-cloud-grey/10 shadow-sm flex gap-6 group hover:border-savanna-sun transition-colors">
                      <div className="w-14 h-14 bg-wilderness-white rounded-2xl flex items-center justify-center text-cloud-grey group-hover:bg-savanna-sun group-hover:text-obsidian transition-colors shrink-0">
                        {item.icon}
                      </div>
                      <div>
                        <h3 className="font-bold text-obsidian mb-2">{item.title}</h3>
                        <p className="text-sm text-obsidian/60 leading-relaxed">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );
      }
    }

    if (activeCategory === 'Destinations') {
      switch (activeTab) {
        case 'Overview':
          return (
            <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="prose prose-lg max-w-none">
                <h2 className="text-4xl font-bold text-obsidian mb-6">Elite African Destinations</h2>
                <p className="text-xl text-obsidian/70 leading-relaxed font-light">
                  We curate experiences in the most exclusive corners of Africa. From private concessions in the Okavango Delta to secluded villas overlooking the Serengeti, our destinations are chosen for their privacy, wildlife density, and uncompromising beauty.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                  { name: 'Okavango Delta', country: 'Botswana', img: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&q=80&w=600' },
                  { name: 'Sabi Sands', country: 'South Africa', img: 'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&q=80&w=600' },
                  { name: 'Singita Grumeti', country: 'Tanzania', img: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&q=80&w=600' },
                ].map((dest, i) => (
                  <div key={i} className="group relative aspect-[3/4] rounded-[32px] overflow-hidden shadow-sm">
                    <img src={dest.img} alt={dest.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                    <div className="absolute bottom-6 left-6 right-6">
                      <p className="text-[10px] font-bold text-savanna-sun uppercase tracking-widest mb-1">{dest.country}</p>
                      <h4 className="text-2xl font-bold text-white">{dest.name}</h4>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
      }
    }

    if (activeCategory === 'Signature Lodges') {
      switch (activeTab) {
        case 'Overview':
          return (
            <div className="space-y-24 animate-in fade-in slide-in-from-bottom-4 duration-500">
              {/* Introduction */}
              <div className="max-w-3xl">
                <h2 className="text-5xl font-bold text-obsidian mb-6 tracking-tighter">The Jewellery Cabinet</h2>
                <p className="text-xl text-obsidian/70 leading-relaxed font-light">
                  Our Signature Lodges are more than just accommodation; they are the pinnacle of African hospitality. Each property is a masterpiece of design, offering an emotional connection to the wilderness that stays with you forever.
                </p>
              </div>

              {/* Ultra-Exclusive Icons */}
              <section className="space-y-12">
                <div className="flex items-center gap-4">
                  <div className="h-px bg-obsidian/10 flex-1" />
                  <h3 className="text-xs font-bold uppercase tracking-[0.3em] text-cloud-grey">Ultra-Exclusive Icons</h3>
                  <div className="h-px bg-obsidian/10 flex-1" />
                </div>
                <div className="grid grid-cols-1 gap-16">
                  {[
                    {
                      name: 'Singita Boulders Lodge',
                      location: 'Sabi Sand, South Africa',
                      img: 'https://images.unsplash.com/photo-1580041065738-e72023775cdc?auto=format&fit=crop&q=80&w=1200',
                      amenities: ['Private wine cellar', 'Heated plunge pool', 'Outdoor shower', 'Private butler'],
                      bestTime: 'May – September (Dry season)',
                      why: 'Unmatched wine collection and the highest density of leopard sightings in Africa.'
                    },
                    {
                      name: 'Mombo Camp',
                      location: 'Okavango Delta, Botswana',
                      img: 'https://images.unsplash.com/photo-1493246507139-91e8fad9978e?auto=format&fit=crop&q=80&w=1200',
                      amenities: ['Gym & Spa', 'Private library', 'Solar-powered luxury', 'Expert trackers'],
                      bestTime: 'June – August (Peak flood)',
                      why: 'Known as the "Place of Plenty," it offers the most consistent big game viewing in the Delta.'
                    },
                    {
                      name: 'Royal Malewane',
                      location: 'Greater Kruger, South Africa',
                      img: 'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&q=80&w=1200',
                      amenities: ['Award-winning spa', 'Private safari vehicle', 'Kosher kitchen', 'Art collection'],
                      bestTime: 'Year-round (Best May – Oct)',
                      why: 'The most qualified guiding team in Africa and old-world colonial elegance.'
                    }
                  ].map((lodge, i) => (
                    <div key={i} className="group grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                      <div className={`aspect-[16/10] rounded-[48px] overflow-hidden shadow-2xl ${i % 2 === 1 ? 'lg:order-2' : ''}`}>
                        <img src={lodge.img} alt={lodge.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" />
                      </div>
                      <div className="space-y-8">
                        <div>
                          <p className="text-savanna-sun font-bold text-xs uppercase tracking-widest mb-2">{lodge.location}</p>
                          <h4 className="text-4xl font-bold text-obsidian tracking-tight">{lodge.name}</h4>
                        </div>
                        <p className="text-obsidian/60 leading-relaxed font-light italic">"{lodge.why}"</p>
                        <div className="grid grid-cols-2 gap-4">
                          {lodge.amenities.map((amenity, j) => (
                            <div key={j} className="flex items-center gap-2 text-sm text-obsidian/80">
                              <CheckCircle2 size={16} className="text-acacia-green" />
                              {amenity}
                            </div>
                          ))}
                        </div>
                        <div className="pt-6 border-t border-obsidian/5 flex items-center justify-between">
                          <div>
                            <p className="text-[10px] font-bold text-cloud-grey uppercase tracking-widest">Best Time</p>
                            <p className="font-bold text-obsidian">{lodge.bestTime}</p>
                          </div>
                          <button className="bg-obsidian text-white px-8 py-4 rounded-full font-bold text-sm hover:bg-acacia-green transition-all shadow-lg">
                            Check Availability
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* Architectural Masterpieces */}
              <section className="space-y-12">
                <div className="flex items-center gap-4">
                  <div className="h-px bg-obsidian/10 flex-1" />
                  <h3 className="text-xs font-bold uppercase tracking-[0.3em] text-cloud-grey">Architectural Masterpieces</h3>
                  <div className="h-px bg-obsidian/10 flex-1" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {[
                    {
                      name: 'Bisate Reserve',
                      location: 'Rwanda',
                      img: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&q=80&w=600',
                      why: 'Spherical thatched pods inspired by the Royal Palace of Rwanda.'
                    },
                    {
                      name: 'Hoanib Skeleton Coast',
                      location: 'Namibia',
                      img: 'https://images.unsplash.com/photo-1523800503107-5bc3ba2a6f81?auto=format&fit=crop&q=80&w=600',
                      why: 'A futuristic desert camp blending seamlessly into the stark Namib landscape.'
                    },
                    {
                      name: 'Segera Retreat',
                      location: 'Laikipia, Kenya',
                      img: 'https://images.unsplash.com/photo-1549366021-9f761d450615?auto=format&fit=crop&q=80&w=600',
                      why: 'Elevated villas and the iconic "Nay Palad Bird Nest" sleep-out.'
                    }
                  ].map((lodge, i) => (
                    <div key={i} className="group bg-white rounded-[40px] overflow-hidden border border-cloud-grey/10 shadow-sm hover:shadow-xl transition-all duration-500">
                      <div className="aspect-[4/5] overflow-hidden">
                        <img src={lodge.img} alt={lodge.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
                      </div>
                      <div className="p-8">
                        <h4 className="text-xl font-bold mb-2">{lodge.name}</h4>
                        <p className="text-xs text-cloud-grey font-bold uppercase tracking-widest mb-4">{lodge.location}</p>
                        <p className="text-sm text-obsidian/60 leading-relaxed">{lodge.why}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* New & Noteworthy */}
              <section className="bg-obsidian text-white p-12 md:p-20 rounded-[64px] relative overflow-hidden">
                <div className="absolute top-0 right-0 w-96 h-96 bg-savanna-sun/10 rounded-full -mr-48 -mt-48 blur-3xl" />
                <div className="relative z-10 space-y-12">
                  <div className="max-w-2xl">
                    <h3 className="text-xs font-bold uppercase tracking-[0.3em] text-savanna-sun mb-4">New & Noteworthy (2025–2026)</h3>
                    <h2 className="text-4xl md:text-5xl font-bold tracking-tight">The Next Generation of Luxury</h2>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                    {[
                      { title: 'Wilderness Moklowane', desc: 'A revolutionary new opening in the Okavango Delta focusing on flood-plain ecology.' },
                      { title: 'Singita Milele', desc: 'The ultimate exclusive-use villa in the Grumeti, setting a new standard for private groups.' },
                      { title: 'Chichele Presidential', desc: 'Complete renovation of the historic Luangwa estate, blending heritage with modern flair.' }
                    ].map((item, i) => (
                      <div key={i} className="space-y-4">
                        <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center text-savanna-sun">
                          <Sparkles size={24} />
                        </div>
                        <h4 className="text-xl font-bold">{item.title}</h4>
                        <p className="text-white/50 text-sm leading-relaxed font-light">{item.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </section>

              {/* Price Guide */}
              <section className="bg-wilderness-white p-12 rounded-[48px] border border-obsidian/5">
                <div className="text-center mb-12">
                  <h3 className="text-3xl font-bold text-obsidian mb-2">Price Guide by Tier</h3>
                  <p className="text-obsidian/50 font-light">Investment per person, per night (All-inclusive)</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {[
                    { tier: 'Classic Luxury', price: '$1,200 – $1,800', desc: 'Exceptional service, private decks, and gourmet dining.' },
                    { tier: 'Elite Tier', price: '$1,800 – $3,000+', desc: 'The absolute pinnacle. Private vehicles and ultra-exclusive concessions.' },
                    { tier: 'Exclusive Use', price: 'Custom Quote', desc: 'Private villas and camps for families or small groups.' }
                  ].map((item, i) => (
                    <div key={i} className="bg-white p-8 rounded-[32px] shadow-sm text-center space-y-4">
                      <p className="text-[10px] font-bold text-cloud-grey uppercase tracking-widest">{item.tier}</p>
                      <p className="text-3xl font-bold text-obsidian">{item.price}</p>
                      <p className="text-xs text-obsidian/60 leading-relaxed">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </section>
            </div>
          );
      }
    }

    if (activeCategory === 'Tour Styles') {
      const renderTourList = (tours: any[]) => (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {tours.map((tour, i) => (
            <div key={i} className="group bg-white rounded-[32px] overflow-hidden border border-cloud-grey/10 shadow-sm hover:shadow-xl transition-all duration-500">
              <div className="aspect-[4/3] overflow-hidden relative">
                <img src={tour.img} alt={tour.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest text-obsidian">
                  {tour.duration}
                </div>
              </div>
              <div className="p-6 space-y-4">
                <div>
                  <p className="text-[10px] font-bold text-acacia-green uppercase tracking-widest mb-1">{tour.location}</p>
                  <h4 className="text-xl font-bold text-obsidian leading-tight">{tour.title}</h4>
                </div>
                <p className="text-sm text-obsidian/60 line-clamp-2 font-light">{tour.desc}</p>
                <div className="pt-4 border-t border-obsidian/5 flex items-center justify-between">
                  <div>
                    <p className="text-[10px] font-bold text-cloud-grey uppercase tracking-widest">Price from</p>
                    <p className="text-lg font-bold text-obsidian">{tour.price}</p>
                  </div>
                  <button className="w-10 h-10 rounded-full bg-obsidian text-white flex items-center justify-center hover:bg-savanna-sun hover:text-obsidian transition-colors">
                    <ArrowRight size={18} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      );

      switch (activeTab) {
        case 'Overview':
          return (
            <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="max-w-3xl">
                <h2 className="text-4xl font-bold text-obsidian mb-6 tracking-tighter">Curated Safari Styles</h2>
                <p className="text-xl text-obsidian/70 leading-relaxed font-light">
                  From the classic plains of the Serengeti to the misty mountains of Rwanda, discover our collection of signature safari styles designed for the discerning explorer.
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {[
                  { title: 'Classic Big Five', icon: <Compass size={24} />, desc: 'The quintessential African experience focusing on the legendary Big Five in prime concessions.' },
                  { title: 'Migration-focused', icon: <Activity size={24} />, desc: 'Follow the rhythm of the wild. Expertly timed expeditions to witness the Great Migration.' },
                  { title: 'Gorilla extensions', icon: <Leaf size={24} />, desc: 'Intimate encounters with mountain gorillas in the rainforests of Rwanda and Uganda.' },
                  { title: 'Photographic specialist', icon: <Camera size={24} />, desc: 'Vehicles optimized for photography with expert photographic guides and specialist hides.' },
                ].map((style, i) => (
                  <div key={i} className="bg-white p-8 rounded-[32px] border border-cloud-grey/10 shadow-sm flex gap-6 group hover:border-savanna-sun transition-colors cursor-pointer" onClick={() => setActiveTab(style.title)}>
                    <div className="w-16 h-16 bg-wilderness-white rounded-2xl flex items-center justify-center text-obsidian shrink-0 group-hover:bg-savanna-sun transition-colors">
                      {style.icon}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-2">{style.title}</h3>
                      <p className="text-sm text-obsidian/60 leading-relaxed">{style.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        case 'Classic Big Five':
          return renderTourList([
            { title: 'Sabi Sand Signature', location: 'South Africa', price: '$8,450', duration: '6 Days', img: 'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&q=80&w=800', desc: 'Ultra-luxury safari in the heart of the Sabi Sand, famous for leopard sightings.' },
            { title: 'Mara Private Concession', location: 'Kenya', price: '$7,200', duration: '5 Days', img: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&q=80&w=800', desc: 'Exclusive access to the Mara North Conservancy away from the crowds.' },
            { title: 'Serengeti Elite', location: 'Tanzania', price: '$9,100', duration: '7 Days', img: 'https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?auto=format&fit=crop&q=80&w=800', desc: 'A deep dive into the Serengeti plains with private vehicle and guide.' },
            { title: 'Kruger Icons', location: 'South Africa', price: '$6,800', duration: '5 Days', img: 'https://images.unsplash.com/photo-1549366021-9f761d450615?auto=format&fit=crop&q=80&w=800', desc: 'The best of the Greater Kruger area with stay at legendary lodges.' },
            { title: 'Zambezi Explorer', location: 'Zimbabwe', price: '$5,900', duration: '6 Days', img: 'https://images.unsplash.com/photo-1523800503107-5bc3ba2a6f81?auto=format&fit=crop&q=80&w=800', desc: 'Combine big game viewing with the majesty of Victoria Falls.' },
            { title: 'Phinda Private', location: 'South Africa', price: '$7,500', duration: '5 Days', img: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&q=80&w=800', desc: 'Explore seven distinct ecosystems in one private reserve.' }
          ]);
        case 'Migration-focused':
          return renderTourList([
            { title: 'Mara River Crossing', location: 'Kenya', price: '$10,200', duration: '7 Days', img: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&q=80&w=800', desc: 'Front-row seats to the dramatic river crossings of the Great Migration.' },
            { title: 'Serengeti Calving Season', location: 'Tanzania', price: '$8,900', duration: '6 Days', img: 'https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?auto=format&fit=crop&q=80&w=800', desc: 'Witness the birth of thousands of wildebeest in the southern plains.' },
            { title: 'Grumeti Exclusive', location: 'Tanzania', price: '$12,500', duration: '5 Days', img: 'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&q=80&w=800', desc: 'Private access to the migration route in the exclusive Grumeti Reserve.' },
            { title: 'Migration Sky Safari', location: 'East Africa', price: '$15,800', duration: '8 Days', img: 'https://images.unsplash.com/photo-1523800503107-5bc3ba2a6f81?auto=format&fit=crop&q=80&w=800', desc: 'Fly between the best migration spots in a private executive aircraft.' },
            { title: 'Mara Plains Mobile', location: 'Kenya', price: '$6,400', duration: '6 Days', img: 'https://images.unsplash.com/photo-1549366021-9f761d450615?auto=format&fit=crop&q=80&w=800', desc: 'A luxury mobile camp that follows the herds for ultimate proximity.' },
            { title: 'Western Corridor Trek', location: 'Tanzania', price: '$7,800', duration: '7 Days', img: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&q=80&w=800', desc: 'Track the migration as it moves through the Grumeti and Mbalageti rivers.' }
          ]);
        case 'Gorilla extensions':
          return renderTourList([
            { title: 'Volcanoes Luxury Trek', location: 'Rwanda', price: '$11,500', duration: '4 Days', img: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&q=80&w=800', desc: 'The ultimate gorilla trekking experience staying at Bisate or Singita Kwitonda.' },
            { title: 'Bwindi Forest Escape', location: 'Uganda', price: '$5,200', duration: '4 Days', img: 'https://images.unsplash.com/photo-1523800503107-5bc3ba2a6f81?auto=format&fit=crop&q=80&w=800', desc: 'Trek through the ancient Impenetrable Forest to find mountain gorillas.' },
            { title: 'Primate Odyssey', location: 'Rwanda', price: '$14,200', duration: '6 Days', img: 'https://images.unsplash.com/photo-1549366021-9f761d450615?auto=format&fit=crop&q=80&w=800', desc: 'Combine gorilla trekking with chimpanzee tracking in Nyungwe Forest.' },
            { title: 'Gorilla & Golden Monkey', location: 'Rwanda', price: '$8,900', duration: '5 Days', img: 'https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?auto=format&fit=crop&q=80&w=800', desc: 'A comprehensive primate experience in the Volcanoes National Park.' },
            { title: 'Bwindi & Queen Elizabeth', location: 'Uganda', price: '$6,400', duration: '7 Days', img: 'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&q=80&w=800', desc: 'Gorillas in the forest and tree-climbing lions on the savannah.' },
            { title: 'Luxury Gorilla Fly-in', location: 'Rwanda', price: '$12,800', duration: '3 Days', img: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&q=80&w=800', desc: 'Helicopter transfers from Kigali directly to your luxury mountain lodge.' }
          ]);
        case 'Multi-country combinations':
          return renderTourList([
            { title: 'The Grand East Africa', location: 'Kenya & Tanzania', price: '$18,500', duration: '12 Days', img: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&q=80&w=800', desc: 'The ultimate circuit covering the Mara, Serengeti, and Ngorongoro Crater.' },
            { title: 'Delta & Desert', location: 'Botswana & Namibia', price: '$14,200', duration: '10 Days', img: 'https://images.unsplash.com/photo-1523800503107-5bc3ba2a6f81?auto=format&fit=crop&q=80&w=800', desc: 'From the waterways of the Okavango to the dunes of Sossusvlei.' },
            { title: 'Cape, Kruger & Falls', location: 'SA & Zimbabwe', price: '$9,800', duration: '10 Days', img: 'https://images.unsplash.com/photo-1549366021-9f761d450615?auto=format&fit=crop&q=80&w=800', desc: 'The classic Southern Africa trio: Cape Town, Safari, and Victoria Falls.' },
            { title: 'Primate & Plains', location: 'Rwanda & Kenya', price: '$16,400', duration: '9 Days', img: 'https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?auto=format&fit=crop&q=80&w=800', desc: 'Gorilla trekking in Rwanda followed by a luxury safari in the Masai Mara.' },
            { title: 'Zambezi & Chobe', location: 'Zim & Botswana', price: '$7,500', duration: '8 Days', img: 'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&q=80&w=800', desc: 'A water-focused safari combining the Zambezi River and Chobe National Park.' },
            { title: 'East Africa & Zanzibar', location: 'TZ & Zanzibar', price: '$8,200', duration: '11 Days', img: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&q=80&w=800', desc: 'Classic Serengeti safari ending with white sands and spice markets.' }
          ]);
        case 'Honeymoon & anniversary':
          return renderTourList([
            { title: 'Romantic Mara Escape', location: 'Kenya', price: '$9,400', duration: '6 Days', img: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&q=80&w=800', desc: 'Private bush dinners, star-beds, and hot air balloon flights over the Mara.' },
            { title: 'Delta Dream', location: 'Botswana', price: '$12,800', duration: '7 Days', img: 'https://images.unsplash.com/photo-1523800503107-5bc3ba2a6f81?auto=format&fit=crop&q=80&w=800', desc: 'Secluded island camps and private mokoro excursions for two.' },
            { title: 'Laikipia Love', location: 'Kenya', price: '$11,200', duration: '6 Days', img: 'https://images.unsplash.com/photo-1549366021-9f761d450615?auto=format&fit=crop&q=80&w=800', desc: 'Stay at the iconic Segera Retreat with a night in the Nay Palad Bird Nest.' },
            { title: 'Sabi Sand Romance', location: 'South Africa', price: '$10,500', duration: '5 Days', img: 'https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?auto=format&fit=crop&q=80&w=800', desc: 'Ultra-luxury suites with private plunge pools and candlelit bush dinners.' },
            { title: 'Benguerra Island Bliss', location: 'Mozambique', price: '$8,900', duration: '6 Days', img: 'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&q=80&w=800', desc: 'The perfect post-safari retreat on a private tropical island.' },
            { title: 'Serengeti Sunset', location: 'Tanzania', price: '$9,800', duration: '6 Days', img: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&q=80&w=800', desc: 'Exclusive mobile camps and private sundowners on the endless plains.' }
          ]);
        case 'Photographic specialist safaris':
          return renderTourList([
            { title: 'Mashatu Photo Workshop', location: 'Botswana', price: '$6,800', duration: '6 Days', img: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&q=80&w=800', desc: 'Specialist underground hides and custom photo vehicles with pro tutors.' },
            { title: 'Mara Eye-Level', location: 'Kenya', price: '$8,500', duration: '7 Days', img: 'https://images.unsplash.com/photo-1523800503107-5bc3ba2a6f81?auto=format&fit=crop&q=80&w=800', desc: 'Low-angle photography specialist vehicles in the heart of the Mara.' },
            { title: 'Zim Predator Focus', location: 'Zimbabwe', price: '$7,200', duration: '6 Days', img: 'https://images.unsplash.com/photo-1549366021-9f761d450615?auto=format&fit=crop&q=80&w=800', desc: 'Track lions and wild dogs with expert wildlife photographers.' },
            { title: 'Okavango Light', location: 'Botswana', price: '$11,400', duration: '7 Days', img: 'https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?auto=format&fit=crop&q=80&w=800', desc: 'Capture the magic of the Delta with private boat and vehicle charters.' },
            { title: 'Serengeti Wide Angle', location: 'Tanzania', price: '$9,200', duration: '7 Days', img: 'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&q=80&w=800', desc: 'Landscape and wildlife photography in the worlds most iconic park.' },
            { title: 'Kruger Macro & More', location: 'South Africa', price: '$7,800', duration: '6 Days', img: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&q=80&w=800', desc: 'From tiny insects to the Big Five, a complete photographic masterclass.' }
          ]);
      }
    }

    if (activeCategory === 'Bespoke Itineraries') {
      switch (activeTab) {
        case 'Overview':
          return (
            <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="bg-acacia-green/5 p-10 rounded-[40px] border border-acacia-green/10">
                <h3 className="text-2xl font-bold mb-6">Tailored to Your Rhythm</h3>
                <p className="text-obsidian/70 leading-relaxed mb-8 font-light">
                  No two journeys are the same. Our specialists design itineraries that reflect your interests, whether it's a focus on rare predators, cultural immersion, or pure relaxation in the wild.
                </p>
                <div className="space-y-4">
                  {[
                    'Private Bush Breakfasts',
                    'Helicopter Transfers',
                    'Exclusive Use of Camps',
                    'Specialist Expert Guides'
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-3 text-sm font-bold text-obsidian">
                      <div className="w-2 h-2 bg-savanna-sun rounded-full" />
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );
      }
    }

    if (activeCategory === 'Pricing') {
      switch (activeTab) {
        case 'Overview':
          return (
            <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="bg-obsidian text-white p-12 rounded-[48px] relative overflow-hidden">
                <h3 className="text-3xl font-bold mb-8">Investment in Excellence</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div className="p-6 border border-white/10 rounded-3xl">
                    <p className="text-savanna-sun font-bold uppercase text-[10px] tracking-widest mb-4">Classic Luxury</p>
                    <p className="text-4xl font-bold mb-2">$1,200+</p>
                    <p className="text-white/50 text-xs">Per person / night</p>
                  </div>
                  <div className="p-6 border border-savanna-sun rounded-3xl bg-savanna-sun/5">
                    <p className="text-savanna-sun font-bold uppercase text-[10px] tracking-widest mb-4">Signature Elite</p>
                    <p className="text-4xl font-bold mb-2">$2,500+</p>
                    <p className="text-white/50 text-xs">Per person / night</p>
                  </div>
                  <div className="p-6 border border-white/10 rounded-3xl">
                    <p className="text-savanna-sun font-bold uppercase text-[10px] tracking-widest mb-4">Private Villa</p>
                    <p className="text-4xl font-bold mb-2">$8,000+</p>
                    <p className="text-white/50 text-xs">Per night (Exclusive use)</p>
                  </div>
                </div>
              </div>
            </div>
          );
      }
    }

    if (activeCategory === 'Responsible Luxury') {
      switch (activeTab) {
        case 'Overview':
          return (
            <div className="space-y-16 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="max-w-3xl">
                <h2 className="text-5xl font-bold text-obsidian mb-6 tracking-tighter">Status Through Stewardship</h2>
                <p className="text-xl text-obsidian/70 leading-relaxed font-light">
                  For the modern luxury traveller, the ultimate status symbol is no longer just the destination, but the positive impact their journey leaves behind. We partner with operators who prove that high-end tourism is the most powerful tool for conservation.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {[
                  {
                    title: "Conservation Partnerships",
                    desc: "Direct funding for land protection and species recovery programs.",
                    icon: <Leaf className="text-acacia-green" size={32} />,
                    stat: "1.2M+ Hectares Protected"
                  },
                  {
                    title: "Community Investment",
                    desc: "Models that ensure local communities are primary stakeholders in tourism.",
                    icon: <Users className="text-savanna-sun" size={32} />,
                    stat: "450+ Local Jobs Created"
                  },
                  {
                    title: "Anti-Poaching Initiatives",
                    desc: "Advanced technology and K9 units funded by guest conservation fees.",
                    icon: <Shield className="text-obsidian" size={32} />,
                    stat: "Zero Incidents in 24 Months"
                  },
                  {
                    title: "Carbon-Conscious Travel",
                    desc: "Solar-powered camps and carbon-offset flight programs.",
                    icon: <Wind className="text-cloud-grey" size={32} />,
                    stat: "100% Solar Powered Camps"
                  }
                ].map((item, i) => (
                  <div key={i} className="bg-white p-10 rounded-[40px] border border-cloud-grey/10 shadow-sm hover:shadow-xl transition-all duration-500">
                    <div className="mb-6">{item.icon}</div>
                    <h3 className="text-2xl font-bold mb-3">{item.title}</h3>
                    <p className="text-obsidian/60 font-light leading-relaxed mb-6">{item.desc}</p>
                    <div className="pt-6 border-t border-obsidian/5">
                      <p className="text-[10px] font-bold text-cloud-grey uppercase tracking-widest mb-1">Impact Metric</p>
                      <p className="text-xl font-bold text-acacia-green">{item.stat}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-obsidian text-white p-12 md:p-20 rounded-[64px] relative overflow-hidden">
                <div className="absolute inset-0 opacity-20">
                  <img src="https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&q=80&w=1200" alt="Conservation" className="w-full h-full object-cover" />
                </div>
                <div className="relative z-10 max-w-2xl">
                  <h3 className="text-xs font-bold uppercase tracking-[0.3em] text-savanna-sun mb-4">Conservation Success Story</h3>
                  <h2 className="text-4xl font-bold mb-6 tracking-tight">The Return of the Black Rhino</h2>
                  <p className="text-lg text-white/70 leading-relaxed font-light mb-8">
                    Through the partnership between Singita and the Grumeti Fund, the black rhino has been successfully reintroduced to the Serengeti ecosystem. This multi-million dollar project was funded entirely by luxury tourism revenue.
                  </p>
                  <button className="bg-white text-obsidian px-8 py-4 rounded-full font-bold text-sm hover:bg-savanna-sun transition-all">
                    Read the Full Impact Report
                  </button>
                </div>
              </div>
            </div>
          );
        case 'Conservation Partnerships':
          return (
            <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <h2 className="text-3xl font-bold">Land & Species Protection</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-white p-8 rounded-[32px] border border-cloud-grey/10">
                  <h3 className="text-xl font-bold mb-4">Grumeti Fund Partnership</h3>
                  <p className="text-obsidian/60 font-light leading-relaxed">
                    Working alongside Singita to manage 350,000 acres of the Serengeti ecosystem, focusing on anti-poaching and community outreach.
                  </p>
                </div>
                <div className="bg-white p-8 rounded-[32px] border border-cloud-grey/10">
                  <h3 className="text-xl font-bold mb-4">Wilderness Trust</h3>
                  <p className="text-obsidian/60 font-light leading-relaxed">
                    A non-profit organization that supports a wide range of conservation and community projects across Africa.
                  </p>
                </div>
              </div>
            </div>
          );
        case 'Community Investment':
          return (
            <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <h2 className="text-3xl font-bold">Empowering Local Stakeholders</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-white p-8 rounded-[32px] border border-cloud-grey/10">
                  <h3 className="text-xl font-bold mb-4">Education & Scholarships</h3>
                  <p className="text-obsidian/60 font-light leading-relaxed">
                    Funding for local schools and university scholarships for promising students in conservation-adjacent communities.
                  </p>
                </div>
                <div className="bg-white p-8 rounded-[32px] border border-cloud-grey/10">
                  <h3 className="text-xl font-bold mb-4">Small Business Support</h3>
                  <p className="text-obsidian/60 font-light leading-relaxed">
                    Micro-finance and training for local entrepreneurs to supply lodges with farm-to-table produce and artisanal crafts.
                  </p>
                </div>
              </div>
            </div>
          );
        case 'Anti-poaching':
          return (
            <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <h2 className="text-3xl font-bold">Frontline Protection</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-white p-8 rounded-[32px] border border-cloud-grey/10">
                  <h3 className="text-xl font-bold mb-4">K9 Units</h3>
                  <p className="text-obsidian/60 font-light leading-relaxed">
                    Specialized tracking dogs that can detect ivory, rhino horn, and ammunition, providing a powerful deterrent to poachers.
                  </p>
                </div>
                <div className="bg-white p-8 rounded-[32px] border border-cloud-grey/10">
                  <h3 className="text-xl font-bold mb-4">Smart Park Technology</h3>
                  <p className="text-obsidian/60 font-light leading-relaxed">
                    Using LoRaWAN networks and satellite tracking to monitor wildlife and ranger movements in real-time.
                  </p>
                </div>
              </div>
            </div>
          );
        case 'Carbon-conscious Travel':
          return (
            <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <h2 className="text-3xl font-bold">Sustainable Logistics</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-white p-8 rounded-[32px] border border-cloud-grey/10">
                  <h3 className="text-xl font-bold mb-4">Solar-Powered Camps</h3>
                  <p className="text-obsidian/60 font-light leading-relaxed">
                    Transitioning remote camps to 100% renewable energy, significantly reducing the reliance on diesel generators.
                  </p>
                </div>
                <div className="bg-white p-8 rounded-[32px] border border-cloud-grey/10">
                  <h3 className="text-xl font-bold mb-4">Carbon Offsetting</h3>
                  <p className="text-obsidian/60 font-light leading-relaxed">
                    Integrated carbon offset programs for all internal flights and vehicle movements, verified by international standards.
                  </p>
                </div>
              </div>
            </div>
          );
      }
    }

    if (activeCategory === 'Seasons & Planning') {
      switch (activeTab) {
        case 'Overview':
          return (
            <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="max-w-3xl">
                <h2 className="text-4xl font-bold text-obsidian mb-6 tracking-tighter">Prepare for Your Journey</h2>
                <p className="text-xl text-obsidian/70 leading-relaxed font-light">
                  A luxury safari requires thoughtful preparation. From choosing the right season to packing the perfect gear, we ensure you're ready for the adventure of a lifetime.
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-white p-8 rounded-[32px] border border-cloud-grey/10 shadow-sm hover:border-savanna-sun transition-colors cursor-pointer" onClick={() => setActiveTab('Best Time')}>
                  <Calendar className="text-acacia-green mb-4" size={32} />
                  <h3 className="text-xl font-bold mb-2">Best Time to Visit</h3>
                  <p className="text-sm text-obsidian/60 leading-relaxed">Understand the seasonal rhythms of Africa to time your safari perfectly.</p>
                </div>
                <div className="bg-white p-8 rounded-[32px] border border-cloud-grey/10 shadow-sm hover:border-savanna-sun transition-colors cursor-pointer" onClick={() => setActiveTab('Packing List')}>
                  <Tent className="text-savanna-sun mb-4" size={32} />
                  <h3 className="text-xl font-bold mb-2">Luxury Packing Guide</h3>
                  <p className="text-sm text-obsidian/60 leading-relaxed">The essentials for a comfortable and stylish journey through the wild.</p>
                </div>
              </div>
            </div>
          );
        case 'Packing List':
          return (
            <div className="space-y-16 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="max-w-3xl">
                <h2 className="text-4xl font-bold text-obsidian mb-4 tracking-tighter">What to Pack</h2>
                <p className="text-lg text-obsidian/60 font-light leading-relaxed">
                  The luxury safari packing guide — what your camp provides, what to bring, and the essentials that seasoned travellers swear by.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                {/* Clothing */}
                <div className="space-y-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-acacia-green/10 rounded-xl flex items-center justify-center text-acacia-green">
                      <Leaf size={20} />
                    </div>
                    <h3 className="text-2xl font-bold">Clothing</h3>
                  </div>
                  <ul className="space-y-4">
                    {[
                      'Neutral-toned layers (khaki, olive, beige — avoid bright colours)',
                      'Lightweight long-sleeved shirts & trousers (sun & insect protection)',
                      'Warm fleece or softshell jacket (early morning drives are cold)',
                      'Comfortable walking shoes & sandals',
                      'Wide-brimmed sun hat & buff/scarf',
                      'Smart casual dinner attire (some lodges have dress codes)'
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm text-obsidian/70 font-light">
                        <div className="w-1.5 h-1.5 bg-savanna-sun rounded-full mt-1.5 shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Photography & Gear */}
                <div className="space-y-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-obsidian/5 rounded-xl flex items-center justify-center text-obsidian">
                      <Camera size={20} />
                    </div>
                    <h3 className="text-2xl font-bold">Photography & Gear</h3>
                  </div>
                  <ul className="space-y-4">
                    {[
                      'DSLR or mirrorless camera with telephoto lens (200–600mm ideal)',
                      'High-quality binoculars (8×42 or 10×42)',
                      'Extra batteries & memory cards (charging may be solar-limited)',
                      'Beanbag or mini tripod for vehicle-based photography',
                      'Dust-proof camera bag',
                      'Smartphone with offline maps & star-gazing apps'
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm text-obsidian/70 font-light">
                        <div className="w-1.5 h-1.5 bg-savanna-sun rounded-full mt-1.5 shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Health & Essentials */}
                <div className="space-y-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-savanna-sun/20 rounded-xl flex items-center justify-center text-obsidian">
                      <Shield size={20} />
                    </div>
                    <h3 className="text-2xl font-bold">Health & Essentials</h3>
                  </div>
                  <ul className="space-y-4">
                    {[
                      'Prescribed malaria prophylaxis (consult your doctor 6 weeks prior)',
                      'SPF 50+ sunscreen & insect repellent (DEET-based)',
                      'Basic first aid kit & personal medications',
                      'Yellow fever vaccination certificate (required for some countries)',
                      'Hand sanitiser & wet wipes',
                      'Rehydration sachets & stomach settlers'
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm text-obsidian/70 font-light">
                        <div className="w-1.5 h-1.5 bg-savanna-sun rounded-full mt-1.5 shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Luxury Packing Tips */}
                <div className="space-y-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-acacia-green/10 rounded-xl flex items-center justify-center text-acacia-green">
                      <Sparkles size={20} />
                    </div>
                    <h3 className="text-2xl font-bold">Luxury Packing Tips</h3>
                  </div>
                  <ul className="space-y-4">
                    {[
                      'Most luxury camps provide toiletries, robes & slippers — pack light',
                      'Soft-sided bags only (charter flights have strict weight limits: 15–20kg)',
                      'Laundry is typically same-day and complimentary',
                      'Pack a lightweight daypack for walking safaris',
                      'Bring a Kindle or journal — downtime between drives is precious',
                      'A good pair of socks makes more difference than you\'d think'
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm text-obsidian/70 font-light">
                        <div className="w-1.5 h-1.5 bg-acacia-green rounded-full mt-1.5 shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          );
      }
    }

    return <div className="py-20 text-center text-cloud-grey">Content for {activeCategory} - {activeTab} coming soon...</div>;
  };

  return (
    <div className="min-h-screen bg-wilderness-white font-sans">
      
      {/* Hero Section */}
      <section className="relative h-[75vh] min-h-[600px] flex items-center overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1580041065738-e72023775cdc?auto=format&fit=crop&q=80&w=1920" 
          alt="Luxury Safari Hero" 
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
        
        <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-savanna-sun text-obsidian text-xs font-bold uppercase tracking-widest mb-8 animate-in slide-in-from-left-4 duration-500">
              <Gem size={14} />
              <span>Uncompromising Excellence</span>
            </div>
            <h1 className="text-6xl md:text-8xl font-bold text-white tracking-tighter mb-6 animate-in slide-in-from-left-4 duration-700 delay-100">
              Luxury Safaris<span className="text-savanna-sun">.</span>
            </h1>
            <p className="text-xl md:text-2xl text-white/80 font-light leading-relaxed mb-10 animate-in slide-in-from-left-4 duration-700 delay-200">
              Experience the wild without sacrificing comfort. Private plunge pools, gourmet dining, and exclusive game drives define our curated expeditions.
            </p>
            
            <div className="flex flex-wrap gap-4 animate-in slide-in-from-left-4 duration-700 delay-300">
              <button className="bg-white text-obsidian px-10 py-5 rounded-full font-bold text-sm hover:bg-savanna-sun transition-all shadow-xl">
                Consult an Expert
              </button>
              <button className="bg-white/10 backdrop-blur-md border border-white/20 text-white px-10 py-5 rounded-full font-bold text-sm hover:bg-white/20 transition-all flex items-center gap-2">
                The Collection <ChevronRight size={18} />
              </button>
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
                <p className="text-[10px] font-bold text-cloud-grey uppercase tracking-widest mb-4 px-4">Luxury Collection</p>
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

              {/* CTA */}
              <div className="bg-obsidian text-white p-8 rounded-[32px] shadow-lg relative overflow-hidden">
                <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-savanna-sun/10 rounded-full" />
                <h4 className="text-xl font-bold mb-4 relative z-10">Bespoke Planning</h4>
                <p className="text-xs text-white/70 mb-6 relative z-10">Our specialists are ready to design your dream safari.</p>
                <button className="w-full bg-savanna-sun text-obsidian py-3 rounded-xl font-bold text-xs uppercase tracking-widest">Inquire Now</button>
              </div>
            </div>
          </aside>

          {/* Main Content Column */}
          <div className="flex-1 min-w-0">
            
            {/* Horizontal Tabs */}
            <div className="mb-12 overflow-x-auto pb-4 scrollbar-hide">
              <div className="bg-white p-1.5 rounded-full inline-flex gap-1 shadow-sm border border-cloud-grey/10 whitespace-nowrap">
                {categoryTabs[activeCategory].map((tab) => (
                  <button 
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-6 py-3 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all ${activeTab === tab ? 'bg-obsidian text-white shadow-lg' : 'text-obsidian/40 hover:bg-wilderness-white'}`}
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

      {/* Footer */}
      <footer className="bg-obsidian text-white py-20 mt-32">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-12 mb-20">
             <div className="flex items-center gap-2">
                <div className="relative w-10 h-10 bg-savanna-sun rounded-full flex items-center justify-center">
                  <div className="w-2 h-2 bg-black rounded-full absolute top-2 left-3" />
                  <div className="w-2 h-2 bg-black rounded-full" />
                </div>
                <span className="text-2xl font-bold text-white">Savanna</span>
              </div>
              <div className="flex gap-12">
                 <div className="text-center">
                    <p className="text-4xl font-bold text-white mb-1">15+</p>
                    <p className="text-[10px] font-bold uppercase text-white/40 tracking-widest">Years Experience</p>
                 </div>
                 <div className="text-center">
                    <p className="text-4xl font-bold text-white mb-1">12k</p>
                    <p className="text-[10px] font-bold uppercase text-white/40 tracking-widest">Happy Travelers</p>
                 </div>
                 <div className="text-center">
                    <p className="text-4xl font-bold text-white mb-1">100%</p>
                    <p className="text-[10px] font-bold uppercase text-white/40 tracking-widest">Carbon Offset</p>
                 </div>
              </div>
          </div>
          <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6">
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

export default LuxurySafariPage;
