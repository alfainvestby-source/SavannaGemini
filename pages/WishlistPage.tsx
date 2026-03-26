import React, { useState, useEffect } from 'react';
import { useAuth } from '../lib/AuthContext';
import { getBookmarks, getGuestId } from '../lib/dbService';
import { Heart, Share2, MapPin, ArrowRight, X } from 'lucide-react';
import AuthPromptModal from '../components/AuthPromptModal';

interface WishlistPageProps {
  onTourClick: (id: string, slug: string) => void;
}

const WishlistPage: React.FC<WishlistPageProps> = ({ onTourClick }) => {
  const { user, signInWithGoogle } = useAuth();
  const [bookmarks, setBookmarks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showSignInModal, setShowSignInModal] = useState(false);
  const [showAuthPrompt, setShowAuthPrompt] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [hasShownModal, setHasShownModal] = useState(false);

  useEffect(() => {
    const fetchBookmarks = async () => {
      const userId = user?.uid || getGuestId();
      try {
        const data = await getBookmarks(userId);
        setBookmarks(data);
        
        // Check if we should show the modal (first time viewing wishlist)
        const hasSeenModal = localStorage.getItem('hasSeenWishlistModal');
        if (!user && !hasSeenModal) {
          setShowSignInModal(true);
          localStorage.setItem('hasSeenWishlistModal', 'true');
        }

        // Check if we should show the toast (3rd item added)
        // We can approximate this by checking if there are exactly 3 items and user is not signed in
        const hasSeenToast = localStorage.getItem('hasSeenWishlistToast');
        if (!user && data.length >= 3 && !hasSeenToast) {
          setShowToast(true);
          localStorage.setItem('hasSeenWishlistToast', 'true');
          setTimeout(() => setShowToast(false), 5000); // Hide after 5 seconds
        }

      } catch (error) {
        console.error("Error fetching bookmarks:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBookmarks();
  }, [user]);

  const handleShare = () => {
    if (!user) {
      setShowAuthPrompt(true);
      return;
    }

    if (navigator.share) {
      navigator.share({
        title: 'My Safari Wishlist',
        url: window.location.href,
      }).catch(console.error);
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  return (
    <div className="min-h-screen bg-wilderness-white pt-32 pb-20 px-6 animate-in fade-in duration-700">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <h1 className="text-4xl md:text-6xl font-bold text-obsidian tracking-tight mb-4">
              Your Wishlist
            </h1>
            <p className="text-cloud-grey text-lg max-w-2xl">
              {bookmarks.length} {bookmarks.length === 1 ? 'safari' : 'safaris'} saved for your next adventure.
            </p>
          </div>
          
          {bookmarks.length > 0 && (
            <button 
              onClick={handleShare}
              className="flex items-center gap-2 px-6 py-3 bg-white border border-cloud-grey/20 rounded-full font-bold text-obsidian hover:bg-black/5 transition-colors shadow-sm"
            >
              <Share2 size={18} />
              Share Wishlist
            </button>
          )}
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="w-12 h-12 border-4 border-cloud-grey/20 border-t-savanna-sun rounded-full animate-spin"></div>
          </div>
        ) : bookmarks.length === 0 ? (
          <div className="bg-white rounded-[40px] p-12 md:p-20 text-center border border-cloud-grey/10 shadow-sm flex flex-col items-center">
            <div className="w-24 h-24 bg-black/5 rounded-full flex items-center justify-center mb-6">
              <Heart size={40} className="text-cloud-grey/50" />
            </div>
            <h2 className="text-2xl font-bold text-obsidian mb-4">Your wishlist is empty</h2>
            <p className="text-cloud-grey mb-8 max-w-md">
              Explore our collection of safaris and tap the heart icon to save your favorites here.
            </p>
            <button 
              onClick={() => window.history.back()}
              className="px-8 py-4 bg-obsidian text-white rounded-full font-bold hover:bg-black/80 transition-colors"
            >
              Explore Safaris
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {bookmarks.map((tour) => (
              <div 
                key={tour.id} 
                onClick={() => onTourClick(tour.id, tour.slug)}
                className="bg-white rounded-[32px] overflow-hidden border border-cloud-grey/10 group cursor-pointer hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 flex flex-col h-full"
              >
                <div className="aspect-[4/3] overflow-hidden relative">
                  <img 
                    src={tour.image || `https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&q=80&w=800&random=${tour.id}`} 
                    alt={tour.title} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm w-10 h-10 rounded-full flex items-center justify-center shadow-sm">
                     <Heart size={18} className="text-red-500 fill-red-500" />
                  </div>
                </div>
                
                <div className="p-6 flex flex-col flex-grow">
                  <div className="flex items-center gap-2 text-xs font-bold text-cloud-grey uppercase tracking-widest mb-3">
                    <MapPin size={14} />
                    <span>Multiple Parks</span>
                  </div>
                  
                  <h3 className="text-xl font-bold text-obsidian mb-4 line-clamp-2 leading-tight group-hover:text-acacia-green transition-colors">
                    {tour.title}
                  </h3>
                  
                  <div className="mt-auto pt-4 border-t border-cloud-grey/10 flex items-center justify-between">
                    <div>
                      <p className="text-xs text-cloud-grey font-medium uppercase tracking-widest mb-1">From</p>
                      <p className="text-lg font-bold text-obsidian">${tour.price?.toLocaleString() || '1,200'}</p>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-black/5 flex items-center justify-center group-hover:bg-savanna-sun transition-colors">
                      <ArrowRight size={18} className="text-obsidian group-hover:translate-x-0.5 transition-transform" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Soft Modal / Banner for first time visitors */}
      {showSignInModal && !user && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="bg-white rounded-[32px] p-8 md:p-12 max-w-md w-full shadow-2xl relative animate-in zoom-in-95 duration-300">
            <button 
              onClick={() => setShowSignInModal(false)}
              className="absolute top-6 right-6 p-2 text-cloud-grey hover:text-obsidian hover:bg-black/5 rounded-full transition-colors"
            >
              <X size={20} />
            </button>
            
            <div className="w-16 h-16 bg-savanna-sun/20 text-savanna-sun rounded-full flex items-center justify-center mb-6">
              <Heart size={32} className="fill-savanna-sun" />
            </div>
            
            <h3 className="text-2xl font-bold text-obsidian mb-4">Save your safaris forever</h3>
            <p className="text-cloud-grey mb-8 leading-relaxed">
              Sign in to keep these safaris saved forever and access them from any device. Don't lose your dream itinerary!
            </p>
            
            <div className="flex flex-col gap-3">
              <button 
                onClick={() => {
                  signInWithGoogle();
                  setShowSignInModal(false);
                }}
                className="w-full py-4 bg-obsidian text-white rounded-full font-bold hover:bg-black/80 transition-colors shadow-lg"
              >
                Sign In with Google
              </button>
              <button 
                onClick={() => setShowSignInModal(false)}
                className="w-full py-4 bg-transparent text-obsidian rounded-full font-bold hover:bg-black/5 transition-colors"
              >
                Maybe Later
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Auth Prompt Modal for Sharing */}
      <AuthPromptModal 
        isOpen={showAuthPrompt} 
        onClose={() => setShowAuthPrompt(false)} 
        message="Create account to save your your dream safari list or to share it with friends"
      />

      {/* Small non-blocking toast for 3rd item */}
      {showToast && !user && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 animate-in slide-in-from-bottom-8 fade-in duration-500">
          <div className="bg-obsidian text-white px-6 py-4 rounded-full shadow-2xl flex items-center gap-4 border border-white/10">
            <div className="flex-1 text-sm font-medium">
              Sign in to save more and get personalized safari recommendations
            </div>
            <button 
              onClick={signInWithGoogle}
              className="text-xs font-bold text-obsidian bg-savanna-sun px-4 py-2 rounded-full whitespace-nowrap hover:bg-white transition-colors"
            >
              Sign In
            </button>
            <button 
              onClick={() => setShowToast(false)}
              className="p-1 text-white/50 hover:text-white transition-colors ml-2"
            >
              <X size={16} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default WishlistPage;
