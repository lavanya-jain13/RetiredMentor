package com.retirementor.retirementor.models;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.time.LocalDateTime;

@Document(collection = "notifications")
public class Notification {

    @Id
    private String id;
    private String message;
    private String recipientId; // ID of the user receiving the notification
    private boolean isRead;
    private LocalDateTime timestamp;
    

    public Notification(String message, String recipientId) {
        this.message = message;
        this.recipientId = recipientId;
        this.isRead = false;
        this.timestamp = LocalDateTime.now();
    }

    // Getters and Setters
}
