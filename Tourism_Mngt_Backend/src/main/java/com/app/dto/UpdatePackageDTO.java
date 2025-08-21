package com.app.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UpdatePackageDTO {
	private String packageName;
	private String packageDetails;
	private double startingPrice;
}
