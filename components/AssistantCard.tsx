
import React, { useState, useRef, useEffect } from 'react';
import { Sparkles, Maximize2, Mic, Settings, Send, Loader2, Image as ImageIcon, Lightbulb, Code, PenTool, X, Headphones, Activity } from 'lucide-react';
import { GoogleGenAI, LiveServerMessage, Modality } from "@google/genai";

interface AssistantCardProps {
  initialMessage?: string;
  options: string[];
  initialMode?: 'text' | 'voice';
}

// --- Audio Utilities ---
const AUDIO_CTX_SAMPLE_RATE = 16000; // Gemini expects 16kHz input

// Convert Float32Array (Browser Audio) to Int16Array (PCM)
function floatTo16BitPCM(input: Float32Array): Int16Array {
  const output = new Int16Array(input.length);
  for (let i = 0; i < input.length; i++) {
    const s = Math.max(-1, Math.min(1, input[i]));
    output[i] = s < 0 ? s * 0x8000 : s * 0x7FFF;
  }
  return output;
}

// Convert Base64 string to Float32Array (for playback)
function base64ToFloat32Array(base64: string): Float32Array {
  const binaryString = atob(base64);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  const int16 = new Int16Array(bytes.buffer);
  const float32 = new Float32Array(int16.length);
  for (let i = 0; i < int16.length; i++) {
    float32[i] = int16[i] / 32768.0;
  }
  return float32;
}

// Encode Int16Array to Base64 (for sending)
function arrayBufferToBase64(buffer: ArrayBuffer): string {
  let binary = '';
  const bytes = new Uint8Array(buffer);
  const len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}

