import { createContext, useContext, useState, useCallback, useEffect } from 'react';
import type { TempUnit } from '../utils/formatTemp';

const STORAGE_KEY = 'anemos-temp-unit';

const TempUnitContext = createContext<{
  unit: TempUnit;
  setUnit: (unit: TempUnit) => void;
  toggleUnit: () => void;
} | null>(null);

export function TempUnitProvider({ children }: { children: React.ReactNode }) {
  const [unit, setUnitState] = useState<TempUnit>(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    return (stored === 'f' ? 'f' : 'c') as TempUnit;
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, unit);
  }, [unit]);

  const setUnit = useCallback((u: TempUnit) => setUnitState(u), []);
  const toggleUnit = useCallback(() => setUnitState((u) => (u === 'c' ? 'f' : 'c')), []);

  return (
    <TempUnitContext.Provider value={{ unit, setUnit, toggleUnit }}>
      {children}
    </TempUnitContext.Provider>
  );
}

export function useTempUnit() {
  const ctx = useContext(TempUnitContext);
  if (!ctx) throw new Error('useTempUnit must be used within TempUnitProvider');
  return ctx;
}
