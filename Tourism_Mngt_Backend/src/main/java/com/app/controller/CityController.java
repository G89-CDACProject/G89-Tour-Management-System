package com.app.controller;

import java.io.IOException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.app.custom_exception.ApiException;
import com.app.dto.ApiResponse;
import com.app.dto.CityDTO;
import com.app.dto.CityImageDTO;
import com.app.dto.CityRequestDTO;
import com.app.dto.CityUpdateDTO;
import com.app.dto.HotelDTO;
import com.app.entities.City;
import com.app.service.CityServiceImpl;

@RestController
@RequestMapping("/cities")
@CrossOrigin(origins = "http://localhost:3000")
public class CityController {
	@Autowired
	private CityServiceImpl cityService;

	@PostMapping("/add")
	public ResponseEntity<?> addCityDetails(@ModelAttribute CityRequestDTO dto) {
		try {
			City city = cityService.addCityDetails(dto);
			return ResponseEntity.status(HttpStatus.CREATED).body(new ApiResponse("City details added successfully"));
		} catch (IOException e) {
			throw new ApiException("Something went wrong!!");
		}
	}

	@PostMapping("/add/images")
	public ResponseEntity<?> addCityImagesById(@ModelAttribute CityImageDTO dto) {
		try {
			cityService.addCityImagesById(dto);
			return ResponseEntity.status(HttpStatus.ACCEPTED)
					.body(new ApiResponse("Images for the city has been uploaded"));
		} catch (IOException e) {
			throw new ApiException("Something went wrong");
		}
	}

	@GetMapping("/{cityId}")
	public ResponseEntity<?> getCityDetails(@PathVariable String cityId) {
		return ResponseEntity.status(HttpStatus.OK).body(cityService.getCityDetails(cityId));
	}

	@PostMapping("/hotel/{cityId}")
	public ResponseEntity<?> addHotelByCityId(@RequestBody HotelDTO dto) {
		return ResponseEntity.ok(cityService.addHotel(dto));
	}

	@DeleteMapping("/{cityId}")
	public ResponseEntity<?> deleteCity(@PathVariable Long cityId) {
		cityService.deleteCity(cityId);
		return ResponseEntity.status(HttpStatus.OK).body(new ApiResponse("City has been deleted!!"));
	}


	@PutMapping("/update/{cityId}")
		public ResponseEntity<?> updateCityDetails(@PathVariable Long cityId, @RequestBody CityUpdateDTO cityDTO){
			return ResponseEntity.status(HttpStatus.OK).body(cityService.updateCity(cityId, cityDTO));	
		}
}
