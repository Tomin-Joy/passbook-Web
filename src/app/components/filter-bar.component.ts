import { Component, EventEmitter, Output } from "@angular/core";
import { CommonModule } from "@angular/common";

type TransactionType = "all" | "income" | "expense" | "lend" | "borrow";

@Component({
  selector: "app-filter-bar",
  standalone: true,
  imports: [CommonModule],
  template: `
    <div
      class="fixed bottom-24 left-1/2 -translate-x-1/2 w-11/12 max-w-md md:bottom-8"
    >
      <div
        class="bg-black/80 backdrop-blur-lg rounded-full p-2 text-white shadow-lg"
      >
        <div class="flex justify-between items-center gap-1">
          <ng-container *ngFor="let type of types">
            <button
              (click)="setActiveType(type)"
              [class.bg-white]="activeType === type"
              [class.text-grey]="activeType !== type"
              [class.text-black]="activeType === type"
              class="flex-1 px-3 py-2 rounded-full text-sm font-medium transition-all duration-200 hover:bg-white/10 "
            >
              {{ type | titlecase }}
            </button>
          </ng-container>
        </div>
      </div>
    </div>
  `,
})
export class FilterBarComponent {
  @Output() filterChange = new EventEmitter<TransactionType>();

  types: TransactionType[] = ["all", "income", "expense", "lend", "borrow"];
  activeType: TransactionType = "all";

  setActiveType(type: TransactionType) {
    this.activeType = type;
    this.filterChange.emit(type);
  }
}
