import { Component } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { Transaction } from './app/models/transaction';
import { TransactionListComponent } from './app/components/transaction-list.component';
import { AddTransactionComponent } from './app/components/add-transaction.component';
import { FilterBarComponent } from './app/components/filter-bar.component';
import { AuthComponent } from './app/components/auth.component';
import { AuthService } from './app/services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, TransactionListComponent, AddTransactionComponent, FilterBarComponent, AuthComponent],
  template: `
    <ng-container *ngIf="authService.isAuthenticated(); else authTemplate">
      <div class="min-h-screen bg-gray-50 py-8">
        <div class="max-w-4xl mx-auto px-4">
          <div class="flex justify-between items-center mb-8">
            <h1 class="text-3xl font-bold text-gray-900">Passbook</h1>
            <div class="flex items-center gap-8">
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
              <button (click)="signOut()"
                      class="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2">
                Sign Out
              </button>
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
    </ng-container>

    <ng-template #authTemplate>
      <app-auth></app-auth>
    </ng-template>
  `
})
export class App {
  transactions: Transaction[] = [];
  balance = 0;
  netWorth = 0;
  activeFilter = 'all';

  constructor(public authService: AuthService) {}

  onAddTransaction(transaction: Transaction) {
    this.transactions = [transaction, ...this.transactions];
    this.updateBalances();
  }

  onFilterChange(filter: string) {
    this.activeFilter = filter;
  }

  signOut() {
    this.authService.signOut();
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

bootstrapApplication(App, {
  providers: [AuthService]
});