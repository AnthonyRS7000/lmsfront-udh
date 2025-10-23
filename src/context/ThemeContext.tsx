import React, { createContext, useContext } from 'react';
import { useTheme } from '../hooks/useTheme';

type ThemeContextProps = ReturnType<typeof useTheme>;

const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const themeHook = useTheme();
  return <ThemeContext.Provider value={themeHook}>{children}</ThemeContext.Provider>;
};

export const useThemeContext = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useThemeContext must be used within ThemeProvider');
  return context;
};
