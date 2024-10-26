import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div class="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
          {{ isSignIn ? 'Sign in to your account' : 'Create your account' }}
        </h2>
      </div>

      <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div class="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form (ngSubmit)="onSubmit()" class="space-y-6">
            <div *ngIf="!isSignIn">
              <label class="block text-sm font-medium text-gray-700">Name</label>
              <input type="text" [(ngModel)]="name" name="name" required
                     class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700">Email address</label>
              <input type="email" [(ngModel)]="email" name="email" required
                     class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700">Password</label>
              <input type="password" [(ngModel)]="password" name="password" required
                     class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
            </div>

            <div>
              <button type="submit"
                      class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                {{ isSignIn ? 'Sign In' : 'Sign Up' }}
              </button>
            </div>
          </form>

          <div class="mt-6">
            <button (click)="toggleMode()"
                    class="w-full text-center text-sm text-gray-600 hover:text-gray-900">
              {{ isSignIn ? 'Need an account? Sign up' : 'Already have an account? Sign in' }}
            </button>
          </div>
        </div>
      </div>
    </div>
  `
})
export class AuthComponent {
  isSignIn = true;
  email = '';
  password = '';
  name = '';
  error = '';

  constructor(private authService: AuthService) {}

  toggleMode() {
    this.isSignIn = !this.isSignIn;
    this.resetForm();
  }

  async onSubmit() {
    try {
      if (this.isSignIn) {
        await this.authService.signIn(this.email, this.password);
      } else {
        await this.authService.signUp(this.email, this.password, this.name);
      }
      this.resetForm();
    } catch (error) {
      this.error = error as string;
    }
  }

  private resetForm() {
    this.email = '';
    this.password = '';
    this.name = '';
    this.error = '';
  }
}