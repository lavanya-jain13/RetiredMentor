package com.retirementor.retirementor.controllers;

import com.retirementor.retirementor.models.ChatRequest;
import com.retirementor.retirementor.repositories.ChatRequestRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/history")
@CrossOrigin(origins = "http://localhost:3001") // Allow frontend requests
public class HistoryController {

    @Autowired
    private ChatRequestRepository chatRequestRepository;

    // 🔹 Get history for a Retired User (Users they have taught)
    @GetMapping("/retired/{retiredUserId}")
    public List<String> getHistoryForRetiredUser(@PathVariable String retiredUserId) {
        List<ChatRequest> acceptedRequests = chatRequestRepository.findAcceptedChatRequests();
        
        return acceptedRequests.stream()
            .filter(req -> req.getReceiverId().equals(retiredUserId))
            .map(ChatRequest::getSenderName) // Get unique sender names
            .distinct()
            .collect(Collectors.toList());
    }

    // 🔹 Get history for a Regular User (Mentors they have learned from)
    @GetMapping("/regular/{regularUserId}")
    public List<String> getHistoryForRegularUser(@PathVariable String regularUserId) {
        List<ChatRequest> acceptedRequests = chatRequestRepository.findAcceptedChatRequests();

        return acceptedRequests.stream()
            .filter(req -> req.getSenderId().equals(regularUserId))
            .map(req -> req.getReceiverId()) // Get unique retired user IDs
            .distinct()
            .collect(Collectors.toList());
    }
}
