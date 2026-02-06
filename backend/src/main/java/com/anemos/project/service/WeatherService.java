package com.anemos.project.service;

import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.beans.factory.annotation.Value;
import com.anemos.project.dto.responses.*;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;
import com.anemos.project.model.Weather;
import com.anemos.project.mapper.WeatherDtoMapper;
import com.anemos.project.repository.WeatherRepository;
import com.anemos.project.dto.requests.WeatherRequestDto;

@Service
public class WeatherService {
    private final WebClient webWeatherClient;
    private final WeatherDtoMapper mapper;
    private final WeatherRepository repository;

    public WeatherService(WebClient.Builder builder,
                          @Value("${weather.base-url}")
                          String basWeathereUrl,
                          WeatherDtoMapper mapper,
                          WeatherRepository repository) {
        this.webWeatherClient = builder.baseUrl(basWeathereUrl).build();
        this.repository = repository;
        this.mapper = mapper;
    }

    public SelectedCityResponseDto getSelectedCityWeather(String name, String country, double lat, double lon) {
        OpenMeteoResponseDto requestedWeather;
        try {
            requestedWeather = webWeatherClient.get()
                    .uri(uriBuilder -> uriBuilder
                            .queryParam("latitude", lat)
                            .queryParam("longitude", lon)
                            .queryParam("timezone", "auto")
                            .queryParam("forecast_days", 7)
                            .queryParam("daily", "sunset,sunrise,temperature_2m_max,weather_code")
                            .queryParam("current", "wind_speed_10m,relative_humidity_2m,rain,temperature_2m,apparent_temperature,weather_code")
                            .build())
                    .retrieve()
                    .bodyToMono(OpenMeteoResponseDto.class)
                    .block();
        } catch (Exception e) {
            throw new RuntimeException("Failed to fetch weather from Open-Meteo for " + name + ": " + e.getMessage(), e);
        }

        if (requestedWeather == null) {
            throw new RuntimeException("No weather data returned for " + name);
        }

        CityWeatherDto selectedCityCurrent = mapper.toCityWeatherDto(name, country, requestedWeather);
        List<DailyForecastItemDto> selectedCityForecast = mapper.toDailyForecastList(requestedWeather);

        return SelectedCityResponseDto.builder()
                .selectedCityCurrent(selectedCityCurrent)
                .selectedCityForecast(selectedCityForecast)
                .build();
    }

    public List<CityWeatherDto> getTopCitiesWeather(String excludeCity, String excludeCountry) {
        Boolean isInTop3 = repository.isTop3Weather(excludeCity, excludeCountry);
        List<Weather> topCities = isInTop3 ? repository.findTop4Weather() : repository.findTop3Weather();

        List<Weather> others = topCities.stream()
                .filter(w -> !(w.getCity().equals(excludeCity) && w.getCountry().equals(excludeCountry)))
                .limit(3)
                .collect(Collectors.toList());

        List<CityWeatherDto> topCitiesDtos = new ArrayList<>();
        for (Weather w : others) {
            if (w.getLatitude() != null && w.getLongitude() != null) {
                try {
                    OpenMeteoResponseDto topWeather = webWeatherClient.get()
                            .uri(uriBuilder -> uriBuilder
                                    .queryParam("latitude", w.getLatitude())
                                    .queryParam("longitude", w.getLongitude())
                                    .queryParam("timezone", "auto")
                                    .queryParam("daily", "sunset,sunrise")
                                    .queryParam("current", "wind_speed_10m,relative_humidity_2m,rain,temperature_2m,apparent_temperature,weather_code")
                                    .build())
                            .retrieve()
                            .bodyToMono(OpenMeteoResponseDto.class)
                            .block();
                    CityWeatherDto dto = mapper.toCityWeatherDto(w.getCity(), w.getCountry(), topWeather);
                    if (dto != null) {
                        topCitiesDtos.add(dto);
                    }
                } catch (Exception e) {
                    throw new RuntimeException("Failed to fetch weather for " + w.getCity() + ": " + e.getMessage(), e);
                }
            }
        }
        return topCitiesDtos;
    }

    public WeatherResponseDto getWeather(String name, String country, double lat, double lon) {
        SelectedCityResponseDto selected = getSelectedCityWeather(name, country, lat, lon);
        List<CityWeatherDto> topCities = getTopCitiesWeather(name, country);

        return WeatherResponseDto.builder()
                .selectedCityCurrent(selected.getSelectedCityCurrent())
                .selectedCityForecast(selected.getSelectedCityForecast())
                .topCities(topCities)
                .build();
    }

    public WeatherResponseDto postWeather(WeatherRequestDto request) {
        String city = request.getCity();
        String country = request.getCountry();
        double lat = request.getLatitude();
        double lon = request.getLongitude();

        Weather existing = repository.findByCityAndCountry(city, country);
        if (existing != null) {
            repository.updateCountByCityAndCountry(city, country, lat, lon);
        } else {
            repository.create(Weather.builder()
                    .city(city)
                    .country(country)
                    .count(1)
                    .latitude(lat)
                    .longitude(lon)
                    .build());
        }

        return getWeather(city, country, lat, lon);
    }
}
