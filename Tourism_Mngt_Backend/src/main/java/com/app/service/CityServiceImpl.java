package com.app.service;

import java.io.IOException;
import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.app.dao.CityDao;
import com.app.dao.HotelDao;
import com.app.dao.ImageDao;
import com.app.dao.PackageDao;
import com.app.dto.CityDTO;
import com.app.dto.CityImageDTO;
import com.app.dto.CityRequestDTO;
import com.app.dto.CityResponseDTO;
import com.app.dto.CityUpdateDTO;
import com.app.dto.HotelDTO;
import com.app.dto.ImageResponseDTO;
import com.app.entities.City;
import com.app.entities.Hotel;
import com.app.entities.Image;

@Service
@Transactional
public class CityServiceImpl implements CityService{
	@Autowired
	private CityDao cityDao;
	@Autowired
	private ModelMapper mapper;
	@Autowired
	private PackageDao packageDao;
	@Autowired
	private ImageHandlingServiceImpl imageHandlingService;
	@Autowired
	private ImageDao imageDao;
	@Autowired
	private HotelDao hotelDao;
	
	
	public List<CityDTO> getAllCityDetails(String packageId){
		Long pkgId = Long.parseLong(packageId);
		List<CityDTO> cityList = cityDao.findByPackageId(pkgId);
		return cityList;
	}
	
	public City addCityDetails(CityRequestDTO dto) throws IOException {
		City city = mapper.map(dto, City.class);
		city.setPackageEntity(packageDao.findById(dto.getPackage_id()).orElseThrow());
		 byte[] imageData = dto.getCityImage().getBytes();
	        city.setCityImage(imageData);
		return cityDao.save(city);			
	}
	
	public void addCityImagesById(CityImageDTO dto) throws IOException {
		City city = cityDao.findById(dto.getCity_id()).orElseThrow();
		
		Image imageEntity = mapper.map(dto, Image.class);
		List<Image> images = imageHandlingService.uploadImage(dto.getCity_id(),dto.getImages());
		for (Image image : images) {
	        city.addImage(image);
	    }
		cityDao.save(city);
	}
	
	public CityResponseDTO getCityDetails(String id){
		Long pkgId = Long.parseLong(id);
		City city = cityDao.findCityWithImagesById(pkgId);
		CityResponseDTO dto = mapper.map(city,CityResponseDTO.class);
		List<Image> images = city.getImages();
		List<Hotel> hotels = city.getHotels();
		List<ImageResponseDTO> imageList = images.stream().map(image->
			mapper.map(image, ImageResponseDTO.class)).collect(Collectors.toList());
		List<HotelDTO> hotelList = hotels.stream().map(hotel->
			mapper.map(hotel, HotelDTO.class)).collect(Collectors.toList());
		dto.setImages(imageList);
		dto.setHotels(hotelList);
		return dto;
	}
	
	public void deleteCity(Long cityId) {
        City city = cityDao.findById(cityId).orElseThrow();
        List<Image> images = city.getImages();
        List<Hotel> hotels = city.getHotels();
        
        images.forEach(image->imageDao.delete(image));
        
        hotels.forEach(hotel->hotelDao.delete(hotel));
        
        cityDao.delete(city);
	}
	
	public String addHotel(HotelDTO dto) {
		City city = cityDao.findById(dto.getCity_id()).orElseThrow();
		Hotel hotel = mapper.map(dto, Hotel.class);
		city.addHotel(hotel);
		return "Hotel for the city added successsfully";
	}
	
	public String updateCity(Long id, CityUpdateDTO dto) {
		City city = cityDao.findById(id).orElseThrow( ()-> new RuntimeException("City not found"));
		city.setName(dto.getName());
		city.setCityDetails(dto.getCityDetails());
		city.setDuration(dto.getDuration());
		city.setDay1Description(dto.getDay1Description());
		city.setDay2Description(dto.getDay2Description());
		city.setDay3Description(dto.getDay3Description());
		city.setDay4Description(dto.getDay4Description());
		city.setStartingDate(dto.getStartingDate());
		city.setEndingDate(dto.getEndingDate());
		city.setLocation(dto.getLocation());
		city.setPrice(dto.getPrice());
		cityDao.save(city);
		return "City updated successfully";
	}
	
}

