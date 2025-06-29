package com.retirementor.retirementor.repositories;

import com.retirementor.retirementor.models.RegularUser;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface RegularUserRepository extends MongoRepository<RegularUser, String> {
    Optional<RegularUser> findByEmail(String email);
}

