package com.anemos.project.dto.responses;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
public class DailyWeatherDto {
    private List<String> sunset;
    private List<String> sunrise;
}
