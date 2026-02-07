export type TempUnit = 'c' | 'f';
import { useTempUnit } from '../context/TempUnitContext';
function celsiusToFahrenheit(c: number): number {
  return (c * 9) / 5 + 32;
}

export function formatTemp(value: number | null | undefined): string {
  const { unit } = useTempUnit();
  if (value == null) return '—';
  const displayValue = unit === 'f' ? celsiusToFahrenheit(value) : value;
  return `${Number(displayValue).toFixed(1)}°${unit.toUpperCase()}`;
}
