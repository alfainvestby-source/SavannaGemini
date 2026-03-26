
import React, { useState } from 'react';
import { Plus, Minus } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQProps {
  items: FAQItem[];
  className?: string;
}

const FAQ: React.FC<FAQProps> = ({ items, className = '' }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className={`w-full ${className}`}>
      {items.map((item, i) => (
        <div key={i} className="border-b border-black/10 last:border-0">
          <button
            onClick={() => toggle(i)}
            className="w-full py-8 flex items-start justify-between text-left group cursor-pointer select-none"
          >
            <span className={`text-xl md:text-2xl font-medium pr-8 transition-colors ${openIndex === i ? 'text-obsidian' : 'text-obsidian/80 hover:text-obsidian'}`}>
              {item.question}
            </span>
            <div className={`shrink-0 mt-1 transition-transform duration-300 ${openIndex === i ? 'rotate-180 text-obsidian' : 'text-obsidian/40 group-hover:text-obsidian'}`}>
               {openIndex === i ? <Minus size={24} strokeWidth={1.5} /> : <Plus size={24} strokeWidth={1.5} />}
            </div>
          </button>
          <div 
            className={`overflow-hidden transition-all duration-500 ease-in-out ${
              openIndex === i ? 'max-h-[500px] opacity-100 pb-8' : 'max-h-0 opacity-0'
            }`}
          >
             <p className="text-obsidian/60 text-lg leading-relaxed max-w-3xl font-light">
               {item.answer}
             </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FAQ;
