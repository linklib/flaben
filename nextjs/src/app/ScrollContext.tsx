"use client"
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface ScrollContextType {
  shouldScroll: boolean;
  setShouldScroll: (value: boolean) => void;
}

const ScrollContext = createContext<ScrollContextType | undefined>(undefined);

export const ScrollProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [shouldScroll, setShouldScroll] = useState(false);

  return (
    <ScrollContext.Provider value={{ shouldScroll, setShouldScroll }}>
      {children}
    </ScrollContext.Provider>
  );
};

export const useScroll = () => {
  const context = useContext(ScrollContext);
  if (context === undefined) {
    throw new Error('useScroll must be used within a ScrollProvider');
  }
  return context;
};
