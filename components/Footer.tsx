
import React from 'react';
import { Instagram, Twitter, Linkedin, TreePine } from 'lucide-react';
import { SafariCategory } from '../data/safariContent';

interface FooterProps {
  onNavigate?: (category: SafariCategory, slug: string) => void;
  onStyleGuide?: () => void;
}

const Footer: React.FC<FooterProps> = ({ onNavigate, onStyleGuide }) => {
  const handleLinkClick = (e: React.MouseEvent, category: SafariCategory, slug: string) => {
    e.preventDefault();
    if (onNavigate) {
      onNavigate(category, slug);
    }
  };

  return (
    <footer className="bg-black pt-24 pb-12 border-t border-white/5 text-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-12 mb-20">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-8">
              <div className="w-8 h-8 bg-savanna-sun rounded-full flex items-center justify-center">
                <div className="w-1 h-1 bg-black rounded-full" />
              </div>
              <span className="text-xl font-bold text-white">Savanna</span>
            </div>
            <p className="text-cloud-grey text-sm leading-relaxed mb-8 max-w-sm">
              The modern wild is digital. We empower operators and inspire travelers through seamless connection and AI-driven clarity.
            </p>
            <div className="flex gap-4">
              <a href="#" className="p-2 bg-white rounded-xl hover:bg-savanna-sun transition-colors group">
                <Twitter size={18} className="text-black" />
              </a>
              <a href="#" className="p-2 bg-white rounded-xl hover:bg-savanna-sun transition-colors group">
                <Instagram size={18} className="text-black" />
              </a>
              <a href="#" className="p-2 bg-white rounded-xl hover:bg-savanna-sun transition-colors group">
                <Linkedin size={18} className="text-black" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-bold mb-6 text-white">Destinations</h4>
            <ul className="space-y-4 text-sm text-cloud-grey">
              <li><a href="/botswana" onClick={(e) => handleLinkClick(e, 'country', 'botswana')} className="hover:text-white transition-colors">Botswana Safaris</a></li>
              <li><a href="/kenya" onClick={(e) => handleLinkClick(e, 'country', 'kenya')} className="hover:text-white transition-colors">Kenya Safaris</a></li>
              <li><a href="/tanzania" onClick={(e) => handleLinkClick(e, 'country', 'tanzania')} className="hover:text-white transition-colors">Tanzania Safaris</a></li>
              <li><a href="/south-africa" onClick={(e) => handleLinkClick(e, 'country', 'south-africa')} className="hover:text-white transition-colors">South Africa Safaris</a></li>
              <li><a href="/rwanda" onClick={(e) => handleLinkClick(e, 'country', 'rwanda')} className="hover:text-white transition-colors">Rwanda Safaris</a></li>
              <li><a href="/uganda" onClick={(e) => handleLinkClick(e, 'country', 'uganda')} className="hover:text-white transition-colors">Uganda Safaris</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-6 text-white">Popular Parks</h4>
            <ul className="space-y-4 text-sm text-cloud-grey">
              <li><a href="/south-africa/kruger" onClick={(e) => handleLinkClick(e, 'park', 'kruger')} className="hover:text-white transition-colors">Kruger National Park</a></li>
              <li><a href="/kenya/masai-mara" onClick={(e) => handleLinkClick(e, 'park', 'masai-mara')} className="hover:text-white transition-colors">Masai Mara</a></li>
              <li><a href="/tanzania/serengeti" onClick={(e) => handleLinkClick(e, 'park', 'serengeti')} className="hover:text-white transition-colors">Serengeti</a></li>
              <li><a href="/botswana/okavango" onClick={(e) => handleLinkClick(e, 'park', 'okavango')} className="hover:text-white transition-colors">Okavango Delta</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-6 text-white">Experience Type</h4>
             <ul className="space-y-4 text-sm text-cloud-grey">
              <li><a href="/safaris/type/luxury" onClick={(e) => handleLinkClick(e, 'type', 'luxury')} className="hover:text-white transition-colors">Luxury Safaris</a></li>
              <li><a href="/safaris/type/gorilla-trekking" onClick={(e) => handleLinkClick(e, 'type', 'gorilla-trekking')} className="hover:text-white transition-colors">Gorilla Trekking</a></li>
              <li><a href="/safaris/type/honeymoon" onClick={(e) => handleLinkClick(e, 'type', 'honeymoon')} className="hover:text-white transition-colors">Honeymoon Safaris</a></li>
              <li><a href="/safaris/type/family" onClick={(e) => handleLinkClick(e, 'type', 'family')} className="hover:text-white transition-colors">Family Safaris</a></li>
              <li><a href="/safaris/type/photography" onClick={(e) => handleLinkClick(e, 'type', 'photography')} className="hover:text-white transition-colors">Photo Safaris</a></li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center pt-12 border-t border-white/10 text-xs text-cloud-grey font-medium uppercase tracking-widest gap-4">
          <p>© 2024 Savanna Technology Inc. All rights reserved.</p>
          <div className="flex gap-8 items-center">
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
            <a href="#" className="hover:text-white transition-colors">Terms</a>
            <button onClick={onStyleGuide} className="hover:text-white transition-colors">Style Guide</button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
