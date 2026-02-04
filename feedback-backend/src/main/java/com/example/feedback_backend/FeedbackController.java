package com.example.feedback_backend;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/feedback")
@CrossOrigin(origins = "http://localhost:4200") // <--- CRITICAL: Allows Angular to access this
public class FeedbackController {

    @Autowired
    private FeedbackRepository repository;

    // GET /api/feedback - Get all reviews
    @GetMapping
    public List<Feedback> getAllFeedback() {
        return repository.findAll();
    }

    // POST /api/feedback - Submit a new review
    @PostMapping
    public Feedback createFeedback(@RequestBody Feedback feedback) {
        return repository.save(feedback);
    }
}
