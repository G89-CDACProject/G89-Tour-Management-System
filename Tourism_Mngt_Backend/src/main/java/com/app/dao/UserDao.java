package com.app.dao;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.app.entities.Role;
import com.app.entities.User;

public interface UserDao extends JpaRepository<User, Long>{
	User findByEmailAndPassword(String email, String password);
	
	Optional<User> findByEmail(String email);
	
	@Query("SELECT COUNT(u) FROM User u WHERE u.role <> :adminRole")
    long countNonAdminUsers(Role adminRole);
}
