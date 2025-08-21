package com.app.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.app.entities.Hotel;

public interface HotelDao extends JpaRepository<Hotel, Long>{

}
