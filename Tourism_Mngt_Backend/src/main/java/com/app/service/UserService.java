package com.app.service;

import java.util.List;

import com.app.dto.ForgetPasswordDTO;
import com.app.dto.UserDTO;
import com.app.dto.UserResponseDTO;

public interface UserService {
	String addNewUser(UserDTO dto);
	String setPassword(ForgetPasswordDTO dto);	
	String deleteUser(String email);
	List<UserResponseDTO> getAllUsers();
}
