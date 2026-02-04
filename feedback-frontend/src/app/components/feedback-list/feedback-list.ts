import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FeedbackService } from '../../services/feedback';
import { Feedback } from '../../models/feedback.models';

@Component({
  selector: 'app-feedback-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './feedback-list.html',
  styles: [`
    .container { max-width: 800px; margin: 2rem auto; }
    table { width: 100%; border-collapse: collapse; margin-top: 1rem; }
    th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
    th { background-color: #f4f4f4; }
    .filter-section { margin-bottom: 1rem; }
    .btn { display: inline-block; margin-top: 1rem; padding: 0.5rem 1rem; background: #28a745; color: white; text-decoration: none; border-radius: 4px; }
  `]
})
export class FeedbackListComponent implements OnInit {
  allFeedback: Feedback[] = [];
  filteredFeedback: Feedback[] = [];
  ratingFilter: string = 'All';

  constructor(private feedbackService: FeedbackService) {}

  ngOnInit(): void {
    this.feedbackService.getAllFeedback().subscribe(data => {
      this.allFeedback = data;
      this.filteredFeedback = data;
    });
  }

  applyFilter() {
    if (this.ratingFilter === 'All') {
      this.filteredFeedback = this.allFeedback;
    } else {
      this.filteredFeedback = this.allFeedback.filter(f => f.rating === Number(this.ratingFilter));
    }
  }
}