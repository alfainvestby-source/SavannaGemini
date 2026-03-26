
import React from 'react';
import { ChevronRight, ChevronLeft, ArrowRight, Sparkles, BookOpen, Leaf } from 'lucide-react';

const MagazinePage: React.FC = () => {
  return (
    <div className="bg-wilderness-white min-h-screen pb-20 animate-in fade-in duration-700 font-sans selection:bg-savanna-sun selection:text-obsidian">
      
      {/* Hero / Hot Shot Section - Full BG with Linear Gradient Blur */}
      <section className="relative h-[90vh] min-h-[700px] w-full mb-24 overflow-hidden">
         {/* Background Image */}
         <img 
            src="https://www.wanderlustmagazine.com/wp-content/uploads/2023/11/dreamstime_xxl_80975530-scaled.jpg" 
            alt="Cover" 
            className="absolute inset-0 w-full h-full object-cover"
         />
         
         {/* Gradient Blur Overlay using Mask 
             Top: 0% Blur (Transparent Mask)
             Bottom: ~5% Blur (Opaque Mask)
         */}
         <div 
            className="absolute inset-0 z-10 pointer-events-none"
            style={{
                backdropFilter: 'blur(8px)',
                WebkitBackdropFilter: 'blur(8px)',
                maskImage: 'linear-gradient(to bottom, transparent 20%, black 100%)',
                WebkitMaskImage: 'linear-gradient(to bottom, transparent 20%, black 100%)'
            }}
         />
         
         {/* Bottom Darkening Gradient for Text Contrast */}
         <div className="absolute inset-x-0 bottom-0 h-[60%] bg-gradient-to-t from-black/90 via-black/40 to-transparent z-10" />
         
         {/* Content */}
         <div className="absolute inset-0 flex items-end z-20">
            <div className="w-full max-w-7xl mx-auto px-6 pb-24 md:pb-32">
               <div className="max-w-4xl space-y-8 animate-in slide-in-from-bottom-10 duration-1000">
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 text-white text-xs font-bold uppercase tracking-widest shadow-lg">
                     <Sparkles size={14} className="text-savanna-sun" />
                     <span>Editor's Pick · September Issue</span>
                  </div>
                  
                  <h1 className="text-6xl md:text-9xl font-bold tracking-tighter text-white leading-[0.9] drop-shadow-xl">
                     The <span className="text-transparent bg-clip-text bg-gradient-to-r from-savanna-sun to-acacia-green">Untold</span> <br/> Chronicles.
                  </h1>
                  
                  <p className="text-xl md:text-2xl text-white/80 leading-relaxed max-w-2xl font-light drop-shadow-md">
                     Dive into the raw stories of the savanna. From conservation breakthroughs to the quiet moments of the wild.
                  </p>
                  
                  <div className="flex flex-col sm:flex-row gap-6 pt-6">
                     <button className="bg-savanna-sun text-obsidian px-10 py-5 rounded-full font-bold text-sm uppercase tracking-widest hover:scale-105 transition-transform shadow-xl flex items-center justify-center gap-2 group">
                        Read Article <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                     </button>
                     <button className="px-10 py-5 rounded-full font-bold text-sm uppercase tracking-widest text-white border border-white/30 hover:bg-white/10 transition-colors backdrop-blur-md">
                        View Gallery
                     </button>
                  </div>
               </div>
            </div>
         </div>
      </section>

      {/* Featured Stories - Gradient Titles & Glass Bottoms */}
      <section className="max-w-7xl mx-auto px-6 mb-32 relative z-10">
         <div className="flex justify-between items-end mb-16">
            <h2 className="text-4xl font-bold text-obsidian tracking-tight">Featured <br/> <span className="text-black/30">Narratives</span></h2>
            <div className="hidden md:flex gap-2">
               {['Conservation', 'Culture', 'Tech'].map(cat => (
                  <button key={cat} className="px-6 py-2 rounded-full border border-cloud-grey/30 text-sm font-bold uppercase tracking-widest hover:bg-obsidian hover:text-white transition-all">
                     {cat}
                  </button>
               ))}
            </div>
         </div>

         <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Card 1 - Acacia Gradient */}
            <ArticleCard 
               image="https://images.unsplash.com/photo-1523800503107-5bc3ba2a6f81?auto=format&fit=crop&q=80&w=800"
               category="Conservation"
               title={<>Powered by <span className="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-acacia-green to-emerald-800">AI</span>: A New Era</>}
               description="How algorithms are predicting poaching patterns before they happen."
            />

            {/* Card 2 - Obsidian Gradient */}
            <ArticleCard 
               image="https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&q=80&w=800"
               category="Technology"
               title={<>The <span className="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-black to-gray-600">UltraMARATHON</span></>}
               description="Tracking the great migration with satellite precision and data science."
            />

            {/* Card 3 - Sun Gradient */}
            <ArticleCard 
               image="https://images.unsplash.com/photo-1511497584788-876760111969?auto=format&fit=crop&q=80&w=800"
               category="Culture"
               title={<>Through Their <span className="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-savanna-sun">Own Lens</span></>}
               description="Local Maasai guides are now the storytellers of their own land."
            />
         </div>
      </section>

      {/* "Observe Features" Style Section - TripAI inspiration */}
      <section className="max-w-7xl mx-auto px-6 mb-32 relative z-10">
         <div className="bg-white rounded-[64px] p-12 md:p-20 shadow-xl border border-cloud-grey/10 relative overflow-hidden">
            {/* Background Decorations */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-b from-savanna-sun/20 to-transparent rounded-full blur-[80px] -mr-32 -mt-32 pointer-events-none" />
            
            <div className="flex flex-col lg:flex-row items-center gap-20 relative z-10">
               <div className="lg:w-1/2 space-y-8">
                  <div className="inline-flex items-center gap-2 mb-4">
                     <span className="w-3 h-3 bg-acacia-green rounded-full animate-pulse" />
                     <span className="text-xs font-bold uppercase tracking-widest text-cloud-grey">Nomad Top Picks</span>
                  </div>
                  <h2 className="text-5xl md:text-7xl font-bold text-obsidian leading-[0.95]">
                     Observe <br/> our <span className="font-light italic text-acacia-green">wildest</span> <br/> features.
                  </h2>
                  <p className="text-xl text-obsidian/60 leading-relaxed font-light max-w-md">
                     Savanna is a comprehensive solution designed to revolutionize travel management. Advanced AI algorithms streamline the entire process.
                  </p>
                  
                  {/* Floating Mini Card */}
                  <div className="mt-8 p-6 bg-wilderness-white/80 backdrop-blur-sm rounded-[32px] border border-cloud-grey/10 max-w-sm hover:scale-105 transition-transform duration-500 cursor-pointer shadow-sm">
                     <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center text-white">
                           <BookOpen size={20} />
                        </div>
                        <div>
                           <h4 className="font-bold text-lg">AI-Powered Planning</h4>
                           <p className="text-xs text-cloud-grey uppercase tracking-widest mt-1">Explore Now <ArrowRight size={10} className="inline ml-1" /></p>
                        </div>
                     </div>
                  </div>
               </div>

               <div className="lg:w-1/2 w-full flex justify-center lg:justify-end">
                   {/* Phone-like or Card visual from example */}
                   <div className="relative w-[320px] md:w-[380px] h-[600px] bg-white rounded-[48px] shadow-2xl border-[8px] border-wilderness-white overflow-hidden rotate-[-6deg] hover:rotate-0 transition-transform duration-700">
                      <img src="https://images.unsplash.com/photo-1493246507139-91e8bef99c02?auto=format&fit=crop&q=80&w=800" className="absolute inset-0 w-full h-full object-cover" alt="Feature" />
                      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/80" />
                      
                      {/* Glass Overlay on Image */}
                      <div className="absolute bottom-8 left-6 right-6">
                         <div className="glass p-6 rounded-[32px] bg-white/10 backdrop-blur-md border border-white/20 text-white">
                            <div className="flex justify-between items-start mb-4">
                               <h3 className="text-3xl font-bold">28<span className="text-lg">°c</span></h3>
                               <div className="p-2 bg-savanna-sun text-obsidian rounded-full"><Leaf size={16} /></div>
                            </div>
                            <p className="font-bold text-lg mb-1">Not too busy</p>
                            <p className="text-xs opacity-70 mb-4">Serengeti, TZ</p>
                            
                            {/* Fake UI elements */}
                            <div className="flex gap-2">
                               <div className="flex-1 h-1 bg-white/40 rounded-full" />
                               <div className="flex-1 h-1 bg-white rounded-full" />
                               <div className="flex-1 h-1 bg-white/40 rounded-full" />
                            </div>
                         </div>
                      </div>
                   </div>
               </div>
            </div>
         </div>
      </section>

      {/* Subscription Section */}
      <section className="max-w-7xl mx-auto px-6 relative z-10">
         <div className="bg-obsidian text-white rounded-[48px] p-12 md:p-24 text-center relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-gray-800 via-black to-black opacity-50" />
            <div className="relative z-10 max-w-2xl mx-auto space-y-8">
               <h2 className="text-4xl md:text-6xl font-bold tracking-tight">Stories that matter. <br/> <span className="text-cloud-grey">Delivered to you.</span></h2>
               <div className="flex flex-col md:flex-row gap-4 max-w-md mx-auto">
                  <input type="email" placeholder="Email Address" className="flex-1 bg-white/10 border border-white/20 rounded-full px-8 py-4 text-white placeholder:text-white/40 focus:outline-none focus:border-savanna-sun transition-colors" />
                  <button className="bg-savanna-sun text-obsidian font-bold uppercase tracking-widest px-8 py-4 rounded-full hover:bg-white transition-colors">
                     Subscribe
                  </button>
               </div>
            </div>
         </div>
      </section>

    </div>
  );
};

