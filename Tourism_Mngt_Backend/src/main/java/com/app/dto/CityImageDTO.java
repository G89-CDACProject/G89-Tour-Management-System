package com.app.dto;

import org.springframework.web.multipart.MultipartFile;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CityImageDTO {
	private Long city_id;
	
	private MultipartFile[] images;
}
