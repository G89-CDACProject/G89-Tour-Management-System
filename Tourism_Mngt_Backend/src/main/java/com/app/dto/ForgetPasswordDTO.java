package com.app.dto;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ForgetPasswordDTO {
	@NotBlank
	@Email
	private String email;
	private String confirmPassword;
	private String Password;
	private SecurityQuestionDTO securityQuestion;
	private String securityAnswer;
	
//	private String securityAnswer;
//	private String newPassword;
//	private String confirmPassword;
	
}
