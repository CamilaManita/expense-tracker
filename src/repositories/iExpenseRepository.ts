import { Expense } from "../models/expense";

export interface IExpenseRepository {
  getExpenses(): Expense[];
  saveExpenses(expenses: Expense[]): void;
}
