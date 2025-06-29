package com.retirementor.retirementor.services;

import com.retirementor.retirementor.models.Feedback;
import com.retirementor.retirementor.repositories.FeedbackRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class FeedbackService {
    @Autowired
    private FeedbackRepository feedbackRepository;

    public Feedback addFeedback(Feedback feedback) {
        return feedbackRepository.save(feedback);
    }

    public List<Feedback> getFeedbackForRetiredUser(String retiredUserId) {
        return feedbackRepository.findByRetiredUserId(retiredUserId);
    }
}
