package com.app.service;

import com.app.dto.ApiResponse;
import com.app.dto.PackageDTO;
import com.app.dto.UpdatePackageDTO;
import com.app.entities.Package;

public interface PackageService {
	Package addPackage(PackageDTO dto);
	ApiResponse deletePackage(Long id);
	String updatePackage(Long id, UpdatePackageDTO dto);
}
