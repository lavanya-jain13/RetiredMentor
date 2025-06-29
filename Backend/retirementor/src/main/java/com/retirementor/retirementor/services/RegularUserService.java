package com.retirementor.retirementor.services;

import com.retirementor.retirementor.models.RegularUser;
import com.retirementor.retirementor.repositories.RegularUserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class RegularUserService {

    @Autowired
    private RegularUserRepository regularUserRepository;

    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    public RegularUser registerUser(RegularUser user) {
        user.setPassword(passwordEncoder.encode(user.getPassword())); // Hash password
        return regularUserRepository.save(user);
    }

    public Optional<RegularUser> findByEmail(String email) {
        return regularUserRepository.findByEmail(email);
    }
    

    public boolean validatePassword(String rawPassword, String encodedPassword) {
        return passwordEncoder.matches(rawPassword, encodedPassword);
    }
    public Optional<RegularUser> findById(String id) {
        return regularUserRepository.findById(id);
    }
    
}