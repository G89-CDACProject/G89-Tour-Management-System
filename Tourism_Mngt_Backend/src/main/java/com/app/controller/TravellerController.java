package com.app.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.dto.TravellerDTO;
import com.app.dto.TravellerRequestDTO;
import com.app.service.TravellerServiceImpl;

@RestController
@RequestMapping("/traveller")
public class TravellerController {
	@Autowired
	private TravellerServiceImpl travellerService;
	
	@PostMapping("/add")
	public ResponseEntity<?> addTravellers(@RequestBody TravellerRequestDTO dto){
		List<TravellerDTO> travellers = dto.getTravellers();
        String bookingNo = dto.getBookingNo();
        System.out.println(bookingNo);
		return ResponseEntity.ok(travellerService.addTravellers(travellers, bookingNo));
	}
}
