import { useState, useEffect } from 'react';
import { TextField, Autocomplete } from '@mui/material';
import { matchSorter } from 'match-sorter';
import type { City } from '../common/types/City';
import '../common/styling/weather_header.css';
import PlaceIcon from '@mui/icons-material/Place';
import InputAdornment from '@mui/material/InputAdornment';

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
    }).slice(0, 10);
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
      sx={{ width: { xs: '100%', sm: '20rem', md: '22.5rem', lg: '23.75rem', xl: '25rem' }, maxWidth: '100%' }}
      renderInput={(params) => (
        <TextField
          {...params}
          placeholder="Select a city..."
          variant="outlined"
          slotProps={{
            input: {
              ...params.InputProps,
              startAdornment: (
                <InputAdornment position="start">
                  <PlaceIcon />
                </InputAdornment>
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
          onInputChange("");
        }
      }}
      inputValue={inputValue}
      onInputChange={(_, newInputValue) => { if (newInputValue){
        onInputChange(newInputValue)
      }
      else{
        onInputChange("")
      }
        
      }
        }
      onKeyDown={onKeyDown}
    />
  );
}
