package com.example.feedback_backend.controller;

import com.example.feedback_backend.model.LoginRequest;
import com.example.feedback_backend.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:4200")
public class AuthController {

    @Autowired
    private AuthService authService;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {
        if (authService.authenticate(request)) {
            return ResponseEntity.ok(Map.of("message", "Login Successful", "role", request.getRole()));
        }
        return ResponseEntity.status(401).body(Map.of("message", "Invalid Credentials"));
    }
}