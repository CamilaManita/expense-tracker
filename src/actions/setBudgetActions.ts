import { BudgetRepository } from "../repositories/budgetRepository";
import { CustomError } from "../errors/customError";

export class SetBudgetAction {
  private repository: BudgetRepository;

  constructor(repository: BudgetRepository) {
    this.repository = repository;
  }

  public execute(month: number, amount: number): void {
    if (isNaN(month) || month < 1 || month > 12) {
      throw new CustomError("❌ Month must be a number between 1 and 12.");
    }
    if (isNaN(amount) || amount <= 0) {
      throw new CustomError("❌ Budget must be a positive number.");
    }

    this.repository.setBudgetForMonth(month, amount);
    console.log(`✅ Budget for month ${month} set to $${amount}`);
  }
}
