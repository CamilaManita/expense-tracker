import moment from "moment";
import { ExpenseRepository } from "../repositories/expenseRepository";
import { CustomError } from "../errors/customError";

export class GetMonthlySummaryAction {
  private repository: ExpenseRepository;

  constructor(repository: ExpenseRepository) {
    this.repository = repository;
  }

  public execute(month: number): number {
    if (isNaN(month) || month < 1 || month > 12) {
      throw new CustomError("❌ Month must be a number between 1 and 12.");
    }

    try {
      const expenses = this.repository.getExpenses();
      const filteredExpenses = expenses.filter(
        (expense) => moment(expense.date).month() + 1 === month
      );

      return filteredExpenses.reduce((acc, expense) => acc + expense.amount, 0);
    } catch (error) {
      if (error instanceof Error) {
        throw new CustomError(`❌ Error retrieving monthly summary: ${error.message}`);
      } else {
        throw new CustomError("❌ Error retrieving monthly summary: Unknown error");
      }
    }
  }
}
