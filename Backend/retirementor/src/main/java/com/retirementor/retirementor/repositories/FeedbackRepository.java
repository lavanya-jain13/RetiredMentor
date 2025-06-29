package com.retirementor.retirementor.repositories;

import com.retirementor.retirementor.models.Feedback;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface FeedbackRepository extends MongoRepository<Feedback, String> {
    List<Feedback> findByRetiredUserId(String retiredUserId);
}
