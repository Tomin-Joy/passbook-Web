export interface Transaction {
  id: number;
  description: string;
  amount: number;
  type: 'income' | 'expense' | 'lend' | 'borrow';
  date: Date;
  category: string;
}