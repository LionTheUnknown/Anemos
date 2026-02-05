import { TextField, Autocomplete, InputAdornment } from '@mui/material';
import LocationOn from '@mui/icons-material/LocationOn';
import type { City } from '../common/types/City';

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
  return (
    <Autocomplete
      autoSelect
      disablePortal
      options={cityList.map((c) => `${c.city}, ${c.country}`)}
      filterOptions={(options, state) => {
        if (state.inputValue.length < 1) return [];
        const input = state.inputValue.toLowerCase();
        return options
          .filter((option) => option.toLowerCase().startsWith(input))
          .sort((a, b) => {
            const aExact = a.toLowerCase() === input;
            const bExact = b.toLowerCase() === input;
            if (aExact && !bExact) return -1;
            if (!aExact && bExact) return 1;
            return a.length - b.length || a.localeCompare(b);
          })
          .slice(0, 10);
      }}
      sx={{ width: 300 }}
      renderInput={(params) => (
        <TextField
          {...params}
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
      className="city-autocomplete"
    />
  );
}
