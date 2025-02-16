import { IExpenseService } from "../services/iExpenseService";
import { Expense } from "../models/expense";
import ExpenseService from "../services/expenseService";
import { IExpenseRepository } from "../repositories/iExpenseRepository";

class MockExpenseRepository implements IExpenseRepository {
  private expenses: Expense[] = [];

  ensureDataFile(): void {
    return;
  }

  getExpenses(): Expense[] {
    return this.expenses;
  }

  saveExpenses(expenses: Expense[]): void {
    this.expenses = expenses;
  }
}

describe("ExpenseService", () => {
  let service: IExpenseService;
  let mockRepository: MockExpenseRepository;

  beforeEach(() => {
    mockRepository = new MockExpenseRepository();
    service = new ExpenseService(mockRepository); 
  });

  test("should add an expense", () => {
    const expense = service.addExpense("Lunch", 15, "Food");
    expect(expense).toBeDefined();
    expect(expense.description).toBe("Lunch");
    expect(expense.amount).toBe(15);
    expect(mockRepository.getExpenses()).toHaveLength(1);
  });

  test("should return total summary", () => {
    service.addExpense("Lunch", 15, "Food");
    service.addExpense("Dinner", 25, "Food");
    expect(service.getSummary()).toBe(40);
  });

  test("should return monthly summary", () => {
    service.addExpense("Lunch", 15, "Food");
    expect(service.getMonthlySummary(new Date().getMonth() + 1)).toBe(15);
  });

  test("should delete an expense", () => {
    const expense = service.addExpense("Lunch", 15, "Food");
    expect(service.deleteExpense(expense.id)).toBe(true);
    expect(mockRepository.getExpenses()).toHaveLength(0);
  });

  test("should return false when deleting a non-existing expense", () => {
    expect(service.deleteExpense(999)).toBe(false);
  });
});
