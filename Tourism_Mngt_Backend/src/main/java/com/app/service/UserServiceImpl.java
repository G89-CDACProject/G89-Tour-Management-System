
package com.app.service;

import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.app.custom_exception.ApiException;
import com.app.custom_exception.ResourceNotFoundException;
import com.app.dao.UserDao;
import com.app.dto.ForgetPasswordDTO;
import com.app.dto.UserDTO;
import com.app.dto.UserResponseDTO;
import com.app.entities.Role;
import com.app.entities.User;

import lombok.AllArgsConstructor;

@Service
@Transactional
@AllArgsConstructor
public class UserServiceImpl implements UserService {

	
	private UserDao userDao;
	
	private ModelMapper mapper;
	
    private PasswordEncoder passwordEncoder;

	@Override
	public String addNewUser(UserDTO dto) {
		if (dto.getPassword().equals(dto.getConfirmPassword())) {
			User userEntity = mapper.map(dto, User.class);
			String encodedPassword = passwordEncoder.encode(dto.getPassword());
			userEntity.setPassword(encodedPassword);
			userDao.save(userEntity);
			return "User registered successfully";
		}
		throw new ApiException("Password doesn't match!! Try again");
	}


	@Override
	public String setPassword(ForgetPasswordDTO dto) {
		User user = userDao.findByEmail(dto.getEmail()).orElseThrow(()-> new ApiException("Invalid Email!!"));
			if(dto.getPassword().equals(dto.getConfirmPassword()) && dto.getSecurityAnswer().
					equals(user.getSecurityAnswer())) {
				String pwd = passwordEncoder.encode(dto.getPassword());				
				user.setPassword(pwd);
				userDao.save(user);
				return "Password reset successfully";
			}
		throw new ApiException("Password or Security answer doesn't match!!");
	}
	
	public String deleteUser(String email) {
		User user = userDao.findByEmail(email).orElseThrow(()-> new ResourceNotFoundException("Email doesn't exist!!"));
		if(user!=null) {
			userDao.delete(user);
		}else
			throw new ApiException("User doesn't exist!!");
		return "User has been deleted successfully!!";
	}
	
	public List<UserResponseDTO> getAllUsers(){
		List<UserResponseDTO> list = userDao.findAll().stream().filter(user -> user.getRole() == Role.USER).map(user->{
			UserResponseDTO dto = new UserResponseDTO();
			dto.setEmail(user.getEmail());
			dto.setFirstName(user.getFirstName());
			dto.setLastName(user.getLastName());
			dto.setPhoneNumber(user.getPhoneNumber());
			
			return dto;
		}).collect(Collectors.toList());
		return list;	
	}
	
}
