package com.example.feedback_backend.model;

public class LoginRequest {
    private String username;
    private String password;
    private String role; // "USER" or "ADMIN"

    // Getters and Setters
    public String getUsername() { return username; }
    public void setUsername(String username) { this.username = username; }
    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }
    public String getRole() { return role; }
    public void setRole(String role) { this.role = role; }
}