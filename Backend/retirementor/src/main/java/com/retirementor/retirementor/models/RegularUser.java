package com.retirementor.retirementor.models;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "regular_users")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class RegularUser {
    @Id
    private String id;
    private String name;
    @Indexed(unique = true) 
    private String email;
    private String password;
}
