package com.app.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonProperty.Access;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CityDTO {
	@JsonProperty(access = Access.READ_ONLY)
	private Long id;
	private String name;
	private String cityDetails;
	private byte[] cityImage;
	private String duration;
	private Double price;
    
}
