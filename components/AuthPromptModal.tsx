import React from 'react';
import { X, Heart } from 'lucide-react';
import { useAuth } from '../lib/AuthContext';

interface AuthPromptModalProps {
  isOpen: boolean;
  onClose: () => void;
  message?: string;
}

const AuthPromptModal: React.FC<AuthPromptModalProps> = ({ 
  isOpen, 
  onClose, 
  message = "Create account to save your your dream safari list or to share it with friends" 
}) => {
  const { signInWithGoogle } = useAuth();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="bg-white rounded-[32px] p-8 md:p-12 max-w-md w-full shadow-2xl relative animate-in zoom-in-95 duration-300">
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 p-2 text-cloud-grey hover:text-obsidian hover:bg-black/5 rounded-full transition-colors"
        >
          <X size={20} />
        </button>
        
        <div className="w-16 h-16 bg-savanna-sun/20 text-savanna-sun rounded-full flex items-center justify-center mb-6">
          <Heart size={32} className="fill-savanna-sun" />
        </div>
        
        <h3 className="text-2xl font-bold text-obsidian mb-4">Join Savanna</h3>
        <p className="text-cloud-grey mb-8 leading-relaxed">
          {message}
        </p>
        
        <div className="flex flex-col gap-3">
          <button 
            onClick={() => {
              signInWithGoogle();
              onClose();
            }}
            className="w-full py-4 bg-obsidian text-white rounded-full font-bold hover:bg-black/80 transition-colors shadow-lg"
          >
            Sign In with Google
          </button>
          <button 
            onClick={onClose}
            className="w-full py-4 bg-transparent text-obsidian rounded-full font-bold hover:bg-black/5 transition-colors"
          >
            Maybe Later
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthPromptModal;
