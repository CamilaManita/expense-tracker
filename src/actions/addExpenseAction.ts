import { Expense } from "../models/expense";
import { ExpenseRepository } from "../repositories/expenseRepository";
import { CustomError } from "../errors/customError";
import moment from "moment";
import { BudgetRepository } from "../repositories/budgetRepository";

export class AddExpenseAction {
  private repository: ExpenseRepository;
  private budgetRepository: BudgetRepository | undefined;

  constructor(
    repository: ExpenseRepository,
    budgetRepository: BudgetRepository
  ) {
    this.repository = repository;
    this.budgetRepository = this.budgetRepository;
  }

  public execute(
    description: string,
    amount: number,
    category: string
  ): Expense {
    if (!description || typeof description !== "string") {
      throw new CustomError("❌ Description must be a non-empty string.");
    }

    if (isNaN(amount) || amount <= 0) {
      throw new CustomError("❌ Amount must be a valid positive number.");
    }

    if (!category || typeof category !== "string") {
      throw new CustomError("❌ Category must be a non-empty string.");
    }

    try {
      const expenses = this.repository.getExpenses();
      const formattedDate = moment().format("YYYY-MM-DD");

      const newExpense: Expense = {
        id: expenses.length + 1,
        description,
        amount,
        date: formattedDate,
        category,
      };

      expenses.push(newExpense);
      this.repository.saveExpenses(expenses);

      const currentMonth = moment().month() + 1;
      const budget = this.budgetRepository?.getBudgetForMonth(currentMonth);
      const totalSpent = expenses
        .filter((e) => moment(e.date).month() + 1 === currentMonth)
        .reduce((acc, e) => acc + e.amount, 0);

      if (budget && totalSpent > budget.amount) {
        console.warn(
          `⚠️ ALERT: You have exceeded your budget of $${budget.amount} for this month!`
        );
      }

      return newExpense;
    } catch (error) {
      throw new CustomError("❌ An error occurred while adding the expense.");
    }
  }
}
