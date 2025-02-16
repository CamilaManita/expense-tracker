import { ExpenseRepository } from "../repositories/expenseRepository";
import { CustomError } from "../errors/customError";

export class GetSummaryAction {
  private repository: ExpenseRepository;

  constructor(repository: ExpenseRepository) {
    this.repository = repository;
  }

  public execute(): number {
    try {
      const expenses = this.repository.getExpenses();
      return expenses.reduce((acc, expense) => acc + expense.amount, 0);
    } catch (error) {
      if (error instanceof Error) {
        throw new CustomError(`❌ Error retrieving total summary: ${error.message}`);
      } else {
        throw new CustomError('❌ Error retrieving total summary: Unknown error');
      }
    }
  }
}
