package com.retirementor.retirementor.repositories;

import com.retirementor.retirementor.models.ChatMessage;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface ChatMessageRepository extends MongoRepository<ChatMessage, String> {
    List<ChatMessage> findBySenderIdAndReceiverId(String senderId, String receiverId);
    List<ChatMessage> findByReceiverId(String receiverId);
}
