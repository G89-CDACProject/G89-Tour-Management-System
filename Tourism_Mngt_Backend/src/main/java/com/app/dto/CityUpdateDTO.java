package com.app.dto;

import java.time.LocalDate;

import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.multipart.MultipartFile;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CityUpdateDTO {
	private String name;

	private String cityDetails;

	private String duration;

	private String day1Description;

	private String day2Description;

	private String day3Description;

	private String day4Description;
	
	@DateTimeFormat(pattern = "yyyy-MM-dd")
	private LocalDate startingDate;

	@DateTimeFormat(pattern = "yyyy-MM-dd")
	private LocalDate endingDate;
	
	private String location;
	
	private Double price;
	
}
