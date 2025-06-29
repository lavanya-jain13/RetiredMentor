package com.retirementor.retirementor.services;

import com.retirementor.retirementor.models.ChatMessage;
import com.retirementor.retirementor.repositories.ChatMessageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ChatMessageService {

    @Autowired
    private ChatMessageRepository chatMessageRepository;

    // Save a new chat message
    public ChatMessage saveMessage(ChatMessage message) {
        return chatMessageRepository.save(message);
    }

    // Retrieve chat history between two users
    public List<ChatMessage> getChatHistory(String senderId, String receiverId) {
        return chatMessageRepository.findBySenderIdAndReceiverId(senderId, receiverId);
    }

    // Get messages received by a specific user
    public List<ChatMessage> getMessagesForReceiver(String receiverId) {
        return chatMessageRepository.findByReceiverId(receiverId);
    }
}
