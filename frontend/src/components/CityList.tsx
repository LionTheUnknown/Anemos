
import type { Forecast } from '../common/types/forecast';
import CityCard from './CityCard';

interface CityListProps {
  forecastList: Forecast[];
}

export default function CityList({ forecastList }: CityListProps) {
  return (
    <>
      {forecastList.map((forecast) => (
        <CityCard
          key={`${forecast?.city_name ?? ''}-${forecast?.country ?? ''}`}
          forecast={forecast}
        />
      ))}
    </>
  );
}
