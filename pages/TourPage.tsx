
import React, { useState, useEffect } from 'react';
import { 
  MapPin, Share2, Clock, Users, Truck, Tent, 
  Check, X, Star, Calendar, Shield, Info, Plane, 
  ArrowRight, MessageSquare, ShieldCheck, Utensils,
  ChevronLeft, ChevronRight, Minus, Plus, Mail, Phone, User, ArrowLeftRight
} from 'lucide-react';
import SaveTourButton from '../components/SaveTourButton';
import { useCompare } from '../lib/CompareContext';

interface TourPageProps {
  id: string;
  slug: string;
}

const TourPage: React.FC<TourPageProps> = ({ id, slug }) => {
  const [activeTab, setActiveTab] = useState('Overview');
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const { compareList, addToCompare, removeFromCompare, isInCompare } = useCompare();
  const isCompared = isInCompare(id);

  // Booking State
  const [bookingStep, setBookingStep] = useState<'selection' | 'details' | 'success'>('selection');
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [childAges, setChildAges] = useState<string[]>([]); // Array to store ages
  const [startDate, setStartDate] = useState('');
  const [contactForm, setContactForm] = useState({
    fullName: '',
    email: '',
    phone: '',
    message: ''
  });

  const basePrice = 650;
  const totalPrice = (adults + children) * basePrice;

  const handleChildCountChange = (increment: boolean) => {
    if (increment) {
      setChildren(prev => prev + 1);
      setChildAges(prev => [...prev, '10']); // Default age 10
    } else {
      if (children > 0) {
        setChildren(prev => prev - 1);
        setChildAges(prev => prev.slice(0, -1)); // Remove last age
      }
    }
  };

  const handleChildAgeChange = (index: number, age: string) => {
    const newAges = [...childAges];
    newAges[index] = age;
    setChildAges(newAges);
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate API call
    setTimeout(() => {
        setBookingStep('success');
    }, 1000);
  };

  // Gallery Images Data
  const galleryImages = [
    "https://s3.amazonaws.com/cdn.micato.com/wp-content/uploads/2018/09/07215724/Arusha-1-1110x700.jpg",
    "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&q=80&w=1200",
    "https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&q=80&w=1200",
    "https://images.unsplash.com/photo-1534759863358-796a7a0f49c6?auto=format&fit=crop&q=80&w=1200", 
    "https://images.unsplash.com/photo-1511497584788-876760111969?auto=format&fit=crop&q=80&w=1200"
  ];

  const navigateGallery = (direction: 'prev' | 'next') => {
    if (direction === 'prev') {
      setCurrentImageIndex(prev => prev === 0 ? galleryImages.length - 1 : prev - 1);
    } else {
      setCurrentImageIndex(prev => prev === galleryImages.length - 1 ? 0 : prev + 1);
    }
  };

  // Specific Data for Suricata Safaris Tour
  const tourData = {
    title: "3-Day Group Tour to the Parks Close to Arusha",
    operator: {
      name: "Suricata Safaris",
      rating: 5.0,
      reviews: 3122,
      badge: "Premier Partner",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200"
    },
    price: "$650",
    features: [
      { label: "Budget Camping", icon: <Tent size={18} />, desc: "Public campsites with basic facilities" },
      { label: "Shared Tour", icon: <Users size={18} />, desc: "Max 7 people per vehicle" },
      { label: "Pop-up Roof 4x4", icon: <Truck size={18} />, desc: "360° game viewing visibility" },
      { label: "Start Any Day", icon: <Calendar size={18} />, desc: "Subject to availability" },
      { label: "All Ages", icon: <MessageSquare size={18} />, desc: "Suitable for children" },
      { label: "Airport Transfer", icon: <Plane size={18} />, desc: "Roundtrip included" }
    ],
    itinerary: [
      {
        day: 1,
        title: "Lake Manyara National Park",
        desc: "Depart for Lake Manyara. Famous for tree-climbing lions and vast baboon troops. Explore acacia woodlands and the alkaline lake.",
        accommodation: "Budget Camping (Just outside Lake Manyara)",
        meals: "Lunch & Dinner",
        wildlife: ["Elephant", "Giraffe", "Buffalo", "Lion"]
      },
      {
        day: 2,
        title: "Ngorongoro Crater",
        desc: "Descend 600m into the crater. Home to the Big 5 including the Black Rhino. Visit Lake Magadi for flamingos.",
        accommodation: "Budget Camping (Just outside Ngorongoro)",
        meals: "Breakfast, Lunch, Dinner",
        wildlife: ["Black Rhino", "Lion", "Hyena", "Wildebeest"]
      },
      {
        day: 3,
        title: "Tarangire National Park",
        desc: "Known for huge elephant herds and baobab trees. Forms the center of an annual migratory cycle. Drive back to Arusha.",
        accommodation: "End of Tour (No accommodation)",
        meals: "Breakfast, Lunch",
        wildlife: ["Elephant", "Zebra", "Baobab Trees"]
      }
    ],
    included: [
      "Park fees (Non-residents)",
      "All activities (Unless optional)",
      "Camping equipment & Sleeping bag",
      "Professional driver/guide",
      "4x4 Pop-up roof vehicle",
      "All Taxes/VAT",
      "Roundtrip airport transfer",
      "All Meals & Drinking water"
    ],
    excluded: [
      "International flights",
      "Pre/Post tour accommodation",
      "Bath towels",
      "Tips ($20/day guideline)",
      "Personal items (Visas, Insurance)"
    ]
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'Overview':
        return (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
             {/* Quick Stats Row */}
             <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { label: "Duration", value: "3 Days", icon: <Clock size={16} /> },
                  { label: "Group Size", value: "Max 7", icon: <Users size={16} /> },
                  { label: "Vehicle", value: "4x4 Jeep", icon: <Truck size={16} /> },
                  { label: "Style", value: "Camping", icon: <Tent size={16} /> },
                ].map((stat, i) => (
                  <div key={i} className="bg-white p-4 rounded-2xl border border-cloud-grey/10 flex flex-col items-center text-center shadow-sm">
                    <div className="p-2 bg-wilderness-white rounded-full mb-2 text-obsidian">{stat.icon}</div>
                    <span className="text-xs text-cloud-grey uppercase font-bold tracking-widest">{stat.label}</span>
                    <span className="font-bold text-obsidian">{stat.value}</span>
                  </div>
                ))}
             </div>

             {/* Operator Card (Style Guide Widget) */}
             <div className="bg-white p-6 md:p-8 rounded-[32px] border border-cloud-grey/10 shadow-lg flex flex-col md:flex-row items-center gap-6 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-acacia-green/5 rounded-full -mr-16 -mt-16" />
                <div className="w-20 h-20 rounded-2xl bg-black overflow-hidden border-4 border-wilderness-white shadow-md shrink-0">
                  <img src={tourData.operator.avatar} alt="Operator" className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 text-center md:text-left">
                  <div className="flex items-center justify-center md:justify-start gap-2 mb-1">
                    <h3 className="text-2xl font-bold">{tourData.operator.name}</h3>
                    <ShieldCheck size={18} className="text-acacia-green" />
                  </div>
                  <div className="flex items-center justify-center md:justify-start gap-4 text-sm">
                    <span className="flex items-center gap-1 font-bold"><Star size={14} className="fill-savanna-sun text-savanna-sun" /> {tourData.operator.rating}</span>
                    <span className="text-cloud-grey">({tourData.operator.reviews} verified reviews)</span>
                  </div>
                </div>
                <button className="bg-obsidian text-white px-6 py-3 rounded-full font-bold text-sm hover:bg-acacia-green transition-colors shadow-lg">
                  View Profile
                </button>
             </div>

             {/* Tour Features Grid */}
             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {tourData.features.map((feature, i) => (
                  <div key={i} className="flex items-start gap-4 p-5 rounded-[24px] bg-white border border-cloud-grey/10 hover:border-obsidian/10 transition-colors">
                    <div className="p-3 bg-savanna-sun/20 rounded-xl text-obsidian shrink-0">
                      {feature.icon}
                    </div>
                    <div>
                      <h4 className="font-bold text-obsidian">{feature.label}</h4>
                      <p className="text-sm text-obsidian/60 leading-relaxed">{feature.desc}</p>
                    </div>
                  </div>
                ))}
             </div>

             {/* About Text */}
             <div className="bg-white p-8 rounded-[32px] border border-cloud-grey/10 leading-relaxed text-obsidian/80">
               <h3 className="font-bold text-xl mb-4 text-obsidian">About this tour</h3>
               <p className="mb-4">
                 Join this budget-friendly camping safari to explore the Northern Circuit's highlights. 
                 From the tree-climbing lions of Lake Manyara to the density of wildlife in the Ngorongoro Crater 
                 and the elephant herds of Tarangire, this short tour packs in the best of Tanzania.
               </p>
               <div className="flex gap-2">
                 <span className="px-3 py-1 bg-wilderness-white rounded-lg text-xs font-bold text-cloud-grey uppercase">English Guide</span>
                 <span className="px-3 py-1 bg-wilderness-white rounded-lg text-xs font-bold text-cloud-grey uppercase">Family Friendly</span>
               </div>
             </div>
          </div>
        );
      
      case 'Itinerary':
        return (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
             {tourData.itinerary.map((day) => (
               <div key={day.day} className="bg-white rounded-[40px] border border-cloud-grey/10 overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300">
                 <div className="flex flex-col md:flex-row">
                    {/* Day Marker */}
                    <div className="bg-savanna-sun p-6 flex flex-col items-center justify-center min-w-[100px] text-center">
                       <span className="text-xs font-bold uppercase tracking-widest text-obsidian/60">Day</span>
                       <span className="text-4xl font-bold text-obsidian">{day.day}</span>
                    </div>
                    
                    {/* Content */}
                    <div className="p-8 flex-1">
                       <div className="flex justify-between items-start mb-4">
                          <h3 className="text-2xl font-bold">{day.title}</h3>
                       </div>
                       <p className="text-obsidian/70 leading-relaxed mb-6 font-light">{day.desc}</p>
                       
                       {/* Meta Details */}
                       <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                          <div className="flex items-center gap-3 p-3 bg-wilderness-white rounded-xl">
                             <Tent size={16} className="text-acacia-green" />
                             <div className="text-xs">
                                <span className="font-bold block text-obsidian">Accommodation</span>
                                <span className="text-cloud-grey">{day.accommodation}</span>
                             </div>
                          </div>
                          <div className="flex items-center gap-3 p-3 bg-wilderness-white rounded-xl">
                             <Utensils size={16} className="text-acacia-green" />
                             <div className="text-xs">
                                <span className="font-bold block text-obsidian">Meals</span>
                                <span className="text-cloud-grey">{day.meals}</span>
                             </div>
                          </div>
                       </div>

                       {/* Wildlife Badges */}
                       <div>
                         <p className="text-[10px] font-bold uppercase tracking-widest text-cloud-grey mb-2">Wildlife to spot</p>
                         <div className="flex flex-wrap gap-2">
                            {day.wildlife.map(animal => (
                              <span key={animal} className="px-3 py-1 rounded-full border border-cloud-grey/20 text-xs font-medium hover:bg-obsidian hover:text-white transition-colors cursor-default">
                                {animal}
                              </span>
                            ))}
                         </div>
                       </div>
                    </div>
                 </div>
               </div>
             ))}
          </div>
        );

      case 'Logistics':
        return (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Inclusions Card */}
            <div className="bg-white p-8 rounded-[32px] border border-cloud-grey/10 shadow-sm">
              <h3 className="text-2xl font-bold mb-6">Included in Price</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {tourData.included.map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-acacia-green/10 flex items-center justify-center shrink-0">
                      <Check size={14} className="text-acacia-green" strokeWidth={3} />
                    </div>
                    <span className="text-sm font-medium text-obsidian/80">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Exclusions Card */}
            <div className="bg-wilderness-white p-8 rounded-[32px] border border-cloud-grey/10">
              <h3 className="text-2xl font-bold mb-6 text-obsidian/60">Not Included</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {tourData.excluded.map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-cloud-grey/20 flex items-center justify-center shrink-0">
                      <X size={14} className="text-cloud-grey" strokeWidth={3} />
                    </div>
                    <span className="text-sm font-medium text-obsidian/60">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Getting There */}
            <div className="bg-obsidian text-white p-8 rounded-[32px] shadow-xl relative overflow-hidden">
               <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-20 -mt-20 blur-3xl" />
               <h3 className="text-2xl font-bold mb-6 flex items-center gap-2 relative z-10">
                 <Plane size={24} className="text-savanna-sun" /> Getting There
               </h3>
               <div className="space-y-6 relative z-10">
                 <div className="flex gap-4 items-start">
                    <div className="w-2 h-2 mt-2 rounded-full bg-savanna-sun shrink-0" />
                    <p className="text-white/80 leading-relaxed">
                      Tour starts and ends in <span className="text-white font-bold">Arusha</span>.
                    </p>
                 </div>
                 <div className="flex gap-4 items-start">
                    <div className="w-2 h-2 mt-2 rounded-full bg-savanna-sun shrink-0" />
                    <p className="text-white/80 leading-relaxed">
                      Fly into <span className="text-white font-bold">Kilimanjaro Intl (JRO)</span> or Arusha Airport (ARK). 
                      We include your transfer from the airport to your hotel/start point.
                    </p>
                 </div>
               </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-wilderness-white pb-40">
      
      {/* Hero Section */}
      <section className="relative h-[80vh] min-h-[600px] flex items-center justify-center overflow-hidden">
        <img 
          src="https://s3.amazonaws.com/cdn.micato.com/wp-content/uploads/2018/09/07215724/Arusha-1-1110x700.jpg" 
          alt="Camping Safari" 
          className="absolute inset-0 w-full h-full object-cover"
        />
        
        {/* Text Readability Gradient (Top) */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-transparent pointer-events-none" />
        
        {/* Bottom Glass/Blur Transition - The requested effect */}
        <div className="absolute bottom-0 left-0 right-0 h-[15%] z-0 pointer-events-none">
            {/* Blur Mask */}
            <div 
                className="absolute inset-0"
                style={{
                    backdropFilter: 'blur(12px)',
                    WebkitBackdropFilter: 'blur(12px)',
                    maskImage: 'linear-gradient(to top, black 0%, transparent 100%)',
                    WebkitMaskImage: 'linear-gradient(to top, black 0%, transparent 100%)'
                }}
            />
            {/* Color Fade to Wilderness White to match page background */}
            <div className="absolute inset-0 bg-gradient-to-t from-wilderness-white via-wilderness-white/80 to-transparent" />
        </div>
        
        {/* Top Actions */}
        <div className="absolute top-24 right-6 md:right-12 z-20 flex flex-col gap-4">
            <button className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-white hover:text-obsidian transition-all shadow-lg">
                <Share2 size={20} />
            </button>
            <button 
              onClick={() => {
                if (isCompared) {
                  removeFromCompare(id);
                } else {
                  addToCompare({
                    id,
                    title: tourData.title,
                    image: galleryImages[0],
                    price: 650,
                    days: 3,
                    location: 'Arusha, Tanzania',
                    operator: tourData.operator.name
                  });
                }
              }}
              className={`w-12 h-12 rounded-full backdrop-blur-md border border-white/20 flex items-center justify-center transition-all shadow-lg ${isCompared ? 'bg-white text-obsidian' : 'bg-white/10 text-white hover:bg-white hover:text-obsidian'}`}
              title={isCompared ? "Remove from compare" : "Add to compare"}
            >
              <ArrowLeftRight size={20} />
            </button>
            <SaveTourButton 
              tourId={id} 
              tourData={{
                title: tourData.title,
                slug,
                price: tourData.price,
                image: galleryImages[0]
              }} 
            />
            <button 
                onClick={() => setIsGalleryOpen(true)}
                className="w-12 h-12 rounded-full border border-white/20 overflow-hidden relative shadow-lg hover:scale-105 transition-transform"
            >
                <img src={galleryImages[0]} className="w-full h-full object-cover" alt="Gallery" />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                    <span className="text-xs font-bold text-white">+{galleryImages.length}</span>
                </div>
            </button>
        </div>

        {/* Centered Hero Content */}
        <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto mt-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 backdrop-blur-md border border-white/20 mb-8 shadow-sm hover:bg-white/30 transition-colors cursor-pointer">
            <MapPin size={14} className="text-savanna-sun" />
            <span className="text-xs font-bold uppercase tracking-widest">Arusha, Tanzania</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight leading-[1.1] drop-shadow-xl">
            3-Day Group Tour <br /> <span className="text-white/80 text-4xl md:text-6xl">to Parks Close to Arusha</span>
          </h1>
          <div className="flex items-center justify-center gap-4 text-sm font-bold uppercase tracking-widest">
            <span className="bg-savanna-sun text-obsidian px-3 py-1 rounded-sm">Budget Camping</span>
            <span className="bg-white/20 backdrop-blur-md border border-white/20 px-3 py-1 rounded-sm">Max 7 Guests</span>
          </div>

          {/* Navigation Tabs (Glassmorphism) */}
          <div className="mt-12 flex justify-center">
             <div className="bg-white/10 backdrop-blur-xl border border-white/20 p-1.5 rounded-full inline-flex gap-1 shadow-2xl">
                {['Overview', 'Itinerary', 'Logistics'].map((tab) => (
                    <button 
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`px-6 py-3 rounded-full text-xs font-bold uppercase tracking-widest transition-all ${activeTab === tab ? 'bg-white text-obsidian shadow-lg' : 'text-white hover:bg-white/10'}`}
                    >
                        {tab}
                    </button>
                ))}
             </div>
          </div>

        </div>
      </section>

      {/* Main Content Layout */}
      <div className="max-w-7xl mx-auto px-6 -mt-20 relative z-20">
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Left Content Column */}
          <div className="lg:w-2/3">
             {renderContent()}
          </div>

          {/* Right Sidebar Column (Sticky Booking Widget) */}
          <div className="lg:w-1/3">
            <div className="sticky top-24 space-y-6">
               <div className="bg-white p-8 rounded-[40px] shadow-2xl border border-cloud-grey/10 overflow-hidden relative">
                  
                  {/* Step 1: Selection View */}
                  {bookingStep === 'selection' && (
                    <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                        <div className="flex justify-between items-end mb-6 border-b border-cloud-grey/10 pb-6">
                            <div>
                                <p className="text-xs font-bold text-cloud-grey uppercase tracking-widest">Total Price</p>
                                <div className="flex items-baseline gap-1">
                                    <span className="text-4xl font-bold text-obsidian">${totalPrice.toLocaleString()}</span>
                                    <span className="text-sm text-cloud-grey">/ Total</span>
                                </div>
                            </div>
                             <div className="bg-acacia-green/10 text-acacia-green px-3 py-1 rounded-full text-xs font-bold uppercase">
                                Instant Quote
                            </div>
                        </div>

                        {/* Date Selection */}
                        <div className="p-4 rounded-2xl border border-cloud-grey/20 hover:border-obsidian transition-colors">
                            <div className="flex items-center gap-3 mb-2">
                                <Calendar size={20} className="text-obsidian" />
                                <span className="font-bold text-cloud-grey text-[10px] uppercase">Start Date</span>
                            </div>
                            <input 
                                type="date" 
                                className="w-full text-lg font-bold text-obsidian bg-transparent outline-none cursor-pointer"
                                value={startDate}
                                onChange={(e) => setStartDate(e.target.value)}
                            />
                        </div>

                        {/* Guest Selection */}
                        <div className="space-y-4">
                            {/* Adults */}
                            <div className="flex items-center justify-between p-2">
                                <div>
                                    <p className="font-bold text-obsidian">Adults</p>
                                    <p className="text-xs text-cloud-grey">Age 18+</p>
                                </div>
                                <div className="flex items-center gap-3">
                                    <button 
                                        onClick={() => setAdults(Math.max(1, adults - 1))}
                                        className="w-10 h-10 rounded-full border border-cloud-grey/30 flex items-center justify-center text-obsidian hover:bg-wilderness-white"
                                    >
                                        <Minus size={16} />
                                    </button>
                                    <span className="font-bold text-xl w-6 text-center">{adults}</span>
                                    <button 
                                        onClick={() => setAdults(adults + 1)}
                                        className="w-10 h-10 rounded-full border border-cloud-grey/30 flex items-center justify-center text-obsidian hover:bg-wilderness-white"
                                    >
                                        <Plus size={16} />
                                    </button>
                                </div>
                            </div>

                            {/* Children */}
                            <div className="flex items-center justify-between p-2">
                                <div>
                                    <p className="font-bold text-obsidian">Children</p>
                                    <p className="text-xs text-cloud-grey">Age 0-17</p>
                                </div>
                                <div className="flex items-center gap-3">
                                    <button 
                                        onClick={() => handleChildCountChange(false)}
                                        className="w-10 h-10 rounded-full border border-cloud-grey/30 flex items-center justify-center text-obsidian hover:bg-wilderness-white"
                                    >
                                        <Minus size={16} />
                                    </button>
                                    <span className="font-bold text-xl w-6 text-center">{children}</span>
                                    <button 
                                        onClick={() => handleChildCountChange(true)}
                                        className="w-10 h-10 rounded-full border border-cloud-grey/30 flex items-center justify-center text-obsidian hover:bg-wilderness-white"
                                    >
                                        <Plus size={16} />
                                    </button>
                                </div>
                            </div>

                            {/* Child Ages Dynamic Dropdowns */}
                            {children > 0 && (
                                <div className="pl-4 border-l-2 border-cloud-grey/10 space-y-3 mt-4 animate-in slide-in-from-top-2 duration-300">
                                    <p className="text-xs font-bold text-cloud-grey uppercase tracking-widest mb-2">Age at end of tour</p>
                                    {childAges.map((age, idx) => (
                                        <div key={idx} className="flex items-center justify-between">
                                            <span className="text-sm font-medium text-obsidian">Child {idx + 1}:</span>
                                            <select 
                                                value={age}
                                                onChange={(e) => handleChildAgeChange(idx, e.target.value)}
                                                className="bg-wilderness-white px-3 py-2 rounded-lg text-sm font-bold text-obsidian border border-cloud-grey/20 outline-none focus:border-acacia-green"
                                            >
                                                {Array.from({length: 18}, (_, i) => i).map(num => (
                                                    <option key={num} value={num}>{num} years</option>
                                                ))}
                                            </select>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        <button 
                            onClick={() => setBookingStep('details')}
                            className="w-full bg-obsidian text-white py-4 rounded-2xl font-bold text-lg hover:bg-acacia-green transition-colors shadow-lg mt-4 flex items-center justify-center gap-2"
                        >
                           Proceed to Contact <ArrowRight size={18} />
                        </button>
                        
                        <div className="flex items-center justify-center gap-2 text-xs text-cloud-grey font-medium">
                            <ShieldCheck size={14} /> No obligation to book
                        </div>
                    </div>
                  )}

                  {/* Step 2: Contact Details */}
                  {bookingStep === 'details' && (
                      <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                          <button 
                            onClick={() => setBookingStep('selection')}
                            className="flex items-center gap-2 text-sm font-bold text-cloud-grey hover:text-obsidian mb-4"
                          >
                             <ChevronLeft size={16} /> Back to Selection
                          </button>
                          
                          <div className="mb-4">
                             <h3 className="text-2xl font-bold text-obsidian">Your Details</h3>
                             <p className="text-cloud-grey text-sm mt-1">{adults} Adults, {children} Children • {startDate || 'Date TBD'}</p>
                          </div>

                          <form onSubmit={handleContactSubmit} className="space-y-4">
                             <div className="space-y-1">
                                <label className="text-[10px] font-bold uppercase text-cloud-grey tracking-widest ml-1">Full Name</label>
                                <div className="flex items-center gap-3 p-4 rounded-2xl border border-cloud-grey/20 focus-within:border-obsidian transition-colors">
                                   <User size={18} className="text-cloud-grey" />
                                   <input 
                                     required
                                     type="text" 
                                     placeholder="Jane Doe"
                                     className="w-full bg-transparent outline-none font-medium text-obsidian"
                                     value={contactForm.fullName}
                                     onChange={(e) => setContactForm({...contactForm, fullName: e.target.value})}
                                   />
                                </div>
                             </div>

                             <div className="space-y-1">
                                <label className="text-[10px] font-bold uppercase text-cloud-grey tracking-widest ml-1">Email Address</label>
                                <div className="flex items-center gap-3 p-4 rounded-2xl border border-cloud-grey/20 focus-within:border-obsidian transition-colors">
                                   <Mail size={18} className="text-cloud-grey" />
                                   <input 
                                     required
                                     type="email" 
                                     placeholder="jane@example.com"
                                     className="w-full bg-transparent outline-none font-medium text-obsidian"
                                     value={contactForm.email}
                                     onChange={(e) => setContactForm({...contactForm, email: e.target.value})}
                                   />
                                </div>
                             </div>

                             <div className="space-y-1">
                                <label className="text-[10px] font-bold uppercase text-cloud-grey tracking-widest ml-1">Phone Number</label>
                                <div className="flex items-center gap-3 p-4 rounded-2xl border border-cloud-grey/20 focus-within:border-obsidian transition-colors">
                                   <Phone size={18} className="text-cloud-grey" />
                                   <input 
                                     required
                                     type="tel" 
                                     placeholder="+1 (555) 000-0000"
                                     className="w-full bg-transparent outline-none font-medium text-obsidian"
                                     value={contactForm.phone}
                                     onChange={(e) => setContactForm({...contactForm, phone: e.target.value})}
                                   />
                                </div>
                             </div>

                             <div className="space-y-1">
                                <label className="text-[10px] font-bold uppercase text-cloud-grey tracking-widest ml-1">Message (Optional)</label>
                                <textarea 
                                     rows={3}
                                     placeholder="Any special requests or dietary needs?"
                                     className="w-full p-4 rounded-2xl border border-cloud-grey/20 focus:border-obsidian transition-colors bg-transparent outline-none font-medium text-obsidian resize-none"
                                     value={contactForm.message}
                                     onChange={(e) => setContactForm({...contactForm, message: e.target.value})}
                                   />
                             </div>

                             <button 
                                type="submit"
                                className="w-full bg-acacia-green text-white py-4 rounded-2xl font-bold text-lg hover:bg-obsidian transition-colors shadow-lg mt-2 flex items-center justify-center gap-2"
                            >
                               Send Request <Plane size={18} />
                            </button>
                          </form>
                      </div>
                  )}

                  {/* Step 3: Success */}
                  {bookingStep === 'success' && (
                      <div className="text-center py-12 animate-in zoom-in-95 duration-500">
                          <div className="w-20 h-20 bg-acacia-green rounded-full flex items-center justify-center text-white mx-auto mb-6 shadow-xl">
                              <Check size={40} strokeWidth={3} />
                          </div>
                          <h3 className="text-3xl font-bold text-obsidian mb-2">Request Sent!</h3>
                          <p className="text-cloud-grey leading-relaxed mb-8">
                              We've received your inquiry for the <strong>{tourData.title}</strong>. <br/>
                              Our team will contact you shortly at <strong>{contactForm.email}</strong>.
                          </p>
                          <button 
                             onClick={() => {
                                 setBookingStep('selection');
                                 setContactForm({fullName: '', email: '', phone: '', message: ''});
                             }}
                             className="text-sm font-bold text-obsidian border-b-2 border-obsidian pb-1 hover:text-acacia-green hover:border-acacia-green transition-colors"
                          >
                              Start New Booking
                          </button>
                      </div>
                  )}

               </div>

               {/* Help Widget */}
               <div className="bg-savanna-sun p-6 rounded-[32px] flex items-center gap-4 cursor-pointer hover:brightness-105 transition-all">
                  <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center text-white shrink-0">
                     <MessageSquare size={20} />
                  </div>
                  <div>
                     <p className="font-bold text-obsidian leading-tight">Questions?</p>
                     <p className="text-xs text-obsidian/70">Chat with Suricata Safaris</p>
                  </div>
               </div>
            </div>
          </div>

        </div>
      </div>

      {/* Gallery Modal */}
      {isGalleryOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/95 backdrop-blur-xl animate-in fade-in duration-300">
           <button 
             onClick={() => setIsGalleryOpen(false)}
             className="absolute top-6 right-6 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors z-50"
           >
             <X size={32} />
           </button>

           <button 
             onClick={(e) => { e.stopPropagation(); navigateGallery('prev'); }}
             className="absolute left-4 md:left-8 p-4 rounded-full bg-white/5 hover:bg-white/10 text-white backdrop-blur-md transition-all z-50 border border-white/10"
           >
             <ChevronLeft size={32} />
           </button>

           <div className="relative w-full h-full p-4 md:p-12 flex items-center justify-center">
             <img 
               key={currentImageIndex}
               src={galleryImages[currentImageIndex]} 
               alt={`Gallery ${currentImageIndex + 1}`} 
               className="max-w-full max-h-full object-contain rounded-lg shadow-2xl animate-in zoom-in-95 duration-300"
             />
             <div className="absolute bottom-8 left-1/2 -translate-x-1/2 bg-black/60 backdrop-blur-md px-6 py-2 rounded-full text-white font-bold text-sm border border-white/10">
               {currentImageIndex + 1} / {galleryImages.length}
             </div>
           </div>

           <button 
             onClick={(e) => { e.stopPropagation(); navigateGallery('next'); }}
             className="absolute right-4 md:right-8 p-4 rounded-full bg-white/5 hover:bg-white/10 text-white backdrop-blur-md transition-all z-50 border border-white/10"
           >
             <ChevronRight size={32} />
           </button>
        </div>
      )}
    </div>
  );
};

export default TourPage;
