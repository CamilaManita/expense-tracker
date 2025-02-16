"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddExpenseAction = void 0;
const customError_1 = require("../errors/customError");
class AddExpenseAction {
    constructor(repository) {
        this.repository = repository;
    }
    execute(description, amount) {
        if (!description || typeof description !== "string") {
            throw new customError_1.CustomError("❌ Description must be a non-empty string.");
        }
        if (isNaN(amount) || amount <= 0) {
            throw new customError_1.CustomError("❌ Amount must be a valid positive number.");
        }
        try {
            const expenses = this.repository.getExpenses();
            const newExpense = {
                id: expenses.length + 1,
                description,
                amount,
                date: new Date().toISOString().split('T')[0]
            };
            expenses.push(newExpense);
            this.repository.saveExpenses(expenses);
            return newExpense;
        }
        catch (error) {
            throw new customError_1.CustomError("❌ An error occurred while adding the expense.");
        }
    }
}
exports.AddExpenseAction = AddExpenseAction;
