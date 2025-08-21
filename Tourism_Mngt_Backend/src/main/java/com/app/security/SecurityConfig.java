package com.app.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.BeanIds;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;


@EnableWebSecurity
@Configuration
@EnableGlobalMethodSecurity(prePostEnabled = true)
public class SecurityConfig {
	@Autowired
	private PasswordEncoder encoder;
	
	@Autowired
	private JwtAuthenticationFilter authfilter;
	
	@Autowired
	private CustomAuthenticationEntryPoint authEntry;
	
	@Bean
	public SecurityFilterChain authorizeRequests(HttpSecurity http) throws Exception {
		//URL based authorization rules
		System.out.println(http.headers());
				http.cors()
				.and().
		//disable CSRF token generation n verification
				csrf().disable()
				.exceptionHandling().authenticationEntryPoint(authEntry).
				and().
				authorizeRequests()
				.antMatchers("/", "/**", "/user/register","/user/login","/user/forget-password",
						"/v*/api-doc*/**","/swagger-ui/**" ).permitAll()
				.antMatchers(HttpMethod.OPTIONS).permitAll()
				.antMatchers("/packages/**").hasAuthority("USER")
				.antMatchers("/admin","/packages/add").hasAuthority("ADMIN")
				.anyRequest().authenticated()
				.and()
				.sessionManagement()
				.sessionCreationPolicy(SessionCreationPolicy.STATELESS)
				.and()
				.addFilterBefore(authfilter, UsernamePasswordAuthenticationFilter.class);
				return http.build();
	}
	
	@Bean
	public AuthenticationManager authenticationManager
	(AuthenticationConfiguration config) throws Exception
	{
		return config.getAuthenticationManager();
	}

}
