package com.anemos.project.dto.responses;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class SelectedCityResponseDto {

    @JsonProperty("selected_city_current")
    private CityWeatherDto selectedCityCurrent;

    @JsonProperty("selected_city_forecast")
    private List<DailyForecastItemDto> selectedCityForecast;
}
