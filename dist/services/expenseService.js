"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExpenseService = void 0;
const addExpenseAction_1 = require("../actions/addExpenseAction");
const deleteExpenseAction_1 = require("../actions/deleteExpenseAction");
const getSummaryAction_1 = require("../actions/getSummaryAction");
const getMonthlySummaryActions_1 = require("../actions/getMonthlySummaryActions");
const getExpensesByCategoryAction_1 = require("../actions/getExpensesByCategoryAction");
const customError_1 = require("../errors/customError");
class ExpenseService {
    constructor(repository) {
        this.repository = repository;
        this.addExpenseAction = new addExpenseAction_1.AddExpenseAction(repository);
        this.deleteExpenseAction = new deleteExpenseAction_1.DeleteExpenseAction(repository);
        this.getSummaryAction = new getSummaryAction_1.GetSummaryAction(repository);
        this.getMonthlySummaryAction = new getMonthlySummaryActions_1.GetMonthlySummaryAction(repository);
        this.getExpensesByCategoryAction = new getExpensesByCategoryAction_1.GetExpensesByCategoryAction(repository);
    }
    addExpense(description, amount, category) {
        const expense = this.addExpenseAction.execute(description, amount, category);
        if (expense === null) {
            throw new Error("Failed to add expense");
        }
        return expense;
    }
    listExpenses() {
        return this.repository.getExpenses();
    }
    deleteExpense(id) {
        try {
            return this.deleteExpenseAction.execute(id);
        }
        catch (error) {
            if (error instanceof customError_1.CustomError) {
                console.error(error.message);
            }
            else {
                console.error("❌ Unexpected error:", error);
            }
            return false;
        }
    }
    getMonthlySummary(month) {
        return this.getMonthlySummaryAction.execute(month);
    }
    getSummary() {
        return this.getSummaryAction.execute();
    }
    getExpensesByCategory(category) {
        try {
            return this.getExpensesByCategoryAction.execute(category);
        }
        catch (error) {
            if (error instanceof customError_1.CustomError) {
                console.error(error.message);
            }
            else {
                console.error("❌ Unexpected error:", error);
            }
            return [];
        }
    }
}
exports.ExpenseService = ExpenseService;
exports.default = ExpenseService;
