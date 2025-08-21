package com.app.dto;

import com.app.entities.User;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class BookingRequestDTO {
	private String bookingNo;

	private String email;
	
	private String packageName;
	
	private String cityName;
	
	private String hotelName;
	
	private Long noOfPassengers;
	
	private Double totalCost;
}
