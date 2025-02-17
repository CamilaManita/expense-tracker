"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddExpenseAction = void 0;
const customError_1 = require("../errors/customError");
const moment_1 = __importDefault(require("moment"));
class AddExpenseAction {
    constructor(repository, budgetRepository) {
        this.repository = repository;
        this.budgetRepository = this.budgetRepository;
    }
    execute(description, amount, category) {
        var _a;
        if (!description || typeof description !== "string") {
            throw new customError_1.CustomError("❌ Description must be a non-empty string.");
        }
        if (isNaN(amount) || amount <= 0) {
            throw new customError_1.CustomError("❌ Amount must be a valid positive number.");
        }
        if (!category || typeof category !== "string") {
            throw new customError_1.CustomError("❌ Category must be a non-empty string.");
        }
        try {
            const expenses = this.repository.getExpenses();
            const formattedDate = (0, moment_1.default)().format("YYYY-MM-DD");
            const newExpense = {
                id: expenses.length + 1,
                description,
                amount,
                date: formattedDate,
                category,
            };
            expenses.push(newExpense);
            this.repository.saveExpenses(expenses);
            const currentMonth = (0, moment_1.default)().month() + 1;
            const budget = (_a = this.budgetRepository) === null || _a === void 0 ? void 0 : _a.getBudgetForMonth(currentMonth);
            const totalSpent = expenses
                .filter((e) => (0, moment_1.default)(e.date).month() + 1 === currentMonth)
                .reduce((acc, e) => acc + e.amount, 0);
            if (budget && totalSpent > budget.amount) {
                console.warn(`⚠️ ALERT: You have exceeded your budget of $${budget.amount} for this month!`);
            }
            return newExpense;
        }
        catch (error) {
            throw new customError_1.CustomError("❌ An error occurred while adding the expense.");
        }
    }
}
exports.AddExpenseAction = AddExpenseAction;
