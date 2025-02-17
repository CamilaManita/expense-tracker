import { Expense } from "../models/expense";
import { Budget } from "../models/budget";
import { IExpenseService } from "./iExpenseService";
import { AddExpenseAction } from "../actions/addExpenseAction";
import { DeleteExpenseAction } from "../actions/deleteExpenseAction";
import { GetSummaryAction } from "../actions/getSummaryAction";
import { GetMonthlySummaryAction } from "../actions/getMonthlySummaryActions";
import { GetExpensesByCategoryAction } from "../actions/getExpensesByCategoryAction";
import { IExpenseRepository } from "../repositories/iExpenseRepository";
import { ExpenseRepository } from "../repositories/expenseRepository";
import { CustomError } from "../errors/customError";
import { BudgetRepository } from "../repositories/budgetRepository";
import { SetBudgetAction } from "../actions/setBudgetActions";

export class ExpenseService implements IExpenseService {
  private repository: IExpenseRepository;
  private budgetRepository: BudgetRepository;
  private addExpenseAction: AddExpenseAction;
  private deleteExpenseAction: DeleteExpenseAction;
  private getSummaryAction: GetSummaryAction;
  private getMonthlySummaryAction: GetMonthlySummaryAction;
  private getExpensesByCategoryAction: GetExpensesByCategoryAction;
  private setBudgetAction: SetBudgetAction;

  constructor(
    repository: ExpenseRepository,
    budgetRepository?: BudgetRepository
  ) {
    this.repository = repository;
    this.budgetRepository = budgetRepository || new BudgetRepository();
    this.addExpenseAction = new AddExpenseAction(repository, this.budgetRepository);
    this.deleteExpenseAction = new DeleteExpenseAction(repository);
    this.getSummaryAction = new GetSummaryAction(repository);
    this.getMonthlySummaryAction = new GetMonthlySummaryAction(repository);
    this.getExpensesByCategoryAction = new GetExpensesByCategoryAction(
      repository
    );
    this.setBudgetAction = new SetBudgetAction(this.budgetRepository);
  }

  public addExpense(
    description: string,
    amount: number,
    category: string
  ): Expense {
    const expense = this.addExpenseAction.execute(
      description,
      amount,
      category
    );
    if (expense === null) {
      throw new Error("Failed to add expense");
    }
    return expense;
  }

  public listExpenses(): Expense[] {
    return this.repository.getExpenses();
  }

  public deleteExpense(id: number): boolean {
    try {
      return this.deleteExpenseAction.execute(id);
    } catch (error) {
      if (error instanceof CustomError) {
        console.error(error.message);
      } else {
        console.error("❌ Unexpected error:", error);
      }
      return false;
    }
  }

  public getMonthlySummary(month: number): number {
    return this.getMonthlySummaryAction.execute(month);
  }

  public getSummary(): number {
    return this.getSummaryAction.execute();
  }

  public getExpensesByCategory(category: string): Expense[] {
    try {
      return this.getExpensesByCategoryAction.execute(category);
    } catch (error) {
      if (error instanceof CustomError) {
        console.error(error.message);
      } else {
        console.error("❌ Unexpected error:", error);
      }
      return [];
    }
  }

  public setBudget(month: number, amount: number): void {
    return this.setBudgetAction.execute(month, amount);
  }

  public getBudgetForMonth(month: number): Budget | undefined {
    return this.budgetRepository.getBudgetForMonth(month);
  }
}

export default ExpenseService;
