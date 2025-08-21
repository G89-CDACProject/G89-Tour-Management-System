package com.app.entities;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

@Entity
@Table(name = "security_questions")
public class SecurityQuestion extends BaseEntity{  
	  @Column(unique = true)
	  private String question;
}
