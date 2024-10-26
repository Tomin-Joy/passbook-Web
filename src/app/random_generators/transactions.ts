import { Transaction } from "../models/transaction";

export function generateSampleTransactions(): Transaction[] {
  const categories = [
    "Food",
    "Rent",
    "Salary",
    "Entertainment",
    "Utilities",
    "Transport",
    "Misc",
  ];
  const types: Transaction["type"][] = ["income", "expense", "lend", "borrow"];

  const transactions: Transaction[] = Array.from(
    { length: 100 },
    (_, index) => {
      const type = types[Math.floor(Math.random() * types.length)];
      const amount = parseFloat((Math.random() * 1000).toFixed(2)); // Random amount between 0 and 1000 with two decimals

      return {
        id: index + 1,
        description: `${type} transaction #${index + 1}`,
        amount: type === "income" ? amount : -amount, // Negative for expenses, lend, borrow
        type,
        date: new Date(
          Date.now() - Math.floor(Math.random() * 365 * 24 * 60 * 60 * 1000)
        ), // Random date within the last year
        category: categories[Math.floor(Math.random() * categories.length)],
      };
    }
  );
  console.log(transactions);
  

  return transactions;
}

