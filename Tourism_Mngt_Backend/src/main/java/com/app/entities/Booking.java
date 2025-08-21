package com.app.entities;

import java.io.Serializable;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name="bookings")
//@Data
@NoArgsConstructor
@Getter
@Setter
@ToString(exclude = "userEntity")
public class Booking extends BaseEntity implements Serializable {
    private static final long serialVersionUID = 1L;
    
	@Column(name="booking_no",nullable = false)
	private String bookingNo;
	
	
	@Column(nullable = false)
	private String packageName;
	
	@Column(nullable = false)
	private String cityName;
	
	@Column(nullable = false)
	private String hotelName;
	
	private Long noOfPassengers;
	
	private Double totalCost;
	
	@Column(columnDefinition = "BOOLEAN DEFAULT FALSE")
	private boolean isPaymentStatus = false;
	
	@ManyToOne(cascade = {CascadeType.PERSIST, CascadeType.MERGE})
	@JoinColumn(name = "user_id", referencedColumnName = "id")
	private User userEntity;
	
	@OneToMany(mappedBy = "bookingNo", cascade = CascadeType.ALL, orphanRemoval = true)
	private List<Traveller> travellers;

}
