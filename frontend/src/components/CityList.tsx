import type { CityWeather } from '../common/types/forecast';
import CityCard from './CityCard';
import CityCardSkeleton from './skeletons/CityCardSkeleton';

interface CityListProps {
  cityList: CityWeather[];
  onCitySelect?: (cityWeather: CityWeather) => void;
  isLoading?: boolean;
  isEmpty?: boolean;
}

const SKELETON_COUNT = 3;

export default function CityList({ cityList, onCitySelect, isLoading, isEmpty }: CityListProps) {
  if (isLoading || isEmpty) {
    return (
      <>
        {Array.from({ length: SKELETON_COUNT }).map((_, i) => (
          <CityCardSkeleton key={i} />
        ))}
      </>
    );
  }

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
