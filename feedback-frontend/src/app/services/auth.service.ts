import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // Holds the current user role: 'ADMIN', 'USER', or null (not logged in)
  private userRoleSubject = new BehaviorSubject<string | null>(null);
  public userRole$ = this.userRoleSubject.asObservable();

  constructor(private router: Router) {}

  login(username: string): boolean {
    if (username === 'admin') {
      this.userRoleSubject.next('ADMIN');
      localStorage.setItem('role', 'ADMIN');
      return true;
    } else if (username === 'user') {
      this.userRoleSubject.next('USER');
      localStorage.setItem('role', 'USER');
      return true;
    }
    return false; // Login failed
  }

  logout() {
    this.userRoleSubject.next(null);
    localStorage.removeItem('role');
    this.router.navigate(['/login']);
  }

  getRole(): string | null {
    return this.userRoleSubject.value || localStorage.getItem('role');
  }

  isAdmin(): boolean {
    return this.getRole() === 'ADMIN';
  }

  isUser(): boolean {
    return this.getRole() === 'USER';
  }
}