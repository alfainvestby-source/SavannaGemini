
import React from 'react';
import { TrendingUp, Users, Truck } from 'lucide-react';

const Stats: React.FC = () => {
  return (
    <div className="grid grid-cols-1 gap-6">
      {/* Conversion Card */}
      <div className="bg-white p-8 rounded-[32px] border border-cloud-grey/20 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-acacia-green/5 rounded-full -mr-16 -mt-16" />
        <div className="flex items-center gap-4 mb-6">
          <div className="p-3 bg-acacia-green/10 rounded-2xl"><TrendingUp className="text-acacia-green" /></div>
          <span className="text-sm font-bold uppercase tracking-widest text-cloud-grey">Conversion Rate</span>
        </div>
        <div className="flex items-end gap-4">
          <div className="text-6xl font-bold text-obsidian">+28%</div>
          <div className="mb-2 text-acacia-green font-bold flex items-center gap-1">
             <TrendingUp size={16} /> Above Avg
          </div>
        </div>
        <p className="mt-6 text-cloud-grey text-sm leading-relaxed">
          Based on 1,200+ safari operators who switched from manual booking systems to Savanna's AI platform.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div className="bg-white p-8 rounded-[32px] border border-cloud-grey/20 shadow-lg text-center">
          <div className="w-12 h-12 bg-savanna-sun/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <Users size={24} className="text-obsidian" />
          </div>
          <div className="text-3xl font-bold">12.4k</div>
          <div className="text-xs font-bold text-cloud-grey uppercase mt-1">Active Users</div>
        </div>
        <div className="bg-white p-8 rounded-[32px] border border-cloud-grey/20 shadow-lg text-center">
           <div className="w-12 h-12 bg-acacia-green/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <Truck size={24} className="text-acacia-green" />
          </div>
          <div className="text-3xl font-bold">840</div>
          <div className="text-xs font-bold text-cloud-grey uppercase mt-1">Fleets Tracked</div>
        </div>
      </div>

      <div className="bg-savanna-sun p-8 rounded-[32px] flex items-center justify-between group cursor-pointer">
        <div>
          <h4 className="text-obsidian font-bold text-xl mb-1">Scale your lodge?</h4>
          <p className="text-obsidian/60 text-sm">Download our 2024 Operator Growth Report</p>
        </div>
        <div className="w-12 h-12 rounded-full bg-black text-white flex items-center justify-center group-hover:translate-x-2 transition-transform">
          <TrendingUp size={20} />
        </div>
      </div>
    </div>
  );
};

export default Stats;
