package com.app.security;

import java.security.Key;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

import javax.annotation.PostConstruct;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.stereotype.Component;

import com.app.custom_exception.ApiException;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import lombok.extern.slf4j.Slf4j;

@Component
@Slf4j
public class JwtUtils {
	
	@Value("${SECRET_KEY}")
	private String jwtSecret;
	
	@Value("${EXP_TIMEOUT}")
	private String jwtExpirationinMs;
	
	private Key key;
	
	@PostConstruct
	public void init() {
		key = Keys.hmacShaKeyFor(jwtSecret.getBytes());
	}
	
	// will be invoked by Authentication controller , upon successful
		// authentication
	@SuppressWarnings("deprecation")
	public String generateJwtToken(Authentication authentication) { 
		CustomUserDetails userPrincipal = (CustomUserDetails) authentication.getPrincipal();
		//JWT : userName,issued at ,exp date,digital signature(does not typically contain password , can contain authorities
				return Jwts.builder() // JWTs : a Factory class , used to create JWT tokens
				.setSubject(userPrincipal.getUsername()) // setting subject part of the token(typically user
				// name/email)
				.setIssuedAt(new Date()) // Sets the JWT Claims iat (issued at) value of current date
						/* .setExpiration(new Date((new Date()).getTime() + jwtExpirationinMs)) */  // Sets the JWT Claims exp
				// (expiration) value.
				// setting a custom claim
				.claim("userId", userPrincipal.getUserId())
				.claim("authorities", getAuthoritiesInString(userPrincipal.getAuthorities()))
				.signWith(key, SignatureAlgorithm.HS512)  // Signs the constructed JWT using the specified
				// algorithm with the specified key, producing a
				// JWS(Json web signature=signed JWT)

				// Using token signing algo : HMAC using SHA-512
				.compact();// Actually builds the JWT and serializes it to a compact, URL-safe string
				
	}
	
	// this method will be invoked by our custom JWT filter
	public String getUserNameFromJwtToken(Claims claims) {
		return claims.getSubject();
	}
	
	// this method will be invoked by our custom filter
	public Claims validateJwtToken(String jwtToken) {
		try {
			Claims claims = Jwts.parserBuilder()
					.setSigningKey(key).build().
					// Sets the signing key used to verify JWT digital signature.
							parseClaimsJws(jwtToken).getBody();// Parses the signed JWT returns the resulting Jws<Claims> instance
					// throws exc in case of failures in verification
					return claims;
		}catch (Exception e) {
			throw new ApiException("Faied to verify the user!!");
		}
	}
	
	// Accepts Collection<GrantedAuthority> n rets comma separated list of it's
		// string form
	private String getAuthoritiesInString(Collection<? extends GrantedAuthority> authorities) {
		String authString = authorities.stream().
				map(authority-> authority.getAuthority()).
				collect(Collectors.joining(","));
		return authString;
	}
	
	public List<GrantedAuthority> getAuthoritiesFromClaims(Claims claims){
		
		
		
		  String authString = (String) claims.get("authorities");
		  List<GrantedAuthority> authorities =
		  AuthorityUtils.commaSeparatedStringToAuthorityList(authString);
		  authorities.forEach(System.out::println); return authorities;
		 
		 
		 
		
		
		/*
		 * List<?> roles = claims.get("authorities", List.class); List<GrantedAuthority>
		 * authorities = new ArrayList<>();
		 * 
		 * if (roles != null) { for (Object role : roles) { if (role instanceof String)
		 * { authorities.add(new SimpleGrantedAuthority((String) role)); } } }
		 */
		/* return authorities; */
		 

	}
}
