
// Import React to provide access to the React namespace and ReactNode type
import React from 'react';

export interface Feature {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
}

export interface Stat {
  label: string;
  value: string;
  change?: string;
}
