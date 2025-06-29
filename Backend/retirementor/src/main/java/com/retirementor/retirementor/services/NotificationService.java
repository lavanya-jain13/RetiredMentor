package com.retirementor.retirementor.services;

import com.retirementor.retirementor.models.Notification;
import com.retirementor.retirementor.repositories.NotificationRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class NotificationService {
    private final NotificationRepository notificationRepository;

    public NotificationService(NotificationRepository notificationRepository) {
        this.notificationRepository = notificationRepository;
    }

    public Notification createNotification(String message, String recipientId) {
        Notification notification = new Notification(message, recipientId);
        return notificationRepository.save(notification);
    }

    public List<Notification> getNotificationsForUser(String userId) {
        return notificationRepository.findByRecipientId(userId);
    }
}
