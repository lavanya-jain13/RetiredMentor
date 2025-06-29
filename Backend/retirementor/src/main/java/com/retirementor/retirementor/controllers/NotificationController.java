package com.retirementor.retirementor.controllers;


import com.retirementor.retirementor.models.Notification;
import com.retirementor.retirementor.services.NotificationService;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/notifications")
public class NotificationController {
    private final NotificationService notificationService;
    private final SimpMessagingTemplate messagingTemplate; // For WebSockets

    public NotificationController(NotificationService notificationService, SimpMessagingTemplate messagingTemplate) {
        this.notificationService = notificationService;
        this.messagingTemplate = messagingTemplate;
    }

    @PostMapping("/send")
    public Notification sendNotification(@RequestParam String message, @RequestParam String recipientId) {
        Notification notification = notificationService.createNotification(message, recipientId);
        
        // Send real-time notification via WebSocket
        messagingTemplate.convertAndSend("/topic/notifications/" + recipientId, notification);
        
        return notification;
    }

    @GetMapping("/{userId}")
    public List<Notification> getUserNotifications(@PathVariable String userId) {
        return notificationService.getNotificationsForUser(userId);
    }
}
