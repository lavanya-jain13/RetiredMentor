package com.retirementor.retirementor.models;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "retired_users")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class RetiredUser {
    @Id
    private String id;
    private String name;
    private String email;
    private String password;
    private String expertise;
    private int experience;
    private String description;
    private String profileImageUrl;
}
