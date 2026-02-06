package com.anemos.project.dto.responses;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
public class DailyWeatherDto {
    private List<String> time;
    private List<String> sunset;
    private List<String> sunrise;

    @JsonProperty("temperature_2m_max")
    private List<Double> temperature2mMax;

    @JsonProperty("weather_code")
    private List<Integer> weatherCode;
}
