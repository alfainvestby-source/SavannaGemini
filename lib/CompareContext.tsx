import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface CompareTour {
  id: string;
  title: string;
  image: string;
  price: number;
  days: number;
  location: string;
  operator?: string;
}

interface CompareContextType {
  compareList: CompareTour[];
  addToCompare: (tour: CompareTour) => void;
  removeFromCompare: (id: string) => void;
  clearCompare: () => void;
  isInCompare: (id: string) => boolean;
}

const CompareContext = createContext<CompareContextType | undefined>(undefined);

export const CompareProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [compareList, setCompareList] = useState<CompareTour[]>([]);

  const addToCompare = (tour: CompareTour) => {
    setCompareList(prev => {
      if (prev.find(t => t.id === tour.id)) return prev;
      if (prev.length >= 3) {
        alert("You can only compare up to 3 tours at a time.");
        return prev;
      }
      return [...prev, tour];
    });
  };

  const removeFromCompare = (id: string) => {
    setCompareList(prev => prev.filter(t => t.id !== id));
  };

  const clearCompare = () => {
    setCompareList([]);
  };

  const isInCompare = (id: string) => {
    return compareList.some(t => t.id === id);
  };

  return (
    <CompareContext.Provider value={{ compareList, addToCompare, removeFromCompare, clearCompare, isInCompare }}>
      {children}
    </CompareContext.Provider>
  );
};

export const useCompare = () => {
  const context = useContext(CompareContext);
  if (context === undefined) {
    throw new Error('useCompare must be used within a CompareProvider');
  }
  return context;
};
