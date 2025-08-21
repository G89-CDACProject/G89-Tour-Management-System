package com.app.dto;

import java.util.List;

import lombok.Data;
@Data
public class UserBookingDTO {
	    private String email;
	  
	    private List<BookingResponseDTO> bookings;
}
