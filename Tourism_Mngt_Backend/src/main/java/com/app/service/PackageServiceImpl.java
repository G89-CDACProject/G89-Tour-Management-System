package com.app.service;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import com.app.custom_exception.ApiException;
import com.app.custom_exception.ResourceNotFoundException;
import com.app.dao.PackageDao;
import com.app.dto.ApiResponse;
import com.app.dto.PackageDTO;
import com.app.dto.PackageResponseDTO;
import com.app.dto.UpdatePackageDTO;
import com.app.entities.Package;

@Service
@Transactional
public class PackageServiceImpl implements PackageService {

	@Autowired
	private PackageDao packageDao;

	@Autowired
	private ImageHandlingServiceImpl imageHandlingService;

	@Autowired
	private ModelMapper mapper;

	public Package addPackage(PackageDTO dto) {
		try {
			Package pkg = mapper.map(dto, Package.class);

			pkg = imageHandlingService.uploadImage(pkg, dto.getImageFile());
			return packageDao.save(pkg);
		} catch (IOException e) {
			e.printStackTrace();
		}
		throw new ApiException("Package can't be uploaded");
	}

	public List<PackageResponseDTO> getPackageDetails() throws IOException {
	    List<Package> packagesList = packageDao.findAll();
	    List<PackageResponseDTO> packageResponse = new ArrayList<>();
	    
	    for (Package pkg : packagesList) {
	        PackageResponseDTO dto = new PackageResponseDTO();
	        dto.setId(pkg.getId());
	        dto.setPackageName(pkg.getPackageName());
	        dto.setPackageDetails(pkg.getPackageDetails());
	        dto.setStartingPrice(pkg.getStartingPrice());
	        
	        // Construct the absolute path to the image
//	        String basePath = "C:/Users/Mayur/Downloads/Tourism_Management-main/tourism_mngt/src";
	        String basePath = "D:/IACSD2025_Assignment/Tourism_Management-main/tourism_mngt/src";
	        String imagePath = basePath + pkg.getImagePath();
	        
	        try {
	            byte[] image = imageHandlingService.serveImage(imagePath);
	            dto.setImage(image);
	        } catch (IOException e) {
	            // Log and handle the exception gracefully
	            System.err.println("Error serving image for package: " + pkg.getPackageName() + " - " + e.getMessage());
	            e.printStackTrace();
	        }
	        
	        packageResponse.add(dto);
	    }
	    
	    //System.out.println("xmxxxx ............................ " + packageResponse.get(0).getPackageName());
	    return packageResponse;
	}


	public ApiResponse deletePackage(Long id) {
		Package pkg = packageDao.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Package doesn't exists"));
		packageDao.delete(pkg);
		return new ApiResponse(pkg.getPackageName() + " package has been deleted");
	}


	
	public String updatePackage(Long id, UpdatePackageDTO dto) {
		Package pack = packageDao.findById(id).orElseThrow(()-> new RuntimeException("Package not found"));
		pack.setPackageName(dto.getPackageName());
		pack.setPackageDetails(dto.getPackageDetails());
		pack.setImagePath(pack.getImagePath());
		pack.setStartingPrice(dto.getStartingPrice());
		packageDao.save(pack);
		return "Package update successful";
	}
	

}
