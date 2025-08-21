package com.app.service;

import static org.apache.commons.io.FileUtils.readFileToByteArray;
import static org.apache.commons.io.FileUtils.writeByteArrayToFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.util.ArrayList;
import java.util.List;

import javax.annotation.PostConstruct;
import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.app.custom_exception.ApiException;
import com.app.custom_exception.ResourceNotFoundException;
import com.app.dao.CityDao;
import com.app.dao.PackageDao;
import com.app.dto.ApiResponse;
import com.app.entities.City;
import com.app.entities.Image;
import com.app.entities.Package;

@Service
@Transactional
public class ImageHandlingServiceImpl implements ImageHandlingService {
	@Value("${file.upload.location}") 
	private String uploadFolder;

	@Autowired
	private PackageDao packageDao;
	@Autowired
	private CityDao cityDao;

	@PostConstruct
	public void init() throws IOException {
		File folder = new File(uploadFolder);
		if (folder.exists()) {
			System.out.println("folder exists alrdy !");
		} else {
			folder.mkdir();
			System.out.println("created a folder !");
		}
	}

	@Override
	public Package uploadImage(Package packageDetails, MultipartFile image) throws IOException {
				String path = uploadFolder.concat(image.getOriginalFilename());
				System.out.println(path);
				writeByteArrayToFile(new File(path), image.getBytes());
				packageDetails.setImagePath(path);
		return packageDetails;
	}
	
	public byte[] serveImage(String imagePath) throws IOException {
	    if (imagePath == null || imagePath.isEmpty()) {
	        throw new IOException("Image path is null or empty");
	    }
	    
	    File imageFile = new File(imagePath);
	    if (!imageFile.exists()) {
	        throw new IOException("Image file does not exist at path: " + imagePath);
	    }
	    
	    return Files.readAllBytes(imageFile.toPath());
	}

	
	public List<Image> uploadImage(Long id, MultipartFile[] images) throws IOException {
		
		City city = cityDao.findById(id).orElseThrow(() -> new ResourceNotFoundException("Invalid City ID!!"));
		List<Image> imageList = new ArrayList<>();
		for (MultipartFile image : images) {
			String path = uploadFolder.concat(image.getOriginalFilename());
			writeByteArrayToFile(new File(path), image.getBytes());
			Image imageEntity = new Image();
			imageEntity.setImagePath(path);
			imageEntity.setCityEntity(cityDao.findById(city.getId()).orElseThrow());
			imageList.add(imageEntity);
		}
		return imageList;
		
	}
	 
}
