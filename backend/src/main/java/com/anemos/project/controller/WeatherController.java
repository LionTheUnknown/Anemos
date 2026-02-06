package com.anemos.project.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestParam;
import com.anemos.project.dto.responses.CityWeatherDto;
import com.anemos.project.dto.responses.SelectedCityResponseDto;
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
    public ResponseEntity<WeatherResponseDto> getWeather(
            @RequestParam String name,
            @RequestParam String country,
            @RequestParam double lat,
            @RequestParam double lon) {
        WeatherResponseDto response = service.getWeather(name, country, lat, lon);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/selected")
    public ResponseEntity<SelectedCityResponseDto> getSelectedCityWeather(
            @RequestParam String name,
            @RequestParam String country,
            @RequestParam double lat,
            @RequestParam double lon) {
        SelectedCityResponseDto response = service.getSelectedCityWeather(name, country, lat, lon);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/top-cities")
    public ResponseEntity<List<CityWeatherDto>> getTopCitiesWeather(
            @RequestParam String excludeCity,
            @RequestParam String excludeCountry) {
        List<CityWeatherDto> response = service.getTopCitiesWeather(excludeCity, excludeCountry);
        return ResponseEntity.ok(response);
    }

    @PostMapping
    public ResponseEntity<WeatherResponseDto> postWeather(@RequestBody WeatherRequestDto request) {
        WeatherResponseDto response = service.postWeather(request);
        return ResponseEntity.ok(response);
    }
}