package com.app.service;

import java.util.List;

import com.app.dto.BookingRequestDTO;
import com.app.dto.BookingResponseDTO;
import com.app.dto.UserBookingDTO;

public interface BookingService {
	String addBookingDetails(BookingRequestDTO dto);
	
	UserBookingDTO getUserAllBookingDetails(String email);
	
	List<BookingResponseDTO> getAllBookings();
	
	String deleteBooking(String bookingNo);
}
