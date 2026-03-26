import React, { useState } from 'react';
import { Wifi, WifiOff, ChevronDown, ChevronUp, CheckCircle2, XCircle } from 'lucide-react';
import { isFirebaseConfigured } from '../lib/firebase';

const ConnectionStatus: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const configKeys = [
    { label: 'API Key', value: import.meta.env.VITE_FIREBASE_API_KEY || import.meta.env.VITE_FIREBASE_API_KE },
    { label: 'Auth Domain', value: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || import.meta.env.VITE_FIREBASE_AUTH_ },
    { label: 'Project ID', value: import.meta.env.VITE_FIREBASE_PROJECT_ID || import.meta.env.VITE_FIREBASE_PROJE },
    { label: 'Storage Bucket', value: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || import.meta.env.VITE_FIREBASE_STORA },
    { label: 'Messaging Sender ID', value: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || import.meta.env.VITE_FIREBASE_MESSA },
    { label: 'App ID', value: import.meta.env.VITE_FIREBASE_APP_ID },
  ];

  const isConfigured = isFirebaseConfigured;

  return (
    <div className="fixed bottom-6 left-6 z-[100]">
      <div className={`glass rounded-2xl shadow-2xl border transition-all duration-300 overflow-hidden ${isOpen ? 'w-80' : 'w-auto'}`}>
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className={`flex items-center gap-3 px-4 py-3 w-full text-left transition-colors ${isConfigured ? 'hover:bg-acacia-green/5' : 'hover:bg-red-50'}`}
        >
          <div className={`p-2 rounded-full ${isConfigured ? 'bg-acacia-green/10 text-acacia-green' : 'bg-red-100 text-red-500'}`}>
            {isConfigured ? <Wifi size={18} /> : <WifiOff size={18} />}
          </div>
          <div className="flex-grow">
            <p className="text-xs font-bold uppercase tracking-widest text-obsidian/40">Firebase Status</p>
            <p className={`text-sm font-bold ${isConfigured ? 'text-acacia-green' : 'text-red-500'}`}>
              {isConfigured ? 'Connected' : 'Configuration Missing'}
            </p>
          </div>
          {isOpen ? <ChevronDown size={16} className="text-obsidian/20" /> : <ChevronUp size={16} className="text-obsidian/20" />}
        </button>

        {isOpen && (
          <div className="p-4 border-t border-black/5 bg-white/50 space-y-3 animate-in slide-in-from-bottom-2 duration-200">
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-obsidian/30 mb-2">Environment Variables</p>
            {configKeys.map((key) => (
              <div key={key.label} className="flex items-center justify-between gap-4">
                <span className="text-xs text-obsidian/60">{key.label}</span>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono text-obsidian/30">
                    {key.value ? `${key.value.substring(0, 4)}...` : 'missing'}
                  </span>
                  {key.value ? (
                    <CheckCircle2 size={14} className="text-acacia-green" />
                  ) : (
                    <XCircle size={14} className="text-red-400" />
                  )}
                </div>
              </div>
            ))}
            {!isConfigured && (
              <div className="mt-4 p-3 bg-red-50 rounded-xl border border-red-100">
                <p className="text-[10px] text-red-600 leading-relaxed">
                  Check your Secrets tab. Ensure the names match exactly: 
                  <span className="font-mono block mt-1 font-bold">VITE_FIREBASE_API_KEY</span>
                  etc.
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ConnectionStatus;
