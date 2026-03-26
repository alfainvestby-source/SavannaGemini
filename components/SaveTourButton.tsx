import React, { useState, useEffect } from 'react';
import { Heart } from 'lucide-react';
import { useAuth } from '../lib/AuthContext';
import { addBookmark, removeBookmark, getBookmarks, getGuestId } from '../lib/dbService';

interface SaveTourButtonProps {
  tourId: string;
  tourData: any;
  className?: string;
  iconSize?: number;
}

const SaveTourButton: React.FC<SaveTourButtonProps> = ({ tourId, tourData, className = '', iconSize = 20 }) => {
  const { user } = useAuth();
  const [isSaved, setIsSaved] = useState(false);
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    const checkSavedStatus = async () => {
      const userId = user?.uid || getGuestId();
      try {
        const bookmarks = await getBookmarks(userId);
        setIsSaved(bookmarks.some(b => b.id === tourId));
      } catch (error) {
        console.error("Error checking saved status:", error);
      }
    };
    checkSavedStatus();
  }, [tourId, user]);

  const handleSaveToggle = async (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent triggering parent click events
    const userId = user?.uid || getGuestId();
    try {
      if (isSaved) {
        await removeBookmark(userId, tourId);
        setIsSaved(false);
      } else {
        await addBookmark(userId, tourId, tourData);
        setIsSaved(true);
        setShowToast(true);
        setTimeout(() => setShowToast(false), 3000);
      }
    } catch (error) {
      console.error("Error toggling save:", error);
    }
  };

  return (
    <div className={`relative ${className}`}>
      <button 
          onClick={handleSaveToggle}
          className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-white hover:text-red-500 transition-all shadow-lg group"
      >
          <Heart 
            size={iconSize} 
            className={`transition-all duration-500 ${isSaved ? 'fill-red-500 text-red-500 scale-110' : 'group-hover:scale-110'}`} 
          />
      </button>
      {/* Toast Popup */}
      <div 
        className={`absolute right-full mr-4 top-1/2 -translate-y-1/2 bg-obsidian text-white text-xs font-bold px-3 py-2 rounded-lg whitespace-nowrap shadow-xl transition-all duration-300 z-50 ${showToast ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4 pointer-events-none'}`}
      >
        Saved!
        {/* Triangle pointer */}
        <div className="absolute top-1/2 -translate-y-1/2 -right-1 w-2 h-2 bg-obsidian rotate-45"></div>
      </div>
    </div>
  );
};

export default SaveTourButton;
