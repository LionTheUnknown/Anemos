package com.anemos.project.mapper;

import org.springframework.stereotype.Service;
import com.anemos.project.dto.responses.DailyWeatherDto;
import com.anemos.project.dto.responses.OpenMeteoResponseDto;
import com.anemos.project.dto.responses.WeatherResponseDto;

import java.util.List;

@Service
public class WeatherDtoMapper {
    public WeatherResponseDto toWeatherResponseDto(OpenMeteoResponseDto response) {
        return toWeatherResponseDto(null, null, response);
    }

    public WeatherResponseDto toWeatherResponseDto(String city, String country, OpenMeteoResponseDto response) {
        if (response == null || response.getCurrent() == null) {
            return null;
        }

        String sunrise = getFirst(response.getDaily(), DailyWeatherDto::getSunrise);
        String sunset = getFirst(response.getDaily(), DailyWeatherDto::getSunset);

        return WeatherResponseDto.builder()
                .city(city)
                .country(country)
                .latitude(response.getLatitude())
                .longitude(response.getLongitude())
                .timezone(response.getTimezone())
                .temperature(response.getCurrent().getTemperature())
                .apparent_temperature(response.getCurrent().getApparent_temperature())
                .windSpeed(response.getCurrent().getWindSpeed())
                .humidity(response.getCurrent().getHumidity())
                .rain(response.getCurrent().getRain())
                .time(response.getCurrent().getTime())
                .sunrise(sunrise)
                .sunset(sunset)
                .weather_code(response.getCurrent().getWeather_code())
                .build();
    }

    private String getFirst(DailyWeatherDto daily,
                            java.util.function.Function<DailyWeatherDto, List<String>> getter) {
        if (daily == null) return null;
        List<String> times = getter.apply(daily);
        return (times != null && !times.isEmpty()) ? times.get(0) : null;
    }
    
}