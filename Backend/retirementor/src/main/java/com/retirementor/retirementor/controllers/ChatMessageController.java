package com.retirementor.retirementor.controllers;

import com.retirementor.retirementor.models.ChatMessage;
import com.retirementor.retirementor.services.ChatMessageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/chat-messages")
@CrossOrigin(origins = "http://localhost:3001") // Allow frontend access
public class ChatMessageController {

    @Autowired
    private ChatMessageService chatMessageService;

    // Send a new message
    @PostMapping("/send")
    public ChatMessage sendMessage(@RequestBody ChatMessage chatMessage) {
        return chatMessageService.saveMessage(chatMessage);
    }

    // Get chat history between two users
    @GetMapping
    public List<ChatMessage> getChatHistory(
            @RequestParam String senderId,
            @RequestParam String receiverId) {
        return chatMessageService.getChatHistory(senderId, receiverId);
    }

    // Get all messages for a receiver
    @GetMapping("/received/{receiverId}")
    public List<ChatMessage> getReceivedMessages(@PathVariable String receiverId) {
        return chatMessageService.getMessagesForReceiver(receiverId);
    }
}

