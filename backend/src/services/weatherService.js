import * as weatherRepo from '../repository/weatherRepo.js';
import {
  fetchSelectedCityWeather,
  fetchCurrentWeather,
  mapToCityWeather,
  mapToDailyForecastList,
} from '../utils/openMeteo.js';

export async function getSelectedCityWeather(name, country, lat, lon) {
  const data = await fetchSelectedCityWeather(lat, lon);
  if (!data) throw new Error(`No weather data returned for ${name}`);

  const selectedCityCurrent = mapToCityWeather(name, country, data);
  const selectedCityForecast = mapToDailyForecastList(data);

  return {
    selected_city_current: selectedCityCurrent,
    selected_city_forecast: selectedCityForecast,
  };
}

export async function getTopCitiesWeather(excludeCity = null, excludeCountry = null) {
  let topRows;
  if (excludeCity && excludeCountry) {
    const isInTop3 = await weatherRepo.isTop3Weather(excludeCity, excludeCountry);
    topRows = isInTop3 ? await weatherRepo.findTop4Weather() : await weatherRepo.findTop3Weather();
  } else {
    topRows = await weatherRepo.findTop3Weather();
  }

  const others = topRows
    .filter((w) => !(excludeCity && excludeCountry && w.city === excludeCity && w.country === excludeCountry))
    .slice(0, 3);

  const result = [];
  for (const w of others) {
    if (w.latitude != null && w.longitude != null) {
      try {
        const data = await fetchCurrentWeather(w.latitude, w.longitude);
        const dto = mapToCityWeather(w.city, w.country, data);
        if (dto) result.push(dto);
      } catch (e) {
        throw new Error(`Failed to fetch weather for ${w.city}: ${e.message}`);
      }
    }
  }
  return result;
}

export async function getWeather(name, country, lat, lon) {
  const selected = await getSelectedCityWeather(name, country, lat, lon);
  const topCities = await getTopCitiesWeather(name, country);

  return {
    selected_city_current: selected.selected_city_current,
    selected_city_forecast: selected.selected_city_forecast,
    top_cities: topCities,
  };
}

export async function postWeather(city, country, lat, lon) {
  const existing = await weatherRepo.findByCityAndCountry(city, country);
  if (existing) {
    await weatherRepo.updateCountByCityAndCountry(city, country, lat, lon);
  } else {
    await weatherRepo.create({ city, country, latitude: lat, longitude: lon });
  }
  return getWeather(city, country, lat, lon);
}
