import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Transaction } from '../models/transaction';

@Component({
  selector: 'app-transaction-list',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="space-y-4">
      <div *ngFor="let transaction of transactions" 
           class="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
        <div class="flex justify-between items-center">
          <div>
            <h3 class="font-medium">{{ transaction.description }}</h3>
            <p class="text-sm text-gray-500">{{ transaction.category }}</p>
            <span [ngClass]="{
              'bg-green-100 text-green-800': transaction.type === 'income',
              'bg-red-100 text-red-800': transaction.type === 'expense',
              'bg-blue-100 text-blue-800': transaction.type === 'lend',
              'bg-purple-100 text-purple-800': transaction.type === 'borrow'
            }" class="text-xs px-2 py-1 rounded-full inline-block mt-1">
              {{ transaction.type }}
            </span>
          </div>
          <div [ngClass]="{
            'text-green-600': transaction.type === 'income',
            'text-red-600': transaction.type === 'expense',
            'text-blue-600': transaction.type === 'lend',
            'text-purple-600': transaction.type === 'borrow'
          }" class="font-semibold">
            {{ transaction.type === 'income' || transaction.type === 'borrow' ? '+' : '-' }}{{ transaction.amount }}
          </div>
        </div>
        <div class="text-xs text-gray-400 mt-2">
          {{ transaction.date | date:'medium' }}
        </div>
      </div>
    </div>
  `
})
export class TransactionListComponent {
  @Input() transactions: Transaction[] = [];
}