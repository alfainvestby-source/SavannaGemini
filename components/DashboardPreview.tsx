
import React from 'react';
import { Search, Plus, Bell, Info, Sun, DollarSign, Users, MapPin, MoreHorizontal } from 'lucide-react';

interface DashboardPreviewProps {
  onNewItinerary?: () => void;
}

const DashboardPreview: React.FC<DashboardPreviewProps> = ({ onNewItinerary }) => {
  return (
    <div className="bg-white rounded-[40px] shadow-2xl overflow-hidden border border-cloud-grey/20 max-w-6xl mx-auto">
      {/* Top Bar */}
      <div className="flex items-center justify-between px-8 py-4 bg-wilderness-white border-b border-cloud-grey/10">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-savanna-sun rounded-full flex items-center justify-center">
              <div className="w-1 h-1 bg-black rounded-full" />
            </div>
          </div>
          <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-xl border border-cloud-grey/20 text-sm font-medium">
            <span>Expedition Planning</span>
            <span className="text-cloud-grey">×</span>
          </div>
          <button 
            onClick={onNewItinerary}
            className="flex items-center gap-2 px-4 py-2 rounded-xl border border-obsidian/10 bg-white hover:bg-obsidian/5 transition-colors text-sm font-medium"
          >
            <Plus size={16} />
            <span>New Itinerary</span>
            <span className="text-cloud-grey ml-2 text-xs">⌘ K</span>
          </button>
        </div>
        <div className="flex items-center gap-4">
          <button className="p-2 text-cloud-grey hover:text-obsidian"><Info size={20} /></button>
          <div className="w-8 h-8 bg-cloud-grey/20 rounded-full" />
        </div>
      </div>

      <div className="flex flex-col lg:flex-row h-[700px]">
        {/* Sidebar Mini */}
        <div className="hidden lg:flex flex-col items-center py-8 gap-8 border-r border-cloud-grey/10 px-4 bg-wilderness-white">
          <button className="p-2 text-obsidian bg-white rounded-xl shadow-sm"><Search size={20} /></button>
          <button className="p-2 text-cloud-grey"><Users size={20} /></button>
          <button className="p-2 text-cloud-grey"><MapPin size={20} /></button>
          <button className="p-2 text-cloud-grey"><Bell size={20} /></button>
          <div className="mt-auto pt-8 border-t border-cloud-grey/10 flex flex-col items-center gap-6">
             <div className="w-10 h-10 rounded-full overflow-hidden bg-cloud-grey/20">
              <img src="https://picsum.photos/seed/user1/100/100" alt="Avatar" />
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 p-8 overflow-y-auto space-y-8 bg-wilderness-white custom-scrollbar">
          {/* Main Hero Card */}
          <div className="relative rounded-[32px] overflow-hidden h-[300px] shrink-0">
             <img 
              src="https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&q=80&w=2000" 
              alt="Serengeti"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute top-6 left-6 flex items-center gap-2 bg-white/20 backdrop-blur-md px-4 py-2 rounded-full border border-white/30 text-white text-xs">
              <MapPin size={14} /> Tanzania
            </div>
            <div className="absolute bottom-10 left-10">
              <h3 className="text-5xl font-bold text-white mb-2 leading-none">Serengeti</h3>
              <p className="text-white/70 max-w-lg text-sm leading-relaxed">
                The Serengeti ecosystem is a geographical region in Africa, spanning northern Tanzania. 
                It is famous for the largest terrestrial mammal migration.
              </p>
            </div>
            <div className="absolute bottom-10 right-10 flex gap-2">
              <div className="flex -space-x-2">
                {[1,2,3,4].map(i => (
                  <div key={i} className="w-8 h-8 rounded-full border-2 border-white overflow-hidden">
                    <img src={`https://picsum.photos/seed/face${i}/50/50`} alt="" />
                  </div>
                ))}
                <div className="w-8 h-8 rounded-full border-2 border-white bg-white/30 backdrop-blur-md flex items-center justify-center text-[10px] font-bold text-white">
                  +5
                </div>
              </div>
            </div>
          </div>

          {/* Quick Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-[24px] border border-cloud-grey/10 shadow-sm">
              <div className="flex justify-between items-start mb-6">
                <div className="p-3 bg-savanna-sun/20 rounded-2xl"><Sun className="text-obsidian" size={20} /></div>
                <MoreHorizontal size={20} className="text-cloud-grey" />
              </div>
              <div className="relative flex flex-col items-center">
                <div className="text-4xl font-bold mb-1 leading-none">28<span className="text-lg">°C</span></div>
                <p className="text-cloud-grey text-xs uppercase tracking-widest font-semibold">Current Climate</p>
                <div className="w-full h-24 mt-4 relative">
                  <div className="absolute bottom-0 w-full h-1 bg-cloud-grey/10 rounded-full" />
                  <div className="absolute bottom-0 left-[20%] w-[60%] h-1 bg-savanna-sun rounded-full" />
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-[24px] border border-cloud-grey/10 shadow-sm">
              <div className="flex justify-between items-start mb-6">
                <div className="p-3 bg-acacia-green/10 rounded-2xl"><DollarSign className="text-acacia-green" size={20} /></div>
                <MoreHorizontal size={20} className="text-cloud-grey" />
              </div>
              <div className="text-2xl font-bold mb-1 leading-none">$2,450 - $4,800</div>
              <p className="text-cloud-grey text-xs uppercase tracking-widest font-semibold mb-6">Est. Budget / Person</p>
              <div className="flex items-end gap-1 h-12">
                {[30, 50, 40, 80, 100, 70, 60, 90, 40].map((h, i) => (
                  <div key={i} className={`flex-1 rounded-t-sm ${i === 4 ? 'bg-acacia-green' : 'bg-acacia-green/20'}`} style={{ height: `${h}%` }} />
                ))}
              </div>
            </div>

            <div className="bg-white p-6 rounded-[24px] border border-cloud-grey/10 shadow-sm">
              <div className="flex justify-between items-start mb-6">
                <div className="p-3 bg-obsidian/5 rounded-2xl"><Users className="text-obsidian" size={20} /></div>
                <MoreHorizontal size={20} className="text-cloud-grey" />
              </div>
              <div className="text-4xl font-bold mb-1 leading-none">Moderate</div>
              <p className="text-cloud-grey text-xs uppercase tracking-widest font-semibold mb-6">Tourist Flow</p>
              <div className="flex gap-2">
                {['Jun', 'Jul', 'Aug'].map((m, i) => (
                  <div key={i} className="flex-1 text-center">
                    <div className={`w-full h-10 rounded-lg mb-2 ${i === 0 ? 'bg-acacia-green' : 'bg-cloud-grey/10'}`} />
                    <span className="text-[10px] text-cloud-grey font-bold uppercase">{m}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPreview;
