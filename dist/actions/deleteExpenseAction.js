"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteExpenseAction = void 0;
const customError_1 = require("../errors/customError");
class DeleteExpenseAction {
    constructor(repository) {
        this.repository = repository;
    }
    execute(id) {
        const expenses = this.repository.getExpenses();
        const index = expenses.findIndex((expense) => expense.id === id);
        if (index === -1) {
            throw new customError_1.CustomError(`❌ Expense with ID ${id} not found.`);
        }
        expenses.splice(index, 1);
        this.repository.saveExpenses(expenses);
        return true;
    }
}
exports.DeleteExpenseAction = DeleteExpenseAction;
