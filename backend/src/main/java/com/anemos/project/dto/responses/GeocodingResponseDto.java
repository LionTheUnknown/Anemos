package com.anemos.project.dto.responses;

import com.anemos.project.model.City;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
public class GeocodingResponseDto {
    private List<City> results;
}
