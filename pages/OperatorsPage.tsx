
import React from 'react';
import { Truck, TrendingUp, ChevronRight, BarChart3, Globe, ShieldCheck, Wallet, WifiOff, FileText, Users, Zap } from 'lucide-react';
import DashboardPreview from '../components/DashboardPreview';
import Stats from '../components/Stats';
import Features from '../components/Features';

const OperatorsPage: React.FC = () => {
  return (
    <div className="animate-in fade-in duration-700 bg-wilderness-white">
      {/* Operator Hero */}
      <section className="relative pt-48 pb-32 px-6">
        <div className="max-w-7xl mx-auto flex flex-col items-center text-center space-y-8">
           <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-acacia-green/10 border border-acacia-green/20 text-acacia-green font-bold text-xs uppercase tracking-widest">
            <Truck size={14} />
            <span>Enterprise Logistics</span>
          </div>
          <h1 className="text-6xl md:text-8xl font-bold leading-[1.05] tracking-tight text-obsidian max-w-5xl">
            Business software <br /> <span className="text-cloud-grey">for safari travel agencies.</span>
          </h1>
          <p className="text-xl text-obsidian/60 leading-relaxed max-w-2xl font-light">
            Savanna provides the tools operators need to digitize their operations without losing the human touch. Manage your fleet and bookings with 28% higher conversion.
          </p>
          <div className="flex gap-6 pt-4">
             <button className="bg-black text-white px-12 py-6 rounded-full font-bold text-xl hover:scale-105 transition-all shadow-2xl">
              Request Demo
            </button>
          </div>
        </div>
      </section>

      {/* The Command Center */}
      <section id="preview" className="relative py-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight">The Command Center</h2>
            <p className="text-cloud-grey text-lg max-w-2xl mx-auto leading-relaxed">
              Our glass-morphic interface keeps your operations crystal clear.
            </p>
          </div>
          <div className="transition-transform hover:scale-[1.01] duration-700">
            <DashboardPreview />
          </div>
        </div>
      </section>

      {/* Stats & Enterprise Features */}
      <section id="operators" className="py-40 px-6 max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row-reverse gap-24 items-center">
          <div className="lg:w-1/2 space-y-10">
            <h2 className="text-5xl md:text-6xl font-bold leading-[1.05] tracking-tight text-obsidian">
              Built for the modern <br className="hidden md:block" /> safari enterprise.
            </h2>
            <p className="text-xl text-obsidian/60 leading-relaxed">
              Scale your lodge or fleet with our integrated OS. From automated payroll to real-time satellite tracking, Savanna is your digital backbone.
            </p>
            
            <div className="space-y-6">
              {[
                { icon: <Truck className="text-acacia-green" />, title: "Fleet Logistics", desc: "Real-time GPS tracking and maintenance schedules for all 4x4s." },
                { icon: <TrendingUp className="text-acacia-green" />, title: "Dynamic Pricing", desc: "Optimize revenue based on seasonal demand and local availability." },
                { icon: <ShieldCheck className="text-acacia-green" />, title: "Insurance Sync", desc: "Automated guest waiver management and fleet insurance reporting." }
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-5 p-8 rounded-[40px] bg-white border border-cloud-grey/20 hover:border-acacia-green/40 hover:shadow-2xl transition-all group">
                  <div className="p-4 rounded-2xl bg-acacia-green/5 group-hover:bg-acacia-green group-hover:text-white transition-colors">
                    {item.icon}
                  </div>
                  <div>
                    <h4 className="font-bold text-2xl mb-1 text-obsidian">{item.title}</h4>
                    <p className="text-cloud-grey text-lg leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="lg:w-1/2 w-full">
            <Stats />
          </div>
        </div>
      </section>
      
      {/* Operator Green Features Section */}
      <Features 
        title={<>Built for scale. <br /> Engineered for the wild.</>}
        subtitle="The operating system for modern safari companies. Manage your fleet, finances, and guests in one place."
        features={[
          {
            icon: <Truck className="text-savanna-sun" />,
            title: "Fleet Command",
            description: "Real-time GPS tracking, fuel monitoring, and maintenance scheduling for your 4x4s."
          },
          {
            icon: <Wallet className="text-savanna-sun" />,
            title: "Automated Payroll",
            description: "One-click payments for guides, drivers, and lodge staff with tax auto-calculation."
          },
          {
            icon: <TrendingUp className="text-savanna-sun" />,
            title: "Dynamic Pricing",
            description: "AI adjusts your rates automatically based on seasonality, demand, and competitor data."
          },
          {
            icon: <Globe className="text-savanna-sun" />,
            title: "Global Reach",
            description: "Instantly distribute your inventory to 50k+ luxury travelers and agencies worldwide."
          },
          {
            icon: <FileText className="text-savanna-sun" />,
            title: "Digital Waivers",
            description: "Automated insurance syncing, guest liability management, and permit processing."
          },
          {
            icon: <WifiOff className="text-savanna-sun" />,
            title: "Offline Ops",
            description: "Field guides can manage guest lists, supplies, and logistics without connectivity."
          }
        ]}
      />

      {/* Global Reach */}
      <section className="py-32 bg-black text-white relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-acacia-green/10 via-transparent to-transparent pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-20 relative z-10">
          <div className="space-y-8">
            <h2 className="text-5xl font-bold">Scaling across <br /> 4 continents.</h2>
            <p className="text-cloud-grey text-xl leading-relaxed">
              From the Maasai Mara to the Amazon, Savanna's architecture is built to support eco-tourism operators wherever the wild calls.
            </p>
            <div className="grid grid-cols-2 gap-8 pt-8">
               <div className="space-y-2">
                 <p className="text-4xl font-bold">120k+</p>
                 <p className="text-cloud-grey uppercase text-xs font-bold tracking-widest">Bookings Processed</p>
               </div>
               <div className="space-y-2">
                 <p className="text-4xl font-bold">99.9%</p>
                 <p className="text-cloud-grey uppercase text-xs font-bold tracking-widest">Satellite Uptime</p>
               </div>
            </div>
          </div>
          <div className="bg-white/5 rounded-[48px] border border-white/10 p-12 flex items-center justify-center">
             <Globe className="text-acacia-green opacity-20" size={300} strokeWidth={0.5} />
          </div>
        </div>
      </section>

      {/* Operator CTA */}
      <section className="py-32 px-6">
        <div className="max-w-6xl mx-auto text-center assistant-gradient p-12 md:p-24 rounded-[64px] shadow-2xl relative overflow-hidden group">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white/20 blur-3xl rounded-full -translate-x-1/2 -translate-y-1/2 group-hover:bg-white/40 transition-colors duration-1000" />
          
          <h2 className="text-5xl md:text-8xl font-bold mb-12 leading-tight relative z-10 tracking-tight text-obsidian">Scale your <br /> wild business.</h2>
          <div className="flex flex-col sm:flex-row justify-center gap-8 relative z-10">
            <button className="bg-obsidian text-white px-14 py-7 rounded-full font-bold text-xl hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-3 shadow-2xl">
              Book a Strategy Call <ChevronRight size={28} />
            </button>
            <button className="bg-white/40 backdrop-blur-md text-obsidian px-14 py-7 rounded-full font-bold text-xl hover:bg-white transition-all shadow-xl">
              Enterprise Pricing
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default OperatorsPage;
