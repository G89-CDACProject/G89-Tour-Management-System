package com.app.dto;

import org.springframework.web.multipart.MultipartFile;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PackageDTO {
	private String packageName;
	private String packageDetails;
	private double startingPrice;
	private MultipartFile imageFile;
}
