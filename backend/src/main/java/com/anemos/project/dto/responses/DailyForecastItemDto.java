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
public class DailyForecastItemDto {
    private String day;
    private Double temp;

    @JsonProperty("weather_code")
    private String weatherCode;
}
