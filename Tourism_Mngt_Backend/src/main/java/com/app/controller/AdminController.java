package com.app.controller;

import java.util.HashMap;
import java.util.Map;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.dao.BookingDao;
import com.app.dao.CityDao;
import com.app.dao.PackageDao;
import com.app.dao.UserDao;
import com.app.dto.AdminDTO;
import com.app.entities.Role;
import com.app.service.AdminServiceImpl;

@RestController
@RequestMapping("/admin")
@CrossOrigin(origins = "http://localhost:3000")
public class AdminController {

	@Autowired
	private AdminServiceImpl adminService;
	
	@Autowired
	private UserDao userDao;
	
	@Autowired
	private PackageDao packageDao;
	
	@Autowired
	private CityDao cityDao;
	
	@Autowired
	private BookingDao bookingDao;
	
	
	@PostMapping("/register")
	public ResponseEntity<?> addAdmin(@RequestBody @Valid AdminDTO dto){
		return ResponseEntity.status(HttpStatus.ACCEPTED).body(adminService.addNewAdmin(dto));
	}
	
	 @GetMapping("/users/count")
	 public ResponseEntity<?> getUsersCount() {
	        long count = userDao.countNonAdminUsers(Role.ADMIN);
	        Map<String, Object> response = new HashMap<>();
	        response.put("count", count);
	        return ResponseEntity.ok(response);
	 }
	 
	 @GetMapping("/packages/count")
	 public ResponseEntity<?> getPackagesCount() {
	        long count = packageDao.count();
	        Map<String, Object> response = new HashMap<>();
	        response.put("count", count);
	        return ResponseEntity.ok(response);
	 }
	 
	 @GetMapping("/cities/count")
	 public ResponseEntity<?> getCitiesCount() {
	        long count = cityDao.count();
	        Map<String, Object> response = new HashMap<>();
	        response.put("count", count);
	        return ResponseEntity.ok(response);
	 }
	 
	 @GetMapping("/bookings/count")
	 public ResponseEntity<?> getBookingsCount() {
	        long count = bookingDao.count();
	        Map<String, Object> response = new HashMap<>();
	        response.put("count", count);
	        return ResponseEntity.ok(response);
	 }
	 
	 
	
}
