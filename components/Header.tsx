
import React, { useState, useRef, useEffect } from 'react';
import { Menu, X, Globe, ChevronDown, ArrowRight, User as UserIcon, LogOut, Heart, Database } from 'lucide-react';
import { SafariCategory } from '../data/safariContent';
import { useAuth } from '../lib/AuthContext';

interface HeaderProps {
  isScrolled: boolean;
  currentView: string;
  onNavigate: (view: any) => void;
  onSafariNavigate?: (category: SafariCategory, slug: string) => void;
  onStart?: () => void;
}

const Header: React.FC<HeaderProps> = ({ isScrolled, currentView, onNavigate, onSafariNavigate, onStart }) => {
  const { user, signInWithGoogle, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [isToursOpen, setIsToursOpen] = useState(false);
  const [isMobileLangOpen, setIsMobileLangOpen] = useState(false);
  const [isMobileToursOpen, setIsMobileToursOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState('English');
  const langRef = useRef<HTMLDivElement>(null);
  const toursRef = useRef<HTMLDivElement>(null);

  const languages = [
    { code: 'en', name: 'English' },
    { code: 'fr', name: 'Français' },
    { code: 'pt', name: 'Português' },
    { code: 'ja', name: '日本語' },
    { code: 'de', name: 'Deutsch' },
    { code: 'es', name: 'Español' },
    { code: 'it', name: 'Italiano' },
  ];

  const parks = [
    { name: 'Serengeti', slug: 'serengeti' },
    { name: 'Masai Mara', slug: 'masai-mara' },
    { name: 'Lake Nakuru', slug: 'lake-nakuru' },
    { name: 'Amboseli', slug: 'amboseli' },
    { name: 'Nairobi NP', slug: 'nairobi-np' },
    { name: 'Kruger', slug: 'kruger' },
    { name: 'Okavango', slug: 'okavango' },
    { name: 'Bwindi', slug: 'bwindi' },
  ];

  const countries = [
    { name: 'Tanzania', slug: 'tanzania' },
    { name: 'Kenya', slug: 'kenya' },
    { name: 'Botswana', slug: 'botswana' },
    { name: 'South Africa', slug: 'south-africa' },
  ];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(event.target as Node)) {
        setIsLangOpen(false);
      }
      if (toursRef.current && !toursRef.current.contains(event.target as Node)) {
        setIsToursOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleNavigate = (view: any) => {
    onNavigate(view);
    setIsMenuOpen(false);
    setIsToursOpen(false);
  };

  const handleSafariClick = (category: SafariCategory, slug: string) => {
    if (onSafariNavigate) {
      onSafariNavigate(category, slug);
    }
    setIsToursOpen(false);
    setIsMenuOpen(false);
  };

  const handleStart = () => {
    setIsMenuOpen(false);
    if (onStart) onStart();
  };

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'py-4' : 'py-8'}`}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="glass rounded-[24px] px-6 md:px-8 py-4 flex items-center justify-between border border-white/20 shadow-lg">
            <div className="flex items-center gap-2 group cursor-pointer" onClick={() => onNavigate('travelers')}>
              <div className="relative w-8 h-8 md:w-10 md:h-10 bg-savanna-sun rounded-full flex items-center justify-center group-hover:rotate-12 transition-transform">
                <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-black rounded-full absolute top-1.5 left-2.5 md:top-2 md:left-3" />
                <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-black rounded-full" />
              </div>
              <span className="text-xl md:text-2xl font-bold text-obsidian">Savanna</span>
            </div>

            <nav className="hidden md:flex items-center gap-10">
              <div 
                className="relative py-2" 
                ref={toursRef}
                onMouseEnter={() => setIsToursOpen(true)}
                onMouseLeave={() => setIsToursOpen(false)}
              >
                <button 
                  className={`text-sm font-bold uppercase tracking-widest transition-colors flex items-center gap-1 ${isToursOpen || currentView === 'safaris' || currentView === 'park' || currentView === 'luxury' ? 'text-acacia-green' : 'text-obsidian/40 hover:text-obsidian'}`}
                >
                  Tours
                  <ChevronDown size={14} className={`transition-transform duration-200 ${isToursOpen ? 'rotate-180' : ''}`} />
                </button>

                {isToursOpen && (
                  <div className="absolute left-1/2 -translate-x-1/2 top-full w-[600px] bg-white/[0.98] backdrop-blur-[20px] rounded-b-[32px] shadow-2xl border border-white/20 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-300 z-[60]">
                    <div className="p-10 grid grid-cols-3 gap-12">
                      <div>
                        <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-obsidian/30 mb-6">Parks</h4>
                        <div className="flex flex-col gap-4">
                          {parks.map((park) => (
                            <button 
                              key={park.slug}
                              onClick={() => handleSafariClick('park', park.slug)}
                              className="text-left text-lg font-medium text-obsidian hover:text-acacia-green transition-colors"
                            >
                              {park.name}
                            </button>
                          ))}
                        </div>
                      </div>
                      <div>
                        <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-obsidian/30 mb-6">Countries</h4>
                        <div className="flex flex-col gap-4">
                          {countries.map((country) => (
                            <button 
                              key={country.slug}
                              onClick={() => handleSafariClick('country', country.slug)}
                              className="text-left text-lg font-medium text-obsidian hover:text-acacia-green transition-colors"
                            >
                              {country.name}
                            </button>
                          ))}
                        </div>
                      </div>
                      <div>
                        <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-obsidian/30 mb-6">Styles</h4>
                        <div className="flex flex-col gap-4">
                          <button 
                            onClick={() => handleSafariClick('type', 'luxury')}
                            className="text-left text-lg font-medium text-obsidian hover:text-acacia-green transition-colors"
                          >
                            Luxury Safaris
                          </button>
                          <button 
                            onClick={() => handleSafariClick('type', 'family')}
                            className="text-left text-lg font-medium text-obsidian hover:text-acacia-green transition-colors"
                          >
                            Family Safaris
                          </button>
                          <button 
                            onClick={() => handleSafariClick('type', 'photography')}
                            className="text-left text-lg font-medium text-obsidian hover:text-acacia-green transition-colors"
                          >
                            Photo Safaris
                          </button>
                        </div>
                      </div>
                    </div>
                    <button 
                      onClick={() => handleSafariClick('all', 'default')}
                      className="w-full bg-black/5 border-t border-white/10 p-6 flex items-center justify-between group hover:bg-savanna-sun/20 transition-colors"
                    >
                      <span className="text-base font-bold text-obsidian">See all tours</span>
                      <ArrowRight size={18} className="text-obsidian group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                )}
              </div>
              <button 
                onClick={() => onNavigate('operators')} 
                className={`text-sm font-bold uppercase tracking-widest transition-colors ${currentView === 'operators' ? 'text-acacia-green' : 'text-obsidian/40 hover:text-obsidian'}`}
              >
                Operators
              </button>
              <button 
                onClick={() => onNavigate('magazine')} 
                className={`text-sm font-bold uppercase tracking-widest transition-colors ${currentView === 'magazine' ? 'text-acacia-green' : 'text-obsidian/40 hover:text-obsidian'}`}
              >
                Magazine
              </button>
            </nav>

            <div className="flex items-center gap-3 md:gap-4">
              <div className="relative" ref={langRef} onMouseEnter={() => setIsLangOpen(true)} onMouseLeave={() => setIsLangOpen(false)}>
                <button className="hidden md:flex p-2 text-obsidian hover:bg-black/5 rounded-full transition-colors items-center gap-1">
                  <Globe size={20} />
                  <ChevronDown size={14} className={`transition-transform duration-200 ${isLangOpen ? 'rotate-180' : ''}`} />
                </button>

                {isLangOpen && (
                  <div className="absolute right-0 top-full w-48 bg-white rounded-2xl shadow-2xl border border-black/5 py-2 overflow-hidden animate-in fade-in zoom-in-95 duration-200 z-[60]">
                    {languages.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => {
                          setCurrentLang(lang.name);
                          setIsLangOpen(false);
                        }}
                        className={`w-full text-left px-6 py-3 text-sm transition-colors hover:bg-savanna-sun/20 ${currentLang === lang.name ? 'font-bold text-acacia-green' : 'text-obsidian/70'}`}
                      >
                        {lang.name}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <button 
                onClick={() => onNavigate('wishlist')}
                className={`hidden md:flex p-2 rounded-full transition-colors items-center gap-1 ${currentView === 'wishlist' ? 'text-red-500 bg-red-50' : 'text-obsidian hover:bg-black/5'}`}
                title="Wishlist"
              >
                <Heart size={20} className={currentView === 'wishlist' ? 'fill-red-500' : ''} />
              </button>

              {user ? (
                <div className="hidden sm:flex items-center gap-3">
                  {(user.email === 'viiding@gmail.com' || user.email?.includes('admin')) && (
                    <button 
                      onClick={() => onNavigate('admin')}
                      className={`p-2 rounded-full transition-colors items-center gap-1 ${currentView === 'admin' ? 'text-acacia-green bg-acacia-green/10' : 'text-obsidian/40 hover:text-obsidian hover:bg-black/5'}`}
                      title="Admin Dashboard"
                    >
                      <Database size={18} />
                    </button>
                  )}
                  <div className="flex items-center gap-2 px-3 py-1.5 bg-black/5 rounded-full">
                    {user.photoURL ? (
                      <img src={user.photoURL} alt={user.displayName || ''} className="w-6 h-6 rounded-full" referrerPolicy="no-referrer" />
                    ) : (
                      <UserIcon size={16} />
                    )}
                    <span className="text-sm font-medium truncate max-w-[100px]">{user.displayName?.split(' ')[0]}</span>
                  </div>
                  <button 
                    onClick={logout}
                    className="p-2 text-obsidian/40 hover:text-obsidian hover:bg-black/5 rounded-full transition-colors"
                    title="Logout"
                  >
                    <LogOut size={18} />
                  </button>
                </div>
              ) : (
                <button 
                  onClick={signInWithGoogle}
                  className="hidden sm:block text-sm font-semibold text-obsidian px-6 py-2 hover:bg-black/5 rounded-full transition-colors"
                >
                  Login
                </button>
              )}
              
              <button 
                onClick={handleStart}
                className="bg-black text-white px-4 py-2 md:px-6 md:py-3 rounded-full text-xs md:text-sm font-semibold hover:bg-black/80 transition-colors shadow-lg"
              >
                Get Started
              </button>
              <button 
                className="md:hidden p-2 bg-black/5 rounded-full text-obsidian"
                onClick={() => setIsMenuOpen(true)}
              >
                <Menu size={20} />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-[100] bg-black/20 backdrop-blur-sm flex flex-col p-4 animate-in fade-in duration-300">
          <div className="bg-white rounded-[32px] flex flex-col overflow-hidden shadow-2xl animate-in slide-in-from-top-4 duration-500">
            {/* Mobile Header Bar */}
            <div className="flex items-center justify-between p-6 border-b border-black/5">
              <div className="flex items-center gap-2" onClick={() => handleNavigate('travelers')}>
                <div className="relative w-8 h-8 bg-savanna-sun rounded-full flex items-center justify-center">
                  <div className="w-1.5 h-1.5 bg-black rounded-full absolute top-1.5 left-2.5" />
                  <div className="w-1.5 h-1.5 bg-black rounded-full" />
                </div>
                <span className="text-xl font-bold text-obsidian">Savanna</span>
              </div>
              
              <div className="flex items-center gap-3">
                <button 
                  onClick={handleStart}
                  className="bg-black text-white px-4 py-2 rounded-full text-xs font-bold shadow-sm"
                >
                  Get Started
                </button>
                <button 
                  onClick={() => setIsMenuOpen(false)}
                  className="p-2 bg-black/5 rounded-full"
                >
                  <X size={20} className="text-obsidian" />
                </button>
              </div>
            </div>

            <div className="px-6 py-2 overflow-y-auto max-h-[70vh]">
              <nav className="flex flex-col">
                {/* Tours Expandable */}
                <div className="border-b border-black/5">
                  <button 
                    onClick={() => setIsMobileToursOpen(!isMobileToursOpen)}
                    className="w-full py-5 flex items-center justify-between text-lg font-medium text-obsidian"
                  >
                    <span>Tours</span>
                    <ChevronDown size={20} className={`transition-transform duration-300 ${isMobileToursOpen ? 'rotate-180' : ''}`} />
                  </button>
                  {isMobileToursOpen && (
                    <div className="pb-4 flex flex-col gap-4 pl-4 animate-in slide-in-from-top-2 duration-200">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-3">
                          <p className="text-xs font-bold uppercase tracking-widest text-obsidian/30">Parks</p>
                          {parks.map(park => (
                            <button key={park.slug} onClick={() => handleSafariClick('park', park.slug)} className="block text-base text-obsidian/70">{park.name}</button>
                          ))}
                        </div>
                        <div className="space-y-3">
                          <p className="text-xs font-bold uppercase tracking-widest text-obsidian/30">Countries</p>
                          {countries.map(country => (
                            <button key={country.slug} onClick={() => handleSafariClick('country', country.slug)} className="block text-base text-obsidian/70">{country.name}</button>
                          ))}
                        </div>
                        <div className="space-y-3 col-span-2">
                          <p className="text-xs font-bold uppercase tracking-widest text-obsidian/30">Styles</p>
                          <button onClick={() => handleSafariClick('type', 'luxury')} className="block text-base text-obsidian/70">Luxury Safaris</button>
                          <button onClick={() => handleSafariClick('type', 'family')} className="block text-base text-obsidian/70">Family Safaris</button>
                        </div>
                      </div>
                      <button onClick={() => handleSafariClick('all', 'default')} className="text-base font-bold text-acacia-green flex items-center gap-1 mt-2">
                        See all tours <ArrowRight size={14} />
                      </button>
                    </div>
                  )}
                </div>

                <button 
                  onClick={() => handleNavigate('operators')} 
                  className="w-full py-5 text-left text-lg font-medium text-obsidian border-b border-black/5"
                >
                  Operators
                </button>
                
                <button 
                  onClick={() => handleNavigate('magazine')} 
                  className="w-full py-5 text-left text-lg font-medium text-obsidian border-b border-black/5"
                >
                  Magazine
                </button>

                <button 
                  onClick={() => handleNavigate('wishlist')} 
                  className="w-full py-5 text-left text-lg font-medium text-obsidian border-b border-black/5 flex items-center justify-between"
                >
                  <span>Wishlist</span>
                  <Heart size={20} className={currentView === 'wishlist' ? 'text-red-500 fill-red-500' : 'text-obsidian/40'} />
                </button>

                {user && (user.email === 'viiding@gmail.com' || user.email?.includes('admin')) && (
                  <button 
                    onClick={() => handleNavigate('admin')} 
                    className="w-full py-5 text-left text-lg font-medium text-obsidian border-b border-black/5 flex items-center justify-between"
                  >
                    <span>Admin Dashboard</span>
                    <Database size={20} className={currentView === 'admin' ? 'text-acacia-green' : 'text-obsidian/40'} />
                  </button>
                )}

                {/* Language Expandable */}
                <div className="mt-4">
                  <button 
                    onClick={() => setIsMobileLangOpen(!isMobileLangOpen)}
                    className="w-full py-5 flex items-center justify-between text-lg font-medium text-obsidian"
                  >
                    <div className="flex items-center gap-3">
                      <Globe size={20} className="text-obsidian/40" />
                      <span>{currentLang}</span>
                    </div>
                    <ChevronDown size={20} className={`transition-transform duration-300 ${isMobileLangOpen ? 'rotate-180' : ''}`} />
                  </button>
                  {isMobileLangOpen && (
                    <div className="pb-6 flex flex-col gap-4 pl-11 animate-in slide-in-from-top-2 duration-200">
                      {languages.map((lang) => (
                        <button
                          key={lang.code}
                          onClick={() => {
                            setCurrentLang(lang.name);
                            setIsMobileLangOpen(false);
                          }}
                          className={`text-left text-base transition-colors ${currentLang === lang.name ? 'font-bold text-acacia-green' : 'text-obsidian/60'}`}
                        >
                          {lang.name}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </nav>
            </div>

            <div className="p-6 bg-black/5 mt-auto">
              {user ? (
                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-3 p-4 bg-white rounded-2xl border border-black/5">
                    {user.photoURL ? (
                      <img src={user.photoURL} alt={user.displayName || ''} className="w-10 h-10 rounded-full" referrerPolicy="no-referrer" />
                    ) : (
                      <div className="w-10 h-10 bg-savanna-sun rounded-full flex items-center justify-center">
                        <UserIcon size={20} />
                      </div>
                    )}
                    <div>
                      <p className="font-bold text-obsidian">{user.displayName}</p>
                      <p className="text-xs text-obsidian/40">{user.email}</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => {
                      logout();
                      setIsMenuOpen(false);
                    }}
                    className="w-full bg-white border border-black/5 py-4 rounded-2xl font-bold text-red-500 shadow-sm flex items-center justify-center gap-2"
                  >
                    <LogOut size={18} />
                    Logout
                  </button>
                </div>
              ) : (
                <button 
                  onClick={() => {
                    signInWithGoogle();
                    setIsMenuOpen(false);
                  }}
                  className="w-full bg-white border border-black/5 py-4 rounded-2xl font-bold text-obsidian shadow-sm"
                >
                  Login
                </button>
              )}
            </div>
          </div>
          
          {/* Tap outside to close area */}
          <div className="flex-grow" onClick={() => setIsMenuOpen(false)} />
        </div>
      )}
    </>
  );
};

export default Header;
