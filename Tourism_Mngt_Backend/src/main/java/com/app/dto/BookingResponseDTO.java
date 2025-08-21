package com.app.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonProperty.Access;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class BookingResponseDTO {

	private String bookingNo;
	
	private String email;
	
	private String packageName;
	
	private String cityName;
	
	private String hotelName;
	
	private Long noOfPassengers;
	
	private Double totalCost;
	
	private boolean isBookingStatus;
}
