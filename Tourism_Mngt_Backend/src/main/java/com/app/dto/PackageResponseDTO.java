package com.app.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class PackageResponseDTO {
		private Long id;
	    private String packageName;
	    private String packageDetails;
	    private byte[] image;
	    private double startingPrice;
}
