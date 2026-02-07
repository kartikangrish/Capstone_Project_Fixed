package com.example.feedback_backend.service;

import com.example.feedback_backend.model.LoginRequest;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    public boolean authenticate(LoginRequest request) {
        if ("ADMIN".equalsIgnoreCase(request.getRole())) {
            return "admin".equals(request.getUsername()) && "admin".equals(request.getPassword());
        } else if ("USER".equalsIgnoreCase(request.getRole())) {
            return "user".equals(request.getUsername()) && "user".equals(request.getPassword());
        }
        return false;
    }
}