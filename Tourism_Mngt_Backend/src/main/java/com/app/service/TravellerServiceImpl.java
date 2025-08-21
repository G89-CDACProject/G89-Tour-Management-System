package com.app.service;

import java.util.List;

import javax.transaction.Transactional;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.app.custom_exception.ResourceNotFoundException;
import com.app.dao.BookingDao;
import com.app.dao.TravellerDao;
import com.app.dto.TravellerDTO;
import com.app.entities.Booking;
import com.app.entities.Traveller;

@Service
@Transactional
public class TravellerServiceImpl implements TravellerService {
	@Autowired
	private TravellerDao travellerDao;
	
	@Autowired
	private ModelMapper mapper;
	
	@Autowired
	private BookingDao bookingDao;
	
	
	
	public String addTravellers(List<TravellerDTO> travellers, String bookingNo) {
		Booking booking = bookingDao.findByBookingNo(bookingNo);
		if(booking==null)
			throw new ResourceNotFoundException("Invalid Booking No!!");
			
		for (TravellerDTO traveller : travellers) {
			Traveller travellerEntity = mapper.map(traveller, Traveller.class);
			travellerEntity.setBookingNo(booking);
			travellerDao.save(travellerEntity);
		}

		return "Traveller details added successfully";
	}
}
