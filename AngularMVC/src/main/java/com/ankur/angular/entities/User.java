package com.ankur.angular.entities;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity
public class User {
	@Id
	@GeneratedValue
	@Column(name="USER_ID")
    private long userId;
	@Column(name="FIRST_NAME") 
    private String userFname;
	@Column(name="LAST_NAME")
    private String userLname;
	@Column(name="ADDRESS_1")
    private String address1;
	@Column(name="ADDRESS_2")
    private String address2;
	@Column(name="CITY")
    private String city;
	@Column(name="STATE")
    private String state;
	@Column(name="ZIP_CODE")
    private String zipCode;
	@Column(name="EMAIL_ADDRESS")
    private String email;
	@Column(name="USER_PHONE")
	private String userPhone;
	
	
	public long getUserId() {
		return userId;
	}
	public void setUserId(long userId) {
		this.userId = userId;
	}
	public String getUserFname() {
		return userFname;
	}
	public void setUserFname(String userFname) {
		this.userFname = userFname;
	}
	public String getUserLname() {
		return userLname;
	}
	public void setUserLname(String userLname) {
		this.userLname = userLname;
	}
	public String getAddress1() {
		return address1;
	}
	public void setAddress1(String address1) {
		this.address1 = address1;
	}
	public String getAddress2() {
		return address2;
	}
	public void setAddress2(String address2) {
		this.address2 = address2;
	}
	public String getCity() {
		return city;
	}
	public void setCity(String city) {
		this.city = city;
	}
	public String getState() {
		return state;
	}
	public void setState(String state) {
		this.state = state;
	}
	public String getZipCode() {
		return zipCode;
	}
	public void setZipCode(String zipCode) {
		this.zipCode = zipCode;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getUserPhone() {
		return userPhone;
	}
	public void setUserPhone(String userPhone) {
		this.userPhone = userPhone;
	}
	@Override
	public int hashCode() {
		final int prime = 768;
		int result = 1;
		result = prime * result + (int) (userId ^ (userId >>> 32));
		return result;
	}
	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		User other = (User) obj;
		if (userId != other.userId)
			return false;
		return true;
	}
	@Override
	public String toString() {
		return "User [userId=" + userId + ", userFname=" + userFname + ", userLname=" + userLname + ", address1="
				+ address1 + ", address2=" + address2 + ", city=" + city + ", state=" + state + ", zipCode=" + zipCode
				+ ", email=" + email + "]";
	}
	public User() {
		super();
		// TODO Auto-generated constructor stub
	}
	public User(long userId, String userFname, String userLname, String address1, String address2, String city,
			String state, String zipCode, String email) {
		super();
		this.userId = userId;
		this.userFname = userFname;
		this.userLname = userLname;
		this.address1 = address1;
		this.address2 = address2;
		this.city = city;
		this.state = state;
		this.zipCode = zipCode;
		this.email = email;
	}
     
    
     
}