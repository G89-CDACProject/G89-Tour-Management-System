package com.app.dto;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import lombok.Getter;
import lombok.Setter;
@Getter
@Setter
public class CityResponseDTO {
    private String name;
	
	private String cityDetails;
	
	private String duration;
    
    private LocalDate startingDate;

    private LocalDate endingDate;
    
    private String location;

    private String day1Description;

    private String day2Description;

    private String day3Description;
  
    private String day4Description;

    private Double price;
    
    private List<ImageResponseDTO> images = new ArrayList<>();
    
    private List<HotelDTO> hotels = new ArrayList<>();
}
