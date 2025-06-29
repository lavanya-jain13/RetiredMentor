package com.retirementor.retirementor.services;

import com.retirementor.retirementor.models.RetiredUser;
import com.retirementor.retirementor.repositories.RetiredUserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class RetiredUserService {

    @Autowired
    private RetiredUserRepository retiredUserRepository;

    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    public RetiredUser registerRetiredUser(RetiredUser user) {
        user.setPassword(passwordEncoder.encode(user.getPassword())); // Hash password before saving
        return retiredUserRepository.save(user);
    }

    public Optional<RetiredUser> findByEmail(String email) {
        return retiredUserRepository.findByEmail(email);
    }

    public RetiredUser updateProfile(String id, RetiredUser updatedUser) {
        Optional<RetiredUser> userOptional = retiredUserRepository.findById(id);
    
        if (userOptional.isPresent()) {
            RetiredUser user = userOptional.get();
            user.setName(updatedUser.getName());
            user.setEmail(updatedUser.getEmail());
            user.setExpertise(updatedUser.getExpertise());
            user.setExperience(updatedUser.getExperience());
            user.setDescription(updatedUser.getDescription());
    
            // Update profile image only if a new image is provided
            if (updatedUser.getProfileImageUrl() != null) {
                user.setProfileImageUrl(updatedUser.getProfileImageUrl());
            }
    
            return retiredUserRepository.save(user);
        }
        return null;
    }
    

    // NEW: Search users by expertise
    // public List<RetiredUser> findByExpertise(String expertise) {
    //     return retiredUserRepository.findByExpertise(expertise);
    // }
    public List<RetiredUser> findByExpertise(String expertise) {
        return retiredUserRepository.findByExpertiseIgnoreCase(expertise);
    }

    public Optional<RetiredUser> findById(String id) {
        return retiredUserRepository.findById(id);
    }

    // Save or update user
    public RetiredUser save(RetiredUser user) {
        return retiredUserRepository.save(user);
    }

    public boolean validatePassword(String rawPassword, String encodedPassword) {
        return passwordEncoder.matches(rawPassword, encodedPassword);
    }
    
}
