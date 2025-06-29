package com.retirementor.retirementor.models;

import com.fasterxml.jackson.annotation.JsonProperty;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.time.LocalDateTime;
import org.springframework.data.annotation.CreatedDate;


@Document(collection = "feedbacks")
public class Feedback {
    @Id
    private String id;

    @JsonProperty("retiredUserId")
    private String retiredUserId;

    @JsonProperty("regularUserId")
    private String regularUserId;

    @JsonProperty("comment")
    private String comment;

    @JsonProperty("rating")
    private int rating;

    @CreatedDate
private LocalDateTime timestamp;


    public Feedback() {
        this.timestamp = LocalDateTime.now();
    }

    public Feedback(String retiredUserId, String regularUserId, String comment, int rating) {
        this.retiredUserId = retiredUserId;
        this.regularUserId = regularUserId;
        this.comment = comment;
        this.rating = rating;
        this.timestamp = LocalDateTime.now();
    }

    // Getters and Setters
}
