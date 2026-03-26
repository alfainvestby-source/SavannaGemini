import React, { useEffect } from 'react';
import { useCompare } from '../lib/CompareContext';
import { useAuth } from '../lib/AuthContext';
import { ArrowLeft, MapPin, Star, Clock, Trash2, Check, X } from 'lucide-react';

interface ComparePageProps {
  onBack: () => void;
  onTourClick: (id: string, slug: string) => void;
}

const ComparePage: React.FC<ComparePageProps> = ({ onBack, onTourClick }) => {
  const { compareList, removeFromCompare, clearCompare } = useCompare();
  const { user } = useAuth();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!user) {
    return (
      <div className="min-h-screen bg-wilderness-white pt-32 pb-20 px-6 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-obsidian mb-4">Create account to view compared tours</h2>
          <button onClick={onBack} className="px-6 py-3 bg-obsidian text-white rounded-full font-bold">
            Go Back
          </button>
        </div>
      </div>
    );
  }

  if (compareList.length === 0) {
    return (
      <div className="min-h-screen bg-wilderness-white pt-32 pb-20 px-6 animate-in fade-in duration-700">
        <div className="max-w-7xl mx-auto">
          <button onClick={onBack} className="flex items-center gap-2 text-cloud-grey hover:text-obsidian mb-8 transition-colors">
            <ArrowLeft size={20} /> Back to Safaris
          </button>
          <div className="bg-white rounded-[40px] p-12 md:p-20 text-center border border-cloud-grey/10 shadow-sm flex flex-col items-center">
            <h2 className="text-2xl font-bold text-obsidian mb-4">No tours to compare</h2>
            <p className="text-cloud-grey mb-8 max-w-md">
              Explore our collection of safaris and add them to compare.
            </p>
            <button 
              onClick={onBack}
              className="px-8 py-4 bg-obsidian text-white rounded-full font-bold hover:bg-black/80 transition-colors"
            >
              Explore Safaris
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-wilderness-white pt-32 pb-20 px-6 animate-in fade-in duration-700">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <div>
            <button onClick={onBack} className="flex items-center gap-2 text-cloud-grey hover:text-obsidian mb-4 transition-colors">
              <ArrowLeft size={20} /> Back to Safaris
            </button>
            <h1 className="text-4xl md:text-6xl font-bold text-obsidian tracking-tight mb-4">
              Compare Tours
            </h1>
            <p className="text-cloud-grey text-lg max-w-2xl">
              Comparing {compareList.length} {compareList.length === 1 ? 'safari' : 'safaris'} side-by-side.
            </p>
          </div>
          
          <button 
            onClick={() => {
              clearCompare();
              onBack();
            }}
            className="flex items-center gap-2 px-6 py-3 bg-white border border-cloud-grey/20 rounded-full font-bold text-obsidian hover:bg-black/5 transition-colors shadow-sm"
          >
            <Trash2 size={18} />
            Clear All
          </button>
        </div>

        <div className="overflow-x-auto pb-8">
          <div className="flex gap-6 min-w-max">
            {compareList.map((tour) => (
              <div key={tour.id} className="w-80 bg-white rounded-[32px] overflow-hidden border border-cloud-grey/10 shadow-sm flex flex-col">
                <div className="aspect-[4/3] relative">
                  <img src={tour.image} alt={tour.title} className="w-full h-full object-cover" />
                  <button 
                    onClick={() => removeFromCompare(tour.id)}
                    className="absolute top-4 right-4 w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-cloud-grey hover:text-red-500 transition-colors shadow-sm"
                  >
                    <X size={16} />
                  </button>
                </div>
                
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-xl font-bold text-obsidian mb-2 line-clamp-2 leading-tight">
                    {tour.title}
                  </h3>
                  <div className="flex items-center gap-1 text-sm text-cloud-grey mb-6">
                    <MapPin size={14} className="text-acacia-green" />
                    <span className="truncate">{tour.location}</span>
                  </div>

                  <div className="space-y-4 flex-grow">
                    <div className="flex justify-between items-center py-3 border-b border-cloud-grey/10">
                      <span className="text-sm font-bold text-cloud-grey uppercase tracking-widest">Price</span>
                      <span className="text-lg font-bold text-obsidian">${tour.price?.toLocaleString() || '1,200'}</span>
                    </div>
                    <div className="flex justify-between items-center py-3 border-b border-cloud-grey/10">
                      <span className="text-sm font-bold text-cloud-grey uppercase tracking-widest">Duration</span>
                      <span className="text-base font-bold text-obsidian flex items-center gap-1"><Clock size={16} className="text-acacia-green" /> {tour.days} Days</span>
                    </div>
                    <div className="flex justify-between items-center py-3 border-b border-cloud-grey/10">
                      <span className="text-sm font-bold text-cloud-grey uppercase tracking-widest">Rating</span>
                      <span className="text-base font-bold text-obsidian flex items-center gap-1"><Star size={16} className="text-savanna-sun fill-savanna-sun" /> 4.9</span>
                    </div>
                    <div className="flex justify-between items-center py-3 border-b border-cloud-grey/10">
                      <span className="text-sm font-bold text-cloud-grey uppercase tracking-widest">Operator</span>
                      <span className="text-base font-bold text-obsidian truncate max-w-[120px]">{tour.operator || 'Savanna Partners'}</span>
                    </div>
                  </div>

                  <button 
                    onClick={() => onTourClick(tour.id, tour.title.toLowerCase().replace(/\s+/g, '-'))}
                    className="w-full mt-6 py-4 bg-obsidian text-white rounded-full font-bold hover:bg-black/80 transition-colors"
                  >
                    View Details
                  </button>
                </div>
              </div>
            ))}
            
            {compareList.length < 3 && (
              <div className="w-80 bg-cloud-grey/5 rounded-[32px] border-2 border-dashed border-cloud-grey/20 flex flex-col items-center justify-center p-8 text-center">
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mb-4 shadow-sm">
                  <span className="text-2xl font-bold text-cloud-grey">+</span>
                </div>
                <h3 className="text-lg font-bold text-obsidian mb-2">Add another tour</h3>
                <p className="text-sm text-cloud-grey">You can compare up to 3 tours side-by-side.</p>
                <button 
                  onClick={onBack}
                  className="mt-6 px-6 py-3 bg-white border border-cloud-grey/20 rounded-full font-bold text-obsidian hover:bg-black/5 transition-colors shadow-sm"
                >
                  Browse Safaris
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComparePage;
