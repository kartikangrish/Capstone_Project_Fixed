import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Feedback } from '../../models/feedback.models';
import { FeedbackService } from '../../services/feedback';

@Component({
  selector: 'app-feedback-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './feedback-form.html',
  styleUrls: [] // Leveraging Bootstrap and global styles.css
})
export class FeedbackFormComponent {
  
  // Initialize nested objects to align with Spring Boot JPA Entity requirements
  feedback: Feedback = {
    customer: {
      email: '',
      firstName: '',
      lastName: ''
    },
    product: {
      name: '',
      category: 'Maritime Services', 
      description: 'System-generated entry for maritime tracking' 
    },
    rating: 5,
    comment: ''
  };

  isSubmitting = false;

  constructor(
    private feedbackService: FeedbackService, 
    private router: Router
  ) {}

  /**
   * Submits the feedback object to the Spring Boot REST API.
   * Handles both success and structured error responses for the evaluation.
   */
  onSubmit() {
    this.isSubmitting = true;
    
    this.feedbackService.submitFeedback(this.feedback).subscribe({
      next: (response) => {
        console.log('Success:', response);
        this.isSubmitting = false;
        alert('Thank you! Your feedback has been recorded securely in our database.');
        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        this.isSubmitting = false;
        console.error('Submission Error:', err);
        
        let errorMessage = 'An unexpected error occurred.';

        // Handle Validation Errors (400) from GlobalExceptionHandler
        if (err.status === 400 && err.error) {
          // Extracts field-specific messages (e.g., "Invalid email format")
          const validationErrors = err.error;
          errorMessage = 'Validation Failed:\n' + Object.values(validationErrors).join('\n');
        } 
        // Handle Server Errors (500)
        else if (err.status === 500) {
          errorMessage = 'Backend Server Error: Please verify if H2 Database and Spring Boot are running.';
        } 
        // Handle Connection Errors (0)
        else if (err.status === 0) {
          errorMessage = 'Network Error: Cannot reach the backend API. Check CORS or server status.';
        }

        alert(errorMessage);
      }
    });
  }
}