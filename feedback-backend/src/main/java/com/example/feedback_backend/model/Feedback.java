package com.example.feedback_backend.model;

import java.time.LocalDateTime;

import jakarta.persistence.CascadeType; // Added import
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "feedback")
public class Feedback {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Added CascadeType.ALL so Customer is saved automatically
    @ManyToOne(cascade = CascadeType.ALL) 
    @JoinColumn(name = "customer_id")
    private Customer customer;

    // Added CascadeType.ALL so Product is saved automatically
    @ManyToOne(cascade = CascadeType.ALL) 
    @JoinColumn(name = "product_id")
    private Product product;

    private Integer rating;
    private String comment;
    private LocalDateTime submittedAt = LocalDateTime.now();

    public Feedback() {
    }

    public Feedback(Customer customer, Product product, Integer rating, String comment) {
        this.customer = customer;
        this.product = product;
        this.rating = rating;
        this.comment = comment;
    }

    // Getters and Setters remain the same
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public Customer getCustomer() { return customer; }
    public void setCustomer(Customer customer) { this.customer = customer; }
    public Product getProduct() { return product; }
    public void setProduct(Product product) { this.product = product; }
    public Integer getRating() { return rating; }
    public void setRating(Integer rating) { this.rating = rating; }
    public String getComment() { return comment; }
    public void setComment(String comment) { this.comment = comment; }
    public LocalDateTime getSubmittedAt() { return submittedAt; }
    public void setSubmittedAt(LocalDateTime submittedAt) { this.submittedAt = submittedAt; }
}