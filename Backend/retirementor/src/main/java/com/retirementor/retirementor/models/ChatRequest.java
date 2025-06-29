package com.retirementor.retirementor.models;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "chat_requests") // MongoDB Collection
public class ChatRequest {
    
    @Id
    private String id;
    private String senderId;  // ID of the regular user
    private String receiverId; // ID of the retired mentor
    private String status;  // pending, accepted, rejected
    private String senderName;

    public ChatRequest() {}

    public ChatRequest(String senderId, String senderName, String receiverId, String status) {
        this.senderId = senderId;
        this.senderName = senderName;
        this.receiverId = receiverId;
        this.status = status;
    }
    public String getId() {
        return id;
    }

    public String getSenderId() {
        return senderId;
    }

    public String getSenderName() {
        return senderName;
    }

    public String getReceiverId() {
        return receiverId;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
    
}
