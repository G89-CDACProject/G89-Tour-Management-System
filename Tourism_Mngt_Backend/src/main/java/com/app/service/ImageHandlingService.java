package com.app.service;

import java.io.IOException;
import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import com.app.dto.ApiResponse;
import com.app.entities.Image;
import com.app.entities.Package;

public interface ImageHandlingService {
	Package uploadImage(Package packageDetails, MultipartFile image) throws IOException;
	byte[] serveImage(String packageName) throws IOException;
	List<Image> uploadImage(Long id, MultipartFile[] images) throws IOException;
}
