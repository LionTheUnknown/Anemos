package com.anemos.project.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.anemos.project.dto.responses.WeatherResponseDto;
import com.anemos.project.service.WeatherService;

@RestController
@RequestMapping("/api/weather")
public class WeatherController {

    private final WeatherService service;

    public WeatherController(WeatherService service){
        this.service = service;
    }

    @GetMapping("/{name}") 
    public ResponseEntity<WeatherResponseDto> getWeather(@PathVariable String name){
        WeatherResponseDto response = service.getWeather(name);
        return ResponseEntity.ok(response);
    }
}