package com.anemos.project.service;

import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.beans.factory.annotation.Value;
import com.anemos.project.dto.responses.WeatherResponseDto;
import com.anemos.project.dto.responses.GeocodingResponseDto;
import com.anemos.project.dto.responses.OpenMeteoResponseDto;
import com.anemos.project.model.City;
import com.anemos.project.mapper.WeatherDtoMapper;
@Service
public class WeatherService {
    private final WebClient webWeatherClient;
    private final WebClient webLocationClient;
    private final WeatherDtoMapper mapper;

    public WeatherService(WebClient.Builder builder,
                          @Value("${weather.base-url}")
                          String basWeathereUrl,
                          @Value("${location.base-url}")
                          String baseLocationUrl,
                          WeatherDtoMapper mapper) {
        this.webWeatherClient = builder.baseUrl(basWeathereUrl).build();
        this.webLocationClient = builder.baseUrl(baseLocationUrl).build();
        
        this.mapper = mapper;
    }

    public WeatherResponseDto getWeather(String name) {

        GeocodingResponseDto locationResponse = webLocationClient.get()
                .uri(uriBuilder -> uriBuilder
                        .queryParam("name", name)
                        .queryParam("count", 1)
                        .build())
                .retrieve()
                .bodyToMono(GeocodingResponseDto.class)
                .block();

        City city = (locationResponse != null && locationResponse.getResults() != null 
                && !locationResponse.getResults().isEmpty())
                ? locationResponse.getResults().get(0)
                : null;
        System.out.println(city);

        

        OpenMeteoResponseDto weatherResponse = webWeatherClient.get()
                .uri(uriBuilder -> uriBuilder
                    .queryParam("latitude", city.getLatitude())
                    .queryParam("longitude", city.getLongitude())
                    .queryParam("elevation", city.getElevation())
                    .queryParam("timezone", city.getTimezone())
                    .queryParam("daily","sunset,sunrise")
                    .queryParam("current", "wind_speed_10m,relative_humidity_2m,rain,temperature_2m,apparent_temperature")
                    .build())
                .retrieve()
                .bodyToMono(OpenMeteoResponseDto.class)
                .block();
        System.out.println(weatherResponse);

        return mapper.toWeatherResponseDto(weatherResponse);
    }
}
