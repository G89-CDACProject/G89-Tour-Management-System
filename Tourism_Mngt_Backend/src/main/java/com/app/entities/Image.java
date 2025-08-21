package com.app.entities;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "images")
@NoArgsConstructor
@Getter
@Setter
public class Image extends BaseEntity{
	@Column(nullable = false)
	private String imagePath;
	
	@ManyToOne
	@JoinColumn(name = "city_id", referencedColumnName = "id")
	private City cityEntity;
}
