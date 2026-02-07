package com.anemos.project.dto.responses;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class CurrentWeatherDto {
    private String time;
    private Integer interval;

    @JsonProperty("wind_speed_10m")
    private Double windSpeed;

    @JsonProperty("relative_humidity_2m")
    private Double humidity;

    private Double precipitation;

    @JsonProperty("temperature_2m")
    private Double temperature;
    
    private Double apparent_temperature;

    private String weather_code;
}
