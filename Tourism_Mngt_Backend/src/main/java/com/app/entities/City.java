package com.app.entities;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.Lob;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonFormat;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name="cities")
@NoArgsConstructor
@Getter
@Setter
public class City extends BaseEntity{
	@Column(name = "city_name", nullable = false)
    private String name;
	
	@Column(name = "city_details", columnDefinition = "TEXT", nullable = false)
	private String cityDetails;
	
	@Lob
	private byte[] cityImage;

    @ManyToOne
    @JoinColumn(name = "package_id", referencedColumnName = "id")
    private Package packageEntity;

    @Column(name = "duration", nullable = false)
    private String duration;
    
   
    @Column(name = "starting_date", nullable = false)
    private LocalDate startingDate;
    
  
    @Column(name = "ending_date", nullable = false)
    private LocalDate endingDate;
    
    @Column(name = "locations",  nullable = false)
    private String location;

    @Column(name = "day_1_description", columnDefinition = "TEXT", nullable = false)
    private String day1Description;

    @Column(name = "day_2_description", columnDefinition = "TEXT", nullable = false)
    private String day2Description;

    @Column(name = "day_3_description", columnDefinition = "TEXT", nullable = false)
    private String day3Description;
    
    @Column(name = "day_4_description", columnDefinition = "TEXT", nullable = false)
    private String day4Description;

    @Column(name = "city_price",nullable = false)
    private Double price;

    @OneToMany(mappedBy = "cityEntity", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Image> images = new ArrayList<>();
    
    @OneToMany(mappedBy = "cityEntity", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Hotel> hotels = new ArrayList<>();

	public City(String name, String duration, LocalDate startingDate, LocalDate endingDate, String location,
			String day1Description, String day2Description, String day3Description, String day4Description,
			Double price) {
		super();
		this.name = name;
		this.duration = duration;
		this.startingDate = startingDate;
		this.endingDate = endingDate;
		this.location = location;
		this.day1Description = day1Description;
		this.day2Description = day2Description;
		this.day3Description = day3Description;
		this.day4Description = day4Description;
		this.price = price;
	}
    
	public void addImage(Image image) {
        images.add(image);
        image.setCityEntity(this); 
	}
	
	public void addHotel(Hotel hotel) {
        hotels.add(hotel);
        hotel.setCityEntity(this); 
	}
}
