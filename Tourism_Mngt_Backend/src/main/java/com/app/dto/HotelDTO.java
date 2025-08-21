package com.app.dto;

import java.time.LocalDate;

import org.springframework.format.annotation.DateTimeFormat;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonProperty.Access;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
@Getter
@Setter
@NoArgsConstructor
public class HotelDTO {
	@JsonProperty(access = Access.READ_ONLY)
	private Long id;
	
	@JsonProperty(access = Access.WRITE_ONLY)
	private Long city_id;
	
    private String name;   
    
    private String address; 
   
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private LocalDate checkInDate;
   
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private LocalDate checkOutDate;
   
    private Double ratePerPerson;
  
    private Integer starRating;
    
    private boolean free_WiFi; 
   
    private boolean housekeeping;
   
    private boolean pool;  
  
    private boolean bonfire;
    
    private boolean luggageAssistance;
   
    private boolean breakfast;
   
    private boolean restaurant;
}
