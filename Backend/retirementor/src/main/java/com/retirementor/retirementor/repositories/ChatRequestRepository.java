package com.retirementor.retirementor.repositories;

import com.retirementor.retirementor.models.ChatRequest;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import java.util.List;
import java.util.Optional;

public interface ChatRequestRepository extends MongoRepository<ChatRequest, String> {
    List<ChatRequest> findBySenderId(String senderId);
    List<ChatRequest> findByReceiverId(String receiverId);
    List<ChatRequest> findByReceiverIdAndStatus(String receiverId, String status);
    List<ChatRequest> findByReceiverIdAndStatusIgnoreCase(String receiverId, String status);
    Optional<ChatRequest> findTopBySenderIdAndReceiverIdAndStatusOrderByIdDesc(
    String senderId, String receiverId, String status
    
);
Optional<ChatRequest> findFirstBySenderIdAndReceiverIdAndStatus(
    String senderId, String receiverId, String status
);
@Query("{'status': 'ACCEPTED'}")
List<ChatRequest> findAcceptedChatRequests();


}
