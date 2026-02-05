package com.anemos.project.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class City {
    private String id;
    private String name;
    private String country;
    private Double longitude;
    private Double latitude;
    private Double elevation;
    private String timezone;
}
