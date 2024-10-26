import { Component } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { Transaction } from './app/models/transaction';
import { TransactionListComponent } from './app/components/transaction-list.component';
import { AddTransactionComponent } from './app/components/add-transaction.component';
import { FilterBarComponent } from './app/components/filter-bar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, TransactionListComponent, AddTransactionComponent, FilterBarComponent],
  template: `
    <div class="min-h-screen bg-gray-50 py-8">
      <div class="max-w-4xl mx-auto px-4">
        <div class="flex justify-between items-center mb-8">
          <h1 class="text-3xl font-bold text-gray-900">Passbook</h1>
          <div class="grid grid-cols-2 gap-4">
            <div class="text-lg">
              Balance: 
              <span [ngClass]="balance >= 0 ? 'text-green-600' : 'text-red-600'"
                    class="font-semibold">
                {{ balance | number:'1.2-2' }}
              </span>
            </div>
            <div class="text-lg">
              Net Worth: 
              <span [ngClass]="netWorth >= 0 ? 'text-green-600' : 'text-red-600'"
                    class="font-semibold">
                {{ netWorth | number:'1.2-2' }}
              </span>
            </div>
          </div>
        </div>
        
        <app-transaction-list 
          [transactions]="transactions"
          [activeFilter]="activeFilter">
        </app-transaction-list>
        <app-add-transaction 
          (addTransaction)="onAddTransaction($event)">
        </app-add-transaction>
        <app-filter-bar
          (filterChange)="onFilterChange($event)">
        </app-filter-bar>
      </div>
    </div>
  `
})
export class App {
  transactions: Transaction[] = [];
  balance = 0;
  netWorth = 0;
  activeFilter = 'all';

  onAddTransaction(transaction: Transaction) {
    this.transactions = [transaction, ...this.transactions];
    this.updateBalances();
  }

  onFilterChange(filter: string) {
    this.activeFilter = filter;
  }

  private updateBalances() {
    // Calculate regular balance (income - expenses)
    this.balance = this.transactions.reduce((acc, curr) => {
      if (curr.type === 'income') return acc + curr.amount;
      if (curr.type === 'expense') return acc - curr.amount;
      return acc;
    }, 0);

    // Calculate net worth (including lending and borrowing)
    this.netWorth = this.transactions.reduce((acc, curr) => {
      switch (curr.type) {
        case 'income': return acc + curr.amount;
        case 'expense': return acc - curr.amount;
        case 'lend': return acc + curr.amount; // Money lent is an asset
        case 'borrow': return acc - curr.amount; // Money borrowed is a liability
        default: return acc;
      }
    }, 0);
  }
}

bootstrapApplication(App);