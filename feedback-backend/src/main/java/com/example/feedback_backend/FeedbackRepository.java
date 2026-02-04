package com.example.feedback_backend;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FeedbackRepository extends JpaRepository<Feedback, Long> {
    // You can define custom queries here later if needed
    // e.g., List<Feedback> findByRating(Integer rating);
}