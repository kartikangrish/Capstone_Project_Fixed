package com.example.feedback_backend.repository;

import com.example.feedback_backend.model.Feedback;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface FeedbackRepository extends JpaRepository<Feedback, Long> {
    
    // Spring Data JPA creates the SQL for this automatically based on the method name!
    List<Feedback> findByRating(Integer rating);
}