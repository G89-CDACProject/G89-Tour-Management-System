package com.app.entities;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name="travellers")
@Data
@NoArgsConstructor
public class Traveller extends BaseEntity{
	@Column(nullable = false)
	private String name;
	
	@Column(nullable = false)
	private Long age;
	
	@Enumerated(EnumType.STRING)
	private Gender gender;
	
	@Column(unique = true)
	private String email;
	
	@Column(unique = true)
	private String aadhaarNo;
	
	@ManyToOne
    @JoinColumn(name = "booking_id", nullable = false, referencedColumnName = "booking_no")
    private Booking bookingNo;
}
