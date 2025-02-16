import { Expense } from "../models/expense";

export interface IExpenseService {
  addExpense(description: string, amount: number, category: string): Expense;
  deleteExpense(id: number): boolean;
  getMonthlySummary(month: number): number;
  getSummary(): number;
}