const AssistantCard: React.FC<AssistantCardProps> = ({ 
  options,
  initialMode = 'text'
}) => {
  // Modes: 'text' or 'voice'
  const [mode, setMode] = useState<'text' | 'voice'>(initialMode);
  
  // Text Chat State
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [chatHistory, setChatHistory] = useState<{role: string, text: string}[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Voice Chat State
  const [isLiveConnected, setIsLiveConnected] = useState(false);
  const [volumeLevel, setVolumeLevel] = useState(0); // 0 to 100 for visualizer
  
  // Refs for Audio Contexts and Session
  const audioContextRef = useRef<AudioContext | null>(null); // Output
  const inputAudioContextRef = useRef<AudioContext | null>(null); // Input
  const inputSourceRef = useRef<MediaStreamAudioSourceNode | null>(null);
  const processorRef = useRef<ScriptProcessorNode | null>(null);
  const liveSessionRef = useRef<any>(null);
  const nextStartTimeRef = useRef<number>(0);
  
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [chatHistory, isTyping]);

  // Handle Initial Mode
  useEffect(() => {
    if (initialMode === 'voice') {
      startVoiceSession();
    }
  }, []);

  // Clean up audio on unmount or mode switch
  useEffect(() => {
    return () => {
      stopVoiceSession();
    };
  }, []);

  // --- Text Chat Handler (Existing Logic) ---
  const handleChat = async (text: string) => {
    if (!text.trim() || isTyping) return;
    
    setIsTyping(true);
    setInput('');
    
    const userMessage = { role: 'user', text };
    const currentHistory = [...chatHistory, userMessage];
    setChatHistory([...currentHistory, { role: 'model', text: '' }]);
    
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const model = 'gemini-3-flash-preview';
      
      const systemInstruction = `You are Savanna's expert AI safari guide. You help luxury travelers plan dream trips. 
      Your tone is encouraging, expert, and concise. 
      You specialize in destinations like Serengeti, Okavango, Masai Mara, and Kruger.
      Keep responses to maximum 3 sentences unless asked for a list or itinerary.`;

      const streamResult = await ai.models.generateContentStream({
        model,
        contents: currentHistory.map(h => ({ 
          role: h.role === 'user' ? 'user' : 'model', 
          parts: [{ text: h.text }] 
        })),
        config: { systemInstruction, temperature: 0.7 }
      });

      let fullText = '';
      for await (const chunk of streamResult) {
        const chunkText = chunk.text || '';
        fullText += chunkText;
        setChatHistory(prev => {
           const newHist = [...prev];
           if (newHist.length > 0 && newHist[newHist.length - 1].role === 'model') {
               newHist[newHist.length - 1] = { role: 'model', text: fullText };
           }
           return newHist;
        });
      }
    } catch (error) {
      console.error("AI Error:", error);
      setChatHistory(prev => {
          const newHist = [...prev];
          if (newHist.length > 0 && newHist[newHist.length - 1].role === 'model') {
              newHist[newHist.length - 1] = { role: 'model', text: "A temporary signal loss in the bush. Let's try once more." };
          }
          return newHist;
      });
    } finally {
      setIsTyping(false);
    }
  };

  // --- Voice Session Management ---

  const startVoiceSession = async () => {
    // 0. Ensure clean state
    stopVoiceSession();
    setMode('voice');
    
    try {
      // 1. Setup Audio Output Context
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      audioContextRef.current = new AudioContextClass({ sampleRate: 24000 }); 
      nextStartTimeRef.current = audioContextRef.current.currentTime;

      // 2. Get User Media
      const stream = await navigator.mediaDevices.getUserMedia({ audio: {
         sampleRate: 16000,
         channelCount: 1,
         echoCancellation: true,
         noiseSuppression: true,
         autoGainControl: true
      }});

      // 3. Connect to Gemini Live
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      
      // Initialize connection
      const sessionPromise = ai.live.connect({
        model: 'gemini-2.5-flash-native-audio-preview-12-2025',
        config: {
            responseModalities: [Modality.AUDIO],
            speechConfig: {
                voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Kore' } } 
            },
            systemInstruction: `You are Kibo, a seasoned African Safari Operations Manager for Savanna. 
            You are speaking via satellite radio to a client.
            Your voice is warm, calm, and authoritative. You have deep knowledge of logistics, wildlife behavior, and luxury lodges.
            Keep answers conversational and relatively short (2-3 sentences) as if on a radio call.
            Start by introducing yourself as Kibo.`
        },
        callbacks: {
            onopen: () => {
                console.log("Gemini Live Connected");
                setIsLiveConnected(true);
                processMicrophoneInput(stream, sessionPromise);
            },
            onmessage: async (message: LiveServerMessage) => {
                const audioData = message.serverContent?.modelTurn?.parts?.[0]?.inlineData?.data;
                if (audioData) {
                    playAudioChunk(audioData);
                    setVolumeLevel(Math.random() * 50 + 50); 
                }
                if (message.serverContent?.turnComplete) {
                   setVolumeLevel(0);
                }
            },
            onclose: () => {
                console.log("Gemini Live Closed");
                stopVoiceSession();
            },
            onerror: (err) => {
                console.error("Gemini Live Error", err);
                if (err instanceof Error && (err.message.includes('Network') || err.message.includes('WebSocket'))) {
                     setMode('text');
                     stopVoiceSession();
                }
            }
        }
      });
      
      liveSessionRef.current = sessionPromise;

    } catch (err) {
      console.error("Failed to start voice session:", err);
      setMode('text');
      stopVoiceSession();
    }
  };

  const processMicrophoneInput = (stream: MediaStream, sessionPromise: Promise<any>) => {
      try {
        const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
        inputAudioContextRef.current = new AudioContextClass({ sampleRate: 16000 });
        
        const source = inputAudioContextRef.current.createMediaStreamSource(stream);
        const processor = inputAudioContextRef.current.createScriptProcessor(4096, 1, 1);

        processor.onaudioprocess = (e) => {
            const inputData = e.inputBuffer.getChannelData(0);
            let sum = 0;
            for(let i = 0; i < inputData.length; i++) sum += Math.abs(inputData[i]);
            const avg = sum / inputData.length;
            setVolumeLevel(avg * 500); 

            const pcmData = floatTo16BitPCM(inputData);
            const base64Data = arrayBufferToBase64(pcmData.buffer);

            sessionPromise.then(session => {
                if (session && session.sendRealtimeInput) {
                    session.sendRealtimeInput({
                        media: {
                            mimeType: 'audio/pcm;rate=16000',
                            data: base64Data
                        }
                    });
                }
            }).catch(e => console.error("Session send error", e));
        };

        source.connect(processor);
        processor.connect(inputAudioContextRef.current.destination);
        
        inputSourceRef.current = source;
        processorRef.current = processor;
      } catch (e) {
        console.error("Audio Input Setup Error", e);
        stopVoiceSession();
      }
  };

  const playAudioChunk = async (base64Data: string) => {
      if (!audioContextRef.current) return;

      try {
        const float32Data = base64ToFloat32Array(base64Data);
        const buffer = audioContextRef.current.createBuffer(1, float32Data.length, 24000);
        buffer.getChannelData(0).set(float32Data);

        const source = audioContextRef.current.createBufferSource();
        source.buffer = buffer;
        source.connect(audioContextRef.current.destination);

        const currentTime = audioContextRef.current.currentTime;
        if (nextStartTimeRef.current < currentTime) {
            nextStartTimeRef.current = currentTime;
        }
        
        source.start(nextStartTimeRef.current);
        nextStartTimeRef.current += buffer.duration;
      } catch (e) {
        console.error("Audio Playback Error", e);
      }
  };

  const stopVoiceSession = () => {
      if (mode === 'voice') setMode('text');
      setIsLiveConnected(false);
      setVolumeLevel(0);

      if (processorRef.current) {
          processorRef.current.disconnect();
          processorRef.current.onaudioprocess = null;
          processorRef.current = null;
      }
      if (inputSourceRef.current) {
          inputSourceRef.current.disconnect();
          inputSourceRef.current = null;
      }
      if (inputAudioContextRef.current) {
          inputAudioContextRef.current.close().catch(e => console.error("Error closing input ctx", e));
          inputAudioContextRef.current = null;
      }
      if (audioContextRef.current) {
          audioContextRef.current.close().catch(e => console.error("Error closing output ctx", e));
          audioContextRef.current = null;
      }
      if (liveSessionRef.current) {
         liveSessionRef.current.then((session: any) => {
             if(session && session.close) {
                 try { session.close(); } catch(e) { console.error("Session close error", e); }
             }
         }).catch(() => {});
         liveSessionRef.current = null;
      }
  };

  const promptCards = [
    { text: "Create a family safari itinerary for Kenya", icon: <ImageIcon size={16} /> },
    { text: "What should I pack for Tanzania in July?", icon: <PenTool size={16} /> },
    { text: "Compare Okavango Delta vs Serengeti", icon: <Code size={16} /> },
    { text: "Best time for the Great Migration?", icon: <Lightbulb size={16} /> }
  ];

  return (
    <div className="relative w-full max-w-2xl mx-auto h-[460px] md:h-[550px]">
      <div className={`w-full h-full rounded-[32px] md:rounded-[44px] shadow-2xl flex flex-col overflow-hidden border border-white/40 transition-all duration-700 ${mode === 'voice' ? 'bg-black/50 backdrop-blur-3xl text-white' : 'bg-savanna-sun text-obsidian'}`}>
        
        {/* Top Navigation / Badge */}
        <div className="flex items-center justify-between p-5 md:p-8 shrink-0 relative z-20">
          <div className={`flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 rounded-full text-[9px] md:text-[10px] font-bold uppercase tracking-widest shadow-lg transition-colors ${mode === 'voice' ? 'bg-white/10 text-white border border-white/10' : 'bg-black text-white'}`}>
            {mode === 'voice' ? <Activity size={10} className="md:w-3 md:h-3 animate-pulse text-acacia-green" /> : <Sparkles size={10} className="md:w-3 md:h-3" />}
            <span>{mode === 'voice' ? 'Live Satellite Link' : 'Concierge'}</span>
          </div>
          <div className="flex gap-2">
            {mode === 'voice' && (
                <button 
                    onClick={stopVoiceSession}
                    className="p-2 bg-red-500/20 text-red-400 hover:bg-red-500 hover:text-white rounded-xl md:rounded-2xl transition-all flex items-center gap-2 px-3"
                >
                    <span className="text-xs font-bold uppercase">End Call</span>
                    <X size={16} />
                </button>
            )}
            <button className={`p-2 md:p-2 backdrop-blur-md rounded-xl md:rounded-2xl transition-all ${mode === 'voice' ? 'bg-white/10 text-white hover:bg-white/20' : 'bg-white/40 text-obsidian/70 hover:bg-white/60'}`}>
              <Settings size={16} className="md:w-4 md:h-4" />
            </button>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-hidden relative">
          
          {/* TEXT MODE UI */}
          <div className={`absolute inset-0 flex flex-col transition-opacity duration-500 ${mode === 'text' ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'}`}>
             <div ref={scrollRef} className="flex-1 overflow-y-auto custom-scrollbar pr-2 flex flex-col px-5 md:px-8">
                {chatHistory.length === 0 ? (
                    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 h-full flex flex-col justify-end md:justify-center pb-2 md:pb-0">
                    <div className="mb-4 md:mb-6 shrink-0">
                        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-2 text-obsidian">
                        Hello, Explorer
                        </h1>
                        <h2 className="text-xl md:text-2xl font-medium text-obsidian/40 leading-tight">
                        How can I help you today?
                        </h2>
                    </div>

                    <div className="grid grid-cols-2 gap-2 md:gap-3 mb-2 shrink-0">
                        {promptCards.map((card, i) => (
                        <button
                            key={i}
                            onClick={() => handleChat(card.text)}
                            className="bg-white/30 backdrop-blur-md p-3 md:p-4 rounded-[16px] md:rounded-[24px] text-left border border-white/20 hover:bg-white/50 transition-all group relative h-20 md:h-24 flex flex-col justify-center"
                        >
                            <p className="text-xs md:text-sm font-medium text-obsidian/80 leading-snug pr-6 line-clamp-3">
                            {card.text}
                            </p>
                            <div className="absolute bottom-2 right-2 p-1.5 bg-white/60 rounded-lg md:rounded-xl group-hover:scale-110 transition-transform">
                            {card.icon}
                            </div>
                        </button>
                        ))}
                    </div>
                    </div>
                ) : (
                    <div className="space-y-4 md:space-y-6 py-2">
                    {chatHistory.map((msg, i) => (
                        <div key={i} className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
                        <div className={`max-w-[90%] md:max-w-[85%] p-3 md:p-5 rounded-[20px] text-sm md:text-base font-medium leading-relaxed shadow-sm ${
                            msg.role === 'user' 
                            ? 'bg-black text-white rounded-tr-none' 
                            : 'bg-white/50 backdrop-blur-md text-obsidian rounded-tl-none border border-white/30'
                        }`}>
                            {msg.text || (
                                <div className="flex gap-1.5 items-center py-1.5 px-1">
                                    <span className="w-1.5 h-1.5 bg-obsidian/40 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                                    <span className="w-1.5 h-1.5 bg-obsidian/40 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                                    <span className="w-1.5 h-1.5 bg-obsidian/40 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                                </div>
                            )}
                        </div>
                        </div>
                    ))}
                    </div>
                )}
             </div>

             {/* Input Bar */}
             <div className="mt-2 md:mt-4 shrink-0 px-5 md:px-8 pb-5 md:pb-8">
                <div className="relative">
                    <div className="flex items-center bg-white/90 backdrop-blur-xl rounded-full p-1 pl-4 md:pl-6 shadow-2xl border border-white/50">
                    <input 
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleChat(input)}
                        placeholder="Ask Savanna..."
                        disabled={isTyping}
                        className="flex-1 bg-transparent py-2.5 md:py-4 text-sm md:text-base font-medium focus:outline-none text-obsidian placeholder:text-obsidian/30 disabled:opacity-50"
                    />
                    <div className="flex items-center gap-1 md:gap-2 pr-1">
                        <button 
                            onClick={startVoiceSession}
                            className="p-2 text-obsidian/60 hover:bg-black/5 rounded-full transition-colors group relative"
                            title="Start Voice Chat"
                        >
                           <Mic size={18} />
                           <span className="absolute -top-1 -right-1 w-2 h-2 bg-acacia-green rounded-full animate-ping opacity-75" />
                        </button>
                        <button 
                        onClick={() => handleChat(input)}
                        disabled={!input.trim() || isTyping}
                        className={`w-8 h-8 md:w-11 md:h-11 rounded-full flex items-center justify-center transition-all ${
                            !input.trim() || isTyping ? 'text-obsidian/20' : 'text-obsidian hover:bg-black/5'
                        }`}
                        >
                        {isTyping ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} className="md:w-[18px] md:h-[18px]" />}
                        </button>
                    </div>
                    </div>
                </div>
             </div>
          </div>

          {/* VOICE MODE UI */}
          <div className={`absolute inset-0 flex flex-col items-center justify-center transition-all duration-700 ${mode === 'voice' ? 'opacity-100 z-10 scale-100' : 'opacity-0 z-0 scale-95 pointer-events-none'}`}>
              
              {/* Visualizer */}
              <div className="relative w-48 h-48 flex items-center justify-center mb-8">
                  {/* Central Core */}
                  <div className="w-20 h-20 bg-savanna-sun rounded-full flex items-center justify-center shadow-[0_0_40px_rgba(250,255,127,0.3)] z-20">
                     <Headphones size={32} className="text-obsidian" />
                  </div>
                  
                  {/* Pulse Rings */}
                  <div 
                    className="absolute inset-0 rounded-full border border-white/20 transition-all duration-100 ease-out z-10"
                    style={{ transform: `scale(${1 + volumeLevel / 50})`, opacity: 0.5 - (volumeLevel/200) }}
                  />
                  <div 
                    className="absolute inset-4 rounded-full border border-white/40 transition-all duration-100 ease-out z-10"
                    style={{ transform: `scale(${1 + volumeLevel / 80})`, opacity: 0.8 - (volumeLevel/200) }}
                  />
                   {/* Ambient Glow */}
                   <div className="absolute inset-0 bg-savanna-sun/20 blur-3xl rounded-full animate-pulse" />
              </div>

              <h2 className="text-2xl font-bold mb-2 tracking-tight">Kibo</h2>
              <p className="text-white/50 font-medium text-sm mb-8 uppercase tracking-widest">Operations Manager</p>

              <div className="flex gap-2">
                 {[1,2,3,4].map(i => (
                     <div key={i} className="w-1 h-8 bg-white/20 rounded-full animate-pulse" style={{ animationDelay: `${i * 100}ms`}} />
                 ))}
              </div>

              <div className="absolute bottom-8 text-center px-8">
                  <p className="text-white/40 text-xs">Connected via Gemini Live 2.5 (16kHz Audio Stream)</p>
              </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default AssistantCard;
