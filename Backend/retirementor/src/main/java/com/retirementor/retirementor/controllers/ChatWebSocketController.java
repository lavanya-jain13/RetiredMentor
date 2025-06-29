package com.retirementor.retirementor.controllers;

import com.retirementor.retirementor.models.ChatMessage;
import com.retirementor.retirementor.services.ChatMessageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.RestController;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@RestController
public class ChatWebSocketController {

    private static final Logger logger = LoggerFactory.getLogger(ChatWebSocketController.class);

    @Autowired
    private SimpMessagingTemplate messagingTemplate;

    @Autowired
    private ChatMessageService chatMessageService;

    @MessageMapping("/chat")
public void sendMessage(@Payload ChatMessage chatMessage) {
    try {
        String receiverDestination = "/user/" + chatMessage.getReceiverId() + "/queue/messages";
        String senderDestination = "/user/" + chatMessage.getSenderId() + "/queue/messages";

        // Send message to both sender and receiver
        messagingTemplate.convertAndSend(receiverDestination, chatMessage);
        messagingTemplate.convertAndSend(senderDestination, chatMessage);

        // Save the message in MongoDB
        chatMessageService.saveMessage(chatMessage);

        logger.info("Message sent to {}: {}", chatMessage.getReceiverId(), chatMessage.getMessage());
        logger.info("Message sent to {}: {}", chatMessage.getSenderId(), chatMessage.getMessage());
    } catch (Exception e) {
        logger.error("Error sending message: ", e);
    }
}

}
