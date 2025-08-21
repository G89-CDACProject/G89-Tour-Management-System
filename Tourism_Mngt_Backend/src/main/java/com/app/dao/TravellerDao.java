package com.app.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.app.entities.Traveller;

public interface TravellerDao extends JpaRepository<Traveller, Long>{
	@Modifying
	@Query("DELETE FROM Traveller t WHERE t.bookingNo.bookingNo = :bookingNo")
	void deleteByBookingNo(@Param("bookingNo") String bookingNo);

}