const ArticleCard: React.FC<{
  image: string, 
  category: string, 
  title: React.ReactNode, 
  description: string
}> = ({ image, category, title, description }) => (
   <div className="group cursor-pointer">
      <div className="relative aspect-[3/4] rounded-[40px] overflow-hidden mb-6 border border-black/5 shadow-lg">
         <img src={image} alt="Article" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
         
         {/* Glassmorphism Bottom Overlay */}
         <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-black/60 to-transparent opacity-50" />
         <div className="absolute bottom-4 left-4 right-4">
             {/* The Glass Box requesting attention */}
            <div className="glass bg-white/30 backdrop-blur-xl border border-white/20 p-6 rounded-[32px] transition-all duration-300 group-hover:bg-white/40">
               <div className="flex justify-between items-start">
                  <div className="text-white">
                     <p className="text-[10px] font-bold uppercase tracking-widest mb-1 opacity-80">{category}</p>
                     <p className="text-sm font-medium line-clamp-2 opacity-90">{description}</p>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-white text-obsidian flex items-center justify-center shrink-0">
                     <ArrowRight size={14} className="-rotate-45 group-hover:rotate-0 transition-transform" />
                  </div>
               </div>
            </div>
         </div>
      </div>
      
      {/* Title outside or distinct */}
      <div className="px-2">
         <h3 className="text-3xl font-bold leading-tight group-hover:opacity-80 transition-opacity">
            {title}
         </h3>
      </div>
   </div>
);

export default MagazinePage;
