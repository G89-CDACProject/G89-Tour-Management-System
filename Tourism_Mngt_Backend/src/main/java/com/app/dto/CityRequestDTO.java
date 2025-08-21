package com.app.dto;

import java.time.LocalDate;

import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.multipart.MultipartFile;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonProperty.Access;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class CityRequestDTO {
	@JsonProperty(access = Access.READ_ONLY)
	private Long id;
	
	private String name;
	
	private String cityDetails;
	
	private Long package_id;
	
	private MultipartFile cityImage;
	
	private String duration;
	
	private Double price;
	
	@DateTimeFormat(pattern = "yyyy-MM-dd")
    private LocalDate startingDate;

	@DateTimeFormat(pattern = "yyyy-MM-dd")
    private LocalDate endingDate;
    
    private String location;

    private String day1Description;

    private String day2Description;

    private String day3Description;
    
    private String day4Description;
}
