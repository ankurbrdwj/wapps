package com.ankur.angular.services;

import java.util.List;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ankur.angular.entities.User;
import com.ankur.angular.repositories.UserRepository;
@Service
public class UserService {
@Autowired
UserRepository userRepository;

public User findById(long userId){
	return userRepository.findOne(userId);
}

public Set<User> findAll(long userId){
	return (Set<User>) userRepository.findAll();
}

public User create(User user){
	return userRepository.save(user);
}

public void delete(long userId){
	 userRepository.delete(userId);
}

public List<User> findAllUsers() {
	// TODO Auto-generated method stub
	return (List<User>) userRepository.findAll();
}

public boolean isUserExist(User user) {
	// TODO Auto-generated method stub
	return userRepository.exists(user.getUserId());
}

public void saveUser(User user) {
	// TODO Auto-generated method stub
	 userRepository.save(user);
}

public void updateUser(User currentUser) {
	// TODO Auto-generated method stub
	userRepository.save(currentUser);
}

public void deleteUserById(long id) {
	// TODO Auto-generated method stub
	 userRepository.delete(id);
}

public void deleteAllUsers() {
	// TODO Auto-generated method stub
	userRepository.deleteAll();
}




}
