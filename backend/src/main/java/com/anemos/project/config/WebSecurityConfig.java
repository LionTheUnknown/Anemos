package com.anemos.project.config;

import jakarta.servlet.http.HttpServletResponse;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import com.anemos.project.common.interfaces.ApiResponse;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.util.List;


@Configuration
@EnableWebSecurity
@EnableMethodSecurity(prePostEnabled = true)
public class WebSecurityConfig {
        private final ObjectMapper objectMapper;

        public WebSecurityConfig() {
                this.objectMapper = new ObjectMapper();
        }

        @Bean
        SecurityFilterChain config(HttpSecurity httpSecurity) throws Exception {
        CorsConfiguration corsConfiguration = new CorsConfiguration();
        corsConfiguration.setAllowedOrigins(
                List.of("http://localhost:5173", "http://localhost:3000", "https://tournament-app.devbstaging.com"));
        corsConfiguration.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"));
        corsConfiguration.setAllowedHeaders(List.of("Authorization", "Cache-Control", "Content-Type", "Cookie"));
        corsConfiguration.setExposedHeaders(List.of("Authorization"));
        corsConfiguration.setAllowCredentials(true);

        return httpSecurity.csrf(AbstractHttpConfigurer::disable)
                .sessionManagement(sm -> sm.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authorizeHttpRequests(auth -> auth.anyRequest().permitAll())
                .cors(httpSecurityCorsConfigurer -> httpSecurityCorsConfigurer
                        .configurationSource(request -> corsConfiguration))
                .exceptionHandling(
                        exception -> exception.authenticationEntryPoint((request, response, authException) -> {
                                response.setContentType("application/json");
                                response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
                                ApiResponse<String> apiResponse = ApiResponse.<String>builder().success(false).message(
                                        "Authorization failed for this request.\nContact system administrator regarding this issue.")
                                        .build();
                                response.getWriter().write(objectMapper.writeValueAsString(apiResponse));
                        }))
                .build();
        }
}
