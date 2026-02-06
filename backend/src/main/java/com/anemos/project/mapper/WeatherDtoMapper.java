package com.anemos.project.mapper;

import org.springframework.stereotype.Service;
import com.anemos.project.dto.responses.*;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;

@Service
public class WeatherDtoMapper {

    private static final int FORECAST_DAYS = 5;

    public CityWeatherDto toCityWeatherDto(String city, String country, OpenMeteoResponseDto response) {
        if (response == null || response.getCurrent() == null) {
            return null;
        }

        String sunrise = getFirst(response.getDaily(), DailyWeatherDto::getSunrise);
        String sunset = getFirst(response.getDaily(), DailyWeatherDto::getSunset);

        return CityWeatherDto.builder()
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
                .weatherCode(response.getCurrent().getWeather_code())
                .build();
    }

    public List<DailyForecastItemDto> toDailyForecastList(OpenMeteoResponseDto response) {
        List<DailyForecastItemDto> result = new ArrayList<>();

        if (response == null) {
            return result;
        }

        var daily = response.getDaily();

        if (daily != null) {
            var times = daily.getTime();
            var temps = daily.getTemperature2mMax();
            var codes = daily.getWeatherCode();

            if (times != null && temps != null && codes != null) {
                int count = Math.min(FORECAST_DAYS, Math.min(times.size() - 1, Math.min(temps.size() - 1, codes.size() - 1)));
                for (int i = 1; i <= count; i++) {
                    result.add(DailyForecastItemDto.builder()
                            .day(formatDay(times.get(i)))
                            .temp(temps.get(i))
                            .weatherCode(String.valueOf(codes.get(i)))
                            .build());
                }
            }
        }

        return result;
    }

    private String formatDay(String dateTime) {
        if (dateTime == null || dateTime.length() < 10) {
            return dateTime;
        }
        try {
            LocalDate date = LocalDate.parse(dateTime.substring(0, 10));
            return date.format(DateTimeFormatter.ofPattern("EEE"));
        } catch (Exception e) {
            return dateTime.substring(0, Math.min(10, dateTime.length()));
        }
    }

    private String getFirst(DailyWeatherDto daily,
                           java.util.function.Function<DailyWeatherDto, List<String>> getter) {
        if (daily == null) return null;
        List<String> times = getter.apply(daily);
        return (times != null && !times.isEmpty()) ? times.get(0) : null;
    }
}
