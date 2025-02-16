"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const expenseRepository_1 = require("../repositories/expenseRepository");
const addExpenseAction_1 = require("../actions/addExpenseAction");
const deleteExpenseAction_1 = require("../actions/deleteExpenseAction");
const getSummaryAction_1 = require("../actions/getSummaryAction");
const getMonthlySummaryActions_1 = require("../actions/getMonthlySummaryActions");
const customError_1 = require("../errors/customError");
class ExpenseService {
    constructor() {
        this.repository = new expenseRepository_1.ExpenseRepository();
        this.addExpenseAction = new addExpenseAction_1.AddExpenseAction(this.repository);
        this.deleteExpenseAction = new deleteExpenseAction_1.DeleteExpenseAction(this.repository);
        this.getSummaryAction = new getSummaryAction_1.GetSummaryAction(this.repository);
        this.getMonthlySummaryAction = new getMonthlySummaryActions_1.GetMonthlySummaryAction(this.repository);
    }
    addExpense(description, amount) {
        try {
            return this.addExpenseAction.execute(description, amount);
        }
        catch (error) {
            if (error instanceof customError_1.CustomError) {
                console.error(error.message);
            }
            else {
                console.error("❌ Unexpected error:", error);
            }
            return null;
        }
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
        try {
            return this.getMonthlySummaryAction.execute(month);
        }
        catch (error) {
            if (error instanceof customError_1.CustomError) {
                console.error(error.message);
            }
            else {
                console.error("❌ Unexpected error:", error);
            }
            return 0;
        }
    }
    getSummary() {
        try {
            return this.getSummaryAction.execute();
        }
        catch (error) {
            if (error instanceof customError_1.CustomError) {
                console.error(error.message);
            }
            else {
                console.error("❌ Unexpected error:", error);
            }
            return 0;
        }
    }
}
exports.default = new ExpenseService();
