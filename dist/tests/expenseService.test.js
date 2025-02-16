"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const expenseService_1 = __importDefault(require("../services/expenseService"));
class MockExpenseRepository {
    constructor() {
        this.expenses = [];
    }
    ensureDataFile() {
        return;
    }
    getExpenses() {
        return this.expenses;
    }
    saveExpenses(expenses) {
        this.expenses = expenses;
    }
}
describe("ExpenseService", () => {
    let service;
    let mockRepository;
    beforeEach(() => {
        mockRepository = new MockExpenseRepository();
        service = new expenseService_1.default(mockRepository);
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
