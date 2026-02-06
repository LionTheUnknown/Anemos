package com.anemos.project.dto.responses;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CityWeatherDto {
    @JsonProperty("city_name")
    private String city;
    private String country;
    private Double latitude;
    private Double longitude;
    private String timezone;
    private Double temperature;
    private Double apparent_temperature;
    private Double windSpeed;
    private Double humidity;
    private Double rain;
    private String time;
    private String sunset;
    private String sunrise;

    @JsonProperty("weather_code")
    private String weatherCode;
}
