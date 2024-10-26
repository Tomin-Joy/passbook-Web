import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userSubject = new BehaviorSubject<User | null>(null);
  user$ = this.userSubject.asObservable();

  constructor() {
    // Check for existing session
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      this.userSubject.next(JSON.parse(savedUser));
    }
  }

  signIn(email: string, password: string): Promise<void> {
    // Simulate API call
    return new Promise((resolve, reject) => {
      if (email && password) {
        const user: User = {
          id: Math.random().toString(36).substr(2, 9),
          email,
          name: email.split('@')[0]
        };
        localStorage.setItem('user', JSON.stringify(user));
        this.userSubject.next(user);
        resolve();
      } else {
        reject(new Error('Invalid credentials'));
      }
    });
  }

  signUp(email: string, password: string, name: string): Promise<void> {
    // Simulate API call
    return new Promise((resolve, reject) => {
      if (email && password && name) {
        const user: User = {
          id: Math.random().toString(36).substr(2, 9),
          email,
          name
        };
        localStorage.setItem('user', JSON.stringify(user));
        this.userSubject.next(user);
        resolve();
      } else {
        reject(new Error('Invalid input'));
      }
    });
  }

  signOut(): void {
    localStorage.removeItem('user');
    this.userSubject.next(null);
  }

  isAuthenticated(): boolean {
    return this.userSubject.value !== null;
  }
}