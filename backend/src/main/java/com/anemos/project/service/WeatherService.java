package com.anemos.project.service;

import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.beans.factory.annotation.Value;
import com.anemos.project.dto.responses.WeatherResponseDto;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;
import com.anemos.project.dto.responses.OpenMeteoResponseDto;
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

    public List<WeatherResponseDto> getWeather(String name, String country, double lat, double lon) {
        List<WeatherResponseDto> result = new ArrayList<>();

        OpenMeteoResponseDto requestedWeather = webWeatherClient.get()
                .uri(uriBuilder -> uriBuilder
                        .queryParam("latitude", lat)
                        .queryParam("longitude", lon)
                        .queryParam("daily", "sunset,sunrise")
                        .queryParam("current", "wind_speed_10m,relative_humidity_2m,rain,temperature_2m,apparent_temperature,weather_code")
                        .build())
                .retrieve()
                .bodyToMono(OpenMeteoResponseDto.class)
                .block();

        WeatherResponseDto requestedDto = mapper.toWeatherResponseDto(name, country, requestedWeather);
        if (requestedDto != null) {
            result.add(requestedDto);
        }

        Boolean isInTop3 = repository.isTop3Weather(name, country);
        List<Weather> topCities = isInTop3 ? repository.findTop4Weather() : repository.findTop3Weather();

        List<Weather> others = topCities.stream()
                .filter(w -> !(w.getCity().equals(name) && w.getCountry().equals(country)))
                .limit(3)
                .collect(Collectors.toList());

        for (Weather w : others) {
            if (w.getLatitude() != null && w.getLongitude() != null) {
                OpenMeteoResponseDto topWeather = webWeatherClient.get()
                        .uri(uriBuilder -> uriBuilder
                                .queryParam("latitude", w.getLatitude())
                                .queryParam("longitude", w.getLongitude())
                                .queryParam("daily", "sunset,sunrise")
                                .queryParam("current", "wind_speed_10m,relative_humidity_2m,rain,temperature_2m,apparent_temperature,weather_code")
                                .build())
                        .retrieve()
                        .bodyToMono(OpenMeteoResponseDto.class)
                        .block();
                WeatherResponseDto dto = mapper.toWeatherResponseDto(w.getCity(), w.getCountry(), topWeather);
                if (dto != null) {
                    result.add(dto);
                }
            }
        }

        return result;
    }
    public List<WeatherResponseDto> postWeather(WeatherRequestDto request) {
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
