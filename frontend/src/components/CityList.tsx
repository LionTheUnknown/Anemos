
import type { CityWeather } from '../common/types/forecast';
import CityCard from './CityCard';

interface CityListProps {
  cityList: CityWeather[];
  onCitySelect?: (cityWeather: CityWeather) => void;
}

export default function CityList({ cityList, onCitySelect }: CityListProps) {
  return (
    <>
      {cityList.map((cityWeather) => (
        <CityCard
          key={`${cityWeather?.city_name ?? ''}-${cityWeather?.country ?? ''}`}
          cityWeather={cityWeather}
          onCitySelect={onCitySelect}
        />
      ))}
    </>
  );
}
