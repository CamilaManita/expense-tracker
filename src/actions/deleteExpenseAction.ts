import { ExpenseRepository } from "../repositories/expenseRepository";
import { CustomError } from "../errors/customError";

export class DeleteExpenseAction {
  private repository: ExpenseRepository;

  constructor(repository: ExpenseRepository) {
    this.repository = repository;
  }

  public execute(id: number): boolean {
    const expenses = this.repository.getExpenses();
    const index = expenses.findIndex((expense) => expense.id === id);

    if (index === -1) {
      throw new CustomError(`❌ Expense with ID ${id} not found.`);
    }

    expenses.splice(index, 1);
    this.repository.saveExpenses(expenses);
    return true;
  }
}
