package com.retirementor.retirementor.repositories;

import com.retirementor.retirementor.models.RetiredUser;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface RetiredUserRepository extends MongoRepository<RetiredUser, String> {
    Optional<RetiredUser> findByEmail(String email);

    // NEW: Search by expertise
    List<RetiredUser> findByExpertise(String expertise);
    List<RetiredUser> findByExpertiseIgnoreCase(String expertise);

}
