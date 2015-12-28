package com.ankur.angular.repositories;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.ankur.angular.entities.User;
@Repository
public interface UserRepository extends CrudRepository<User, Long> {

}
