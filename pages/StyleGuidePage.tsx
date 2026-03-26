
import React, { useState, useEffect } from 'react';
import { 
  ArrowRight, Sparkles, MapPin, Star, Shield, 
  Calendar, Users, CheckCircle2, AlertCircle, 
  ChevronRight, Heart, TrendingUp, Activity, Quote,
  Sun, MessageSquare, Bookmark, Share2, MoreHorizontal,
  CloudSun, ArrowLeft, Image as ImageIcon,
  Search, Trash2, Plus, Minus, Menu,
  Utensils, Landmark, Umbrella, DollarSign, Compass,
  Leaf
} from 'lucide-react';
import FAQ from '../components/FAQ';

const SectionHeader: React.FC<{ title: string }> = ({ title }) => (
  <div className="mb-10">
    <h2 className="text-sm font-bold text-cloud-grey uppercase tracking-widest">{title}</h2>
  </div>
);

const RotatingInfoWidget: React.FC = () => {
  const [slide, setSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setSlide((prev) => (prev + 1) % 3);
    }, 5000); 
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="aspect-[4/5] md:aspect-auto md:h-full min-h-[320px] bg-gradient-to-br from-[#2A2A2A] to-black rounded-[32px] p-6 flex flex-col justify-between relative overflow-hidden shadow-2xl border border-white/10 group">
       {/* Icon Top Right */}
       <div className="absolute top-6 right-6 w-12 h-12 rounded-full bg-savanna-sun flex items-center justify-center text-obsidian shadow-lg z-10 transition-transform duration-500 group-hover:rotate-12">
          {slide === 0 && <Leaf size={20} className="animate-in zoom-in duration-300" />}
          {slide === 1 && <Calendar size={20} className="animate-in zoom-in duration-300" />}
          {slide === 2 && <Star size={20} className="animate-in zoom-in duration-300" />}
       </div>

       {/* Content */}
       <div className="mt-12 flex-1 flex flex-col justify-center">
          {slide === 0 && (
             <div className="animate-in fade-in slide-in-from-right-4 duration-500 space-y-2">
                <h3 className="text-6xl font-bold text-white tracking-tighter">28<span className="text-3xl align-top text-white/60">°c</span></h3>
                <div>
                    <p className="text-2xl font-bold text-white">Not too busy</p>
                    <p className="text-white/50 text-sm font-medium">Serengeti, TZ</p>
                </div>
             </div>
          )}

          {slide === 1 && (
             <div className="animate-in fade-in slide-in-from-right-4 duration-500 space-y-4">
                <p className="text-xs font-bold uppercase tracking-widest text-savanna-sun mb-2">Best Time To Go</p>
                <div className="space-y-1">
                    <p className="text-white font-bold text-lg leading-tight">Jun — Oct</p>
                    <p className="text-white/50 text-xs">General wildlife viewing</p>
                </div>
                <div className="w-full h-px bg-white/10" />
                <div className="space-y-1">
                    <p className="text-white font-bold text-lg leading-tight">Jul — Oct</p>
                    <p className="text-white/50 text-xs">Wildebeest migration</p>
                </div>
             </div>
          )}

          {slide === 2 && (
             <div className="animate-in fade-in slide-in-from-right-4 duration-500 w-full">
                <div className="flex items-baseline gap-2 mb-6">
                   <span className="text-5xl font-bold text-white tracking-tighter">4.8</span>
                   <span className="text-xs text-white/50 font-bold uppercase tracking-wide">505 Reviews</span>
                </div>
                <div className="space-y-3">
                   {[
                       { label: 'Wildlife', val: 5 },
                       { label: 'Scenery', val: 5 },
                       { label: 'Bush Vibe', val: 4 },
                       { label: 'Birding', val: 4 }
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

       {/* Indicators */}
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

const StyleGuidePage: React.FC = () => {
  return (
    <div className="bg-wilderness-white min-h-screen pt-32 pb-20 animate-in fade-in duration-700 font-sans">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header */}
        <div className="mb-24 text-center md:text-left">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-black text-white text-xs font-bold uppercase tracking-widest mb-6">
            <Sparkles size={14} className="text-savanna-sun" />
            <span>Design System v2.1</span>
          </div>
          <h1 className="text-6xl md:text-9xl font-bold text-obsidian tracking-tighter mb-6">
            Savanna<span className="text-acacia-green">.</span>
          </h1>
          <p className="text-xl md:text-2xl text-obsidian/60 max-w-3xl leading-relaxed font-light">
            A visual language built for the digital wild. Combining glassmorphism, organic textures, 
            and data-rich interfaces to bridge luxury travel with frontier technology.
          </p>
        </div>

        {/* Section 1: Brand Foundations (Typography & Color) */}
        <div className="mb-32 border-b border-obsidian/5 pb-20">
            <SectionHeader title="01. Typography & Colors" />
            
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-20">
                
                {/* Typography Column */}
                <div className="space-y-12 py-8">
                    <div className="space-y-2">
                        <p className="text-xs font-bold text-cloud-grey uppercase tracking-widest">Heading 1</p>
                        <h1 className="text-6xl md:text-8xl font-bold text-obsidian tracking-tighter">The Modern Wild.</h1>
                    </div>
                    
                    <div className="space-y-2">
                        <p className="text-xs font-bold text-cloud-grey uppercase tracking-widest">Heading 2</p>
                        <h2 className="text-5xl md:text-6xl font-bold text-obsidian tracking-tight">Serengeti Plains</h2>
                    </div>

                    <div className="space-y-2">
                        <p className="text-xs font-bold text-cloud-grey uppercase tracking-widest">Heading 3</p>
                        <h3 className="text-3xl md:text-4xl font-bold text-obsidian">Luxury Expeditions</h3>
                    </div>

                    <div className="space-y-2">
                        <p className="text-xs font-bold text-cloud-grey uppercase tracking-widest">Heading 4</p>
                        <h4 className="text-xl md:text-2xl font-bold text-obsidian">Trip Overview</h4>
                    </div>

                    <div className="space-y-2">
                        <p className="text-xs font-bold text-cloud-grey uppercase tracking-widest">Body Large</p>
                        <p className="text-lg md:text-xl text-obsidian/70 leading-relaxed font-light max-w-xl">
                            Savanna bridges the gap between luxury travelers and local operators with AI-driven planning and seamless logistics.
                        </p>
                    </div>

                    <div className="space-y-2">
                        <p className="text-xs font-bold text-cloud-grey uppercase tracking-widest">Body Small</p>
                        <p className="text-sm text-obsidian/60 leading-relaxed max-w-xl">
                            Experience the untamed world with uncompromising comfort. Our platform ensures every detail is handled, from permits to private transfers.
                        </p>
                    </div>

                    {/* Creative Headings */}
                    <div className="space-y-4 pt-8 border-t border-obsidian/10">
                        <p className="text-xs font-bold text-cloud-grey uppercase tracking-widest">Creative Heading (Light)</p>
                        <h2 className="text-4xl md:text-5xl font-bold text-obsidian leading-tight">
                            Your <span className="bg-savanna-sun px-2">Zambezi</span> adventure is just a tap away.
                        </h2>
                    </div>

                    <div className="space-y-4 pt-8 bg-obsidian p-8 rounded-[32px]">
                        <p className="text-xs font-bold text-cloud-grey uppercase tracking-widest">Creative Heading (Dark)</p>
                        <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight">
                            Your <span className="bg-savanna-sun text-obsidian px-2">Zambezi</span> adventure is just a tap away.
                        </h2>
                    </div>
                </div>

                {/* Colors Column - Bar Chart + Cards */}
                <div className="flex flex-col gap-8">
                    {/* Bar Chart Visualization */}
                    <div className="relative w-full h-[500px] bg-[#EBEBEB] rounded-[48px] p-8 md:p-12 flex flex-col justify-end items-center overflow-hidden">
                        <p className="absolute top-10 left-10 text-sm font-bold text-cloud-grey uppercase tracking-widest">Color Palette</p>
                        
                        <div className="flex items-end justify-center gap-3 md:gap-6 w-full h-full max-w-2xl pb-4 mx-auto">
                            {/* White */}
                            <div className="flex flex-col items-center gap-4 flex-1 h-full justify-end">
                                <div className="w-full h-[25%] relative group">
                                    <div className="absolute inset-0 bg-gradient-to-t from-white/80 to-transparent rounded-t-full" />
                                    <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-white rounded-t-full shadow-sm" />
                                </div>
                                <span className="text-[10px] font-bold text-cloud-grey uppercase tracking-widest">#FFFFFF</span>
                            </div>

                            {/* Cloud Grey */}
                            <div className="flex flex-col items-center gap-4 flex-1 h-full justify-end">
                                <div className="w-full h-[35%] relative group">
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#CBCBCB]/80 to-transparent rounded-t-full" />
                                    <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-[#CBCBCB] rounded-t-full shadow-sm" />
                                </div>
                                <span className="text-[10px] font-bold text-cloud-grey uppercase tracking-widest">#CBCBCB</span>
                            </div>

                            {/* Obsidian */}
                            <div className="flex flex-col items-center gap-4 flex-1 h-full justify-end">
                                <div className="w-full h-[45%] relative group">
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-t-full" />
                                    <div className="absolute bottom-0 left-0 right-0 h-2/3 bg-black rounded-t-full shadow-sm" />
                                </div>
                                <span className="text-[10px] font-bold text-cloud-grey uppercase tracking-widest">#000000</span>
                            </div>

                            {/* Acacia Green */}
                            <div className="flex flex-col items-center gap-4 flex-1 h-full justify-end">
                                <div className="w-full h-[60%] relative group">
                                    <div className="absolute inset-0 bg-gradient-to-t from-acacia-green/60 to-transparent rounded-t-full" />
                                    <div className="absolute bottom-0 left-0 right-0 h-2/3 bg-acacia-green rounded-t-full shadow-sm" />
                                </div>
                                <span className="text-[10px] font-bold text-cloud-grey uppercase tracking-widest">#0C9762</span>
                            </div>

                            {/* Gold */}
                            <div className="flex flex-col items-center gap-4 flex-1 h-full justify-end">
                                <div className="w-full h-[75%] relative group">
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#FFDA1A]/60 to-transparent rounded-t-full" />
                                    <div className="absolute bottom-0 left-0 right-0 h-2/3 bg-[#FFDA1A] rounded-t-full shadow-sm" />
                                </div>
                                <span className="text-[10px] font-bold text-cloud-grey uppercase tracking-widest">#FFDA1A</span>
                            </div>

                            {/* Savanna Sun */}
                            <div className="flex flex-col items-center gap-4 flex-1 h-full justify-end">
                                <div className="w-full h-[90%] relative group">
                                    <div className="absolute inset-0 bg-gradient-to-t from-savanna-sun/60 to-transparent rounded-t-full" />
                                    <div className="absolute bottom-0 left-0 right-0 h-2/3 bg-savanna-sun rounded-t-full shadow-sm" />
                                </div>
                                <span className="text-[10px] font-bold text-cloud-grey uppercase tracking-widest">#FAFF7F</span>
                            </div>
                        </div>
                    </div>

                    {/* Color Cards */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
                        <ColorCard name="Savanna Sun" hex="#FAFF7F" bg="bg-savanna-sun" text="text-obsidian" />
                        <ColorCard name="Acacia Green" hex="#0C9762" bg="bg-acacia-green" text="text-white" />
                        <ColorCard name="Obsidian" hex="#000000" bg="bg-obsidian" text="text-white" />
                        <ColorCard name="Wilderness White" hex="#F4F4F4" bg="bg-wilderness-white" text="text-obsidian" border />
                        <ColorCard name="Cloud Grey" hex="#CBCBCB" bg="bg-[#CBCBCB]" text="text-obsidian" />
                        <ColorCard name="Pure White" hex="#FFFFFF" bg="bg-white" text="text-obsidian" border />
                    </div>
                </div>
            </div>

            {/* Gradients Section */}
            <div className="mt-24">
                <h3 className="text-sm font-bold text-cloud-grey uppercase tracking-widest mb-8">Gradients</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {/* Sunburst */}
                    <div className="group space-y-4">
                        <div className="h-40 w-full rounded-[32px] bg-gradient-to-br from-[#FAFF7F] to-[#FFDA1A] shadow-sm border border-black/5 group-hover:scale-[1.02] transition-transform" />
                        <div>
                            <p className="font-bold text-obsidian">Sunburst</p>
                            <p className="text-xs text-cloud-grey font-mono mt-1">from-savanna-sun to-gold</p>
                        </div>
                    </div>

                    {/* Deep Acacia */}
                    <div className="group space-y-4">
                        <div className="h-40 w-full rounded-[32px] bg-gradient-to-br from-[#0C9762] to-[#054029] shadow-sm border border-black/5 group-hover:scale-[1.02] transition-transform" />
                        <div>
                            <p className="font-bold text-obsidian">Deep Acacia</p>
                            <p className="text-xs text-cloud-grey font-mono mt-1">from-acacia-green to-forest</p>
                        </div>
                    </div>

                    {/* Obsidian Fade */}
                    <div className="group space-y-4">
                        <div className="h-40 w-full rounded-[32px] bg-gradient-to-b from-black to-black/0 bg-wilderness-white shadow-sm border border-black/5 group-hover:scale-[1.02] transition-transform relative overflow-hidden">
                             {/* Checkerboard background to show transparency */}
                             <div className="absolute inset-0 -z-10 opacity-20" style={{backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '10px 10px'}}></div>
                        </div>
                        <div>
                            <p className="font-bold text-obsidian">Obsidian Fade</p>
                            <p className="text-xs text-cloud-grey font-mono mt-1">from-black to-transparent</p>
                        </div>
                    </div>

                    {/* Morning Mist */}
                    <div className="group space-y-4">
                        <div className="h-40 w-full rounded-[32px] bg-gradient-to-br from-white via-[#F4F4F4] to-[#CBCBCB]/50 shadow-sm border border-black/5 group-hover:scale-[1.02] transition-transform" />
                        <div>
                            <p className="font-bold text-obsidian">Morning Mist</p>
                            <p className="text-xs text-cloud-grey font-mono mt-1">from-white to-cloud-grey</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        {/* Section 2: Interactive Elements */}
        <section className="mb-32 border-b border-obsidian/5 pb-20">
          <SectionHeader title="03. Interactive Elements" />
          <div className="bg-white p-12 rounded-[40px] border border-black/5 shadow-sm">
             <div className="flex flex-wrap gap-12 items-center justify-center lg:justify-start">
                {/* Primary */}
                <div className="space-y-4 text-center">
                    <button className="bg-savanna-sun text-obsidian px-10 py-5 rounded-full font-bold text-sm hover:scale-105 transition-transform shadow-xl hover:shadow-2xl">
                    Primary Action
                    </button>
                    <p className="text-xs text-cloud-grey uppercase tracking-widest">Primary</p>
                </div>

                {/* Secondary */}
                <div className="space-y-4 text-center">
                     <button className="bg-obsidian text-white px-10 py-5 rounded-full font-bold text-sm hover:bg-obsidian/80 transition-colors shadow-lg flex items-center gap-3">
                    Start Journey <ArrowRight size={18} />
                    </button>
                    <p className="text-xs text-cloud-grey uppercase tracking-widest">Secondary</p>
                </div>

                 {/* Tertiary */}
                 <div className="space-y-4 text-center">
                    <button className="bg-white border border-obsidian/10 text-obsidian px-8 py-4 rounded-full font-bold text-sm hover:bg-obsidian hover:text-white transition-colors">
                    View Details
                    </button>
                     <p className="text-xs text-cloud-grey uppercase tracking-widest">Outline</p>
                 </div>

                {/* Icon Buttons */}
                <div className="space-y-4 text-center">
                    <div className="flex gap-4">
                         <button className="w-14 h-14 rounded-full bg-acacia-green text-white flex items-center justify-center hover:scale-110 transition-transform shadow-lg">
                            <CheckCircle2 size={24} />
                        </button>
                        <button className="w-14 h-14 rounded-full bg-wilderness-white border border-obsidian/10 flex items-center justify-center hover:bg-obsidian hover:text-white transition-colors">
                            <ChevronRight size={24} />
                        </button>
                    </div>
                    <p className="text-xs text-cloud-grey uppercase tracking-widest">Iconography</p>
                </div>

                {/* Map Markers */}
                <div className="space-y-4 text-center">
                    <div className="flex gap-4 items-end">
                         {/* Grey Pin - Beach */}
                         <div className="relative group hover:-translate-y-2 transition-transform cursor-pointer">
                            <div className="w-14 h-14 rounded-full rounded-br-none bg-[#EBEBEB] flex items-center justify-center -rotate-45 shadow-md">
                                <Umbrella size={24} className="text-obsidian rotate-45" fill="currentColor" />
                            </div>
                         </div>
                         {/* Green Pin - Ruins */}
                         <div className="relative group hover:-translate-y-2 transition-transform cursor-pointer">
                            <div className="w-14 h-14 rounded-full rounded-br-none bg-acacia-green flex items-center justify-center -rotate-45 shadow-md">
                                <Landmark size={24} className="text-white rotate-45" fill="currentColor" />
                            </div>
                         </div>
                         {/* Grey Pin - Food */}
                         <div className="relative group hover:-translate-y-2 transition-transform cursor-pointer">
                            <div className="w-14 h-14 rounded-full rounded-br-none bg-[#EBEBEB] flex items-center justify-center -rotate-45 shadow-md">
                                <Utensils size={24} className="text-obsidian rotate-45" />
                            </div>
                         </div>
                    </div>
                    <p className="text-xs text-cloud-grey uppercase tracking-widest">Map Markers</p>
                </div>
             </div>
          </div>
        </section>

        {/* Section 3: Data Visualization */}
        <section className="mb-32 border-b border-obsidian/5 pb-20">
            <SectionHeader title="04. Data & Analytics" />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                
                {/* Chart 1: Stability Index (Circular) */}
                <div className="bg-white p-10 rounded-[40px] shadow-lg border border-cloud-grey/10 flex flex-col items-center text-center relative overflow-hidden group hover:scale-[1.02] transition-transform">
                     <div className="absolute top-4 right-4 p-2 bg-wilderness-white rounded-full">
                        <Activity size={20} className="text-obsidian" />
                     </div>
                     <div className="relative w-48 h-48 mb-8 flex items-center justify-center">
                        {/* CSS-only Circular Progress approximation */}
                        <svg className="w-full h-full transform -rotate-90">
                            <circle cx="96" cy="96" r="88" stroke="#F4F4F4" strokeWidth="12" fill="none" />
                            <circle cx="96" cy="96" r="88" stroke="#0C9762" strokeWidth="12" fill="none" strokeDasharray="552" strokeDashoffset="180" strokeLinecap="round" />
                        </svg>
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                            <span className="text-5xl font-bold text-obsidian">67%</span>
                        </div>
                     </div>
                     <h3 className="text-lg font-bold mb-1">Application Stability</h3>
                     <p className="text-cloud-grey text-sm">System performance index</p>
                </div>

                {/* Chart 2: User Engagement (Bar) */}
                <div className="bg-wilderness-white p-10 rounded-[40px] border border-cloud-grey/10 flex flex-col justify-between group hover:border-acacia-green/30 transition-colors">
                    <div className="flex justify-between items-start mb-10">
                        <div>
                             <h3 className="text-4xl font-bold mb-1">2.7k</h3>
                             <p className="text-cloud-grey text-sm font-bold uppercase tracking-widest">Active Sessions</p>
                        </div>
                        <div className="bg-white p-3 rounded-2xl shadow-sm">
                            <Users size={20} className="text-obsidian" />
                        </div>
                    </div>
                    <div className="flex items-end gap-3 h-40">
                         <div className="w-full bg-cloud-grey/20 rounded-t-lg h-[40%]" />
                         <div className="w-full bg-cloud-grey/20 rounded-t-lg h-[60%]" />
                         <div className="w-full bg-acacia-green rounded-t-lg h-[85%] relative group-hover:bg-savanna-sun transition-colors">
                             <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-obsidian text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">Peak</div>
                         </div>
                         <div className="w-full bg-cloud-grey/20 rounded-t-lg h-[55%]" />
                         <div className="w-full bg-cloud-grey/20 rounded-t-lg h-[70%]" />
                    </div>
                </div>

                 {/* Chart 3: Growth (Line area approximation) */}
                 <div className="bg-obsidian text-white p-10 rounded-[40px] shadow-2xl relative overflow-hidden flex flex-col justify-between group">
                     <div className="relative z-10">
                        <div className="flex items-center gap-2 mb-2 text-savanna-sun">
                            <TrendingUp size={20} />
                            <span className="text-xs font-bold uppercase tracking-widest">Revenue</span>
                        </div>
                        <h3 className="text-4xl font-bold mb-1">$12.4M</h3>
                        <p className="text-white/40 text-sm">Year over Year growth</p>
                     </div>
                     
                     <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-acacia-green/20 to-transparent pointer-events-none" />
                     {/* Decorative Line */}
                     <svg className="absolute bottom-0 left-0 w-full h-24 text-acacia-green" preserveAspectRatio="none">
                         <path d="M0,80 C100,70 200,90 300,50 C400,10 500,60 600,40 L600,100 L0,100 Z" fill="currentColor" fillOpacity="0.3" />
                         <path d="M0,80 C100,70 200,90 300,50 C400,10 500,60 600,40" fill="none" stroke="#0C9762" strokeWidth="4" />
                     </svg>
                </div>

            </div>
        </section>

        {/* Section 4: Content Modules */}
        <section className="mb-32 border-b border-obsidian/5 pb-20">
            <SectionHeader title="05. Content Modules" />
            <div className="space-y-16">
                
                {/* Quote Element */}
                <div className="bg-[#EBEBEB] p-12 md:p-20 rounded-[48px] relative">
                    <Quote size={80} className="absolute top-12 left-12 text-black/5" />
                    <div className="relative z-10 max-w-4xl mx-auto text-center">
                        <h3 className="text-3xl md:text-5xl font-medium text-obsidian leading-tight mb-12">
                            "We will need a multi-platform solution and ongoing development support to elevate the project further."
                        </h3>
                        <div className="flex items-center justify-center gap-4">
                            <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-white shadow-sm">
                                <img src="https://picsum.photos/seed/ceo/100/100" alt="CEO" className="w-full h-full object-cover" />
                            </div>
                            <div className="text-left">
                                <p className="font-bold text-obsidian text-lg">Conan O.</p>
                                <p className="text-cloud-grey text-sm font-bold uppercase tracking-widest">CIO, TripAI</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Component Library Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                     {/* 1. Glass Destination Card */}
                    <div className="col-span-1 lg:col-span-2 relative h-[400px] rounded-[40px] overflow-hidden group cursor-pointer shadow-xl">
                        <img src="https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&q=80&w=1200" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt="Safari" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                        <div className="absolute bottom-6 left-6 right-6">
                            <div className="glass p-6 rounded-[32px] border border-white/20 flex justify-between items-center backdrop-blur-xl bg-white/10">
                            <div>
                                <div className="flex items-center gap-2 text-white/80 mb-1">
                                    <MapPin size={14} className="text-savanna-sun" />
                                    <span className="text-xs font-bold uppercase tracking-widest">Okavango Delta</span>
                                </div>
                                <h3 className="text-2xl font-bold text-white">Water & Wilderness</h3>
                            </div>
                            <div className="w-12 h-12 bg-savanna-sun rounded-full flex items-center justify-center text-obsidian font-bold">
                                <ArrowRight size={20} />
                            </div>
                            </div>
                        </div>
                    </div>

                    {/* 2. Operator Profile Widget */}
                    <div className="bg-white p-8 rounded-[40px] border border-black/5 shadow-xl flex flex-col justify-between h-[400px] relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-acacia-green/10 rounded-full -mr-16 -mt-16" />
                        
                        <div className="relative z-10">
                            <div className="w-20 h-20 rounded-2xl bg-black overflow-hidden mb-6 border-4 border-white shadow-lg">
                            <img src="https://picsum.photos/seed/guide/200/200" className="w-full h-full object-cover" alt="Guide" />
                            </div>
                            <div className="flex items-center gap-2 mb-2">
                            <h3 className="text-2xl font-bold">Kibo Safaris</h3>
                            <Shield size={18} className="text-acacia-green fill-acacia-green" />
                            </div>
                            <p className="text-obsidian/60 text-sm leading-relaxed mb-6">
                            Premier eco-tourism operator specializing in walking safaris and conservation education.
                            </p>
                            <div className="flex gap-4">
                            <div className="px-4 py-2 bg-wilderness-white rounded-xl">
                                <p className="text-xs text-obsidian/40 uppercase font-bold">Fleets</p>
                                <p className="text-lg font-bold">12</p>
                            </div>
                            <div className="px-4 py-2 bg-wilderness-white rounded-xl">
                                <p className="text-xs text-obsidian/40 uppercase font-bold">Rating</p>
                                <p className="text-lg font-bold flex items-center gap-1">4.9 <Star size={12} className="fill-savanna-sun text-savanna-sun" /></p>
                            </div>
                            </div>
                        </div>
                        
                        <button className="w-full py-4 rounded-2xl bg-obsidian text-white font-bold text-sm mt-auto hover:bg-acacia-green transition-colors">
                            View Verified Profile
                        </button>
                    </div>

                    {/* 3. Itinerary Timeline Card */}
                    <div className="bg-obsidian text-white p-8 rounded-[40px] shadow-2xl relative">
                        <div className="flex justify-between items-start mb-8">
                            <div>
                                <p className="text-savanna-sun text-xs font-bold uppercase tracking-widest mb-1">Day 03</p>
                                <h3 className="text-2xl font-bold">The Crossing</h3>
                            </div>
                            <div className="p-2 bg-white/10 rounded-full">
                                <Calendar size={20} />
                            </div>
                        </div>

                        <div className="space-y-6 relative">
                            {/* Line */}
                            <div className="absolute left-[7px] top-2 bottom-2 w-0.5 bg-white/20" />
                            
                            {[
                                { time: "05:30", title: "Sunrise Game Drive", icon: <Sparkles size={12} /> },
                                { time: "09:00", title: "Bush Breakfast", icon: <CheckCircle2 size={12} /> },
                                { time: "16:00", title: "Mara River Crossing", icon: <AlertCircle size={12} /> }
                            ].map((item, i) => (
                                <div key={i} className="flex gap-6 relative z-10">
                                <div className="w-4 h-4 rounded-full bg-savanna-sun border-4 border-obsidian shrink-0 mt-1" />
                                <div>
                                    <p className="text-xs text-white/50 font-mono mb-1">{item.time}</p>
                                    <p className="font-bold text-lg">{item.title}</p>
                                </div>
                                </div>
                            ))}
                        </div>
                        
                        <div className="mt-8 pt-6 border-t border-white/10 flex justify-between items-center">
                            <div className="flex -space-x-2">
                                {[1,2,3].map(i => <div key={i} className="w-8 h-8 rounded-full bg-white/20 border-2 border-obsidian" />)}
                            </div>
                            <span className="text-xs font-bold uppercase">4 Spots Left</span>
                        </div>
                    </div>

                    {/* 4. Pricing / Booking Widget (Gradient) */}
                    <div className="bg-gradient-to-br from-savanna-sun to-[#EEF2AC] p-8 rounded-[40px] shadow-xl border border-white/50">
                        <div className="mb-8">
                            <p className="text-xs font-bold uppercase tracking-widest text-obsidian/60 mb-2">Total Expedition Cost</p>
                            <h3 className="text-4xl font-bold text-obsidian">$4,250</h3>
                            <p className="text-sm text-obsidian/60 mt-1">per person / sharing</p>
                        </div>
                        
                        <div className="space-y-3 mb-8">
                            <div className="flex items-center gap-3 text-sm font-medium">
                                <CheckCircle2 size={16} className="text-acacia-green" /> All Park Fees Included
                            </div>
                            <div className="flex items-center gap-3 text-sm font-medium">
                                <CheckCircle2 size={16} className="text-acacia-green" /> Flying Doctors Coverage
                            </div>
                            <div className="flex items-center gap-3 text-sm font-medium">
                                <CheckCircle2 size={16} className="text-acacia-green" /> Private 4x4 Vehicle
                            </div>
                        </div>

                        <button className="w-full bg-obsidian text-white py-4 rounded-2xl font-bold hover:scale-[1.02] transition-transform shadow-lg">
                            Secure Booking
                        </button>
                    </div>

                </div>
            </div>
        </section>

        {/* Section 6: Mobile Widgets */}
        <section className="mb-32">
          <SectionHeader title="06. Mobile Widgets" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
            
            {/* Dynamic Info Widget (Replaces Static Weather Widget) */}
            <RotatingInfoWidget />

            {/* Crowd/Occupancy Widget */}
            <div className="bg-white p-6 pt-20 rounded-[32px] shadow-sm border border-cloud-grey/10 flex flex-col relative min-h-[320px] justify-between group hover:shadow-md transition-shadow">
               {/* Icon Top Left */}
               <div className="absolute top-6 left-6 w-12 h-12 bg-black rounded-full flex items-center justify-center text-white shadow-lg z-10">
                   <Users size={20} />
               </div>
               
               {/* Content Area (Pushed to bottom) */}
               <div className="mt-auto w-full">
                   {/* Title */}
                   <div className="w-full text-center mb-8">
                       <h4 className="font-bold text-3xl tracking-tight text-obsidian">Not too busy</h4>
                   </div>

                   {/* Bar Chart */}
                   <div className="flex items-end justify-center gap-3 h-24 w-full px-2">
                      {[20, 30, 40, 75, 55, 65].map((h, i) => {
                          const isActive = i === 3;
                          return (
                             <div key={i} className="flex flex-col items-center gap-2 flex-1 h-full justify-end group/bar">
                                {isActive && <span className="text-sm font-bold text-obsidian mb-1">Jun</span>}
                                <div 
                                    className={`w-full rounded-t-xl transition-all duration-500 ${isActive ? 'bg-acacia-green shadow-lg shadow-acacia-green/20' : 'bg-wilderness-white'}`} 
                                    style={{height: `${h}%`}} 
                                />
                             </div>
                          )
                      })}
                   </div>
               </div>
            </div>

            {/* Map Recommendation Widget */}
            <div className="bg-white p-5 pt-20 rounded-[32px] shadow-sm border border-cloud-grey/10 flex flex-col gap-4 relative">
                <div className="absolute top-6 left-6 w-12 h-12 bg-black rounded-full flex items-center justify-center text-white z-20 shadow-lg">
                   <MapPin size={20} />
               </div>
               <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-black overflow-hidden">
                     <img src="https://images.unsplash.com/photo-1523800503107-5bc3ba2a6f81?auto=format&fit=crop&q=80&w=200" className="w-full h-full object-cover" alt="Hotel" />
                  </div>
                  <div>
                     <h4 className="font-bold text-sm">Ancient Thera</h4>
                     <div className="flex text-acacia-green gap-0.5 mt-1">
                        {[1,2,3,4,5].map(i => <div key={i} className="w-1.5 h-1.5 rounded-full bg-acacia-green" />)}
                     </div>
                  </div>
                  <button className="ml-auto w-10 h-10 rounded-xl bg-wilderness-white flex items-center justify-center hover:bg-obsidian hover:text-white transition-colors">
                     <Share2 size={16} />
                  </button>
               </div>
               <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-black flex items-center justify-center text-white">
                     <Users size={20} />
                  </div>
                  <div>
                     <h4 className="font-bold text-lg">Not to busy</h4>
                     <p className="text-xs text-cloud-grey">June - Aug</p>
                  </div>
               </div>
            </div>

            {/* Social Proof / Post Widget */}
            <div className="bg-white p-4 pt-20 rounded-[32px] shadow-xl border border-cloud-grey/10 relative overflow-hidden group">
               <div className="absolute top-6 left-6 w-12 h-12 bg-black rounded-full flex items-center justify-center text-white z-20 shadow-lg">
                   <Heart size={20} />
               </div>
               <div className="flex items-center justify-between mb-4 px-1">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-savanna-sun flex items-center justify-center">
                       <div className="w-4 h-4 bg-black rounded-full" />
                    </div>
                    <div>
                       <p className="text-xs font-bold">Savanna_Official</p>
                       <p className="text-[10px] text-cloud-grey font-medium">Sponsored</p>
                    </div>
                  </div>
                  <MoreHorizontal size={16} className="text-cloud-grey" />
               </div>
               
               <div className="aspect-[4/5] rounded-[24px] overflow-hidden mb-4 relative">
                  <img src="https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&q=80&w=600" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt="Post" />
                  <div className="absolute bottom-3 left-3 bg-white/20 backdrop-blur-md px-4 py-1.5 rounded-full text-[10px] text-white font-bold border border-white/30 flex items-center gap-2">
                     Explore Now <ArrowRight size={10} />
                  </div>
                  <div className="absolute top-3 right-3 bg-black/50 backdrop-blur-md w-8 h-8 rounded-full flex items-center justify-center text-white">
                     <Bookmark size={14} />
                  </div>
               </div>
               
               <div className="flex gap-4 px-2 text-obsidian">
                  <Heart size={20} className="hover:fill-red-500 hover:text-red-500 transition-colors cursor-pointer" />
                  <MessageSquare size={20} className="hover:fill-cloud-grey hover:text-cloud-grey transition-colors cursor-pointer" />
                  <Share2 size={20} className="hover:text-acacia-green transition-colors cursor-pointer ml-auto" />
               </div>
            </div>
          </div>
          
          {/* Horizontal Widgets Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
             
             {/* Map Widget */}
             <div className="h-[200px] rounded-[32px] overflow-hidden relative shadow-lg border border-cloud-grey/10 group">
                <div className="absolute top-6 left-6 w-12 h-12 bg-black rounded-full flex items-center justify-center text-white z-20 shadow-lg">
                   <Compass size={20} />
               </div>
                <img 
                    src="https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&q=80&w=800&saturation=-100" 
                    alt="Map" 
                    className="w-full h-full object-cover grayscale opacity-60"
                />
                <div className="absolute inset-0 bg-white/40 mix-blend-overlay" />
                
                {/* Pins */}
                <div className="absolute top-1/4 left-1/4 hover:z-10 transition-all">
                     <div className="w-10 h-10 rounded-full rounded-br-none bg-[#EBEBEB] flex items-center justify-center -rotate-45 shadow-lg animate-in zoom-in duration-500 delay-100">
                        <Umbrella size={18} className="text-obsidian rotate-45" fill="currentColor" />
                    </div>
                </div>
                 <div className="absolute bottom-1/3 right-1/4 hover:z-10 transition-all">
                     <div className="w-12 h-12 rounded-full rounded-br-none bg-acacia-green flex items-center justify-center -rotate-45 shadow-lg animate-in zoom-in duration-500 delay-200">
                        <Landmark size={20} className="text-white rotate-45" fill="currentColor" />
                    </div>
                </div>
                <div className="absolute top-1/3 right-1/3 hover:z-10 transition-all">
                     <div className="w-12 h-12 rounded-full rounded-br-none bg-acacia-green flex items-center justify-center -rotate-45 shadow-lg animate-in zoom-in duration-500 delay-300">
                        <Landmark size={20} className="text-white rotate-45" fill="currentColor" />
                    </div>
                </div>
                <div className="absolute bottom-10 left-1/3 hover:z-10 transition-all">
                     <div className="w-10 h-10 rounded-full rounded-br-none bg-[#EBEBEB] flex items-center justify-center -rotate-45 shadow-lg animate-in zoom-in duration-500 delay-150">
                        <Utensils size={18} className="text-obsidian rotate-45" />
                    </div>
                </div>
             </div>

             {/* Price Range Card */}
             <div className="h-[200px] bg-white rounded-[32px] p-8 shadow-lg border border-cloud-grey/10 flex flex-col justify-between">
                <div className="w-12 h-12 rounded-full bg-black flex items-center justify-center text-white shadow-lg">
                    <DollarSign size={20} />
                </div>
                
                <div>
                     <h3 className="text-3xl font-bold text-obsidian tracking-tight mb-4">$1,581 - $3,162</h3>
                     <div className="w-full flex items-end gap-1.5 h-12">
                         {[30, 45, 35, 60, 80, 50, 65, 90, 40, 55, 30, 40, 70, 50, 60].map((h, i) => (
                             <div 
                                key={i} 
                                className="flex-1 bg-acacia-green rounded-sm opacity-90 hover:opacity-100 transition-opacity" 
                                style={{height: `${h}%`}} 
                             />
                         ))}
                     </div>
                     <p className="text-sm font-medium text-obsidian/60 mt-4 text-center">One week trip</p>
                </div>
             </div>

          </div>
        </section>

        {/* Section 7: Mobile & Web Page Templates */}
        <section className="mb-32">
            <SectionHeader title="07. Page Templates" />
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-12 items-start">
                
                {/* Mobile Template */}
                <div className="flex flex-col items-center gap-8">
                     <h4 className="text-xl font-bold text-obsidian">Mobile Detail View</h4>
                     
                     <div className="relative w-[375px] h-[812px] bg-[#F4F4F4] rounded-[48px] overflow-hidden shadow-2xl border-[8px] border-obsidian ring-1 ring-white/20">
                        
                        {/* Background Image - Restricted Height */}
                        <div className="absolute top-0 left-0 w-full h-[75%]">
                            <img 
                                src="https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&q=80&w=800" 
                                alt="Background" 
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/80" />
                        </div>

                        {/* Top Navigation */}
                        <div className="absolute top-14 left-6 right-6 flex justify-between items-start z-10">
                            <div className="flex items-center gap-3">
                                <button className="w-12 h-12 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center text-white border border-white/10 hover:bg-white/20 transition-colors">
                                    <ArrowLeft size={20} />
                                </button>
                            </div>
                            
                            <div className="flex gap-3">
                                <button className="w-12 h-12 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center text-white border border-white/10 hover:bg-white/20 transition-colors">
                                    <ImageIcon size={20} />
                                </button>
                                <button className="w-12 h-12 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center text-white border border-white/10 hover:bg-white/20 transition-colors text-xs font-bold">
                                    +5
                                </button>
                            </div>
                        </div>

                        {/* Location Tag */}
                        <div className="absolute top-32 left-6 z-10">
                            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-xl px-4 py-2 rounded-full border border-white/10">
                                <MapPin size={14} className="text-white" />
                                <span className="text-white font-bold text-sm">Tanzania</span>
                            </div>
                        </div>

                        {/* Main Content Area */}
                        <div className="absolute bottom-0 left-0 right-0 z-10 flex flex-col">
                            
                            {/* Title & Desc (Positioned above grey area) */}
                            <div className="px-6 mb-8">
                                <h2 className="text-5xl font-bold text-white mb-4 tracking-tight">Serengeti</h2>
                                <p className="text-white/80 text-sm leading-relaxed font-light line-clamp-3">
                                    Known for its massive annual migration of wildebeest and zebra. Seeking new pasture, the herds move north from their breeding grounds in the grassy southern plains.
                                </p>
                            </div>

                            {/* Glassmorphic Tabs (On Image) */}
                            <div className="px-6 mb-8">
                                <div className="bg-white/10 backdrop-blur-2xl border border-white/10 p-2 rounded-[24px] flex justify-between">
                                    {['Overview', 'Wildlife', 'Birds', 'Weather'].map((tab, i) => (
                                    <button 
                                        key={tab} 
                                        className={`flex-1 py-3 rounded-[18px] text-[11px] font-bold uppercase tracking-wide transition-all ${
                                            i === 0 
                                            ? 'bg-white/20 text-white shadow-lg border border-white/10' 
                                            : 'text-white/50 hover:text-white hover:bg-white/5'
                                        }`}
                                    >
                                        {tab}
                                    </button>
                                    ))}
                                </div>
                            </div>
                            
                            {/* Grey Content Sheet (Solid Body) */}
                            <div className="bg-[#F4F4F4] h-[250px] rounded-t-[40px] w-full relative shadow-[0_-10px_40px_rgba(0,0,0,0.2)]">
                            <div className="absolute top-3 left-1/2 -translate-x-1/2 w-12 h-1 bg-black/10 rounded-full" />
                            {/* Empty state per request */}
                            </div>

                        </div>
                    </div>
                </div>

                {/* Removed Web Template */}
            </div>
        </section>

        {/* Section 8: Booking Widget */}
        <section className="mb-32">
            <SectionHeader title="08. Booking Widget" />
            <div className="bg-wilderness-white p-12 rounded-[48px] border border-obsidian/5 flex justify-center items-start min-h-[600px]">
                <BookingWidget />
            </div>
        </section>

        {/* Section 9: FAQ Widget */}
        <section className="mb-32">
            <SectionHeader title="09. FAQ Widget" />
            <div className="bg-wilderness-white p-12 rounded-[48px] border border-obsidian/5 flex flex-col items-center">
                 <h3 className="text-4xl font-bold mb-12">FAQ's</h3>
                 <div className="w-full max-w-4xl">
                    <FAQ items={[
                        { question: "What does TripAI do?", answer: "TripAI automates the entire travel process, from itinerary creation to booking, allowing you to focus on enjoying your trip instead of planning." },
                        { question: "Is TripAI suitable for frequent travelers?", answer: "Yes! Our platform learns your preferences over time, making each subsequent trip planning experience faster and more tailored to your style." },
                        { question: "How does TripAI save me time?", answer: "By aggregating real-time data from flights, hotels, and activities, we eliminate hours of research. Our AI suggests the optimal route and bookings instantly." }
                    ]} />
                 </div>
            </div>
        </section>

      </div>
    </div>
  );
};

const BookingWidget: React.FC = () => {
    const [isGuestOpen, setIsGuestOpen] = useState(true);
    
    return (
        <div className="relative w-full max-w-5xl">
            {/* The Bar */}
            <div className="bg-white rounded-[32px] shadow-xl p-3 flex flex-col lg:flex-row items-stretch lg:items-center gap-2 relative z-20">
                {/* Check In */}
                <div className="flex-1 px-6 py-3 hover:bg-wilderness-white rounded-2xl transition-colors cursor-pointer group">
                    <div className="flex items-center gap-3 mb-1">
                        <Calendar size={18} className="text-acacia-green" />
                        <span className="text-xs font-bold uppercase tracking-widest text-cloud-grey group-hover:text-acacia-green transition-colors">Check-in</span>
                    </div>
                    <div className="text-xl font-bold text-obsidian">19, Aug 2024</div>
                </div>
                
                <div className="hidden lg:block w-px h-12 bg-cloud-grey/20" />

                {/* Check Out */}
                <div className="flex-1 px-6 py-3 hover:bg-wilderness-white rounded-2xl transition-colors cursor-pointer group">
                    <div className="flex items-center gap-3 mb-1">
                        <Calendar size={18} className="text-acacia-green" />
                        <span className="text-xs font-bold uppercase tracking-widest text-cloud-grey group-hover:text-acacia-green transition-colors">Check-out</span>
                    </div>
                    <div className="text-xl font-bold text-obsidian">21, Aug 2024</div>
                </div>

                <div className="hidden lg:block w-px h-12 bg-cloud-grey/20" />

                {/* Location */}
                <div className="flex-[1.5] px-6 py-3 hover:bg-wilderness-white rounded-2xl transition-colors cursor-pointer group">
                    <div className="flex items-center gap-3 mb-1">
                        <MapPin size={18} className="text-acacia-green" />
                        <span className="text-xs font-bold uppercase tracking-widest text-cloud-grey group-hover:text-acacia-green transition-colors">Location</span>
                    </div>
                    <div className="text-xl font-bold text-obsidian">Serengeti, Tanzania</div>
                </div>

                <div className="hidden lg:block w-px h-12 bg-cloud-grey/20" />

                {/* Guests */}
                <div 
                    className={`flex-[1.5] px-6 py-3 rounded-2xl transition-colors cursor-pointer group ${isGuestOpen ? 'bg-wilderness-white' : 'hover:bg-wilderness-white'}`}
                    onClick={() => setIsGuestOpen(!isGuestOpen)}
                >
                    <div className="flex items-center gap-3 mb-1">
                        <Users size={18} className="text-acacia-green" />
                        <span className="text-xs font-bold uppercase tracking-widest text-cloud-grey group-hover:text-acacia-green transition-colors">Guests</span>
                    </div>
                    <div className="text-xl font-bold text-obsidian">6 Adults - 3 Children</div>
                </div>

                {/* Search Button */}
                <button className="w-16 h-16 bg-obsidian rounded-full flex items-center justify-center text-white hover:bg-acacia-green transition-colors shadow-lg shrink-0 lg:ml-2">
                    <Search size={24} />
                </button>
            </div>

            {/* Dropdown */}
            {isGuestOpen && (
                <div className="absolute top-full right-0 mt-4 w-full md:w-[400px] bg-white rounded-[32px] shadow-2xl p-8 z-10 border border-cloud-grey/10 animate-in slide-in-from-top-4 fade-in duration-200">
                    <div className="flex justify-between items-center mb-8 pb-4 border-b border-cloud-grey/10">
                         <div className="flex items-center gap-3">
                             <div className="w-8 h-8 rounded-full bg-wilderness-white flex items-center justify-center text-cloud-grey"><Users size={14}/></div>
                             <h4 className="font-bold text-lg">Room 1</h4>
                         </div>
                         <button className="text-cloud-grey hover:text-red-500 transition-colors"><Trash2 size={18} /></button>
                    </div>

                    {/* Adults */}
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <p className="font-bold text-obsidian text-lg">Adults</p>
                            <p className="text-xs text-cloud-grey font-medium uppercase tracking-wide mt-1">From 13 years old</p>
                        </div>
                        <div className="flex items-center gap-4">
                            <button className="w-10 h-10 rounded-full border border-cloud-grey/30 flex items-center justify-center text-obsidian hover:border-obsidian transition-colors hover:bg-wilderness-white"><Minus size={16}/></button>
                            <span className="font-bold w-6 text-center text-xl">2</span>
                            <button className="w-10 h-10 rounded-full border border-cloud-grey/30 flex items-center justify-center text-obsidian hover:border-obsidian transition-colors hover:bg-wilderness-white"><Plus size={16}/></button>
                        </div>
                    </div>

                    {/* Children Toggle */}
                    <div className="flex items-center justify-between mb-8">
                        <div>
                             <p className="font-bold text-obsidian text-lg">Children</p>
                             <p className="text-xs text-cloud-grey font-medium uppercase tracking-wide mt-1">Ages 0-12</p>
                        </div>
                        <div className="flex items-center gap-3">
                             {/* Simple Switch */}
                             <div className="w-14 h-8 bg-acacia-green rounded-full relative cursor-pointer shadow-inner">
                                 <div className="absolute right-1 top-1 w-6 h-6 bg-white rounded-full shadow-sm" />
                             </div>
                        </div>
                    </div>

                    {/* Children Counters (Age ranges) */}
                    <div className="pl-6 border-l-2 border-cloud-grey/10 space-y-6 mb-8">
                         <div className="flex items-center justify-between">
                            <p className="text-sm font-bold text-obsidian">0-3 years old</p>
                             <div className="flex items-center gap-3">
                                <button className="w-8 h-8 rounded-full border border-cloud-grey/30 flex items-center justify-center text-obsidian hover:border-obsidian transition-colors"><Minus size={14}/></button>
                                <span className="font-bold w-4 text-center text-base">0</span>
                                <button className="w-8 h-8 rounded-full border border-cloud-grey/30 flex items-center justify-center text-obsidian hover:border-obsidian transition-colors"><Plus size={14}/></button>
                            </div>
                         </div>
                         <div className="flex items-center justify-between">
                            <p className="text-sm font-bold text-obsidian">4-12 years old</p>
                             <div className="flex items-center gap-3">
                                <button className="w-8 h-8 rounded-full border border-cloud-grey/30 flex items-center justify-center text-obsidian hover:border-obsidian transition-colors"><Minus size={14}/></button>
                                <span className="font-bold w-4 text-center text-base">2</span>
                                <button className="w-8 h-8 rounded-full border border-cloud-grey/30 flex items-center justify-center text-obsidian hover:border-obsidian transition-colors"><Plus size={14}/></button>
                            </div>
                         </div>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-4 pt-4 border-t border-cloud-grey/10">
                        <button className="flex-1 py-4 border border-cloud-grey/20 rounded-2xl font-bold text-sm hover:bg-wilderness-white transition-colors">Add Room</button>
                        <button className="flex-1 py-4 bg-obsidian text-white rounded-2xl font-bold text-sm hover:bg-acacia-green transition-colors shadow-lg" onClick={() => setIsGuestOpen(false)}>Save</button>
                    </div>
                </div>
            )}
        </div>
    );
};

const ColorCard: React.FC<{name: string, hex: string, bg: string, text: string, border?: boolean}> = ({name, hex, bg, text, border}) => (
  <div className={`aspect-square rounded-[32px] ${bg} ${text} p-6 flex flex-col justify-between shadow-sm ${border ? 'border border-black/5' : ''}`}>
    <div className="text-lg font-bold">{hex}</div>
    <div className="text-sm font-medium opacity-80">{name}</div>
  </div>
);

export default StyleGuidePage;
