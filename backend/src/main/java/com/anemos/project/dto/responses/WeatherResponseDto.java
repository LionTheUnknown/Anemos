package com.anemos.project.dto.responses;

import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import lombok.AllArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class WeatherResponseDto {
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
}
