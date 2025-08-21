 package com.app.service;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.app.custom_exception.ApiException;
import com.app.dao.UserDao;
import com.app.dto.AdminDTO;
import com.app.entities.User;

@Service
@Transactional
public class AdminServiceImpl implements AdminService {

	@Autowired
	private UserDao userDao;
	@Autowired
	private ModelMapper mapper;

	@Override
	public String addNewAdmin(AdminDTO dto) {
		if (dto.getPassword().equals(dto.getConfirmPassword())) {
			User userEntity = mapper.map(dto, User.class);
			userDao.save(userEntity);
			return "Admin registered successfully";
		}
		throw new ApiException("Password doesn't match! Try again");
	}

}
