package com.app.entities;

import java.time.LocalDate;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import org.springframework.format.annotation.DateTimeFormat;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "hotels")
@Getter
@Setter
@NoArgsConstructor
public class Hotel extends BaseEntity{
	@Column(nullable = false)
    private String name;
    
    @Column(nullable = false)
    private String address;
    
    @Column(nullable = false)
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private LocalDate checkInDate;
    
    @Column(nullable = false)
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private LocalDate checkOutDate;
    
    @Column(nullable = false)
    private Double ratePerPerson;
    
    @Column(nullable = false)
    private Integer starRating;
    
    @Column(nullable = false)
    private boolean free_WiFi; 
    
    @Column(nullable = false)
    private boolean housekeeping;
    
    @Column(nullable = false)
    private boolean pool;  
    
    @Column(nullable = false)
    private boolean bonfire;
    
    @Column(nullable = false)
    private boolean luggageAssistance;
    
    @Column(nullable = false)
    private boolean breakfast;
    
    @Column(nullable = false)
    private boolean restaurant;
    
    @ManyToOne
    @JoinColumn(name = "city_id", referencedColumnName = "id")
    private City cityEntity;

	public Hotel(String name, String address, LocalDate checkInDate, LocalDate checkOutDate, Double ratePerPerson,
			Integer starRating, boolean free_WiFi, boolean housekeeping, boolean pool, boolean bonfire,
			boolean luggageAssistance, boolean breakfast, boolean restaurant, City cityEntity) {
		super();
		this.name = name;
		this.address = address;
		this.checkInDate = checkInDate;
		this.checkOutDate = checkOutDate;
		this.ratePerPerson = ratePerPerson;
		this.starRating = starRating;
		this.free_WiFi = free_WiFi;
		this.housekeeping = housekeeping;
		this.pool = pool;
		this.bonfire = bonfire;
		this.luggageAssistance = luggageAssistance;
		this.breakfast = breakfast;
		this.restaurant = restaurant;
		this.cityEntity = cityEntity;
	}
}
