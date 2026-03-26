
import React from 'react';
import { Compass } from 'lucide-react';

export interface FeatureItem {
  icon: React.ReactNode;
  title: string;
  description: string;
}

interface FeaturesProps {
  title: React.ReactNode;
  subtitle: string;
  features: FeatureItem[];
}

const Features: React.FC<FeaturesProps> = ({ title, subtitle, features }) => {
  return (
    <section className="py-24 bg-acacia-green text-white relative overflow-hidden">
      {/* Ambient Background Glows - Adjusted for Green BG */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-savanna-sun/10 rounded-full blur-[120px] -mr-40 -mt-40 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-black/20 rounded-full blur-[100px] -ml-20 -mb-20 pointer-events-none" />

      {/* Decorative Icon Top Right */}
      <div className="absolute -top-24 -right-24 opacity-10 pointer-events-none rotate-12">
        <Compass size={600} strokeWidth={0.5} className="text-savanna-sun" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="mb-20">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">{title}</h2>
          <p className="text-white/80 max-w-2xl text-lg font-light">
            {subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((f, i) => (
            <div key={i} className="group p-10 rounded-[32px] bg-white/10 border border-white/10 hover:bg-white/20 transition-all duration-300 shadow-lg">
              <div className="w-14 h-14 rounded-2xl bg-black/20 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                {f.icon}
              </div>
              <h4 className="text-xl font-bold mb-4">{f.title}</h4>
              <p className="text-white/70 leading-relaxed font-light">{f.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
