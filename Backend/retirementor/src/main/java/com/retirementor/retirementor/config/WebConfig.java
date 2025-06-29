package com.retirementor.retirementor.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")  // Allow all routes, including /uploads/**
                .allowedOrigins("http://localhost:3001")
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
                .allowedHeaders("*")
                .allowCredentials(true);
    }

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        // Serve files from the 'uploads' directory in your project root
        registry.addResourceHandler("/uploads/**")
                .addResourceLocations("C:\\Users\\erjai\\Downloads\\retirementor\\retirementor\\src\\main\\resources\\static\\:uploads/") // Ensure 'uploads/' is in the project root
                .setCachePeriod(0);  // Disable caching during development
    }
}
