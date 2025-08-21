package com.app.dto;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
class LoginSessionResponseDTO {
	  private boolean loggedIn;
	  private String email;
	  private boolean isAdmin;
	  
	  public LoginSessionResponseDTO(boolean loggedIn, String email, boolean isAdmin) {
	    this.loggedIn = loggedIn;
	    this.email = email;
	    this.isAdmin = isAdmin;
	  }
}
