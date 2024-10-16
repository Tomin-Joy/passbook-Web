import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Transaction } from '../models/transaction';

@Component({
  selector: 'app-add-transaction',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <!-- Floating Action Button -->
    <button (click)="showDialog = true"
            class="fixed bottom-6 right-6 w-14 h-14 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 flex items-center justify-center">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
      </svg>
    </button>

    <!-- Dialog Backdrop -->
    <div *ngIf="showDialog" 
         class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <!-- Dialog Content -->
      <div class="bg-white rounded-lg shadow-xl max-w-md w-full">
        <div class="flex justify-between items-center p-6 border-b">
          <h2 class="text-xl font-semibold">Add Transaction</h2>
          <button (click)="showDialog = false" class="text-gray-500 hover:text-gray-700">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form (ngSubmit)="onSubmit()" class="p-6 space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700">Description</label>
            <input type="text" [(ngModel)]="description" name="description"
                   class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700">Amount</label>
            <input type="number" [(ngModel)]="amount" name="amount"
                   class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700">Category</label>
            <input type="text" [(ngModel)]="category" name="category"
                   class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700">Type</label>
            <select [(ngModel)]="type" name="type"
                    class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
              <option value="income">Income</option>
              <option value="expense">Expense</option>
            </select>
          </div>

          <div class="flex justify-end space-x-3 mt-6">
            <button type="button" (click)="showDialog = false"
                    class="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2">
              Cancel
            </button>
            <button type="submit"
                    class="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
              Add Transaction
            </button>
          </div>
        </form>
      </div>
    </div>
  `
})
export class AddTransactionComponent {
  @Output() addTransaction = new EventEmitter<Transaction>();
  showDialog = false;

  description = '';
  amount = 0;
  category = '';
  type: 'income' | 'expense' = 'expense';

  onSubmit() {
    const transaction: Transaction = {
      id: Date.now(),
      description: this.description,
      amount: this.amount,
      type: this.type,
      category: this.category,
      date: new Date()
    };

    this.addTransaction.emit(transaction);
    this.resetForm();
    this.showDialog = false;
  }

  private resetForm() {
    this.description = '';
    this.amount = 0;
    this.category = '';
    this.type = 'expense';
  }
}