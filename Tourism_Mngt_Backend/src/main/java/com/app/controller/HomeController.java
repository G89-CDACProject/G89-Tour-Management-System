package com.app.controller;

import java.io.IOException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.custom_exception.ApiException;
import com.app.dto.PackageResponseDTO;
import com.app.service.PackageServiceImpl;
@RestController
@RequestMapping("/")
@CrossOrigin(origins = "http://localhost:3000")
public class HomeController {
	@Autowired
	private PackageServiceImpl packageServiceImpl;
	
	@GetMapping
	public ResponseEntity<?> getAllPackages(){
		try {
		List<PackageResponseDTO> packageDetails = packageServiceImpl.getPackageDetails();
		System.out.println(packageDetails);
			return ResponseEntity.status(HttpStatus.OK).contentType(MediaType.APPLICATION_JSON).body(packageDetails);
		} catch (IOException e) {
			e.printStackTrace();
			throw new ApiException("Something went wrong!! Try again");
		}
	}
}
