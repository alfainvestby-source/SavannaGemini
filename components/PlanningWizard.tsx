
import React, { useState } from 'react';
import { 
  ChevronRight, 
  ChevronLeft, 
  Compass, 
  Camera, 
  TreePine, 
  Binoculars, 
  Gem, 
  Tent, 
  Sparkles,
  Loader2,
  Calendar,
  MapPin,
  Clock,
  Sun,
  DollarSign,
  Share2,
  Download
} from 'lucide-react';
import { GoogleGenAI, Type } from "@google/genai";
import { Booking, BookingGuest } from '../types/schema';
import { useAuth } from '../lib/AuthContext';
import { saveItinerary } from '../lib/dbService';

interface PlanningWizardProps {
  onCancel: () => void;
}

const PlanningWizard: React.FC<PlanningWizardProps> = ({ onCancel }) => {
  const { user, signInWithGoogle } = useAuth();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [itinerary, setItinerary] = useState<any>(null);
  const [savedId, setSavedId] = useState<string | null>(null);

  // Form data aligns with 'Booking' model inputs
  const [formData, setFormData] = useState<{
    destination: string;
    duration: string;
    style: string;
    interests: string[];
    guests: BookingGuest[];
  }>({
    destination: '',
    duration: '7 Days',
    style: '',
    interests: [] as string[],
    guests: []
  });

  const destinations = [
    { name: 'Maasai Mara, Kenya', climate: 'High visibility', fauna: 'Big Five focus' },
    { name: 'Serengeti, Tanzania', climate: 'Great Migration', fauna: 'Predator rich' },
    { name: 'Okavango Delta, Botswana', climate: 'Water-based', fauna: 'Elephant herds' },
    { name: 'Kruger Park, South Africa', climate: 'Self-drive focus', fauna: 'Luxury lodges' }
  ];

  const styles = [
    { id: 'luxury', label: 'Ultra-Luxury Lodge', icon: <Gem size={20} />, desc: 'Helicopter transfers and private chefs.' },
    { id: 'classic', label: 'Classic Luxury Tent', icon: <Tent size={20} />, desc: 'High-end canvas experience.' },
    { id: 'adventure', label: 'Expedition Tents', icon: <Compass size={20} />, desc: 'Authentic bush experience.' }
  ];

  const interests = [
    { label: 'Wildlife Photography', icon: <Camera size={18} /> },
    { label: 'Bird Watching', icon: <Binoculars size={18} /> },
    { label: 'Conservation Focus', icon: <TreePine size={18} /> },
    { label: 'Cultural Immersion', icon: <Compass size={18} /> }
  ];

  const handleNext = () => setStep(step + 1);
  const handleBack = () => setStep(step - 1);

  const toggleInterest = (label: string) => {
    setFormData(prev => ({
      ...prev,
      interests: prev.interests.includes(label) 
        ? prev.interests.filter(i => i !== label)
        : [...prev.interests, label]
    }));
  };

  const generateItinerary = async () => {
    setLoading(true);
    setStep(5);
    
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      
      // We instruct the AI to generate a response that fits into our 'Safari' and 'BookingItinerary' DB models
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Generate a luxury safari itinerary for ${formData.duration} in ${formData.destination}. 
        Focus: ${formData.interests.join(', ')}. Style: ${formData.style}. 
        Include unique local details.`,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              title: { type: Type.STRING },
              description: { type: Type.STRING },
              priceRange: { type: Type.STRING },
              bestTimeToVisit: { type: Type.STRING },
              // This maps to 'BookingItinerary.details' JSON field in the schema
              days: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    day: { type: Type.INTEGER },
                    title: { type: Type.STRING },
                    activity: { type: Type.STRING },
                    lodge: { type: Type.STRING }, // Maps to 'Accommodation.name'
                    morning: { type: Type.STRING },
                    afternoon: { type: Type.STRING }
                  },
                  required: ["day", "title", "activity"]
                }
              }
            },
            required: ["title", "description", "days", "priceRange"]
          }
        }
      });

      const result = JSON.parse(response.text || '{}');
      setItinerary(result);
    } catch (err) {
      console.error(err);
      setItinerary({
        title: "Safari Expedition",
        description: "An unexpected digital sandstorm interrupted the AI. Please try again.",
        days: [],
        priceRange: "N/A"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSaveItinerary = async () => {
    if (!user) {
      alert("Please login to save your itinerary");
      signInWithGoogle();
      return;
    }

    if (!itinerary) return;

    setSaving(true);
    try {
      const id = await saveItinerary(user.uid, {
        ...itinerary,
        formData
      });
      if (id) {
        setSavedId(id);
        alert("Itinerary saved successfully!");
      }
    } catch (error) {
      console.error("Failed to save itinerary:", error);
      alert("Failed to save itinerary. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="pt-32 pb-24 px-6 max-w-5xl mx-auto min-h-screen flex flex-col">
      {step < 5 && (
        <div className="mb-12">
          <div className="flex justify-between items-center mb-4">
             <span className="text-xs font-bold uppercase tracking-widest text-acacia-green bg-acacia-green/10 px-3 py-1 rounded-full">Explorer Flow</span>
             <span className="text-xs font-bold text-cloud-grey">Step {step} of 4</span>
          </div>
          <div className="w-full h-1 bg-cloud-grey/10 rounded-full overflow-hidden">
            <div 
              className="h-full bg-acacia-green transition-all duration-700 ease-in-out" 
              style={{ width: `${(step/4)*100}%` }} 
            />
          </div>
        </div>
      )}

      <div className="flex-1 flex flex-col justify-center">
        {step === 1 && (
          <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="space-y-4">
              <h2 className="text-5xl md:text-6xl font-bold leading-tight">Where should we <br /> head first?</h2>
              <p className="text-xl text-cloud-grey">Choose a legendary ecosystem to begin your custom plan.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {destinations.map(d => (
                <button
                  key={d.name}
                  onClick={() => { setFormData({...formData, destination: d.name}); handleNext(); }}
                  className={`group p-8 rounded-[40px] border text-left transition-all ${formData.destination === d.name ? 'bg-savanna-sun border-savanna-sun shadow-2xl scale-[1.02]' : 'bg-white border-cloud-grey/20 hover:border-obsidian/20 hover:shadow-lg'}`}
                >
                  <div className="flex justify-between items-start mb-6">
                    <div className="p-4 bg-white/50 rounded-2xl group-hover:bg-white transition-colors">
                      <MapPin size={24} className="text-obsidian" />
                    </div>
                    <div className="text-[10px] font-bold uppercase tracking-tighter bg-black/5 px-2 py-1 rounded">{d.climate}</div>
                  </div>
                  <p className="font-bold text-2xl mb-1">{d.name}</p>
                  <p className="text-sm text-obsidian/40">{d.fauna}</p>
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="space-y-4">
              <h2 className="text-5xl md:text-6xl font-bold leading-tight text-obsidian">Define your <br /> base of operations.</h2>
              <p className="text-xl text-cloud-grey">Your choice of lodging defines the pace of your journey.</p>
            </div>
            <div className="grid grid-cols-1 gap-4">
              {styles.map(s => (
                <button
                  key={s.id}
                  onClick={() => { setFormData({...formData, style: s.label}); handleNext(); }}
                  className={`p-8 rounded-[40px] border flex items-center gap-8 text-left transition-all ${formData.style === s.label ? 'bg-savanna-sun border-savanna-sun shadow-2xl scale-[1.01]' : 'bg-white border-cloud-grey/20 hover:border-obsidian/20 hover:shadow-lg'}`}
                >
                  <div className="w-20 h-20 bg-white/50 rounded-3xl flex items-center justify-center shrink-0 shadow-sm">{s.icon}</div>
                  <div className="flex-1">
                    <p className="font-bold text-2xl mb-2">{s.label}</p>
                    <p className="text-base text-obsidian/50 leading-relaxed">{s.desc}</p>
                  </div>
                  <div className="w-12 h-12 rounded-full border border-black/5 flex items-center justify-center text-obsidian/20 group-hover:text-obsidian transition-colors">
                    <ChevronRight size={24} />
                  </div>
                </button>
              ))}
            </div>
            <button onClick={handleBack} className="text-obsidian/40 font-bold text-sm uppercase flex items-center gap-2 hover:text-obsidian py-4"><ChevronLeft size={16} /> Go Back</button>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="space-y-4">
              <h2 className="text-5xl md:text-6xl font-bold leading-tight">What draws you <br /> to the wild?</h2>
              <p className="text-xl text-cloud-grey">Select one or more focuses to train our AI model.</p>
            </div>
            <div className="grid grid-cols-2 gap-6">
              {interests.map(i => (
                <button
                  key={i.label}
                  onClick={() => toggleInterest(i.label)}
                  className={`p-10 rounded-[48px] border text-center flex flex-col items-center gap-6 transition-all ${formData.interests.includes(i.label) ? 'bg-savanna-sun border-savanna-sun shadow-2xl scale-[1.05]' : 'bg-white border-cloud-grey/20 hover:border-obsidian/20 hover:shadow-lg'}`}
                >
                  <div className={`w-20 h-20 rounded-full flex items-center justify-center transition-colors ${formData.interests.includes(i.label) ? 'bg-white' : 'bg-wilderness-white'}`}>
                    {i.icon}
                  </div>
                  <p className="font-bold text-xl">{i.label}</p>
                </button>
              ))}
            </div>
            <div className="flex items-center justify-between pt-12">
              <button onClick={handleBack} className="text-obsidian/40 font-bold text-sm uppercase flex items-center gap-2 hover:text-obsidian"><ChevronLeft size={16} /> Go Back</button>
              <button 
                onClick={handleNext}
                disabled={formData.interests.length === 0}
                className={`bg-black text-white px-12 py-6 rounded-full font-bold text-lg flex items-center gap-3 transition-all ${formData.interests.length === 0 ? 'opacity-20 cursor-not-allowed' : 'hover:scale-110 shadow-2xl shadow-black/20'}`}
              >
                Continue <ChevronRight size={20} />
              </button>
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h2 className="text-5xl md:text-7xl font-bold leading-tight text-center">Final <br /> <span className="text-cloud-grey">Expedition Sync.</span></h2>
            <div className="bg-white p-12 rounded-[56px] border border-cloud-grey/10 shadow-2xl space-y-12">
              <div className="grid grid-cols-2 gap-12 pb-12 border-b border-cloud-grey/10">
                <div className="space-y-1">
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-cloud-grey">Destination</p>
                  <p className="font-bold text-2xl">{formData.destination}</p>
                </div>
                <div className="space-y-1 text-right">
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-cloud-grey">Style</p>
                  <p className="font-bold text-2xl">{formData.style}</p>
                </div>
              </div>
              <div className="space-y-6">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-cloud-grey text-center">Expedition Duration</p>
                <div className="flex gap-4">
                  {['5 Days', '7 Days', '10 Days', '14 Days'].map(d => (
                    <button 
                      key={d}
                      onClick={() => setFormData({...formData, duration: d})}
                      className={`flex-1 py-5 rounded-[24px] border font-bold text-base transition-all ${formData.duration === d ? 'bg-black text-white border-black shadow-xl' : 'bg-wilderness-white/50 border-cloud-grey/20 hover:border-obsidian'}`}
                    >
                      {d}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-6 items-center">
              <button 
                onClick={generateItinerary}
                className="w-full max-w-lg bg-acacia-green text-white py-8 rounded-full font-bold text-2xl hover:scale-[1.05] active:scale-[0.98] transition-all flex items-center justify-center gap-4 shadow-2xl shadow-acacia-green/40"
              >
                <Sparkles size={28} /> Build Custom Journey
              </button>
              <button onClick={handleBack} className="text-obsidian/40 font-bold text-sm uppercase flex items-center justify-center gap-2 hover:text-obsidian"><ChevronLeft size={16} /> Edit Details</button>
            </div>
          </div>
        )}

        {step === 5 && (
          <div className="animate-in fade-in duration-1000">
            {loading ? (
              <div className="flex flex-col items-center justify-center space-y-12 py-32 text-center">
                <div className="relative">
                  <div className="w-32 h-32 border-[6px] border-acacia-green/10 border-t-acacia-green rounded-full animate-spin" />
                  <Sparkles className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-savanna-sun animate-pulse" size={40} />
                </div>
                <div className="space-y-4 max-w-sm">
                  <h3 className="text-4xl font-bold">Deploying Expert AI</h3>
                  <p className="text-cloud-grey text-lg leading-relaxed">Coordinating lodge inventory, vehicle availability, and wildlife migration heatmaps...</p>
                </div>
              </div>
            ) : itinerary && (
              <div className="space-y-16 pb-32">
                <div className="flex flex-col md:flex-row justify-between items-start gap-8">
                  <div className="space-y-4 max-w-3xl">
                    <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-savanna-sun text-obsidian font-bold text-xs uppercase tracking-widest shadow-sm">
                      <Sparkles size={14} /> Optimized Itinerary
                    </div>
                    <h2 className="text-5xl md:text-7xl font-bold leading-tight tracking-tight">{itinerary.title}</h2>
                    <p className="text-2xl text-obsidian/50 leading-relaxed font-light">{itinerary.description}</p>
                  </div>
                  <div className="flex gap-3">
                    <button className="p-4 rounded-full bg-white border border-cloud-grey/20 hover:bg-wilderness-white transition-colors shadow-sm"><Share2 size={20} /></button>
                    <button className="p-4 rounded-full bg-white border border-cloud-grey/20 hover:bg-wilderness-white transition-colors shadow-sm"><Download size={20} /></button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-white p-8 rounded-[40px] border border-cloud-grey/10 shadow-sm flex flex-col justify-center items-center text-center">
                    <DollarSign size={24} className="text-acacia-green mb-4" />
                    <p className="text-xs font-bold text-cloud-grey uppercase tracking-widest mb-1">Est. Investment</p>
                    <p className="text-2xl font-bold">{itinerary.priceRange}</p>
                  </div>
                  <div className="bg-white p-8 rounded-[40px] border border-cloud-grey/10 shadow-sm flex flex-col justify-center items-center text-center">
                    <Sun size={24} className="text-savanna-sun mb-4" />
                    <p className="text-xs font-bold text-cloud-grey uppercase tracking-widest mb-1">Best Window</p>
                    <p className="text-2xl font-bold">{itinerary.bestTimeToVisit}</p>
                  </div>
                  <div className="bg-white p-8 rounded-[40px] border border-cloud-grey/10 shadow-sm flex flex-col justify-center items-center text-center">
                    <Calendar size={24} className="text-acacia-green mb-4" />
                    <p className="text-xs font-bold text-cloud-grey uppercase tracking-widest mb-1">Days Planned</p>
                    <p className="text-2xl font-bold">{itinerary.days.length} Days</p>
                  </div>
                </div>

                <div className="space-y-8">
                  <div className="flex items-center justify-between">
                    <h3 className="text-3xl font-bold">Daily Expeditions</h3>
                    <div className="h-px flex-1 mx-8 bg-cloud-grey/10" />
                  </div>
                  <div className="grid grid-cols-1 gap-8">
                    {itinerary.days.map((d: any) => (
                      <div key={d.day} className="group relative flex flex-col md:flex-row gap-8 bg-white p-10 rounded-[48px] border border-cloud-grey/10 hover:shadow-2xl hover:scale-[1.01] transition-all duration-500 overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-savanna-sun/5 rounded-full -mr-32 -mt-32 transition-colors group-hover:bg-savanna-sun/10" />
                        
                        <div className="flex-shrink-0 w-24 h-24 bg-wilderness-white rounded-[32px] flex flex-col items-center justify-center font-bold text-obsidian group-hover:bg-savanna-sun transition-all shadow-inner">
                          <span className="text-xs uppercase tracking-tighter opacity-40">Day</span>
                          <span className="text-4xl leading-none">{d.day}</span>
                        </div>

                        <div className="flex-1 space-y-6 relative">
                          <div className="space-y-2">
                            <h4 className="font-bold text-3xl mb-1">{d.title}</h4>
                            <div className="flex items-center gap-4 text-cloud-grey">
                              <span className="flex items-center gap-2 text-xs font-bold uppercase"><MapPin size={12} /> Wilderness Sector A-4</span>
                              <span className="w-1 h-1 bg-cloud-grey/40 rounded-full" />
                              <span className="flex items-center gap-2 text-xs font-bold uppercase"><Clock size={12} /> Sunrise to Sunset</span>
                            </div>
                          </div>
                          
                          <p className="text-xl text-obsidian/70 leading-relaxed font-light">{d.activity}</p>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                             {d.morning && (
                                <div className="p-4 bg-wilderness-white/40 rounded-2xl border border-black/5">
                                  <p className="text-[10px] font-bold text-cloud-grey uppercase tracking-widest mb-2">Morning Session</p>
                                  <p className="text-sm font-medium">{d.morning}</p>
                                </div>
                             )}
                             {d.afternoon && (
                                <div className="p-4 bg-wilderness-white/40 rounded-2xl border border-black/5">
                                  <p className="text-[10px] font-bold text-cloud-grey uppercase tracking-widest mb-2">Evening Session</p>
                                  <p className="text-sm font-medium">{d.afternoon}</p>
                                </div>
                             )}
                          </div>

                          <div className="flex items-center justify-between pt-6 border-t border-cloud-grey/10">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 bg-acacia-green/10 rounded-full flex items-center justify-center text-acacia-green">
                                <Tent size={18} />
                              </div>
                              <div>
                                <p className="text-[10px] font-bold text-cloud-grey uppercase tracking-widest">Base Camp</p>
                                <p className="font-bold text-sm">{d.lodge}</p>
                              </div>
                            </div>
                            <button className="text-xs font-bold uppercase tracking-widest text-obsidian border-b-2 border-obsidian pb-1 hover:text-acacia-green hover:border-acacia-green transition-all">View Lodge Map</button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="relative assistant-gradient p-12 md:p-20 rounded-[64px] shadow-3xl overflow-hidden group">
                  <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-12 text-center md:text-left">
                    <div className="space-y-4">
                      <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.3em] text-black/40">Secure Checkout</div>
                      <h4 className="text-4xl md:text-6xl font-bold tracking-tight">Secure your spot <br /> in the wild.</h4>
                      <p className="text-xl text-obsidian/50 max-w-xl">
                        This plan is synchronized with local operator fleets. Book now to lock in these verified rates and migration access.
                      </p>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
                       <button onClick={onCancel} className="w-full sm:w-auto px-10 py-6 rounded-full font-bold text-lg bg-white/40 hover:bg-white transition-all shadow-sm">
                        Keep Browsing
                      </button>
                      <button 
                        onClick={handleSaveItinerary}
                        disabled={saving || !!savedId}
                        className={`w-full sm:w-auto px-12 py-6 rounded-full font-bold text-lg shadow-2xl transition-all flex items-center justify-center gap-2 ${savedId ? 'bg-acacia-green text-white' : 'bg-black text-white hover:scale-110 active:scale-95'}`}
                      >
                        {saving ? <Loader2 size={20} className="animate-spin" /> : savedId ? 'Saved!' : 'Save Itinerary'}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default PlanningWizard;
