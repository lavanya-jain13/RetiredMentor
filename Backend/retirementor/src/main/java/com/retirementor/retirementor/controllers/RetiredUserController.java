package com.retirementor.retirementor.controllers;

import com.retirementor.retirementor.models.RetiredUser;
import com.retirementor.retirementor.services.RetiredUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import java.nio.file.Path;
import java.nio.file.Paths;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/retired-users")
@CrossOrigin(origins = "http://localhost:3001", allowCredentials = "true")
public class RetiredUserController {

    @Autowired
    private RetiredUserService retiredUserService;
    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    @PostMapping("/register")
    public ResponseEntity<?> registerRetiredUser(@RequestBody RetiredUser user) {
        Optional<RetiredUser> existingUser = retiredUserService.findByEmail(user.getEmail());
        
        if (existingUser.isPresent()) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("User already exists!");
        }

        RetiredUser newUser = retiredUserService.registerRetiredUser(user);
        return ResponseEntity.ok(newUser);
    }

    @GetMapping("/email/{email}")
    public ResponseEntity<RetiredUser> getRetiredUserByEmail(@PathVariable String email) {
        Optional<RetiredUser> user = retiredUserService.findByEmail(email);
        
        return user.map(ResponseEntity::ok)
                   .orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).build());
    }

    @PutMapping("/update/json/{id}")  // Renamed JSON update
    public ResponseEntity<?> updateProfileJson(@PathVariable String id, @RequestBody RetiredUser updatedUser) {
        RetiredUser updated = retiredUserService.updateProfile(id, updatedUser);
        if (updated != null) {
            return ResponseEntity.ok(updated);
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found!");
    }
    

    // NEW: Search users by expertise
    // @GetMapping("/search/{expertise}")
    // public ResponseEntity<?> searchUsersByExpertise(@PathVariable String expertise) {
    //     return ResponseEntity.ok(retiredUserService.findByExpertise(expertise));
    // }

    @PostMapping("/login")
    public ResponseEntity<?> loginRetiredUser(@RequestBody RetiredUser user) {
        Optional<RetiredUser> existingUser = retiredUserService.findByEmail(user.getEmail());

        if (existingUser.isPresent()) {
            RetiredUser foundUser = existingUser.get();
            
            // Check if the password matches the hashed password
            if (passwordEncoder.matches(user.getPassword(), foundUser.getPassword())) {
                return ResponseEntity.ok(foundUser);
            } else {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Incorrect Password!");
            }
        }

        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found!");
    }

    @GetMapping("/search")
    public ResponseEntity<List<RetiredUser>> searchUsersByExpertise(@RequestParam("expertise") String expertise) {
        List<RetiredUser> users = retiredUserService.findByExpertise(expertise);
        
        if (users.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(users);
        }
        
        return ResponseEntity.ok(users);
    }
    @PutMapping("/update/form/{id}")  // Renamed form update
    public ResponseEntity<?> updateProfileForm(@PathVariable String id, 
                                               @RequestParam("name") String name,
                                               @RequestParam("expertise") String expertise,
                                               @RequestParam("experience") String experience,
                                               @RequestParam("description") String description,
                                               @RequestParam(value = "image", required = false) MultipartFile image) {
        Optional<RetiredUser> userOptional = retiredUserService.findById(id);
        if (userOptional.isPresent()) {
            RetiredUser user = userOptional.get();
            user.setName(name);
            user.setExpertise(expertise);
            user.setExperience(Integer.parseInt(experience));
            user.setDescription(description);
    
            if (image != null && !image.isEmpty()) {
                String imageUrl = "http://localhost:8080/uploads/" + image.getOriginalFilename();
                user.setProfileImageUrl(imageUrl);
            }
    
            RetiredUser updatedUser = retiredUserService.save(user);
            return ResponseEntity.ok(updatedUser);
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found!");
    }

    @GetMapping("/{id}")
public ResponseEntity<?> getRetiredUserById(@PathVariable String id) {
    Optional<RetiredUser> user = retiredUserService.findById(id);

    if (user.isPresent()) {
        return ResponseEntity.ok(user.get());
    } else {
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found!");
    }
}
@GetMapping("/uploads/{filename}")
public ResponseEntity<Resource> getFile(@PathVariable String filename) {
    try {
        Path filePath = Paths.get("uploads").resolve(filename).normalize();
        Resource resource = new UrlResource(filePath.toUri());

        if (resource.exists() || resource.isReadable()) {
            return ResponseEntity.ok()
                    .header("Content-Type", "image/jpeg")
                    .body(resource);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    } catch (Exception e) {
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
    }
}
@GetMapping("/test")
public String testAPI() {
    return "RetiredUserController is working!";
}


}
