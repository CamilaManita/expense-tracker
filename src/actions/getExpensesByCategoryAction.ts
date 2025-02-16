import { ExpenseRepository } from "../repositories/expenseRepository";
import { Expense } from "../models/expense";
import { CustomError } from "../errors/customError";

export class GetExpensesByCategoryAction {
  private repository: ExpenseRepository;

  constructor(repository: ExpenseRepository) {
    this.repository = repository;
  }

  public execute(category: string): Expense[] {
    if (!category || typeof category !== 'string') {
      throw new CustomError("❌ Category must be a non-empty string.");
    }

    try {
      return this.repository.getExpenses().filter(
        (expense) => expense.category.toLowerCase() ===
        category.toLowerCase()
      )
    } catch (error) {
      throw new CustomError("❌ Error retrieving expenses by category: " + (error as Error).message);
    }
  }
}