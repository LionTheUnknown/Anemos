package com.anemos.project.dto.responses;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class OpenMeteoResponseDto {
    private Double latitude;
    private Double longitude;

    @JsonProperty("generationtime_ms")
    private Double generationTimeMs;

    @JsonProperty("utc_offset_seconds")
    private Integer utcOffsetSeconds;

    private String timezone;

    @JsonProperty("timezone_abbreviation")
    private String timezoneAbbreviation;

    private Double elevation;

    private CurrentWeatherDto current;

    private DailyWeatherDto daily;
}
