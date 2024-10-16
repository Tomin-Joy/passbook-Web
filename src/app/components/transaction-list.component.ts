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
          </div>
          <div [ngClass]="transaction.type === 'income' ? 'text-green-600' : 'text-red-600'"
               class="font-semibold">
            {{ transaction.type === 'income' ? '+' : '-' }}{{ transaction.amount }}
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