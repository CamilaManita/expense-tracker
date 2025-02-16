import { Expense } from "../models/expense";
import { ExpenseRepository } from "../repositories/expenseRepository";
import { CustomError } from "../errors/customError";

export class AddExpenseAction {
  private repository: ExpenseRepository;

  constructor(repository: ExpenseRepository) {
    this.repository = repository;
  }

  public execute(description: string, amount: number): Expense {

    if (!description || typeof description !== "string") {
      throw new CustomError("❌ Description must be a non-empty string.");
    }

    if (isNaN(amount) || amount <= 0) {
      throw new CustomError("❌ Amount must be a valid positive number.");
    }

    try {
      const expenses = this.repository.getExpenses();
      
      const newExpense: Expense = {
        id: expenses.length + 1,
        description,
        amount,
        date: new Date().toISOString().split('T')[0]
      }
      
      expenses.push(newExpense);
      this.repository.saveExpenses(expenses);
      
      return newExpense;
    } catch (error) {
      throw new CustomError("❌ An error occurred while adding the expense.");
    }
  }
}