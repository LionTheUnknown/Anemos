package com.anemos.project.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Weather {
    private Long id;
    private String city;
    private String country;
    private Integer count;
    private Double latitude;
    private Double longitude;
}
