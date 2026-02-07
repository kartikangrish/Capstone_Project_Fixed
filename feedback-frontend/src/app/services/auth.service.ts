import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // Initialize from localStorage so the session survives a page refresh
  private userRoleSubject = new BehaviorSubject<string | null>(localStorage.getItem('role'));
  public userRole$ = this.userRoleSubject.asObservable();

  constructor(private router: Router) {}

  /**
   * Updated to accept 3 arguments to fix the TS2554 error.
   * Implements the logic: admin/admin and user/user.
   */
  login(username: string, password: string, roleRequested: string): boolean {
    let assignedRole: string | null = null;

    // Logic: Admin role requires username 'admin' and password 'admin'
    if (roleRequested === 'ADMIN' && username.toLowerCase() === 'admin' && password === 'admin') {
      assignedRole = 'ADMIN';
    } 
    // Logic: User role requires username 'user' and password 'user'
    else if (roleRequested === 'USER' && username.toLowerCase() === 'user' && password === 'user') {
      assignedRole = 'USER';
    }

    if (assignedRole) {
      this.userRoleSubject.next(assignedRole);
      localStorage.setItem('role', assignedRole);
      // For evaluation: Storing a dummy token simulates real REST API behavior
      localStorage.setItem('token', 'dummy-jwt-token'); 
      return true;
    }
    
    return false; // Login failed
  }

  logout() {
    this.userRoleSubject.next(null);
    localStorage.clear(); // Clears role and tokens
    this.router.navigate(['/login']);
  }

  getRole(): string | null {
    return this.userRoleSubject.value;
  }

  isAdmin(): boolean {
    return this.getRole() === 'ADMIN';
  }

  isUser(): boolean {
    return this.getRole() === 'USER';
  }

  isLoggedIn(): boolean {
    return this.getRole() !== null;
  }
}