package com.example.feedback_backend.controller;

import com.example.feedback_backend.model.Feedback;
import com.example.feedback_backend.service.FeedbackService;
import jakarta.validation.Valid; // Required for Validation marks
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/feedback")
@CrossOrigin(origins = "http://localhost:4200")
public class FeedbackController {

    @Autowired
    private FeedbackService feedbackService; // Now using Service instead of Repository

    // GET /api/feedback - Get all reviews
    @GetMapping
    public ResponseEntity<List<Feedback>> getAllFeedback() {
        return ResponseEntity.ok(feedbackService.getAllFeedback());
    }

    // POST /api/feedback - Submit a new review with Backend Validation
    @PostMapping
    public ResponseEntity<Feedback> createFeedback(@Valid @RequestBody Feedback feedback) {
        Feedback savedFeedback = feedbackService.saveFeedback(feedback);
        return ResponseEntity.ok(savedFeedback);
    }

    // GET /api/feedback/filter/{rating} - Requirement: View and filter feedback
    @GetMapping("/filter/{rating}")
    public ResponseEntity<List<Feedback>> getFeedbackByRating(@PathVariable Integer rating) {
        return ResponseEntity.ok(feedbackService.getFeedbackByRating(rating));
    }

    @GetMapping("/test-error")
    public void testError() {
        throw new RuntimeException("This is a custom error message for the examiner!");
    }
}