import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <nav class="navbar">
      <div class="brand">Feedback Sys</div>
      <div class="menu">
        <a *ngIf="!auth.getRole()" routerLink="/login">Login</a>

        <a *ngIf="auth.isUser()" routerLink="/submit">Submit Feedback</a>

        <a *ngIf="auth.isAdmin()" routerLink="/dashboard">Admin Dashboard</a>

        <a *ngIf="auth.getRole()" (click)="auth.logout()" class="logout-btn">Logout</a>
      </div>
    </nav>

    <div class="main-content">
      <router-outlet></router-outlet>
    </div>
  `,
  styles: [`
    .navbar { background: #333; color: white; padding: 1rem; display: flex; justify-content: space-between; align-items: center; }
    .brand { font-weight: bold; font-size: 1.2rem; }
    .menu a { color: white; text-decoration: none; margin-left: 15px; cursor: pointer; }
    .menu a:hover { text-decoration: underline; }
    .logout-btn { color: #ff6b6b !important; }
    .main-content { padding: 20px; }
  `]
})
export class AppComponent {
  constructor(public auth: AuthService) {}
}