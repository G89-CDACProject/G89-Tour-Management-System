package com.app.dto;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;

import com.app.entities.Gender;
import com.app.entities.Role;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonProperty.Access;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class UserDTO {
	@JsonProperty(access = Access.READ_ONLY)
	private Long id;
	
	@NotBlank
	private String firstName;
	
	@NotBlank
	private String lastName;
	
	@Email
	private String email;
	
	private String phoneNumber;
	
	@JsonProperty(access = Access.WRITE_ONLY) 
	private String password;
	
	@JsonProperty(access = Access.WRITE_ONLY)
	private String confirmPassword;
    
    @JsonProperty(access = Access.READ_ONLY)
    private Role role = Role.USER;
    
    private SecurityQuestionDTO securityQuestionId;
    
    private String securityAnswer;
}
