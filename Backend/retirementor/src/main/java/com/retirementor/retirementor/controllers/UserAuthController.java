package com.retirementor.retirementor.controllers;

import com.retirementor.retirementor.models.RegularUser;
import com.retirementor.retirementor.models.RetiredUser;
import com.retirementor.retirementor.services.RegularUserService;
import com.retirementor.retirementor.services.RetiredUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "http://localhost:3001")
public class UserAuthController {

    @Autowired
    private RegularUserService regularUserService;

    @Autowired
    private RetiredUserService retiredUserService;

    // ✅ Register either Regular or Retired user
    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestParam String userType, @RequestBody Object userData) {
        if (userType.equalsIgnoreCase("regular")) {
            RegularUser user = (RegularUser) userData;
            Optional<RegularUser> existingUser = regularUserService.findByEmail(user.getEmail());

            if (existingUser.isPresent()) {
                return ResponseEntity.status(HttpStatus.CONFLICT).body("User already exists!");
            }

            return ResponseEntity.ok(regularUserService.registerUser(user));

        } else if (userType.equalsIgnoreCase("retired")) {
            RetiredUser user = (RetiredUser) userData;
            Optional<RetiredUser> existingUser = retiredUserService.findByEmail(user.getEmail());

            if (existingUser.isPresent()) {
                return ResponseEntity.status(HttpStatus.CONFLICT).body("User already exists!");
            }

            return ResponseEntity.ok(retiredUserService.registerRetiredUser(user));
        }

        return ResponseEntity.badRequest().body("Invalid user type");
    }

    // ✅ Login for both Regular and Retired users
    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody RegularUser loginRequest) {
        Optional<RegularUser> regularUser = regularUserService.findByEmail(loginRequest.getEmail());
        if (regularUser.isPresent() && regularUserService.validatePassword(loginRequest.getPassword(), regularUser.get().getPassword())) {
            return ResponseEntity.ok(regularUser.get());
        }

        Optional<RetiredUser> retiredUser = retiredUserService.findByEmail(loginRequest.getEmail());
        if (retiredUser.isPresent()) {
            return ResponseEntity.ok(retiredUser.get());
        }

        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid email or password");
    }

    @GetMapping("/logged-in-user")
public ResponseEntity<?> getLoggedInUser(@RequestParam String email) {
    Optional<RegularUser> regularUser = regularUserService.findByEmail(email);
    if (regularUser.isPresent()) {
        return ResponseEntity.ok(regularUser.get());
    }

    Optional<RetiredUser> retiredUser = retiredUserService.findByEmail(email);
    if (retiredUser.isPresent()) {
        return ResponseEntity.ok(retiredUser.get());
    }

    return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
}

}
