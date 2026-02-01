package com.anemos.project.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.OffsetDateTime;
import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Weather {
    private UUID id;
    private String temperature;
    private String wind;
    private String humidity;
    private OffsetDateTime sunTime;
}
