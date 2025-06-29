package com.retirementor.retirementor.services;

import com.retirementor.retirementor.models.ChatRequest;
import com.retirementor.retirementor.repositories.ChatRequestRepository;
import com.retirementor.retirementor.repositories.RegularUserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ChatRequestService {

    @Autowired
    private ChatRequestRepository chatRequestRepository;
    @Autowired
private RegularUserRepository regularUserRepository;

    // Send a chat request
    public ChatRequest sendChatRequest(String senderId, String senderName, String receiverId) {
        // Fetch sender name if not provided
        if (senderName == null || senderName.isEmpty()) {
            senderName = regularUserRepository.findById(senderId)
                            .map(user -> user.getName()) 
                            .orElse("Unknown User");
        }
    
        ChatRequest chatRequest = new ChatRequest(senderId, senderName, receiverId, "PENDING");
        return chatRequestRepository.save(chatRequest);
    }

    // Get all chat requests for a user (either sender or receiver)
    public List<ChatRequest> getChatRequestsForUser(String userId) {
        return chatRequestRepository.findByReceiverId(userId);
    }

    // Accept or Reject a chat request
    public ChatRequest updateChatRequestStatus(String requestId, String status) {
        Optional<ChatRequest> chatRequestOptional = chatRequestRepository.findById(requestId);
        if (chatRequestOptional.isPresent()) {
            ChatRequest chatRequest = chatRequestOptional.get();
            chatRequest.setStatus(status);
            return chatRequestRepository.save(chatRequest);
        }
        return null;
    }
}
