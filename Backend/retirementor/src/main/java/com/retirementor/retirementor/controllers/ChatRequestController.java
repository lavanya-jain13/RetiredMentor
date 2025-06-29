package com.retirementor.retirementor.controllers;

import com.retirementor.retirementor.models.ChatRequest;
import com.retirementor.retirementor.services.ChatRequestService;
import com.retirementor.retirementor.repositories.ChatRequestRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.*;
import java.util.Optional;
import java.util.List;

@RestController
@RequestMapping("/api/chat-requests")
@CrossOrigin(origins = "http://localhost:3001") // Allow frontend requests
public class ChatRequestController {

    @Autowired
    private ChatRequestService chatRequestService;

    @Autowired
    private ChatRequestRepository chatRequestRepository;
    
    @Autowired
    private SimpMessagingTemplate messagingTemplate; // WebSocket messaging

    // Send a chat request
    @PostMapping("/send")
    public ChatRequest sendChatRequest(@RequestBody ChatRequest request) {
        return chatRequestService.sendChatRequest(request.getSenderId(),request.getSenderName(), request.getReceiverId());
    }

    // Get chat requests for a user (retired mentor)
    @GetMapping("/{userId}")
    public List<ChatRequest> getChatRequestsForUser(@PathVariable String userId) {
        return chatRequestService.getChatRequestsForUser(userId);
    }

    // Accept or Reject chat request
    // @PutMapping("/{requestId}/status")
    // public ChatRequest updateChatRequestStatus(@PathVariable String requestId, @RequestParam String status) {
    //     return chatRequestService.updateChatRequestStatus(requestId, status);
    // }
    @GetMapping("/received/{retiredUserId}")
public ResponseEntity<List<ChatRequest>> getChatRequestsForRetiredUser(@PathVariable String retiredUserId) {
    retiredUserId = retiredUserId.trim(); // Remove any unwanted characters
    System.out.println("Fetching chat requests for Retired User ID: '" + retiredUserId + "'");
    
    List<ChatRequest> requests = chatRequestRepository.findByReceiverIdAndStatus(retiredUserId, "PENDING");
    System.out.println("Total requests found: " + requests.size());

    return ResponseEntity.ok(requests);
}

    

@PutMapping("/update-status/{requestId}")
public ResponseEntity<?> updateChatRequestStatus(@PathVariable String requestId, @RequestParam String status) {
    Optional<ChatRequest> optionalRequest = chatRequestRepository.findById(requestId);
    if (optionalRequest.isPresent()) {
        ChatRequest request = optionalRequest.get();
        if (status.equalsIgnoreCase("ACCEPTED") || status.equalsIgnoreCase("REJECTED")) {
            request.setStatus(status);
            chatRequestRepository.save(request);

            // 🔹 Send WebSocket notification when chat is accepted
            if (status.equalsIgnoreCase("ACCEPTED")) {
                messagingTemplate.convertAndSendToUser(
                    request.getSenderId(), "/queue/chatAccepted", request
                );
            }

            return ResponseEntity.ok(request);
        }
        return ResponseEntity.badRequest().body("Invalid status");
    }
    return ResponseEntity.notFound().build();
}
@GetMapping("/status")
public ResponseEntity<?> checkChatRequestStatus(
    @RequestParam String senderId,
    @RequestParam String receiverId
) {
    Optional<ChatRequest> request = chatRequestRepository.findFirstBySenderIdAndReceiverIdAndStatus(
        senderId, receiverId, "ACCEPTED"
    );

    if (request.isPresent()) {
        return ResponseEntity.ok(request.get());  // ✅ Return the accepted request
    }
    return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No accepted chat request found.");
}

}

