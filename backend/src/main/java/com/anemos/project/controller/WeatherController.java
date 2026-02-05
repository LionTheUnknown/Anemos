package com.anemos.project.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestParam;
import com.anemos.project.dto.responses.WeatherResponseDto;

import java.util.List;
import com.anemos.project.service.WeatherService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import com.anemos.project.dto.requests.WeatherRequestDto;

@RestController
@RequestMapping("/api/weather")
public class WeatherController {

    private final WeatherService service;

    public WeatherController(WeatherService service){
        this.service = service;
    }

    @GetMapping
    public ResponseEntity<List<WeatherResponseDto>> getWeather(
            @RequestParam String name,
            @RequestParam String country,
            @RequestParam double lat,
            @RequestParam double lon) {
        List<WeatherResponseDto> response = service.getWeather(name, country, lat, lon);
        return ResponseEntity.ok(response);
    }

    @PostMapping
    public ResponseEntity<List<WeatherResponseDto>> postWeather(@RequestBody WeatherRequestDto request) {
        List<WeatherResponseDto> response = service.postWeather(request);
        return ResponseEntity.ok(response);
    }
}