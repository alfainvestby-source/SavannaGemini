
import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import Header from './components/Header';
import TravelersPage from './pages/TravelersPage';
import OperatorsPage from './pages/OperatorsPage';
import MagazinePage from './pages/MagazinePage';
import SafariListingPage from './pages/SafariListingPage';
import TourPage from './pages/TourPage';
import ParkPage from './pages/ParkPage';
import CountryPage from './pages/CountryPage';
import LuxurySafariPage from './pages/LuxurySafariPage';
import StyleGuidePage from './pages/StyleGuidePage';
import WishlistPage from './pages/WishlistPage';
import ComparePage from './pages/ComparePage';
import AdminPage from './pages/AdminPage';
import PlanningWizard from './components/PlanningWizard';
import Footer from './components/Footer';
import ConnectionStatus from './components/ConnectionStatus';
import CompareFloatingButton from './components/CompareFloatingButton';
import { SafariCategory } from './data/safariContent';

const App: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [showPlanner, setShowPlanner] = useState(false);
  const [view, setView] = useState<'travelers' | 'operators' | 'magazine' | 'safaris' | 'style-guide' | 'tour' | 'park' | 'country' | 'luxury' | 'wishlist' | 'compare' | 'admin'>('travelers');
  
  // State for dynamic safari pages
  const [safariParams, setSafariParams] = useState<{category: SafariCategory, slug: string}>({
    category: 'all',
    slug: 'default'
  });

  // State for tour detail pages
  const [tourParams, setTourParams] = useState<{id: string, slug: string} | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [view, safariParams, tourParams]);

  const handleSafariNavigation = (category: SafariCategory, slug: string) => {
    setSafariParams({ category, slug });
    if (category === 'park') {
      setView('park');
    } else if (category === 'country') {
      setView('country');
    } else if (slug === 'luxury') {
      setView('luxury');
    } else {
      setView('safaris');
    }
  };

  const handleTourNavigation = (id: string, slug: string) => {
    setTourParams({ id, slug });
    setView('tour');
  };

  if (showPlanner) {
    return (
      <div className="min-h-screen bg-wilderness-white font-light antialiased">
        <nav className="fixed top-0 left-0 right-0 z-50 p-6 flex justify-between items-center pointer-events-none">
           <div className="flex items-center gap-2 pointer-events-auto cursor-pointer" onClick={() => setShowPlanner(false)}>
            <div className="relative w-10 h-10 bg-savanna-sun rounded-full flex items-center justify-center">
              <div className="w-2 h-2 bg-black rounded-full absolute top-2 left-3" />
              <div className="w-2 h-2 bg-black rounded-full" />
            </div>
            <span className="text-2xl font-bold text-obsidian">Savanna</span>
          </div>
          <button 
            onClick={() => setShowPlanner(false)}
            className="pointer-events-auto glass p-4 rounded-full border border-black/5 hover:bg-white transition-all shadow-lg"
          >
            <X size={24} />
          </button>
        </nav>
        <PlanningWizard onCancel={() => setShowPlanner(false)} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-wilderness-white font-light antialiased selection:bg-savanna-sun selection:text-obsidian">
      <Header 
        isScrolled={isScrolled} 
        currentView={view} 
        onNavigate={(v) => setView(v)}
        onSafariNavigate={handleSafariNavigation}
        onStart={() => setShowPlanner(true)}
      />
      
      <main>
        {view === 'travelers' && (
          <TravelersPage 
            onStart={() => setShowPlanner(true)} 
            onNavigate={handleSafariNavigation}
            onTourClick={handleTourNavigation}
          />
        )}
        {view === 'operators' && <OperatorsPage />}
        {view === 'magazine' && <MagazinePage />}
        {view === 'safaris' && (
          <SafariListingPage 
            category={safariParams.category} 
            slug={safariParams.slug}
            onNavigate={handleSafariNavigation} 
            onTourClick={handleTourNavigation}
          />
        )}
        {view === 'park' && (
          <ParkPage slug={safariParams.slug} />
        )}
        {view === 'country' && (
          <CountryPage slug={safariParams.slug} onTourClick={handleTourNavigation} />
        )}
        {view === 'luxury' && (
          <LuxurySafariPage />
        )}
        {view === 'tour' && tourParams && (
          <TourPage 
            id={tourParams.id} 
            slug={tourParams.slug} 
          />
        )}
        {view === 'style-guide' && <StyleGuidePage />}
        {view === 'wishlist' && <WishlistPage onTourClick={handleTourNavigation} />}
        {view === 'compare' && <ComparePage onBack={() => setView('safaris')} onTourClick={handleTourNavigation} />}
        {view === 'admin' && <AdminPage />}
      </main>

      <Footer 
        onNavigate={handleSafariNavigation} 
        onStyleGuide={() => setView('style-guide')} 
      />
      <CompareFloatingButton onViewCompare={() => setView('compare')} />
      <ConnectionStatus />
    </div>
  );
};

export default App;
