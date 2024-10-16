import { Component } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { Transaction } from './app/models/transaction';
import { TransactionListComponent } from './app/components/transaction-list.component';
import { AddTransactionComponent } from './app/components/add-transaction.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, TransactionListComponent, AddTransactionComponent],
  template: `
    <div class="min-h-screen bg-gray-50 py-8">
      <div class="max-w-4xl mx-auto px-4">
        <div class="flex justify-between items-center mb-8">
          <h1 class="text-3xl font-bold text-gray-900">Finance Manager</h1>
          <div class="text-lg">
            Balance: 
            <span [ngClass]="balance >= 0 ? 'text-green-600' : 'text-red-600'"
                  class="font-semibold">
              {{ balance | number:'1.2-2' }}
            </span>
          </div>
        </div>
        
        <app-transaction-list [transactions]="transactions"></app-transaction-list>
        <app-add-transaction (addTransaction)="onAddTransaction($event)"></app-add-transaction>
      </div>
    </div>
  `
})
export class App {
  transactions: Transaction[] = [];
  balance = 0;

  onAddTransaction(transaction: Transaction) {
    this.transactions = [transaction, ...this.transactions];
    this.updateBalance();
  }

  private updateBalance() {
    this.balance = this.transactions.reduce((acc, curr) => {
      return acc + (curr.type === 'income' ? curr.amount : -curr.amount);
    }, 0);
  }
}

bootstrapApplication(App);