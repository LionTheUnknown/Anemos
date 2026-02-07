import { useState, useEffect } from 'react';
import { TextField, Autocomplete, InputAdornment } from '@mui/material';
import LocationOn from '@mui/icons-material/LocationOn';
import { matchSorter } from 'match-sorter';
import type { City } from '../common/types/City';
import '../common/styling/weather_header.css';

const DEBOUNCE_MS = 300;

function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);
  return debouncedValue;
}

interface CityAutocompleteProps {
  selectedCity: City | null;
  cityList: City[];
  inputValue: string;
  onCityChange: (newValue: string | null, displayLabel?: string) => void;
  onInputChange: (newValue: string) => void;
  onKeyDown: (e: React.KeyboardEvent) => void;
}

export default function CityAutocomplete({
  selectedCity,
  cityList,
  inputValue,
  onCityChange,
  onInputChange,
  onKeyDown,
}: CityAutocompleteProps) {
  const debouncedInput = useDebounce(inputValue, DEBOUNCE_MS);
  const isSearching = inputValue !== debouncedInput && inputValue.length > 0;

  const options = cityList.map((c) => `${c.city}, ${c.country}`);
  const filterOptions = (opts: string[]) => {
    const input = debouncedInput.trim();
    if (!input) return [];
    return matchSorter(opts, input, {
      threshold: matchSorter.rankings.WORD_STARTS_WITH,
      baseSort: (a, b) => a.index - b.index,
    }).slice(0, 15);
  };

  return (
    <Autocomplete
      className="city-autocomplete"
      autoSelect
      disablePortal
      noOptionsText={null}
      loading={isSearching}
      loadingText="Searching..."
      options={options}
      filterOptions={(opts) => filterOptions(opts)}
      sx={{ width: 300 }}
      renderInput={(params) => (
        <TextField
          {...params}
          placeholder="Select a city..."
          variant="outlined"
          slotProps={{
            input: {
              ...params.InputProps,
              startAdornment: (
                <>
                  <InputAdornment position="start" sx={{ mr: 0.5 }}>
                    <LocationOn sx={{ fontSize: 20 }} />
                  </InputAdornment>
                  {params.InputProps?.startAdornment}
                </>
              ),
            },
          }}
        />
      )}
      value={selectedCity ? `${selectedCity.city}, ${selectedCity.country}` : null}
      onChange={(_, newValue) => {
        if (newValue) {
          const cityName = newValue.split(',')[0].trim();
          onCityChange(cityName, newValue);
        } else {
          onCityChange(null);
        }
      }}
      inputValue={inputValue}
      onInputChange={(_, newInputValue) => onInputChange(newInputValue)}
      onKeyDown={onKeyDown}
    />
  );
}
