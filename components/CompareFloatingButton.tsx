import React, { useState } from 'react';
import { useCompare } from '../lib/CompareContext';
import { useAuth } from '../lib/AuthContext';
import { ArrowLeftRight, X } from 'lucide-react';
import AuthPromptModal from './AuthPromptModal';

interface CompareFloatingButtonProps {
  onViewCompare: () => void;
}

const CompareFloatingButton: React.FC<CompareFloatingButtonProps> = ({ onViewCompare }) => {
  const { compareList, clearCompare } = useCompare();
  const { user } = useAuth();
  const [showAuthPrompt, setShowAuthPrompt] = useState(false);

  if (compareList.length === 0) return null;

  const handleViewCompare = () => {
    if (!user) {
      setShowAuthPrompt(true);
      return;
    }
    onViewCompare();
  };

  return (
    <>
      <div className="fixed bottom-8 right-8 z-40 animate-in slide-in-from-bottom-8 fade-in duration-500">
        <div className="bg-obsidian text-white rounded-full shadow-2xl flex items-center p-2 border border-white/10">
          <button 
            onClick={handleViewCompare}
            className="flex items-center gap-2 px-4 py-2 hover:bg-white/10 rounded-full transition-colors"
          >
            <ArrowLeftRight size={18} />
            <span className="font-bold text-sm">Compare ({compareList.length})</span>
          </button>
          <div className="w-px h-6 bg-white/20 mx-2" />
          <button 
            onClick={clearCompare}
            className="p-2 text-white/50 hover:text-white hover:bg-white/10 rounded-full transition-colors"
            title="Clear Compare List"
          >
            <X size={16} />
          </button>
        </div>
      </div>

      <AuthPromptModal 
        isOpen={showAuthPrompt} 
        onClose={() => setShowAuthPrompt(false)} 
        message="Create account to save your your dream safari list or to share it with friends"
      />
    </>
  );
};

export default CompareFloatingButton;
