package com.example.feedback_backend.service;

import com.example.feedback_backend.model.Feedback;
import com.example.feedback_backend.repository.FeedbackRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class FeedbackService {

    @Autowired
    private FeedbackRepository feedbackRepository;

    // Core Functionality: Submit feedback
    public Feedback saveFeedback(Feedback feedback) {
        return feedbackRepository.save(feedback);
    }

    // Core Functionality: View all feedback
    public List<Feedback> getAllFeedback() {
        return feedbackRepository.findAll();
    }

    // Core Functionality: Filter feedback by rating (Required for evaluation)
    public List<Feedback> getFeedbackByRating(Integer rating) {
        return feedbackRepository.findByRating(rating);
    }
}