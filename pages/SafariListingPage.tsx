
import React, { useEffect, useState } from 'react';
import { Filter, ChevronDown, Check, ArrowRight, Star, Clock, MapPin, Calendar, Users, Truck, Tent, SlidersHorizontal, X, Gem, ArrowLeftRight } from 'lucide-react';
import { safariContent, SafariCategory } from '../data/safariContent';
import FAQ from '../components/FAQ';
import { useCompare } from '../lib/CompareContext';

interface SafariListingPageProps {
  category: SafariCategory;
  slug: string;
  onNavigate: (category: SafariCategory, slug: string) => void;
  onTourClick: (id: string, slug: string) => void;
}

const SafariListingPage: React.FC<SafariListingPageProps> = ({ category, slug, onNavigate, onTourClick }) => {
  const content = safariContent[slug] || safariContent['default'];
  const [priceRange, setPriceRange] = useState<[number, number]>([3000, 9500]);
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const { compareList, addToCompare, removeFromCompare, isInCompare } = useCompare();

  // SEO: Update Title
  useEffect(() => {
    document.title = `${content.title} | Savanna Safaris`;
  }, [content]);

  // Schema.org Structured Data
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": content.faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  const kenyaParks = [
    { name: 'Masai Mara National Reserve', slug: 'masai-mara', image: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&q=80&w=800' },
    { name: 'Lake Nakuru National Park', slug: 'lake-nakuru', image: 'https://images.unsplash.com/photo-1534759863358-796a7a0f49c6?auto=format&fit=crop&q=80&w=800' },
    { name: 'Amboseli National Park', slug: 'amboseli', image: 'https://images.unsplash.com/photo-1557050543-4d5f4e07ef46?auto=format&fit=crop&q=80&w=800' },
    { name: 'Nairobi National Park', slug: 'nairobi-np', image: 'https://images.unsplash.com/photo-1546182990-dffeafbe841d?auto=format&fit=crop&q=80&w=800' }
  ];

  return (
    <div className="animate-in fade-in duration-700 bg-wilderness-white">
      {/* Inject Schema */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* Hero Section */}
      <section className="relative h-[45vh] md:h-[50vh] min-h-[400px] flex items-center justify-center overflow-hidden">
        <img 
          src={content.image} 
          alt={content.title} 
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-wilderness-white" />
        
        <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto pt-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 md:px-4 md:py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 mb-4 md:mb-6">
            <span className="text-[10px] md:text-xs font-bold uppercase tracking-widest">{category === 'all' ? 'Explore' : category}</span>
          </div>
          <h1 className="text-4xl md:text-7xl font-bold mb-3 md:mb-4 tracking-tight leading-tight">{content.title}</h1>
          <p className="text-base md:text-xl font-light text-white/80 leading-relaxed max-w-xl md:max-w-2xl mx-auto line-clamp-3 md:line-clamp-none">{content.subtitle}</p>
        </div>
      </section>

      {/* Quick Filters Bar (Dates & Guests) */}
      <div className="relative z-30 px-4 md:px-6 -mt-16 md:-mt-8 mb-8 md:mb-12">
        <div className="max-w-5xl mx-auto bg-white rounded-3xl md:rounded-full shadow-xl border border-cloud-grey/10 p-4 md:p-2 flex flex-col md:flex-row items-stretch md:items-center gap-4 md:gap-2">
          <div className="flex-1 flex items-center gap-4 px-2 md:px-6 py-2 md:py-3 w-full border-b md:border-b-0 md:border-r border-cloud-grey/10">
            <Calendar className="text-acacia-green shrink-0" size={20} />
            <div className="flex-1">
              <p className="text-[10px] font-bold uppercase text-cloud-grey tracking-widest">Start Date</p>
              <input type="date" className="w-full bg-transparent text-sm font-bold text-obsidian outline-none cursor-pointer h-8" />
            </div>
          </div>
          <div className="flex-1 flex items-center gap-4 px-2 md:px-6 py-2 md:py-3 w-full md:border-r border-cloud-grey/10">
            <Users className="text-acacia-green shrink-0" size={20} />
            <div className="flex-1">
              <p className="text-[10px] font-bold uppercase text-cloud-grey tracking-widest">Travellers</p>
              <select className="w-full bg-transparent text-sm font-bold text-obsidian outline-none cursor-pointer appearance-none h-8 bg-none">
                <option>2 Adults</option>
                <option>1 Adult</option>
                <option>2 Adults, 2 Children</option>
                <option>Group (5+)</option>
              </select>
            </div>
          </div>
          <button className="bg-obsidian text-white rounded-2xl md:rounded-full px-8 py-4 font-bold text-sm hover:scale-105 transition-transform w-full md:w-auto shadow-md active:scale-95">
            Update Search
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-6 pb-24 flex flex-col lg:flex-row gap-8 lg:gap-12 relative">
        
        {/* Mobile Filter Toggle (Sticky) */}
        <div className="lg:hidden sticky top-20 z-20 -mx-4 px-4 pb-2 pointer-events-none">
          <button 
            onClick={() => setShowMobileFilters(!showMobileFilters)}
            className="pointer-events-auto w-full flex items-center justify-center gap-2 bg-obsidian text-white border border-white/10 p-3 rounded-full font-bold text-sm shadow-xl backdrop-blur-md"
          >
            <SlidersHorizontal size={16} /> Filter Results
          </button>
        </div>

        {/* Sidebar Filters */}
        <aside className={`lg:w-1/4 space-y-8 ${showMobileFilters ? 'fixed inset-0 z-50 bg-white p-6 overflow-y-auto animate-in slide-in-from-bottom-5' : 'hidden lg:block'}`}>
          {showMobileFilters && (
            <div className="flex justify-between items-center mb-6 sticky top-0 bg-white z-10 py-2 border-b border-cloud-grey/10">
              <h3 className="font-bold text-xl">Filters</h3>
              <button onClick={() => setShowMobileFilters(false)} className="p-2 bg-cloud-grey/10 rounded-full"><X size={20} /></button>
            </div>
          )}

          <div className="bg-white lg:bg-transparent lg:p-0 rounded-[24px]">
            <div className="hidden lg:flex items-center gap-2 mb-6 pb-4 border-b border-cloud-grey/10">
              <Filter size={20} className="text-acacia-green" />
              <h3 className="font-bold text-lg">Refine Results</h3>
            </div>

            <div className="mb-10 space-y-4">
              <h4 className="text-[10px] font-bold uppercase text-cloud-grey tracking-widest px-2">Quick Access</h4>
              <div className="space-y-1">
                <button 
                  onClick={() => onNavigate('type', 'luxury')}
                  className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-bold text-obsidian/60 hover:bg-savanna-sun hover:text-obsidian transition-all text-left group"
                >
                  <Gem size={16} className="text-cloud-grey group-hover:text-obsidian" />
                  Luxury Experiences
                </button>
                <button 
                  onClick={() => onNavigate('type', 'family')}
                  className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-bold text-obsidian/60 hover:bg-savanna-sun hover:text-obsidian transition-all text-left group"
                >
                  <Users size={16} className="text-cloud-grey group-hover:text-obsidian" />
                  Family Safaris
                </button>
              </div>
            </div>
            
            <div className="space-y-8 pb-20 lg:pb-0">
              {/* Price Range */}
              <FilterSection title="Budget (Per Person)">
                <div className="space-y-6">
                  <div className="flex justify-between text-sm font-bold text-obsidian">
                    <span>${priceRange[0]}</span>
                    <span>${priceRange[1]}+</span>
                  </div>
                  
                  <div className="relative h-2 w-full pt-1">
                      {/* Grey background track */}
                      <div className="absolute top-0 bottom-0 left-0 right-0 h-1.5 bg-cloud-grey/20 rounded-full" />
                      
                      {/* Black active track */}
                      <div 
                          className="absolute top-0 bottom-0 h-1.5 bg-obsidian rounded-full"
                          style={{
                              left: `${((priceRange[0] - 1000) / 19000) * 100}%`,
                              right: `${100 - ((priceRange[1] - 1000) / 19000) * 100}%`
                          }}
                      />

                      {/* Inputs */}
                      <input 
                          type="range"
                          min={1000}
                          max={20000}
                          step={500}
                          value={priceRange[0]}
                          onChange={(e) => {
                              const val = Math.min(Number(e.target.value), priceRange[1] - 500);
                              setPriceRange([val, priceRange[1]]);
                          }}
                          className="absolute top-[-5px] left-0 w-full h-4 appearance-none bg-transparent pointer-events-none [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-obsidian [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-white [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:shadow-md [&::-moz-range-thumb]:pointer-events-auto [&::-moz-range-thumb]:w-5 [&::-moz-range-thumb]:h-5 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-obsidian [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-white [&::-moz-range-thumb]:cursor-pointer [&::-moz-range-thumb]:shadow-md"
                      />
                      <input 
                          type="range"
                          min={1000}
                          max={20000}
                          step={500}
                          value={priceRange[1]}
                          onChange={(e) => {
                              const val = Math.max(Number(e.target.value), priceRange[0] + 500);
                              setPriceRange([priceRange[0], val]);
                          }}
                          className="absolute top-[-5px] left-0 w-full h-4 appearance-none bg-transparent pointer-events-none [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-obsidian [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-white [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:shadow-md [&::-moz-range-thumb]:pointer-events-auto [&::-moz-range-thumb]:w-5 [&::-moz-range-thumb]:h-5 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-obsidian [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-white [&::-moz-range-thumb]:cursor-pointer [&::-moz-range-thumb]:shadow-md"
                      />
                  </div>
                </div>
              </FilterSection>

              {/* Tour Length */}
              <FilterSection title="Tour Length">
                <div className="space-y-3">
                  {['1-3 Days (Short)', '4-7 Days (Classic)', '8-14 Days (Extended)', '15+ Days (Grand)'].map(opt => (
                    <Checkbox key={opt} label={opt} />
                  ))}
                </div>
              </FilterSection>

              {/* Comfort Level */}
              <FilterSection title="Comfort Level">
                <div className="space-y-3">
                  <Checkbox label="Adventure Camping" icon={<Tent size={16} />} />
                  <Checkbox label="Comfort Lodges" />
                  <Checkbox label="Luxury Tented Camps" icon={<Star size={16} className="fill-current" />} />
                  <Checkbox label="Ultra-Luxury Private" icon={<Star size={16} className="fill-current text-savanna-sun" />} />
                </div>
              </FilterSection>

              {/* Vehicle Type (Crucial for Safari) */}
              <FilterSection title="Vehicle Type">
                <div className="space-y-3">
                  <Checkbox label="4x4 Land Cruiser" icon={<Truck size={16} />} defaultChecked />
                  <Checkbox label="Safari Minivan" />
                  <Checkbox label="Fly-in (Light Aircraft)" />
                </div>
              </FilterSection>

              {/* Privacy */}
              <FilterSection title="Privacy">
                 <div className="flex gap-2 p-1 bg-cloud-grey/10 rounded-xl">
                    <button className="flex-1 py-3 lg:py-2 text-xs font-bold rounded-lg bg-white shadow-sm">Private</button>
                    <button className="flex-1 py-3 lg:py-2 text-xs font-bold rounded-lg text-cloud-grey hover:bg-white/50">Shared</button>
                 </div>
              </FilterSection>

              {/* Features */}
              <FilterSection title="Special Interest">
                <div className="space-y-3">
                  <Checkbox label="Family Friendly (Kids 6+)" />
                  <Checkbox label="Big Five Focus" />
                  <Checkbox label="Great Migration" />
                  <Checkbox label="Cultural Visits" />
                </div>
              </FilterSection>

              {showMobileFilters && (
                <button 
                  onClick={() => setShowMobileFilters(false)}
                  className="w-full bg-obsidian text-white py-4 rounded-xl font-bold text-sm shadow-lg sticky bottom-4"
                >
                  Show 24 Safaris
                </button>
              )}
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <div className="lg:w-3/4 space-y-8">
          {/* Intro Content */}
          <section className="bg-white p-6 md:p-8 rounded-[32px] border border-cloud-grey/10 leading-relaxed text-obsidian/80 text-base md:text-lg font-light shadow-sm">
            <p>{content.description}</p>
          </section>

          {/* Country Parks (Only show if category is country and slug is kenya) */}
          {category === 'country' && slug === 'kenya' && (
            <section className="pt-4">
              <h2 className="text-2xl md:text-3xl font-bold mb-6">Explore Parks in Kenya</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {kenyaParks.map((park) => (
                  <div 
                    key={park.slug}
                    onClick={() => onNavigate('park', park.slug)}
                    className="relative h-64 rounded-[24px] overflow-hidden group cursor-pointer shadow-md"
                  >
                    <img 
                      src={park.image} 
                      alt={park.name} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-90" />
                    <div className="absolute bottom-0 left-0 p-6 w-full">
                      <h3 className="text-xl font-bold text-white mb-1">{park.name}</h3>
                      <p className="text-white/80 text-sm font-medium flex items-center gap-1">
                        Explore Park <ArrowRight size={14} />
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Safari Results */}
          <section>
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
              <h2 className="text-2xl md:text-3xl font-bold">Top {content.title}</h2>
              <button className="flex items-center justify-between gap-2 text-sm font-bold border border-cloud-grey/20 px-4 py-3 md:py-2 rounded-full hover:bg-white transition-colors w-full md:w-auto">
                <span>Sort: Recommended</span> <ChevronDown size={14} />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
              {[1, 2, 3, 4, 5, 6].map((item) => {
                const tourId = item.toString();
                const tourTitle = slug === 'gorilla-trekking' ? 'Bwindi Habituation Experience' : 'Classic Mara Expedition';
                const tourSlug = slug === 'gorilla-trekking' ? 'bwindi-habituation-experience' : 'classic-mara-expedition';
                const isCompared = isInCompare(tourId);
                
                return (
                <div 
                  key={item} 
                  className="bg-white rounded-[32px] overflow-hidden border border-cloud-grey/10 group hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 flex flex-col"
                >
                  <div 
                    className="aspect-[4/3] overflow-hidden relative cursor-pointer"
                    onClick={() => onTourClick(tourId, tourSlug)}
                  >
                    <img 
                      src={`https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&q=80&w=800&random=${item}`} 
                      alt="Safari" 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full flex items-center gap-1 text-xs font-bold shadow-sm">
                       <Star size={12} className="text-savanna-sun fill-savanna-sun" /> 4.9 (124)
                    </div>
                    {item === 2 && (
                       <div className="absolute top-4 left-4 bg-acacia-green text-white px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest shadow-sm">
                         Best Seller
                       </div>
                    )}
                  </div>
                  <div className="p-5 md:p-6 space-y-4 flex-grow flex flex-col">
                    <div className="flex justify-between items-start">
                      <h3 
                        className="text-lg md:text-xl font-bold leading-tight cursor-pointer hover:text-acacia-green transition-colors"
                        onClick={() => onTourClick(tourId, tourSlug)}
                      >
                        {tourTitle}
                      </h3>
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          if (isCompared) {
                            removeFromCompare(tourId);
                          } else {
                            addToCompare({
                              id: tourId,
                              title: tourTitle,
                              image: `https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&q=80&w=800&random=${item}`,
                              price: 3200,
                              days: 7,
                              location: slug === 'tanzania' ? 'Serengeti, Ngorongoro' : 'Masai Mara, Lake Nakuru'
                            });
                          }
                        }}
                        className={`p-2 rounded-full transition-colors ${isCompared ? 'bg-obsidian text-white' : 'bg-cloud-grey/10 text-cloud-grey hover:bg-cloud-grey/20 hover:text-obsidian'}`}
                        title={isCompared ? "Remove from compare" : "Add to compare"}
                      >
                        <ArrowLeftRight size={16} />
                      </button>
                    </div>
                    
                    <div className="flex flex-wrap gap-2 md:gap-3">
                       <span className="px-2 py-1.5 bg-cloud-grey/10 rounded-md text-[10px] font-bold uppercase text-obsidian/60 flex items-center gap-1"><Clock size={12} /> 7 Days</span>
                       <span className="px-2 py-1.5 bg-cloud-grey/10 rounded-md text-[10px] font-bold uppercase text-obsidian/60 flex items-center gap-1"><Users size={12} /> Max 6</span>
                       <span className="px-2 py-1.5 bg-cloud-grey/10 rounded-md text-[10px] font-bold uppercase text-obsidian/60 flex items-center gap-1"><Truck size={12} /> 4x4</span>
                    </div>

                    <div className="flex items-center gap-1 text-sm text-cloud-grey mt-auto">
                      <MapPin size={16} className="text-acacia-green shrink-0" /> 
                      <span className="truncate">{slug === 'tanzania' ? 'Serengeti, Ngorongoro' : 'Masai Mara, Lake Nakuru'}</span>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-cloud-grey/10">
                      <div>
                        <p className="text-[10px] font-bold uppercase tracking-widest text-cloud-grey">From</p>
                        <p className="text-xl font-bold text-obsidian">$3,200 <span className="text-sm font-normal text-cloud-grey">/ pp</span></p>
                      </div>
                      <button 
                        onClick={() => onTourClick(tourId, tourSlug)}
                        className="bg-savanna-sun text-obsidian w-10 h-10 rounded-full flex items-center justify-center hover:scale-110 transition-transform shadow-md"
                      >
                        <ArrowRight size={20} />
                      </button>
                    </div>
                  </div>
                </div>
              )})}
            </div>
          </section>

          {/* FAQ Section */}
          <section className="py-12 md:py-20 border-t border-cloud-grey/10">
            <h2 className="text-3xl md:text-5xl font-bold mb-12 text-center">FAQ's</h2>
            <FAQ items={content.faqs} className="max-w-4xl mx-auto" />
          </section>

          {/* Related Links */}
          <section className="py-12 bg-savanna-sun/10 rounded-[48px] p-6 md:p-8 text-center">
             <h3 className="text-xl md:text-2xl font-bold mb-6">Explore more destinations</h3>
             <div className="flex flex-wrap justify-center gap-3 md:gap-4">
                {['Botswana', 'Kenya', 'Tanzania', 'Luxury', 'Honeymoon'].map(tag => (
                   <button 
                    key={tag}
                    onClick={() => onNavigate('country', tag.toLowerCase())}
                    className="bg-white border border-cloud-grey/10 px-5 py-2.5 rounded-full text-xs md:text-sm font-bold hover:bg-obsidian hover:text-white transition-all shadow-sm"
                   >
                     {tag}
                   </button>
                ))}
             </div>
          </section>
        </div>
      </div>
    </div>
  );
};

const FilterSection: React.FC<{title: string, children: React.ReactNode}> = ({title, children}) => (
  <div className="space-y-3">
    <h4 className="text-xs font-bold uppercase text-cloud-grey tracking-widest">{title}</h4>
    {children}
  </div>
);

const Checkbox: React.FC<{label: string, icon?: React.ReactNode, defaultChecked?: boolean}> = ({label, icon, defaultChecked}) => (
  <label className="flex items-center justify-between cursor-pointer group p-3 hover:bg-cloud-grey/5 rounded-xl transition-colors -mx-2 touch-manipulation">
    <div className="flex items-center gap-3">
      <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${defaultChecked ? 'bg-obsidian border-obsidian' : 'border-cloud-grey/40 group-hover:border-obsidian'}`}>
        <Check size={12} className={`text-white ${defaultChecked ? 'opacity-100' : 'opacity-0'}`} />
      </div>
      <span className="text-sm text-obsidian/80 group-hover:text-obsidian font-medium">{label}</span>
    </div>
    {icon && <span className="text-cloud-grey group-hover:text-obsidian transition-colors">{icon}</span>}
  </label>
);

export default SafariListingPage;
