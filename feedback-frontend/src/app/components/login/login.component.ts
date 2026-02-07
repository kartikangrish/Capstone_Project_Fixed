import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router'; 
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrls: [] 
})
export class LoginComponent {
  // Properties bound to [(ngModel)] in your HTML
  username = '';
  password = ''; 
  role = ''; // Fixes [ERROR] TS2339: Property 'role' does not exist

  constructor(private authService: AuthService, private router: Router) {}

  onLogin() {
    // 1. Logic for role-based authentication
    // We pass username, password, and role to the service
    const success = this.authService.login(this.username, this.password, this.role);
    
    if (success) {
      // 2. Navigation based on the role logic you requested
      if (this.role === 'ADMIN') {
        this.router.navigate(['/dashboard']);
      } else {
        this.router.navigate(['/feedback-form']);
      }
    } else {
      // 3. User feedback for invalid credentials
      alert(`Invalid credentials for ${this.role} access! 
      Hint: Use "admin/admin" for Admin or "user/user" for User.`);
    }
  }
}