package com.app.service;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

import javax.transaction.Transactional;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.app.custom_exception.ApiException;
import com.app.custom_exception.ResourceNotFoundException;
import com.app.dao.BookingDao;
import com.app.dao.TravellerDao;
import com.app.dao.UserDao;
import com.app.dto.BookingRequestDTO;
import com.app.dto.BookingResponseDTO;
import com.app.dto.UserBookingDTO;
import com.app.entities.Booking;
import com.app.entities.User;

@Service
@Transactional
public class BookingServiceImpl implements BookingService{

	@Autowired
	private BookingDao bookingDao;
	
	@Autowired
	private UserDao userDao;
	
	@Autowired
	private TravellerDao travellerDao;
	
	@Autowired
	private ModelMapper mapper;
	
	public String addBookingDetails(BookingRequestDTO dto) {
		Booking book = mapper.map(dto, Booking.class);
		book.setUserEntity(userDao.findByEmail(dto.getEmail()).orElseThrow(()-> new ResourceNotFoundException("User doesn't exist")));
		bookingDao.save(book);
		return book.getBookingNo();
	}
	
	public UserBookingDTO getUserAllBookingDetails(String email){
		User user = userDao.findByEmail(email).orElseThrow(()-> new ApiException("Email not found"));
		UserBookingDTO dto = new UserBookingDTO();
		dto.setEmail(user.getEmail());
		
		List<BookingResponseDTO> bookingDTOs = user.getBookings().stream().map(booking -> {
            BookingResponseDTO bookingDTO = new BookingResponseDTO();
            bookingDTO.setBookingNo(booking.getBookingNo());
            bookingDTO.setPackageName(booking.getPackageName());
            bookingDTO.setCityName(booking.getCityName());
            bookingDTO.setNoOfPassengers(booking.getNoOfPassengers());
            bookingDTO.setTotalCost(booking.getTotalCost());
            bookingDTO.setBookingStatus(booking.isPaymentStatus());
            return bookingDTO;
        }).collect(Collectors.toList());

        dto.setBookings(bookingDTOs);

        return dto;
		}
	
	public List<BookingResponseDTO> getAllBookings() {
		
		List<BookingResponseDTO> bookingDTOs = bookingDao.findAll().stream().map(booking-> {
			 BookingResponseDTO bookingDTO = new BookingResponseDTO();
	            bookingDTO.setBookingNo(booking.getBookingNo());
	            bookingDTO.setPackageName(booking.getPackageName());
	            bookingDTO.setCityName(booking.getCityName());
	            bookingDTO.setNoOfPassengers(booking.getNoOfPassengers());
	            bookingDTO.setTotalCost(booking.getTotalCost());
	            bookingDTO.setBookingStatus(booking.isPaymentStatus());
	            return bookingDTO;
	        }).collect(Collectors.toList());
		return bookingDTOs;
	}
	
	public void updatePaymentStatus(String bookingNo, boolean paymentStatus) {
        Booking booking = bookingDao.findByBookingNo(bookingNo);
        if (booking == null) {
            throw new ResourceNotFoundException("Booking not found.");
        }
        booking.setPaymentStatus(paymentStatus);
        bookingDao.save(booking);
    }
	
	public String deleteBooking(String bookingNo) {
		Booking booking = bookingDao.findByBookingNo(bookingNo);
		if(booking!=null) {
			User user = booking.getUserEntity();
	        user.getBookings().remove(booking);
	        travellerDao.deleteByBookingNo(bookingNo);
			bookingDao.delete(booking);
		}else
			throw new ApiException("Invalid booking No");
		return "Booking has been deleted";
	}	
}
