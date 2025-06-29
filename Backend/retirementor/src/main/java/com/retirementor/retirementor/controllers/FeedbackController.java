package com.retirementor.retirementor.controllers;

import com.retirementor.retirementor.models.Feedback;
import com.retirementor.retirementor.services.FeedbackService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/feedback")
@CrossOrigin(origins = "http://localhost:3000") // Adjust based on your frontend URL
public class FeedbackController {

    @Autowired
    private FeedbackService feedbackService;

    // API to add feedback
    @PostMapping
public ResponseEntity<Feedback> addFeedback(@RequestBody Feedback feedback) {
    System.out.println("Received feedback: " + feedback);
    Feedback savedFeedback = feedbackService.addFeedback(feedback);
    return new ResponseEntity<>(savedFeedback, HttpStatus.CREATED);
}

    // API to get feedback for a retired user
    @GetMapping("/{retiredUserId}")
    public List<Feedback> getFeedback(@PathVariable String retiredUserId) {
        return feedbackService.getFeedbackForRetiredUser(retiredUserId);
    }
    

}
