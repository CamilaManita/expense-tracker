import { Expense } from "../models/expense";

export interface IExpenseService {
  addExpense(description: string, amount: number): Expense;
  deleteExpense(id: number): boolean;
  getMonthlySummary(month: number): number;
  getSummary(): number;
}
