package com.app.entities;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.validation.constraints.Pattern;

import com.fasterxml.jackson.annotation.JsonManagedReference;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name = "users")
@NoArgsConstructor
@Getter
@Setter
@ToString(exclude = "bookings")
public class User extends BaseEntity {
	@Column(length = 30, nullable = false)
	private String firstName;

	@Column(length = 30, nullable = false)
	private String lastName;

	@Column(length = 30, unique = true)
	private String email;

	@Pattern(regexp = "^\\d{10}$")
	@Column(length = 15, unique = true, nullable = false)
	private String phoneNumber;

	@Column(nullable = false)
	private String password;

	@Enumerated(EnumType.STRING)
	private Role role = Role.USER;

	@OneToOne
	@JoinColumn(name = "security_question_id", referencedColumnName = "id")
	private SecurityQuestion securityQuestionId;

	@Column(nullable = false)
	private String securityAnswer; 
	
	@OneToMany(mappedBy = "userEntity", cascade = CascadeType.ALL, orphanRemoval = true)
	private List<Booking> bookings = new ArrayList<Booking>();

	public User(String firstName, String lastName, String email,
			@Pattern(regexp = "^\\d{10}$") String phoneNumber, 
			String password) {
		super();
		this.firstName = firstName;
		this.lastName = lastName;
		this.email = email;
		this.phoneNumber = phoneNumber;
		this.password = password;
		
	}
	
	public void addImage(Booking booking) {
        bookings.add(booking);
        booking.setUserEntity(this); 
	}
	
	
}
