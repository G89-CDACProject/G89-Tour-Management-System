 package com.app.controller;

import java.util.List;

import org.apache.catalina.connector.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.app.custom_exception.ResourceNotFoundException;
import com.app.dto.BookingRequestDTO;
import com.app.dto.BookingResponseDTO;
import com.app.dto.PaymentRequest;
import com.app.dto.UserBookingDTO;
import com.app.service.BookingServiceImpl;

@RestController
@RequestMapping("/booking")
public class BookingController {
	
	@Autowired
	private BookingServiceImpl bookingService;
	
	@PostMapping("/save-details")
	public ResponseEntity<?> addBooking(@RequestBody BookingRequestDTO dto){
		try {
            String response = bookingService.addBookingDetails(dto);
            return ResponseEntity.ok(response);
        } catch (ResourceNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error occurred");
        }
	}
	
	@GetMapping("/get-bookings")
	public ResponseEntity<?> getUserBookings(@RequestParam String email){
		try {
			UserBookingDTO list = bookingService.getUserAllBookingDetails(email);
            return ResponseEntity.ok(list);
        } catch (ResourceNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error occurred");
        }
	}
	
	@GetMapping("/all-bookings")
	public ResponseEntity<?> getAllBookings(){
		try {
			List<BookingResponseDTO> list = bookingService.getAllBookings();
            return ResponseEntity.ok(list);
        } catch (ResourceNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error occurred");
        }
	}
	
	@PutMapping("/update-payment-status")
    public ResponseEntity<?> updatePaymentStatus(@RequestBody PaymentRequest request) {
        try {
            bookingService.updatePaymentStatus(request.getBookingNo(), request.isPaymentStatus());
            return ResponseEntity.ok("Payment status updated successfully.");
        } catch (ResourceNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }
	
	@DeleteMapping("/delete-booking")
	public ResponseEntity<?> deleteBooking(@RequestParam String bookingNo){
		try {
			String message = bookingService.deleteBooking(bookingNo);
            return ResponseEntity.ok(message);
        } catch (ResourceNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
	}
}
