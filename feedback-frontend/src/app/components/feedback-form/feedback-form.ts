import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { FeedbackService } from '../../services/feedback';
import { Feedback } from '../../models/feedback.models';

@Component({
  selector: 'app-feedback-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './feedback-form.html',
  styles: [`
    .container { max-width: 600px; margin: 2rem auto; padding: 2rem; border: 1px solid #ccc; border-radius: 8px; }
    .form-group { margin-bottom: 1rem; }
    label { display: block; margin-bottom: 0.5rem; font-weight: bold; }
    input, select, textarea { width: 100%; padding: 0.5rem; border: 1px solid #ccc; border-radius: 4px; }
    button { background-color: #007bff; color: white; padding: 0.75rem 1.5rem; border: none; border-radius: 4px; cursor: pointer; }
    button:disabled { background-color: #ccc; }
  `]
})
export class FeedbackFormComponent {
  feedback: Feedback = {
    customerName: '',
    productName: '',
    rating: 5,
    comment: ''
  };

  constructor(private feedbackService: FeedbackService, private router: Router) {}

  onSubmit() {
    this.feedbackService.submitFeedback(this.feedback).subscribe({
      next: () => {
        alert('Feedback Submitted!');
        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        console.error(err);
        alert('Error submitting feedback (Is the backend running?)');
      }
    });
  }
}
