package com.retirementor.retirementor.controllers;

import com.retirementor.retirementor.models.RegularUser;
import com.retirementor.retirementor.services.RegularUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/regular-users")
@CrossOrigin(origins = "http://localhost:3001")
public class RegularUserController {

    @Autowired
    private RegularUserService regularUserService;

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody RegularUser user) {
        Optional<RegularUser> existingUser = regularUserService.findByEmail(user.getEmail());

        if (existingUser.isPresent()) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("User already exists!");
        }

        RegularUser registeredUser = regularUserService.registerUser(user);
        return ResponseEntity.ok(registeredUser);
    }

    @GetMapping("/email/{email}")
    public ResponseEntity<RegularUser> getUserByEmail(@PathVariable String email) {
        Optional<RegularUser> user = regularUserService.findByEmail(email);
    
        if (user.isPresent()) {
            return ResponseEntity.ok(user.get());  // Return user if found
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();  // Return 404 without a body
        }
    }
    
    
    @GetMapping("/{id}")
    public ResponseEntity<RegularUser> getUserById(@PathVariable String id) {
        Optional<RegularUser> user = regularUserService.findById(id);
        
        if (user.isPresent()) {
            return ResponseEntity.ok(user.get());
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }



    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody RegularUser loginRequest) {
        Optional<RegularUser> user = regularUserService.findByEmail(loginRequest.getEmail());

        if (user.isPresent()) {
            if (regularUserService.validatePassword(loginRequest.getPassword(), user.get().getPassword())) {
                return ResponseEntity.ok(user.get());
            } else {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Incorrect password");
            }
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
        }
    }
}
