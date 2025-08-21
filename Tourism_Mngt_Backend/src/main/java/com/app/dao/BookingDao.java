package com.app.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.app.entities.Booking;

public interface BookingDao extends JpaRepository<Booking, Long>{
	@Query("SELECT b FROM Booking b WHERE b.bookingNo =:bookingNo")
	Booking findByBookingNo(String bookingNo);
}
